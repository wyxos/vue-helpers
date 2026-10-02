'use strict'

const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const { createRequire } = require('node:module')
const { test } = require('node:test')
const { Worker } = require('node:worker_threads')

// Allows the same behavioral checks to be run against a separate Vue Helpers
// baseline checkout, without reinstalling or changing either dependency tree.
const projectRoot = process.env.VUE_HELPERS_BUILD_TEST_ROOT || path.join(__dirname, '..')
const projectRequire = createRequire(path.join(projectRoot, 'package.json'))
const mixRequire = createRequire(projectRequire.resolve('laravel-mix/package.json'))
const cssLoaderRequire = createRequire(mixRequire.resolve('postcss-loader/package.json'))
const vueLoaderRequire = createRequire(mixRequire.resolve('vue-loader/package.json'))
const compilerRequire = createRequire(vueLoaderRequire.resolve('@vue/component-compiler-utils/package.json'))
const postcssPaths = [...new Set([
  cssLoaderRequire.resolve('postcss'),
  compilerRequire.resolve('postcss')
])]
const serverRequire = createRequire(mixRequire.resolve('webpack-dev-server/package.json'))
const overlayPath = serverRequire.resolve('./client/overlay.js')

function loadOverlay () {
  const overlayRequire = createRequire(overlayPath)
  const frames = []
  const divs = []
  let ansiPath
  const makeBody = () => ({
    children: [],
    appendChild (element) { this.children.push(element) },
    removeChild (element) {
      const index = this.children.indexOf(element)
      assert.notEqual(index, -1, 'overlay removes an attached element')
      this.children.splice(index, 1)
    }
  })
  const makeDocument = () => ({
    body: makeBody(),
    createElement (tag) {
      const element = { tag, style: {} }
      if (tag === 'iframe') {
        element.contentDocument = makeDocument()
        frames.push(element)
      } else if (tag === 'div') {
        divs.push(element)
      }
      return element
    }
  })
  const document = makeDocument()
  const module = { exports: {} }
  const context = vm.createContext({
    document,
    module,
    require (name) {
      if (/^ansi-html(?:-community)?$/.test(name)) ansiPath = overlayRequire.resolve(name)
      return overlayRequire(name)
    }
  })
  vm.runInContext(fs.readFileSync(overlayPath, 'utf8'), context, { filename: overlayPath, timeout: 1000 })
  assert.ok(ansiPath, 'the installed client overlay loads an ANSI converter')
  return { overlay: module.exports, document, frames, divs, ansiPath }
}

// Regex regressions can block the JS event loop, so node:test's timeout alone
// cannot protect the machine. Run each payload in a worker with bounded memory
// and terminate it after two seconds of execution (startup has its own limit).
function boundedPayload (modulePath, kind) {
  const source = `
    const { parentPort, workerData } = require('node:worker_threads')
    const implementation = require(workerData.modulePath)
    parentPort.postMessage({ kind: 'ready' })
    parentPort.once('message', () => {
      const started = performance.now()
      try {
        if (workerData.kind === 'postcss') {
          const input = 'a{}' + '/*# sourceMappingURL='.repeat(100000) + '!'
          try {
            implementation.parse(input)
            parentPort.postMessage({ kind: 'done', rejected: false })
          } catch (error) {
            parentPort.postMessage({ kind: 'done', rejected: true,
              errorName: error.name, reason: error.reason, elapsedMs: performance.now() - started })
          }
        } else {
          const tail = '\\x1b[' + '0'.repeat(53)
          const output = implementation('\\x1b[0m' + tail)
          parentPort.postMessage({ kind: 'done', preservesTail: output.includes(tail),
            convertedReset: output.includes('<span'), elapsedMs: performance.now() - started })
        }
      } catch (error) {
        parentPort.postMessage({ kind: 'failed', message: error.message })
      }
    })
  `
  return new Promise((resolve, reject) => {
    let worker
    let timer
    let settled = false
    const finish = async (error, result) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      if (worker) await worker.terminate()
      if (error) reject(error)
      else resolve(result)
    }
    try {
      worker = new Worker(source, {
        eval: true,
        workerData: { modulePath, kind },
        resourceLimits: { maxOldGenerationSizeMb: 64, maxYoungGenerationSizeMb: 16, stackSizeMb: 4 }
      })
    } catch (error) {
      reject(error)
      return
    }
    timer = setTimeout(() => { void finish(new Error(`${kind} worker did not start within 5 seconds`)) }, 5000)
    worker.on('error', error => { void finish(error) })
    worker.on('exit', code => {
      if (!settled) void finish(new Error(`${kind} worker exited before reporting a result (${code})`))
    })
    worker.on('message', message => {
      if (message.kind === 'ready') {
        clearTimeout(timer)
        timer = setTimeout(() => { void finish(new Error(`${kind} advisory payload exceeded the 2-second execution limit`)) }, 2000)
        worker.postMessage('run')
      } else if (message.kind === 'done') {
        void finish(null, message)
      } else {
        void finish(new Error(message.message || 'Unexpected worker response'))
      }
    })
  })
}

test('Mix CSS loader and Vue compiler preserve transformations and source mappings', async () => {
  const input = '/* original CSS */\n.example { color: green; margin: 0 }\n'
  for (const modulePath of postcssPaths) {
    const postcss = require(modulePath)
    const postcssRequire = createRequire(modulePath)
    const { SourceMapConsumer } = postcssRequire('source-map')
    const changeColor = postcss.plugin('helpers-color-regression', () => root => {
      root.walkDecls('color', declaration => { declaration.value = '#009900' })
    })
    const result = await postcss([changeColor]).process(input, {
      from: path.join(projectRoot, 'test', 'input.css'),
      to: path.join(projectRoot, 'dist', 'output.css'),
      map: { inline: false, annotation: false, sourcesContent: true }
    })
    assert.match(result.css, /\.example \{ color: #009900; margin: 0 \}/)
    assert.deepEqual(result.warnings(), [])
    const map = result.map.toJSON()
    assert.equal(map.file, 'output.css')
    assert.deepEqual(map.sourcesContent, [input])
    const consumer = new SourceMapConsumer(map)
    const line = result.css.split('\n')[1]
    const original = consumer.originalPositionFor({ line: 2, column: line.indexOf('color') })
    assert.equal(original.line, 2)
    assert.equal(original.column, input.split('\n')[1].indexOf('color'))
    assert.match(original.source.replace(/\\/g, '/'), /test\/input\.css$/)
    if (consumer.destroy) consumer.destroy()
  }
})

test('Mix PostCSS rejects the source-map-comment ReDoS payload within a bounded worker', async t => {
  // GHSA-566m-qj78-rww5 / CVE-2021-23382, repeated unterminated map comments:
  // https://github.com/advisories/GHSA-566m-qj78-rww5
  for (const modulePath of postcssPaths) {
    const result = await boundedPayload(modulePath, 'postcss')
    assert.equal(result.rejected, true)
    assert.equal(result.errorName, 'CssSyntaxError')
    assert.match(result.reason, /Unclosed comment/)
    t.diagnostic(`advisory payload rejected in ${Math.round(result.elapsedMs)} ms`)
  }
})

test('installed dev-server error overlay colors ANSI text and escapes embedded HTML', () => {
  // Minimal DOM surface exercises the installed overlay itself; it does not
  // claim browser layout, iframe security or end-to-end HMR coverage.
  const { overlay, document, frames, divs, ansiPath } = loadOverlay()
  assert.match(ansiPath.replace(/\\/g, '/'), /\/ansi-html-community\//)
  const message = '\x1b[31m<img src=x onerror="alert(1)"> & <script>bad()</script>\x1b[0m\nnext line'
  overlay.showMessage([message])
  assert.equal(document.body.children.length, 1)
  assert.equal(frames[0].src, 'about:blank')
  frames[0].onload()
  const html = divs[0].innerHTML
  assert.match(html, /Failed to compile\./)
  assert.match(html, /<span style="color:#E36049;">/)
  assert.match(html, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/)
  assert.match(html, /&amp;/)
  assert.match(html, /&lt;script&gt;bad\(\)&lt;\/script&gt;/)
  assert.match(html, /\nnext line/)
  assert.doesNotMatch(html, /<img|<script|\x1b\[/)
  overlay.showMessage(['replacement message'])
  assert.equal(frames.length, 1, 'a subsequent compilation error reuses the overlay')
  assert.match(divs[0].innerHTML, /replacement message$/)
  assert.doesNotMatch(divs[0].innerHTML, /onerror|bad\(\)/)
  overlay.clear()
  assert.equal(document.body.children.length, 0)
  overlay.clear()
})

test('dev-server overlay ANSI converter handles the original exponential ReDoS input', async t => {
  // Original Doyensec reproduction, with its 53-digit attack size:
  // https://github.com/Tjatse/ansi-html/issues/19 (CVE-2021-23424)
  const { ansiPath } = loadOverlay()
  const result = await boundedPayload(ansiPath, 'ansi')
  assert.equal(result.preservesTail, true, 'malformed ANSI tail remains ordinary message text')
  assert.equal(result.convertedReset, true, 'valid reset sequence is still converted')
  t.diagnostic(`advisory payload converted in ${Math.round(result.elapsedMs)} ms`)
})

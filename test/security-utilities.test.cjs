'use strict'

const assert = require('node:assert/strict')
const { spawnSync } = require('node:child_process')
const { createRequire } = require('node:module')
const path = require('node:path')
const { test } = require('node:test')

// Resolve each utility through its real caller. A safe hoisted copy must not
// hide a different nested copy used by Mix's server, source maps, or watcher.
// A separate helpers checkout can supply the vulnerable baseline for negative
// verification without changing either checkout's dependency installation.
const helpersRequire = createRequire(path.resolve(process.env.VUE_HELPERS_UTILITY_TEST_ROOT || path.resolve(__dirname, '..'), 'package.json'))
const mixRequire = createRequire(helpersRequire.resolve('laravel-mix/package.json'))
const devServerRequire = createRequire(mixRequire.resolve('webpack-dev-server'))
const bonjourRequire = createRequire(devServerRequire.resolve('bonjour'))
const multicastRequire = createRequire(bonjourRequire.resolve('multicast-dns'))
const dnsPacketRequire = createRequire(multicastRequire.resolve('dns-packet'))

const legacyChokidarRequire = createRequire(mixRequire.resolve('chokidar'))
const legacyBracesRequire = createRequire(legacyChokidarRequire.resolve('braces'))
const snapdragonRequire = createRequire(legacyBracesRequire.resolve('snapdragon'))
const sourceMapRequire = createRequire(snapdragonRequire.resolve('source-map-resolve'))
const sourceMaps = snapdragonRequire('source-map-resolve')
const decode = sourceMapRequire('decode-uri-component')

const webpackRequire = createRequire(mixRequire.resolve('webpack'))
const watchpackRequire = createRequire(webpackRequire.resolve('watchpack'))
const watcherRequire = createRequire(watchpackRequire.resolve('chokidar'))
const watcherBraces = watcherRequire('braces')
const watcherBracesPath = watcherRequire.resolve('braces')

test('Source-map decoder handles malformed UTF-8 without losing valid encoded bytes', () => {
  assert.equal(decode('%ea%ba%5a%ba'), '%ea%baZ%ba')

  let readPath
  const map = { version: 3, sources: [], names: [], mappings: '' }
  const resolved = sourceMaps.resolveSourceMapSync(
    'console.log("legacy");\n//# sourceMappingURL=map-%ea%ba%5a%ba.js.map',
    'https://example.invalid/assets/app.js',
    filename => {
      readPath = filename
      return JSON.stringify(map)
    }
  )
  assert.equal(readPath, 'https://example.invalid/assets/map-%ea%baZ%ba.js.map')
  assert.deepEqual(resolved.map, map)
})

test('Source-map resolution preserves plus signs and decodes Unicode and spaces in filenames', () => {
  assert.equal(decode('Fran%C3%A7ais%20%E2%9C%93'), 'Fran\u00e7ais \u2713')
  assert.equal(decode('two+words'), 'two words')

  const readPaths = []
  const map = {
    version: 3,
    sources: ['../src/Form+%E2%9C%93%20Mixin.js'],
    names: [],
    mappings: ''
  }
  const resolved = sourceMaps.resolveSync(
    'console.log("legacy");\n//# sourceMappingURL=app+%E2%9C%93%20map.js.map',
    'https://example.invalid/assets/app.js',
    filename => {
      readPaths.push(filename)
      return filename.endsWith('.map') ? JSON.stringify(map) : 'export default {}'
    }
  )
  assert.deepEqual(readPaths, [
    'https://example.invalid/assets/app+\u2713 map.js.map',
    'https://example.invalid/src/Form+\u2713 Mixin.js'
  ])
  assert.deepEqual(resolved.sourcesContent, ['export default {}'])
})

test('Dev-server and DNS copies of ip do not classify hexadecimal loopback as public', () => {
  for (const ip of [devServerRequire('ip'), dnsPacketRequire('ip')]) {
    assert.equal(ip.isPublic('0x7f.1'), false)
    assert.equal(ip.isPublic('127.0.0.1'), false)
    assert.equal(ip.isPublic('10.1.2.3'), false)
    assert.equal(ip.isPublic('::1'), false)
    assert.equal(ip.isPublic('8.8.8.8'), true)
  }
})

test('Bonjour DNS packets still round-trip IPv4 and IPv6 records through ip', () => {
  const dns = multicastRequire('dns-packet')
  const encoded = dns.encode({
    type: 'response',
    id: 7,
    flags: dns.AUTHORITATIVE_ANSWER,
    questions: [{ name: 'legacy.local', type: 'A' }],
    answers: [
      { name: 'legacy.local', type: 'A', class: 1, ttl: 120, data: '192.168.1.42' },
      { name: 'legacy.local', type: 'AAAA', class: 1, ttl: 120, data: '2001:db8::1' }
    ]
  })
  const decoded = dns.decode(encoded)
  assert.equal(decoded.id, 7)
  assert.equal(decoded.type, 'response')
  assert.equal(decoded.questions[0].name, 'legacy.local')
  assert.deepEqual(decoded.answers.map(answer => ({
    type: answer.type,
    data: answer.data,
    ttl: answer.ttl,
    class: answer.class
  })), [
    { type: 'A', data: '192.168.1.42', ttl: 120, class: 1 },
    { type: 'AAAA', data: '2001:db8::1', ttl: 120, class: 1 }
  ])
})

test('Dev-server host and origin checks preserve IP, localhost, and explicit hostname rules', () => {
  const Server = mixRequire('webpack-dev-server')
  // Exercise the real methods without starting a listener or webpack compiler.
  const server = Object.create(Server.prototype)
  Object.assign(server, {
    disableHostCheck: false,
    hostname: 'listening.example.invalid',
    allowedHosts: ['legacy.example.invalid', '.dev.example.invalid'],
    publicHost: 'preview.example.invalid:8080'
  })

  for (const host of [
    '127.0.0.1:8080',
    '[::1]:8080',
    'localhost:8080',
    'listening.example.invalid:8080',
    'legacy.example.invalid:8080',
    'branch.dev.example.invalid:8080',
    'dev.example.invalid:8080',
    'preview.example.invalid:8080'
  ]) {
    assert.equal(server.checkHost({ host }), true, host)
  }
  for (const host of [
    'unlisted.example.invalid:8080',
    'legacy.example.invalid.attacker.invalid:8080',
    'branch.dev.example.invalid.attacker.invalid:8080'
  ]) {
    assert.equal(server.checkHost({ host }), false, host)
  }
  assert.equal(server.checkHost({}), false)
  assert.equal(server.checkOrigin({ origin: 'https://legacy.example.invalid' }), true)
  assert.equal(server.checkOrigin({ origin: 'https://unlisted.example.invalid' }), false)
})

test('Watchpack brace parser rejects overlong malformed input within a bounded process', () => {
  // The old parser may recurse or exhaust resources on malformed input. Keep
  // that regression isolated with explicit time and memory limits even when
  // testing a vulnerable baseline. No shell interpolation is involved.
  const script = [
    "const assert = require('node:assert/strict')",
    'const braces = require(process.argv[1])',
    'for (const options of [undefined, { maxLength: 1000000 }]) {',
    "  assert.throws(() => braces.parse('{'.repeat(10001), options), { name: 'SyntaxError' })",
    '}'
  ].join('\n')
  const result = spawnSync(process.execPath, [
    '--max-old-space-size=64', '-e', script, watcherBracesPath
  ], {
    timeout: 5000,
    maxBuffer: 256 * 1024,
    encoding: 'utf8',
    windowsHide: true
  })
  assert.ifError(result.error)
  assert.equal(result.signal, null, result.stderr)
  assert.equal(result.status, 0, result.stderr || result.stdout)
})

test('Watchpack nested chokidar still expands and matches ordinary brace globs', async () => {
  assert.deepEqual(watcherBraces.expand('src/{plugins,components}/entry.{js,vue}'), [
    'src/plugins/entry.js',
    'src/plugins/entry.vue',
    'src/components/entry.js',
    'src/components/entry.vue'
  ])
  assert.deepEqual(watcherBraces.expand('part-{1..3}.js'), ['part-1.js', 'part-2.js', 'part-3.js'])

  // Use watchpack's actual chokidar selector and its real glob helper; no files
  // need watching for this deterministic parent-integration check.
  const chokidar = watchpackRequire('./chokidar')
  const watcher = new chokidar.FSWatcher({ persistent: false, ignoreInitial: true })
  try {
    const helper = watcher._getWatchHelpers('src/{plugins,components}/**/*.{js,vue}', 0)
    assert.equal(helper.globFilter('src/plugins/axios.js'), true)
    assert.equal(helper.globFilter('src/components/Modal.vue'), true)
    assert.equal(helper.globFilter('src/other/axios.js'), false)
    assert.equal(helper.globFilter('src/components/readme.md'), false)
    assert.ok(helper.dirParts.some(parts => parts[0] === 'plugins'))
    assert.ok(helper.dirParts.some(parts => parts[0] === 'components'))
  } finally {
    await watcher.close()
  }
})

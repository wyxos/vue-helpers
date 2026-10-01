'use strict'

const assert = require('node:assert/strict')
const { test } = require('node:test')
const Vue = require('vue')
const axios = require('axios')

test('Published UMD entry installs in a Vue 2 consumer and uses external Axios', async () => {
  // The published UMD has always targeted browsers and references window at
  // load time. Supply that browser global without introducing a DOM emulator.
  const priorWindow = Object.getOwnPropertyDescriptor(globalThis, 'window')
  const originalCreate = axios.create
  let externalAxiosCalls = 0
  globalThis.window = { Laravel: { routes: { profile: '/profile' } } }
  axios.create = function (...args) {
    externalAxiosCalls++
    return originalCreate.apply(this, args)
  }
  try {
    const Helpers = require('..').default
    assert.equal(typeof Helpers.install, 'function')
    const ConsumerVue = Vue.extend()
    let successful = false
    ConsumerVue.use(Helpers, {
      axios: {
        onSuccess () { successful = true },
        options: {
          adapter: async config => {
            assert.equal(config.url, '/profile')
            assert.equal(config.headers['X-Requested-With'], 'XMLHttpRequest')
            return { data: { id: 1 }, status: 200, statusText: 'OK', headers: {}, config }
          }
        }
      }
    })
    const vm = new ConsumerVue()
    assert.equal(vm.$path('profile'), '/profile')
    assert.equal(vm.isLoading, false)
    const result = await vm.$axios().get(vm.$path('profile'))
    assert.deepEqual(result.data, { id: 1 })
    assert.equal(externalAxiosCalls, 1, 'UMD must use the consumer\'s external Axios module')
    assert.equal(successful, true)
    assert.equal(vm.isLoading, false)

    const Modal = ConsumerVue.options.components.modal
    const modal = new ConsumerVue(Modal)
    vm.$refs.dialog = modal
    for (const hook of vm.$options.mounted) hook.call(vm)
    vm.$modals.open('dialog')
    assert.equal(modal.show, true)
    vm.$modals.close('dialog')
    assert.equal(modal.show, false)
    assert.doesNotThrow(() => vm.$modals.open('unknown-ref'))
    assert.equal(typeof ConsumerVue.options.components['form-error'], 'function')
    assert.equal(typeof ConsumerVue.options.components['error-modal'], 'function')

    vm.$boolean.set('expanded', false)
    vm.$boolean.toggle('expanded')
    assert.equal(vm.$boolean.get('expanded'), true)
  } finally {
    axios.create = originalCreate
    if (priorWindow) Object.defineProperty(globalThis, 'window', priorWindow)
    else delete globalThis.window
  }
})

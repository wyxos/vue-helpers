'use strict'

const assert = require('node:assert/strict')
const path = require('node:path')
const { test } = require('node:test')
const Vue = require('vue')
const axios = require('axios')
const { loadSource } = require('./support/source-loader.cjs')

const source = name => loadSource(path.join(__dirname, '..', 'src', name)).default
const State = source('plugins/state.js')
const Errors = source('plugins/errors.js')
const Axios = source('plugins/axios.js')
const FormMixin = source('mixins/FormMixin.js')

function createConsumer (options) {
  const ConsumerVue = Vue.extend()
  State.install(ConsumerVue)
  Errors.install(ConsumerVue)
  Axios.install(ConsumerVue, options)
  return { ConsumerVue, vm: new ConsumerVue() }
}

function response (config, data = { saved: true }) {
  return { data, status: 200, statusText: 'OK', headers: {}, config, request: {} }
}

function header (headers, name) {
  if (typeof headers.get === 'function') return headers.get(name)
  const key = Object.keys(headers).find(key => key.toLowerCase() === name.toLowerCase())
  return headers[key]
}

test('Axios POST preserves request data and headers and clears state after success', async () => {
  const { vm } = createConsumer()
  vm.$errors.status = 422
  vm.$errors.set('name', 'Old validation error')
  vm.$errors.set('other', 'Keep this named bag', 'account')

  let calls = 0
  let success
  const client = vm.$axios({
    state: 'save-user',
    onSuccess (result) {
      assert.equal(vm.$state.running('save-user'), false)
      success = result
    },
    options: {
      baseURL: 'https://example.invalid/api',
      timeout: 2500,
      headers: { 'X-Consumer': 'legacy-project' },
      adapter: async config => {
        calls++
        assert.equal(vm.$state.running('save-user'), true)
        assert.equal(vm.$errors.status, null)
        assert.equal(vm.$errors.exists('name'), false)
        assert.equal(vm.$errors.get('other', 'account'), 'Keep this named bag')
        assert.equal(config.baseURL, 'https://example.invalid/api')
        assert.equal(config.timeout, 2500)
        assert.equal(config.url, '/users')
        assert.equal(config.method, 'post')
        assert.deepEqual(JSON.parse(config.data), { name: 'Ada' })
        assert.equal(header(config.headers, 'X-Requested-With'), 'XMLHttpRequest')
        assert.equal(header(config.headers, 'X-Consumer'), 'legacy-project')
        assert.match(header(config.headers, 'Content-Type'), /^application\/json/)
        return response(config, { id: 7, name: 'Ada' })
      }
    }
  })

  const result = await client.post('/users', { name: 'Ada' })
  assert.equal(calls, 1)
  assert.equal(success, result)
  assert.deepEqual(result.data, { id: 7, name: 'Ada' })
  assert.equal(vm.$state.running(), false)
})

test('Explicit empty instance parameters use global options, state, and success callback', async () => {
  let successCalls = 0
  let vm
  ;({ vm } = createConsumer({
    state: 'global-request',
    onSuccess () { successCalls++ },
    options: {
      baseURL: 'https://example.invalid/global',
      headers: { 'X-Global': 'configured' },
      adapter: async config => {
        assert.equal(vm.$state.running('global-request'), true)
        assert.equal(config.baseURL, 'https://example.invalid/global')
        assert.equal(header(config.headers, 'X-Global'), 'configured')
        return response(config)
      }
    }
  }))

  await vm.$axios({}).get('/profile')
  assert.equal(successCalls, 1)
  assert.equal(vm.$state.running(), false)
})

test('Instance options and success callback replace the global ones', async () => {
  let globalCalls = 0
  let instanceCalls = 0
  const { vm } = createConsumer({
    state: 'global-request',
    onSuccess () { globalCalls++ },
    options: {
      baseURL: 'https://example.invalid/global',
      headers: { 'X-Global': 'configured' },
      adapter () { throw new Error('Global adapter must be replaced') }
    }
  })

  await vm.$axios({
    state: 'instance-request',
    onSuccess () { instanceCalls++ },
    options: {
      baseURL: 'https://example.invalid/instance',
      adapter: async config => {
        assert.equal(vm.$state.running('instance-request'), true)
        assert.equal(vm.$state.running('global-request'), false)
        assert.equal(config.baseURL, 'https://example.invalid/instance')
        assert.equal(header(config.headers, 'X-Global'), undefined)
        return response(config)
      }
    }
  }).get('/profile')

  assert.equal(globalCalls, 0)
  assert.equal(instanceCalls, 1)
  assert.equal(vm.$state.running(), false)
})

test('HTTP 422 maps Laravel errors, clears loading, and rejects the original error', async () => {
  let callbackError
  let vm
  const failure = Object.assign(new Error('Unprocessable Entity'), {
    response: { status: 422, data: { errors: { email: ['Email is required.', 'Another message.'] } } }
  })
  ;({ vm } = createConsumer({
    state: 'validation',
    onError (error) {
      assert.equal(vm.$state.running('validation'), false)
      assert.equal(vm.$errors.isInvalid, true)
      callbackError = error
    },
    options: {
      adapter: async () => {
        assert.equal(vm.$state.running('validation'), true)
        throw failure
      }
    }
  }))
  vm.$errors.set('old-field', 'Old message')

  await assert.rejects(vm.$axios({}).post('/users', {}), error => error === failure)
  assert.equal(callbackError, failure)
  assert.equal(vm.$errors.status, 422)
  assert.equal(vm.$errors.get('email'), 'Email is required.')
  assert.equal(vm.$errors.exists('old-field'), false)
  assert.equal(vm.$errors.findBag().items.length, 1)
  assert.equal(vm.$state.running(), false)
})

test('Network failures clear errors, set status 500, and use the instance error callback', async () => {
  let globalCalls = 0
  let callbackError
  const { vm } = createConsumer({ onError () { globalCalls++ } })
  const failure = new Error('Network Error')
  vm.$errors.set('name', 'Old validation error')

  await assert.rejects(vm.$axios({
    state: 'network',
    onError (error) {
      assert.equal(vm.$state.running('network'), false)
      callbackError = error
    },
    options: { adapter: async () => { throw failure } }
  }).get('/profile'), error => error === failure)

  assert.equal(globalCalls, 0)
  assert.equal(callbackError, failure)
  assert.equal(vm.$errors.status, 500)
  assert.equal(vm.$errors.isUnexpected, true)
  assert.equal(vm.$errors.findBag().items.length, 0)
  assert.equal(vm.$state.running(), false)
})

test('Pre-cancelled Axios requests keep recognizable errors and clear helper loading state', async () => {
  const { vm } = createConsumer()
  const cancellation = axios.CancelToken.source()
  cancellation.cancel('User cancelled the request')
  let callbackError
  let adapterCalls = 0
  vm.$errors.set('name', 'Old validation error')
  const client = vm.$axios({
    state: 'cancelled-request',
    onError (error) { callbackError = error },
    options: {
      adapter: async config => {
        adapterCalls++
        return response(config)
      }
    }
  })

  await assert.rejects(client.get('/profile', { cancelToken: cancellation.token }), error => {
    assert.equal(axios.isCancel(error), true)
    assert.equal(error.message, 'User cancelled the request')
    assert.equal(callbackError, error)
    return true
  })
  assert.equal(adapterCalls, 0)
  assert.equal(vm.$state.running(), false)
  assert.equal(vm.$errors.findBag().items.length, 0)
})

test('State and named error bags remain shared between components on one Vue constructor', () => {
  const { ConsumerVue, vm } = createConsumer()
  const sibling = new ConsumerVue()
  vm.$state.add('save')
  vm.$state.add('save')
  assert.equal(sibling.$state.running('save'), true)
  assert.equal(sibling.$state.items.length, 1)
  sibling.$state.clear('save')
  assert.equal(vm.$state.running(), false)

  vm.$errors.setBag({ email: ['Invalid email'] }, 'registration')
  assert.equal(sibling.$errors.get('email', 'registration'), 'Invalid email')
  assert.equal(sibling.$errors.exists('email'), false)
  sibling.$errors.remove('email', 'registration')
  assert.equal(vm.$errors.exists('email', 'registration'), false)
})

test('FormMixin posts form data, unwraps response data, and calls the consumer hook', async () => {
  const { ConsumerVue } = createConsumer({
    options: {
      adapter: async config => {
        assert.equal(config.url, '/users/9')
        assert.equal(config.method, 'post')
        assert.deepEqual(JSON.parse(config.data), { name: 'Updated', email: 'ada@example.invalid' })
        return response(config, { id: 9, name: 'Updated' })
      }
    }
  })
  let saved
  const vm = new ConsumerVue({
    mixins: [FormMixin],
    methods: {
      formData () { return { name: 'Original', email: '' } },
      action () { return '/users/9' },
      onSuccess (data) {
        saved = data
        return 'saved-' + data.id
      }
    }
  })
  const form = vm.form
  vm.updateFormData({ user: { name: 'Updated', email: 'ada@example.invalid' } })
  assert.equal(vm.form, form)
  assert.equal(await vm.submit(), 'saved-9')
  assert.deepEqual(saved, { id: 9, name: 'Updated' })
  assert.equal(vm.$state.running(), false)
})

test('FormMixin keeps its explicit missing-hook errors', () => {
  assert.throws(() => FormMixin.methods.action(), /No url defined/)
  assert.throws(() => FormMixin.methods.formData(), /No form data structure defined/)
  assert.throws(() => FormMixin.methods.onSuccess({}), /no onSuccess method defined/)
})

test('Modal visibility and FormError rendering work with the Vue 2 SFC compiler', () => {
  const modal = new Vue(source('components/Modal.vue'))
  assert.equal(modal.show, false)
  assert.equal(modal._render().isComment, true)
  modal.open()
  const visible = modal._render()
  assert.equal(visible.tag, 'div')
  assert.equal(visible.children[0].text, 'Modal content')
  modal.close()
  assert.equal(modal._render().isComment, true)

  const { ConsumerVue, vm } = createConsumer()
  vm.$errors.set('email', 'Invalid email', 'account')
  const formError = new ConsumerVue({
    ...source('components/FormError.vue'),
    propsData: { name: 'email', bag: 'account' }
  })
  assert.equal(formError.exists(), true)
  assert.equal(formError.get(), 'Invalid email')
  assert.equal(formError._render().children[0].text, 'Invalid email')
  vm.$errors.clear('account')
  assert.equal(formError._render().isComment, true)
})

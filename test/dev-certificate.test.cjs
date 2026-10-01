'use strict'

const assert = require('node:assert/strict')
const crypto = require('node:crypto')
const { createRequire } = require('node:module')
const { test } = require('node:test')

test('Webpack dev-server selfsigned uses fixed forge and creates valid RSA certificates', () => {
  // Resolve through the real development dependency chain so a hoisted safe
  // forge copy cannot hide an unsafe nested copy used by the dev server.
  const devServerRequire = createRequire(require.resolve('webpack-dev-server/package.json'))
  const selfsignedPath = devServerRequire.resolve('selfsigned')
  const selfsigned = devServerRequire('selfsigned')
  const certificateRequire = createRequire(selfsignedPath)
  const forgeVersion = certificateRequire('node-forge/package.json').version
  assert.ok(require('semver').gte(forgeVersion, '1.4.0'), 'selfsigned must use node-forge >= 1.4.0')

  const pem = selfsigned.generate([{ name: 'commonName', value: 'localhost' }], {
    algorithm: 'sha256',
    keySize: 2048,
    days: 1,
    extensions: [{ name: 'subjectAltName', altNames: [{ type: 2, value: 'localhost' }] }]
  })
  const certificate = new crypto.X509Certificate(pem.cert)
  assert.equal(certificate.checkHost('localhost'), 'localhost')
  assert.equal(certificate.verify(certificate.publicKey), true)
  const payload = Buffer.from('legacy Mix dev-server certificate compatibility')
  const signature = crypto.sign('sha256', payload, pem.private)
  assert.equal(crypto.verify('sha256', payload, certificate.publicKey, signature), true)

  const forge = certificateRequire('node-forge')
  const forgeCertificate = forge.pki.certificateFromPem(pem.cert)
  assert.equal(forgeCertificate.verify(forgeCertificate), true)

  // Independently ensure a corrupted signature fails verification with Node's
  // crypto, rather than trusting only the library that generated the cert.
  const corrupted = Buffer.from(certificate.raw)
  corrupted[corrupted.length - 1] ^= 1
  assert.equal(new crypto.X509Certificate(corrupted).verify(certificate.publicKey), false)
})

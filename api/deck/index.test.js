import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Deck } from '.'

const app = () => express(apiRoot, routes)

let deck

beforeEach(async () => {
  deck = await Deck.create({})
})

test('POST /deck 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('POST /deck 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /deck 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /deck 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /deck/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${deck.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(deck.id)
})

test('GET /deck/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${deck.id}`)
  expect(status).toBe(401)
})

test('GET /deck/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /deck/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${deck.id}`)
    .send({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(deck.id)
})

test('PUT /deck/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${deck.id}`)
  expect(status).toBe(401)
})

test('PUT /deck/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey })
  expect(status).toBe(404)
})

test('DELETE /deck/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${deck.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /deck/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${deck.id}`)
  expect(status).toBe(401)
})

test('DELETE /deck/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

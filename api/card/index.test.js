import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Card } from '.'

const app = () => express(apiRoot, routes)

let card

beforeEach(async () => {
  card = await Card.create({})
})

test('POST /card 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
})

test('POST /card 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /card 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /card 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /card/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${card.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(card.id)
})

test('GET /card/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${card.id}`)
  expect(status).toBe(401)
})

test('GET /card/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /card/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${card.id}`)
    .send({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(card.id)
})

test('PUT /card/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${card.id}`)
  expect(status).toBe(401)
})

test('PUT /card/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey })
  expect(status).toBe(404)
})

test('DELETE /card/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${card.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /card/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${card.id}`)
  expect(status).toBe(401)
})

test('DELETE /card/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

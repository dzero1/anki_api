import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Play } from '.'

const app = () => express(apiRoot, routes)

let play

beforeEach(async () => {
  play = await Play.create({})
})

test('POST /play 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, deck: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.deck).toEqual('test')
})

test('POST /play 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /play 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /play 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /play/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${play.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(play.id)
})

test('GET /play/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${play.id}`)
  expect(status).toBe(401)
})

test('GET /play/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

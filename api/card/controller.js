import { success, notFound } from '../../services/response/'
import { Card } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Card.create(body)
    .then((card) => card.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Card.find(query, select, cursor)
    .then((cards) => cards.map((card) => card.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Card.findById(params.id)
    .then(notFound(res))
    .then((card) => card ? card.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Card.findById(params.id)
    .then(notFound(res))
    .then((card) => card ? Object.assign(card, body).save() : null)
    .then((card) => card ? card.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Card.findById(params.id)
    .then(notFound(res))
    .then((card) => card ? card.remove() : null)
    .then(success(res, 204))
    .catch(next)

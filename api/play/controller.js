import { success, notFound } from '../../services/response/'
import { Play } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Play.create(body)
    .then((play) => play.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Play.find(query, select, cursor)
    .then((plays) => plays.map((play) => play.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Play.findById(params.id)
    .then(notFound(res))
    .then((play) => play ? play.view() : null)
    .then(success(res))
    .catch(next)

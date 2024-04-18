import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show } from './controller'
import { schema } from './model'
export Play, { schema } from './model'

const router = new Router()
const { deck } = schema.tree

/**
 * @api {post} /play Create play
 * @apiName CreatePlay
 * @apiGroup Play
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam deck Play's deck.
 * @apiSuccess {Object} play Play's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Play not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ deck }),
  create)

/**
 * @api {get} /play Retrieve plays
 * @apiName RetrievePlays
 * @apiGroup Play
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} plays List of plays.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /play/:id Retrieve play
 * @apiName RetrievePlay
 * @apiGroup Play
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} play Play's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Play not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

export default router

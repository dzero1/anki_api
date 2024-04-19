import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Card, { schema } from './model'

const router = new Router()
const { deck, front, back } = schema.tree

/**
 * @api {post} /cards Create card
 * @apiName CreateCard
 * @apiGroup Card
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam deck Card's deck.
 * @apiSuccess {Object} card Card's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Card not found.
 * @apiError 401 master access only.
 */
router.post('/',
  token({ required: true }),
  body({ deck, front, back }),
  create)

/**
 * @api {get} /cards Retrieve cards
 * @apiName RetrieveCards
 * @apiGroup Card
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} cards List of cards.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /cards/:id Retrieve card
 * @apiName RetrieveCard
 * @apiGroup Card
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} card Card's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Card not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /cards/:id Update card
 * @apiName UpdateCard
 * @apiGroup Card
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam deck Card's deck.
 * @apiSuccess {Object} card Card's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Card not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ deck, front, back }),
  update)

/**
 * @api {delete} /cards/:id Delete card
 * @apiName DeleteCard
 * @apiGroup Card
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Card not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router

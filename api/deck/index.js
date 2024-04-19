import { Router } from 'express'
import { middleware as body } from 'bodymen'
import { middleware as query } from 'querymen' 
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Deck, { schema } from './model'

const router = new Router()
const { name, description, colors } = schema.tree 

/**
 * @api {post} /deck Create deck
 * @apiName CreateDeck
 * @apiGroup Deck
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} deck Deck's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Deck not found.
 * @apiError 401 master access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, description, colors }),
  create)

/**
 * @api {get} /deck Retrieve decks
 * @apiName RetrieveDecks
 * @apiGroup Deck
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} decks List of decks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /deck/:id Retrieve deck
 * @apiName RetrieveDeck
 * @apiGroup Deck
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} deck Deck's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Deck not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /deck/:id Update deck
 * @apiName UpdateDeck
 * @apiGroup Deck
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} deck Deck's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Deck not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, description, colors }),
  update)

/**
 * @api {delete} /deck/:id Delete deck
 * @apiName DeleteDeck
 * @apiGroup Deck
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Deck not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router

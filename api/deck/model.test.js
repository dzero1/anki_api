import { Deck } from '.'

let deck

beforeEach(async () => {
  deck = await Deck.create({})
})

describe('view', () => {
  it('returns simple view', () => {
    const view = deck.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(deck.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = deck.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(deck.id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

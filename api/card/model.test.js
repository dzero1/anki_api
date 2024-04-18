import { Card } from '.'

let card

beforeEach(async () => {
  card = await Card.create({ deck: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = card.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(card.id)
    expect(view.deck).toBe(card.deck)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = card.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(card.id)
    expect(view.deck).toBe(card.deck)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

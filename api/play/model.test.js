import { Play } from '.'

let play

beforeEach(async () => {
  play = await Play.create({ deck: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = play.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(play.id)
    expect(view.deck).toBe(play.deck)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = play.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(play.id)
    expect(view.deck).toBe(play.deck)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})

import mongoose, { Schema } from 'mongoose'

const deckSchema = new Schema({}, { timestamps: true })

deckSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      description: this.description,
      colors: this.colors,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Deck', deckSchema)

export const schema = model.schema
export default model

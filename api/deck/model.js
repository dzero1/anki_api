import mongoose, { Schema } from 'mongoose'

const deckSchema = new Schema({
  name: {
    type: String,
    index: true,
    trim: true
  },
  description: {
    type: String,
    index: false,
    trim: true
  },
  colors: {
    type: String,
    index: false,
    trim: true
  },
}, { timestamps: true })

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

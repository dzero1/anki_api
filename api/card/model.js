import mongoose, { Schema } from 'mongoose'

const cardSchema = new Schema({
  deck: {
    type: String
  },
  front: {
    type: String,
    index: true,
    trim: true
  },
  back: {
    type: String,
    index: true,
    trim: true
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

cardSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      deck: this.deck,
      front: this.front,
      back: this.back,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Card', cardSchema)

export const schema = model.schema
export default model

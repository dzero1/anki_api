import mongoose, { Schema } from 'mongoose'

const playSchema = new Schema({
  deck: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

playSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      deck: this.deck,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Play', playSchema)

export const schema = model.schema
export default model

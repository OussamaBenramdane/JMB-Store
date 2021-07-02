import mongoose from 'mongoose';

const stockSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    qty: { type: Number, required: true, default: 0 },
    lequdationDate: { type: Date },
    receptionDate: { type: Date },
  },
  {
    timestamps: true,
  }
);
const Stock = mongoose.model('Stock', stockSchema);

export default Stock;

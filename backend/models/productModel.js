import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    image: { type: String },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    reviews: [reviewSchema],
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    composition: {
      EnergyKJ: { type: Number, default: 0 },
      EnergyKcal: { type: Number, default: 0 },
      Fat: { type: Number, default: 0 },
      Acids: { type: Number, default: 0 },
      Carbohydrates: { type: Number, default: 0 },
      Sugars: { type: Number, default: 0 },
      Fiber: { type: Number, default: 0 },
      Protein: { type: Number, default: 0 },
      salt: { type: Number, default: 0 },
    },
    nutriScore: { type: String },
    expDate: { type: Date, required: true },
    prodDate: { type: Date, required: true },
    isPromp: { type: Boolean, required: true, default: true },
    barreCode: {
      origCode: { type: Number, default: 0 },
      fabCode: { type: Number, default: 0 },
      prodCode: { type: Number, default: 0 },
      contrCode: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

export default Product;

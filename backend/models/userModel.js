import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    companyName: { type: String },
    companyAddress: {
      address: { type: String },
      city: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    numSiret: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isProd: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model('User', userSchema);

export default User;

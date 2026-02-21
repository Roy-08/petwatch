import mongoose, { Schema, Document, Model } from "mongoose";

export interface IShelter extends Document {
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  description: string;
  image?: string;
  rating: number;
  totalAdoptions: number;
  isVerified: boolean;
  operatingHours: string;
  createdAt: Date;
  updatedAt: Date;
}

const ShelterSchema = new Schema<IShelter>(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String },
    description: { type: String, required: true },
    image: { type: String },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    totalAdoptions: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: true },
    operatingHours: { type: String, default: "9:00 AM - 6:00 PM" },
  },
  { timestamps: true }
);

const Shelter: Model<IShelter> =
  mongoose.models.Shelter || mongoose.model<IShelter>("Shelter", ShelterSchema);

export default Shelter;
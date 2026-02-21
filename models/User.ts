import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  bio?: string;
  avatar?: string;
  housingType?: string;
  hasYard?: boolean;
  otherPets?: string;
  experience?: string;
  favoritePets: mongoose.Types.ObjectId[];
  isVerified: boolean;
  verificationToken?: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    bio: { type: String },
    avatar: { type: String },
    housingType: { type: String, enum: ["Apartment", "House", "Villa", "Farm", "Other"] },
    hasYard: { type: Boolean, default: false },
    otherPets: { type: String },
    experience: { type: String, enum: ["None", "Beginner", "Intermediate", "Experienced"] },
    favoritePets: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
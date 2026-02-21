import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IPet extends Document {
  name: string;
  type: "Dog" | "Cat" | "Rabbit" | "Bird" | "Hamster" | "Fish" | "Turtle";
  breed: string;
  age: string;
  gender: "Male" | "Female";
  image: string;
  images: string[];
  shelter: Types.ObjectId;
  shelterName: string;
  personality: string[];
  description: string;
  weight?: string;
  color: string;
  vaccinated: boolean;
  neutered: boolean;
  isAdopted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PetSchema = new Schema<IPet>(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["Dog", "Cat", "Rabbit", "Bird", "Hamster", "Fish", "Turtle"],
    },
    breed: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female"] },
    image: { type: String, required: true },
    images: [{ type: String }],
    shelter: { type: Schema.Types.ObjectId, ref: "Shelter", required: true },
    shelterName: { type: String, required: true },
    personality: [{ type: String }],
    description: { type: String, required: true },
    weight: { type: String },
    color: { type: String, required: true },
    vaccinated: { type: Boolean, default: false },
    neutered: { type: Boolean, default: false },
    isAdopted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Pet: Model<IPet> =
  mongoose.models.Pet || mongoose.model<IPet>("Pet", PetSchema);

export default Pet;
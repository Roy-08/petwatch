import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IVisit extends Document {
  user: Types.ObjectId;
  shelter: Types.ObjectId;
  shelterName: string;
  pet?: Types.ObjectId;
  petName?: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const VisitSchema = new Schema<IVisit>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    shelter: { type: Schema.Types.ObjectId, ref: "Shelter", required: true },
    shelterName: { type: String, required: true },
    pet: { type: Schema.Types.ObjectId, ref: "Pet" },
    petName: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

const Visit: Model<IVisit> =
  mongoose.models.Visit || mongoose.model<IVisit>("Visit", VisitSchema);

export default Visit;
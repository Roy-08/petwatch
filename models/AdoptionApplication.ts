import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IAdoptionApplication extends Document {
  user: Types.ObjectId;
  pet: Types.ObjectId;
  shelter: Types.ObjectId;
  petName: string;
  petImage: string;
  shelterName: string;
  status: "pending" | "reviewing" | "approved" | "rejected" | "completed";
  message: string;
  livingArrangement: string;
  hasExperience: boolean;
  reasonForAdoption: string;
  // Document upload fields
  documentType: string;
  documentFileName: string;
  documentFileData: string;
  addressProofType: string;
  addressProofFileName: string;
  addressProofFileData: string;
  fullAddress: string;
  undertakingAccepted: boolean;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdoptionApplicationSchema = new Schema<IAdoptionApplication>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    pet: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
    shelter: { type: Schema.Types.ObjectId, ref: "Shelter", required: true },
    petName: { type: String, required: true },
    petImage: { type: String, required: true },
    shelterName: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "reviewing", "approved", "rejected", "completed"],
      default: "pending",
    },
    message: { type: String, required: true },
    livingArrangement: { type: String, required: true },
    hasExperience: { type: Boolean, default: false },
    reasonForAdoption: { type: String, required: true },
    documentType: { type: String, required: true },
    documentFileName: { type: String, required: true },
    documentFileData: { type: String, required: true },
    addressProofType: { type: String, required: true },
    addressProofFileName: { type: String, required: true },
    addressProofFileData: { type: String, required: true },
    fullAddress: { type: String, required: true },
    undertakingAccepted: { type: Boolean, required: true, default: false },
    applicantName: { type: String, required: true },
    applicantPhone: { type: String, required: true },
    applicantEmail: { type: String, required: true },
    adminNotes: { type: String },
  },
  { timestamps: true }
);

const AdoptionApplication: Model<IAdoptionApplication> =
  mongoose.models.AdoptionApplication ||
  mongoose.model<IAdoptionApplication>("AdoptionApplication", AdoptionApplicationSchema);

export default AdoptionApplication;
import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IMessage extends Document {
  sender: Types.ObjectId;
  senderName: string;
  senderType: "user" | "shelter";
  recipient: Types.ObjectId;
  recipientName: string;
  recipientType: "user" | "shelter";
  subject: string;
  content: string;
  isRead: boolean;
  application?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, required: true },
    senderName: { type: String, required: true },
    senderType: { type: String, enum: ["user", "shelter"], required: true },
    recipient: { type: Schema.Types.ObjectId, required: true },
    recipientName: { type: String, required: true },
    recipientType: { type: String, enum: ["user", "shelter"], required: true },
    subject: { type: String, required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    application: { type: Schema.Types.ObjectId, ref: "AdoptionApplication" },
  },
  { timestamps: true }
);

const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
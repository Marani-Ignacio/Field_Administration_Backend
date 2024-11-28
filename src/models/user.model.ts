import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  name: string;
  lastName: string;
  birthDate: Date;
  email: string;
  dni: number;
  isAdmin: boolean;
  firebaseUid: string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String },
    lastName: { type: String },
    birthDate: { type: Date },
    email: { type: String, unique: true },
    dni: { type: Number, unique: true },
    isAdmin: { type: Boolean, default: false },
    firebaseUid: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<User>("User", UserSchema);

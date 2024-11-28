import mongoose, { Schema, Document } from "mongoose";

interface Field extends Document {
  name: string;
  hectare: number;
  location: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
  ownerId: string;
  seedId: string;
}

const FieldSchema: Schema = new Schema(
  {
    name: { type: String },
    hectare: { type: Number },
    location: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    isActive: { type: Boolean },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    seedId: { type: mongoose.Schema.Types.ObjectId, ref: "Seed" },
  },
  {
    timestamps: true,
  }
);

export const Field = mongoose.model<Field>("Field", FieldSchema);

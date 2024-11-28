import mongoose, { Schema, Document } from "mongoose";

interface Seed extends Document {
  name: string;
  description: string;
  fields: string[];
}

const SeedSchema: Schema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    fields: { type: Array<mongoose.Schema.Types.ObjectId>, ref: "Field" },
  },
  {
    timestamps: true,
  }
);

export const Seed = mongoose.model<Seed>("Seed", SeedSchema);

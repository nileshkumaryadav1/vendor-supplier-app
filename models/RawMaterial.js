import mongoose from "mongoose";

const RawMaterialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  pricePerKg: Number,
  availableQuantity: Number,
  description: String,
  imageUrl: String,
  qualityGrade: { type: String, enum: ["A", "B", "C"], default: "B" },
  location: String,
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.RawMaterial || mongoose.model("RawMaterial", RawMaterialSchema);

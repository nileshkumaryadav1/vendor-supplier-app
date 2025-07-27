import mongoose from "mongoose";

const MaterialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  pricePerKg: Number,
  availableQuantity: Number,
  description: String,
  imageUrl: String,
  qualityGrade: { type: String, enum: ["A", "B", "C"], default: "A" },
  location: String,
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Material || mongoose.model("Material", MaterialSchema);

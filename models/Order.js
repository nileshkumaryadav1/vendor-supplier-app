// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
  quantity: Number,
  totalPrice: Number,
  status: { type: String, default: "pending" }, // pending, accepted, delivered
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);

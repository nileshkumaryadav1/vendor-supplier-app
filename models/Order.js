import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" }, // ✅ Capitalized
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered"],
      default: "Processing",
    },
    location: String,
    paymentMethod: {
      type: String,
      enum: ["Cash", "Online"],
      default: "Cash",
    },
  expectedDeliveryDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);

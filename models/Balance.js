import { Schema, model, models } from "mongoose";

const BalanceSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  currentBalance: Number,
  ammount: Number,
  type: String,
  timestamp: { type: Date, default: new Date().toLocaleString() },
});

const Balance = models.balances || model("balances", BalanceSchema);

export default Balance;

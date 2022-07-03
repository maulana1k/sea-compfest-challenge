import { Schema, model, models } from "mongoose";

const ItemSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "students", required: true },
  name: { type: String, required: true },
  image_url: String,
  description: String,
  price: Number,
  sold: Boolean,
  timestamp: { type: Date, default: new Date().toLocaleString() },
});

const Item = models.items || model("items", ItemSchema);
export default Item;

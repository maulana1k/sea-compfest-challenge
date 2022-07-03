import Item from "../../models/Item";

export default async function (req, res) {
  if (req.method !== "POST") {
    res.status(403).json({ message: "Method not allowed!" });
  }
  try {
    const { author, name, image_url, description, price, sold } = req.body;

    const newItem = new Item({
      author,
      name,
      image_url,
      description,
      price,
      sold,
    });
    const saved = await newItem.save();
    return res.status(200).json(saved);
  } catch (error) {
    res.status(500).json(error);
  }
}

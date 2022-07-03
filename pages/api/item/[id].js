import Item from "../../../models/Item";

export default async function (req, res) {
  try {
    const item = await Item.findById(req.query.id);
    if (!item) {
      res.status(404).json({ message: "Item not found" });
      return;
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json(error);
  }
}

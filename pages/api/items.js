import Item from "../../models/Item";
export default async function (req, res) {
  try {
    const items = await Item.find({ sold: false });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json(err);
  }
}

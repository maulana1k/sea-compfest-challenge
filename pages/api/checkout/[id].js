import Item from "../../../models/Item";

export default async function (req, res) {
  if (req.method != "PUT") {
    return res.status(403).json({ message: "Method not alllowed!" });
  }
  try {
    const item = await Item.findByIdAndUpdate(req.query.id, {
      $set: {
        sold: true,
      },
    });
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json(error);
  }
}

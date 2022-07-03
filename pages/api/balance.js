import Balance from "../../models/Balance";

export default async function (req, res) {
  try {
    if (req.method == "POST") {
      const { user, currentBalance, ammount, type, timestamp } = req.body;
      const newBalance = new Balance({
        user,
        currentBalance,
        ammount,
        type,
        timestamp,
      });
      const saved = await newBalance.save();
      return res.status(200).json(saved);
    } else if (req.method == "GET") {
      const currentBalance = await Balance.find()
        .sort({ timestamp: -1 })
        .limit(1);
      return res.status(200).json(currentBalance[0]);
    } else {
      return res.status(403).json({ message: "Method not allowed!" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

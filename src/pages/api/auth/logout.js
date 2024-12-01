import nookies from "nookies";

export default function handler(req, res) {
  if (req.method === "POST") {
    try {
      nookies.destroy({ res }, "token", { path: "/" });

      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed.`);
  }
}

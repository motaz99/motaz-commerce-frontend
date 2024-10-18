import clientPromise from "../../app/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const db = client.db();

      const allProducts = await db.collection("products").find().toArray();

      if (allProducts.length === 0) {
        throw new Error("No products found");
      }

      res.status(200).json({
        message: "Received Products",
        data: allProducts,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

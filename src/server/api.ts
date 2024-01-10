import express from "express";

const router = express.Router();

// GET products list
router.get("/products", (req, res) => {
  console.log(`/api/products returned 0 product data`);

  res.status(200).json("cool");
});

export default router;

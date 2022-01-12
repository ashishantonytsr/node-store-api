const getAllProductsStatic = async (req, res) => {
  throw new Error("testing async errors");
  res.status(200).json({ success: true, msg: `products testing route` });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ success: true, msg: `products route` });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};

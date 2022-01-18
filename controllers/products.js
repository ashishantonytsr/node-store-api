const Product = require("../models/Product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({price:{$gt: 30}})
	.select('name company price')
	.sort('price')
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields} = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let result = Product.find(queryObject);
	// sort 
	if (sort){
		const sortList = sort.split(',').join(' ')
		result = result.sort(sortList)
	}
	else{
		result = result.sort('createdAt')
	}
	// fields
	if (fields){
		const fieldList = fields.split(',').join(' ')
		result = result.select(fieldList)
	}
	const page = Number(req.query.page) || 1
	const limit = Number(req.query.limit) || 10
	const skip = (page-1) * limit

	const products = await result.limit(limit).skip(skip)
  res.status(200).json({ nbHits: products.length, products  });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};

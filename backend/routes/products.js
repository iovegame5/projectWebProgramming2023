// หน้า Product page 

const express = require("express");
const pool = require("../config");
router = express.Router();

router.get("/products", async function (req, res, next) {
  try {
    const search = req.query.search || ''
    let sql = 'SELECT a.*, b.path_image FROM products AS a LEFT JOIN (SELECT * FROM product_image WHERE main=1) AS b ON a.product_id = b.product_id;'
    let cond = []

    if (search.length > 0) {
      sql = 'SELECT a.*, b.path_image FROM products AS a LEFT JOIN (SELECT * FROM product_image WHERE main=1) AS b ON a.product_id = b.product_id WHERE a.product_name LIKE ? OR a.product_detail LIKE ?;'
      cond = [`%${search}%`, `%${search}%`]
    }
    const [rows, fields] = await pool.query(sql, cond);
    const [rows2, fields2] = await pool.query("Select * from product_type");
    return res.json({products:rows,
                    products_type : rows2});
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get("/products/detail/:id", function (req, res, next) {
    // Query data from 3 tables
    const promise1 = pool.query("SELECT * FROM products WHERE product_id=?", [
      req.params.id,
    ]);
    const promise3 = pool.query("SELECT * FROM product_image WHERE product_id =?", [
      req.params.id,
    ]);
  
    // Use Promise.all() to make sure that all queries are successful
    Promise.all([promise1, promise3])
      .then((results) => {
        const [products, blogFields] = results[0];
        const [images, imageFields] = results[1];
        res.json({
          product: products[0],
          images: images,
          error: null,
        });
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).json(err);
      });
  });
  




exports.router = router;

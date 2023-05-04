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




exports.router = router;

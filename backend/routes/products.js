// หน้า Product page 

const express = require("express");
const pool = require("../config");
router = express.Router();

router.get("/products", async function (req, res, next) {
  try {
    const search = req.query.search || ''
    let sql = 'SELECT a.*, b.path_image, username FROM products AS a LEFT JOIN (SELECT * FROM product_image WHERE main=1) AS b ON a.product_id = b.product_id join users as c using(user_id)'
    let cond = []

    if (search.length > 0) {
      sql = 'SELECT a.*, b.path_image , username FROM products AS a LEFT JOIN (SELECT * FROM product_image WHERE main=1) AS b ON a.product_id = b.product_id join users as c using(user_id) WHERE a.product_name LIKE ? OR a.product_detail LIKE ?;'
      cond = [`%${search}%`, `%${search}%`]
    }
    const [rows, fields] = await pool.query(sql, cond);
    const [rows2, fields2] = await pool.query("Select * from product_type");
    return res.json({
      products: rows,
      products_type: rows2
    });
  } catch (err) {
    return res.status(500).json(err)
  }
});


router.get("/:userid/products", async function (req, res, next) {
  try {

    const [rows, fields] = await pool.query('SELECT a.*, b.path_image, username FROM products AS a LEFT JOIN (SELECT * FROM product_image WHERE main=1) AS b ON a.product_id = b.product_id join users as c using(user_id) where user_id = ?', [req.params.userid]);
    return res.json({
      products: rows,
    });
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get("/products/detail/:id", function (req, res, next) {
  // Query data from 3 tables
  const promise1 = pool.query("SELECT * FROM products join users using(user_id)  WHERE product_id=?", [
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
router.delete("/products/:product_id", async (req, res, next) => {
  const product_id = Number(req.params.product_id);
  try { 
    const[rows1, fields1] = await pool.query('select * from products where product_id = ?', [product_id])
    console.log()
    if(rows1.length == 0){
      return res.status(404).json({message: `There is no product that have id ${product_id}`})
    }
    else{
      await pool.query("DELETE from products where product_id = ?", [product_id])
      return res.status(200).json({message:`remove product id ${product_id} success!`})
    }

  }
  catch (err) {
    console.log(err)
    return res.status(400).json(err.message)
  }

}
)





exports.router = router;

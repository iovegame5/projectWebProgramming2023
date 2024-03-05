// หน้า Product page 
require ('dotenv').config()
const express = require("express");
const pool = require("../config");
const Joi = require('joi')
const path = require("path")
const fs = require("fs");

const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const multer = require("multer");
router = express.Router();


// SET STORAGE
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY
const sessionToken = process.env.AWS_SESSION_TOKEN

const credentials = new aws.Credentials({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  sessionToken:sessionToken,
});

// Set AWS.config with your credentials
aws.config.update({
  credentials: credentials
});

// SET STORAGE
const s3 = new aws.S3();

const storage = multerS3({
  s3: s3,
  bucket: "cloud-project-storage", // Specify your bucket name
  contentType: multerS3.AUTO_CONTENT_TYPE,
  // acl: "public-read", // Access control: public-read or private
  key: function (req, file, cb) {
    cb(null, "products/" + Date.now() + "-" + path.basename(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 },
});

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
    return res.status(500).json(err.message)
  }
});


router.get("/:userid/products", async function (req, res, next) {
  try {

    const [rows, fields] = await pool.query('SELECT a.*, b.path_image, username FROM products AS a LEFT JOIN (SELECT * FROM product_image WHERE main=1) AS b ON a.product_id = b.product_id join users as c using(user_id) where user_id = ?', [req.params.userid]);
    return res.json({
      products: rows,
    });
  } catch (err) {
    return res.status(500).json(err.message)
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
      return res.status(500).json(err.message);
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

router.put('/products/setmain/:productid/:imageid', async(req, res, next) => {

  const productId = Number(req.params.productid)
   
  const imageId = Number(req.params.imageid)

  const [sel] = await pool.query('Select * from product_image where product_image_id=?', [imageId])

  if(sel.length == 0){
    return res.status(400).send({'message': `Don't have product_image_id :${imageId}`})
  }




  console.log(productId)
  console.log(imageId)
  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
      console.log(req.params)
        const [up1] = await conn.query(
          'UPDATE product_image SET main = 0 WHERE product_id =?;', [productId]
          // 'UPDATE `images` SET `main`="0" WHERE `blog_id`=?'[req.params.blogId]
      )
      const [up2] = await conn.query(
         'UPDATE product_image SET main = 1 WHERE product_image_id = ?', [imageId]
          // 'UPDATE images SET main=1 WHERE id=?'[req.params.imageId]
      )
      await conn.commit()
      res.json({ message: 'Change main to ' + imageId })

  } catch (e) {
      await conn.rollback();
      next(e)
  } finally {
      conn.release();
  }

})



router.delete('/image/:imageId', async function (req, res, next) {
    
  const imageid = Number(req.params.imageId)

  const [sel] = await pool.query('Select * from product_image where product_image_id=?', [imageid])

  if(sel.length == 0){
    return res.status(400).send({'message': `Don't have product_image_id :${imageid}`})
  }
 
  console.log(imageid)
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
      // Get Path files from the upload folder
      const [
          images,
          imageFields,] = await conn.query(
          "SELECT path_image FROM product_image WHERE product_image_id = ?",
          [imageid]
      );
      console.log(images[0])

      // Delete File from path
      const appDir = path.dirname(require.main.filename); // Get app root directory
      console.log(appDir)
      const p = path.join(appDir, 'static', images[0].path_image);
      fs.unlinkSync(p);

      // Delete Data from Table images
      const [rows1, fields1] = await conn.query(
          'DELETE FROM product_image WHERE product_image_id = ?', [imageid]
      )

      // commit
      await conn.commit()
      res.json({ message: "Delete image Complete" })
  } catch (error) {
      next(error)
      await conn.rollback();
      // res.status(500).json(error)
  } finally {
      conn.release();
  }
})

// const update = Joi.object({
//   pd_name: Joi.string().required().min(10).max(30),
//   pd_price: Joi.string().required().custom(priceWrong),
//   pd_detail: Joi.string().required().min(30).max(150)
// })

router.put("/update", upload.array("myImage", 5), async function (req, res, next) {
  // Your code here
     

//   try {
//     await update.validateAsync(req.body, { abortEarly: false })
// } catch (err) {
//     return res.status(400).send(err.message)
// }

    const file = req.files;
    let pathArray = [];

    if (!file) {
      return res.status(400).json({ message: "Please upload a file" });
    }
    const pd_name = req.body.pd_name;
    const pd_price = Number(req.body.pd_price);
    const pd_detail = req.body.pd_detail
    const product_id = Number(req.body.pd_id);
    const user_id = Number(req.body.user_id);

    console.log(req.body)

    const [sel] = await pool.query("Select * from users where user_id=?", [user_id])

    if(sel.length == 0){
      return res.status(400).send({'message': `Don't have User_id :${user_id}` })
    }

    const [sel2] = await pool.query("Select * from products where product_id=?",[product_id])

    if(sel2.length == 0){
      return res.status(400).send({'message': `Don't have Product_id :${product_id}` })
    }

  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    
      await conn.query(
      "UPDATE products  SET product_name=?, product_price=?, product_detail=? WHERE product_id=?",
      [pd_name, pd_price, pd_detail, product_id]
    )
    

    if (file.length > 0) {
      req.files.forEach((file, index) => {
        let path = [product_id, file.location, 0, user_id]
        pathArray.push(path)
      })

      console.log(pathArray)
      await conn.query(
        "INSERT INTO product_image(product_id, path_image, main, upload_by_id) VALUES ?;",
        [pathArray]
      );
        
        await conn.commit()
        return res.status(200).send({'message' : "Update Complete"});
    }




  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    console.log('finally')
    conn.release();
  }
  return;
});

router.post("/productcheck/:product_id/:user_id", async (req, res, next) => {
  const product_id = Number(req.params.product_id);
  const user_id = Number(req.params.user_id)
  
  try { 
    const[rows1, fields1] = await pool.query('select * from products where product_id = ?', [product_id])
    
    if(rows1.length == 0){
      return res.status(404).json({message: `There is no product that have id ${product_id}`, check:false})
    }
    else{
      if(rows1[0].user_id == user_id){
        return res.status(200).json({message:`user id : ${user_id} is ownder of product_id : ${rows1[0].product_id}`,
      check:true })
      }
      else{
        return res.status(200).json({message:`user id : ${user_id} is not ownder of product_id : ${rows1[0].product_id}`,
        check:false })
      }

    }

  }
  catch (err) {
    console.log(err)
    return res.status(400).json(err.message)
  }

}
)



exports.router = router;

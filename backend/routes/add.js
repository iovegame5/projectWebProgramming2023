// หน้า Add Product

const express = require("express");
const pool = require("../config");
const path = require("path");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const router = express.Router();
const multer = require("multer");
router.get("/add", (req, res) => {
  res.send("Hello World");
});

// Require multer for file upload

// SET STORAGE
const s3 = new aws.S3();

// old storage

// var storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "./static/uploads/products_img");
//   },
//   filename: function (req, file, callback) {
//     callback(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

var storage = multerS3({
  s3: s3,
  bucket: "cloud-project-storage", // Specify your bucket name
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read", // Access control: public-read or private
  key: function (req, file, cb) {
    cb(null, "uploads/" + Date.now() + "-" + path.basename(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 },
});

// Submit New Product
router.post(
  "/add",
  upload.array("myImage", 5),
  async function (req, res, next) {
    console.log(req.body);
    console.log(req.files);

    const file = req.files;
    if (!file) {
      return res.status(400).json({ message: "Please upload a file" });
    }
    let pathArray = [];

    if (!file) {
      return res.status(400).json({ message: "Please upload a file" });
    }
    const pd_name = req.body.pd_name;
    const pd_type = Number(req.body.pd_type);
    const pd_price = Number(req.body.pd_price);
    const pd_detail = req.body.pd_detail;
    const user_id = Number(req.body.user_id);

    // Begin transaction
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    try {
      let results = await conn.query(
        "INSERT INTO products(user_id, product_name, product_type, product_price, product_detail) " +
          "VALUES(?, ?, ?, ?, ?);",
        [user_id, pd_name, pd_type, pd_price, pd_detail]
      );
      const product_id = results[0].insertId;

      req.files.forEach((file, index) => {
        let path = [
          product_id,
          file.path.substring(6),
          index == 0 ? 1 : 0,
          user_id,
        ];
        pathArray.push(path);
      });
      console.log(pathArray);

      await conn.query(
        "INSERT INTO product_image(product_id, path_image, main, upload_by_id) VALUES ?;",
        [pathArray]
      );

      await conn.commit();
      res.send("Add Product success!");
    } catch (err) {
      await conn.rollback();
      console.log(err);
      return res.status(400).json(err);
    } finally {
      conn.release();
    }
  }
);

router.post('/uploadfile', upload.single('myImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  console.log('File uploaded successfully:', req.file.location);
  res.status(200).send('File uploaded to S3: ' + req.file.location);
});


exports.router = router;

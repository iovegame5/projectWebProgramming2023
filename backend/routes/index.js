// หน้า Home page

const express = require("express");
const pool = require("../config");
router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World')
  })
router.get('/home', (req, res) => {
    res.send('Home')
  })
  



exports.router = router;

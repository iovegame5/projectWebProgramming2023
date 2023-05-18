const express = require("express");
const pool = require("../config");


router = express.Router();

router.post('/favorite/:product_id/:user_id', async(req, res, next) => {
     const product_id = req.params.product_id
     const id = req.params.user_id
     
     const [check] = await pool.query('Select * from favorite where product_id = ? and user_id = ?', [product_id, id])

     console.log(check[0])

     if(check.length != 0){
        return res.send({'message' : 'มีอยู่แล้ว'})
     }

     const start =  await pool.getConnection()
     start.beginTransaction()

     try{
        const [insert] =  await start.query('Insert into favorite(user_id, product_id) Values(?, ?)', [id, product_id])

        

        await start.commit()
        return res.send('เข้า')

     }catch(error){
        await start.rollback()
        console.log(error)
     }finally{
         start.release()
     }
})

router.get('/favorite/:user_id', async(req, res, next) => {
    const id = req.params.user_id

    try{
        const promise1 = await pool.query('SELECT tf.id, tf.product_id, tp.product_name, tp.product_price, tp.product_detail, pi.path_image FROM favorite as tf join products as tp on(tf.product_id = tp.product_id) join product_image as pi on (pi.product_id = tp.product_id) where tf.user_id = ? and  pi.main = 1', [id])

        

        Promise.all([promise1])
        .then((results) => {
          const [favorite, blogFields] = results[0];
          res.json({
            favorites: favorite
            
          });
        })
        .catch((err) => {
          console.log(err)
          return res.status(500).json(err);
        });

    }catch(error){
        console.log(error)
    }
})
router.delete('/favorite/:product_id/:user_id', async(req, res, next ) => {
  const product_id = req.params.product_id
  const  user_id = req.params.user_id

  const [check] = await pool.query('Select * from favorite where product_id = ? and user_id = ?', [product_id, user_id])

  console.log(check[0])

  if(check.length == 0){
    return res.send({'messgae': 'ไม่ไหว'})
  }

  const start = await pool.getConnection()
  start.beginTransaction()

  try{
    const [del] = await pool.query('Delete from favorite where product_id = ? and user_id = ? ', [product_id, user_id])

    await start.commit()

    return res.send({'messgae': 'ลบได้'})

  }catch(error){
    await start.rollback()
    console.log(error)

  }finally{
    start.release()
  }

})
exports.router = router;
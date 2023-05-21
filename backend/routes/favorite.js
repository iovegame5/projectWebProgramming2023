const express = require("express");
const pool = require("../config");


router = express.Router();

router.post('/favorite/:product_id/:user_id', async(req, res, next) => {
     const product_id = req.params.product_id
     const id = req.params.user_id



     const [sel] = await pool.query('Select * from users where user_id=?', [id])
     if(sel.length == 0){
      return res.staus(400).send({'message' :  ` Don't Have User_id :${id}` })
   }


   const [sel2] = await pool.query('Select * from products where product_id=?', [product_id])
   if(sel2.length == 0){
    return res.status(400).send({'message' :  ` Don't Have Product_id :${product_id}` })
 }
  
     const [check] = await pool.query('Select * from favorite where product_id = ? and user_id = ?', [product_id, id])

     console.log(check[0])

     if(check.length != 0){
        return res.status(400).json({'message' : `Have Product_id :${product_id} in your favorite already` })
     }

     const start =  await pool.getConnection()
     start.beginTransaction()

     try{
        const [insert] =  await start.query('Insert into favorite(user_id, product_id) Values(?, ?)', [id, product_id])

        await start.commit()
        return res.status(200).send({'message': "Add Success"})

     }catch(error){
        await start.rollback()
        console.log(error)
     }finally{
         start.release()
     }
})

router.get('/favorite/:user_id', async(req, res, next) => {
    const id = req.params.user_id

    const [sel] = await pool.query('Select * from users where user_id = ? ', [id])

    if(sel.length == 0){
      return res.status(400).send({'message' :  ` Don't Have User_id :${id}` })
   }

    try{
        const promise1 = await pool.query('SELECT tp.user_id as product_owner_id, users.username,tf.id, tf.product_id, tp.product_name, tp.product_price, tp.product_detail, pi.path_image FROM favorite as tf join products as tp on(tf.product_id = tp.product_id) join product_image as pi on (pi.product_id = tp.product_id) join users on (tp.user_id = users.user_id) where tf.user_id = ? and  pi.main = 1', [id])

        

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
    return res.status(400).send({'messgae': `Don't have User_id:${user_id} and Product_id:${product_id}`})
  }

  const start = await pool.getConnection()
  start.beginTransaction()

  try{
    const [del] = await pool.query('Delete from favorite where product_id = ? and user_id = ? ', [product_id, user_id])

    await start.commit()

    return res.status(200).send({'messgae': `'Delete Success `})

  }catch(error){
    await start.rollback()
    console.log(error)

  }finally{
    start.release()
  }

})
exports.router = router;
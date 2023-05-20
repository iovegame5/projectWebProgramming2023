const express = require("express");
const pool = require("../config");
const Joi = require("joi");

router = express.Router();



const checkReport = Joi.object({
    title : Joi.string().required().min(5).max(20).error(new Error ('ต้องกรอก title')),
    report_type : Joi.valid(1, 2).required().error(new Error ('โปรดเลือก')),
    detail : Joi.string().required().min(5).max(100).error(new Error ('ต้องกรอก detail'))
    
})
router.post('/report', async(req, res, next) => {

    const validate = checkReport.validate(req.body)

  if(validate.error){
    return res.status(400).send({"message": validate.error.message});
  }

   id = req.query.user_id
   title = req.body.title
   report_type = req.body.report_type
   detail = req.body.detail

  const start = await pool.getConnection()
  start.beginTransaction()

  try{

    const [insert] = await start.query('Insert into reports(report_by_id, report_title, report_des, report_type, report_date) values(?, ?, ?, ?, CURRENT_TIMESTAMP)', [id, title, detail, report_type])

    console.log(insert[0])

    await start.commit()

    return res.send({'message': 'success'})

  }catch(error){
    await start.rollback()
    console.log(error)
    return res.send({'message': error})

  }finally{
        start.release()
  }

    

})

router.get('/report', async(req, res, next) => {

    const [sel] = await pool.query('Select * from report_type')

    console.log(sel)


    
    return res.json({
            report_type: sel
      });
})


exports.router = router
const express = require("express")
const pool = require("../config")
const Joi = require('joi')
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares');




router = express.Router();

const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}

const usernameValidator = async (value, helpers) => {
    const [rows, _] = await pool.query("SELECT username FROM users WHERE username = ?", [value])
    if (rows.length > 0) {
        const message = 'This username is already taken'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

const signupSchema = Joi.object({
    email: Joi.string().required().email(),
    phone: Joi.string().required().pattern(/0[0-9]{9}/),
    firstname: Joi.string().required().max(150),
    lastname: Joi.string().required().max(150),
    password: Joi.string().required().custom(passwordValidator),
    confirm_password: Joi.string().required().valid(Joi.ref('password')),
    username: Joi.string().required().min(5).max(20).external(usernameValidator),
})

router.post('/signup', async (req, res, next) => {

    console.log(req.body)
    try {
        await signupSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const username = req.body.username
    const password = await bcrypt.hash(req.body.password, 5)
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const phone = req.body.phone


    try {
        await conn.query(
            'INSERT INTO users(username, password, firstname, lastname, email, phone) VALUES (?, ?, ?, ?, ?, ?)',
            [username, password, firstname, lastname, email, phone]
        )
        conn.commit()
        res.status(201).send({ "message": 'ok' })
    } catch (err) {
        conn.rollback()
        res.status(400).json(err);

        console.log(err)
    } finally {
        conn.release()
    }
})

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})


router.post('/user/login', async (req, res, next) => {
    try {
        await loginSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send(err.message)
    }
    const username = req.body.username
    const password = req.body.password

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        // Check if username is correct
        const [users] = await conn.query(
            'SELECT * FROM users WHERE username=?',
            [username]
        )
        const user = users[0]
        if (!user) {
            throw new Error('Incorrect username or password')
        }

        // Check if password is correct
        if (!(await bcrypt.compare(password, user.password))) {
            throw new Error('Incorrect username or password')
        }

        // Check if token already existed
        const [tokens] = await conn.query(
            'SELECT * FROM tokens WHERE user_id=?',
            [user.id]
        )
        let token = tokens[0]?.token
        if (!token) {
            // Generate and save token into database
            token = generateToken()
            await conn.query(
                'INSERT INTO tokens(user_id, token) VALUES (?, ?)',
                [user.user_id, token]
            )
        }

        conn.commit()
        res.status(200).json({ 'token': token })
    } catch (error) {
        conn.rollback()
        res.status(400).json(error.toString())
    } finally {
        conn.release()
    }
})


router.get('/user/me', isLoggedIn, async (req, res, next) => {
    // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"
    res.json(req.user)
})


router.get('/user/:userid', async (req, res, next) => {
    try{
    const [rows1, fields1] = await pool.query('select username, usertype, user_id, phone, firstname, lastname, phone, DATE_FORMAT(join_date, "%d %M %Y") as join_date,email from users where user_id = ?',[req.params.userid])
        if(rows1 != 0 ){
            return res.status(200).json({userinfo:rows1[0]})
        }
        else return res.status(404).json({message:`No user info that have ID:${req.params.userid}`})
      
}
    catch(err){
        console.log(err)
        res.status(400).json(err.message)
    }
})

exports.router = router
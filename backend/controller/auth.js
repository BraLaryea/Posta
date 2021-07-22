const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const dbase = require('../util/database');

function find(email) {
    return dbase.execute(
        'SELECT * FROM users WHERE email = ?', [email]
    )
}

exports.signup = async (req, res, next) => {
    const actUser = await find(req.body.email);
    try {
        if (actUser[0].length > 0) {
            const error = new Error('A user with this email already exists')
            error.statusCode = 401
            throw error
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        dbase.execute(
            'INSERT INTO users (email, password) VALUES (?, ?)', [req.body.email, hashedPassword]
        )
        res.status(201).json({ message: 'User Registered!' });
    } catch (err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const actUser = await find(req.body.email);
        if (actUser[0].length !== 1) {
            const error = new Error('A user with this email does not exist')
            error.statusCode = 401;
            throw error
        }
        const storedUser = actUser[0][0];
        const samePass = await bcrypt.compare(req.body.password, storedUser.password);
        if (!samePass) {
            const error = new Error('Wrong Password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: storedUser.email,
                userId: storedUser.id
            },
            'secretfortoken',
            // { expiresIn: '60s' }
        )
        res.json({ token, userId: storedUser.id, message: 'Welcome ' + storedUser.email })
    } catch (err) {
        next(err)
    }
}

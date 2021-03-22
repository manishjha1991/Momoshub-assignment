const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');
const db = require('_helpers/db');
const bcrypt = require('bcryptjs');
const User = db.User;


module.exports = {
    authenticate,
    getAll,
    getById,
    create
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id ,role: user.role }, config.secret, { expiresIn: '7d' });
        const { hash, ...userWithoutPassword } = user._doc
        return {
            ...userWithoutPassword,
            token
        };
    }
   
}

async function getAll() {
    let users = await User.find();
    return users.map(u => {
        const { hash, ...userWithoutPassword } = u._doc;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = await User.findById(id);
    if (!user) return;
    const { hash, ...userWithoutPassword } = user._doc;
    return userWithoutPassword;
}
async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

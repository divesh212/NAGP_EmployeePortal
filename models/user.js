const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const jwtSecret = process.env.JWT_SECRET;
const UserSchema = new Schema({
    username: String,
    password: String,
    role: { type: String, enum: ['Employee', 'Manager'] }
})

UserSchema.methods.validatePassword = async function(password) {
    const pwdMatches = await bcrypt.compare(password, this.password);
    return pwdMatches;
};

UserSchema.methods.setHashedPassword = async function() {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
};

UserSchema.methods.generateJwtToken = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 1);

    return jwt.sign({
        id: this._id,
        username: this.username,
        isManager: this.role==='Manager',
        //exp: parseInt(expirationDate.getTime() / 1000, 10)
    }, jwtSecret);
};

UserSchema.methods.toAuthJson = function() {
    return {
        username: this.username,
        _id: this._id,
        token: this.generateJwtToken()
    }
};

module.exports = mongoose.model('User', UserSchema);
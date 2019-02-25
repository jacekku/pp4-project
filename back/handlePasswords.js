const crypto = require('crypto')

function genRandomString(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};
function sha512(password, salt){
    let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};
function saltHashPassword(password){
    let salt = genRandomString(50)
    let hashedData = sha512(password,salt)
    return {
        password:hashedData.passwordHash,
        salt:hashedData.salt
    }
}
function checkPassword(password,passwordHash,salt){
    let saltHashNew = sha512(password, salt)
    return saltHashNew.passwordHash == passwordHash
}
function generateToken(){
    return saltHashPassword(genRandomString(50)).password
}
module.exports={
    saltHashPassword,
    checkPassword,
    generateToken
}
import crypto from "crypto-js";

const encryptPassword = (password, salt) => {
    if (!salt) salt = genSalt();
    // console.log('CRYPTO', crypto);
    let enc = crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(crypto.SHA1(password + salt) + salt));
    return {
        pass: enc,
        salt
    }
};

const genSalt = () => {
    let salt = crypto.SHA1(Date.now().toString());
    return salt.toString().substr(salt.toString().length - 12, salt.toString().length - 1);
};

export {
    encryptPassword,
    genSalt
};
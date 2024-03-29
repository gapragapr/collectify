import bcrypt from 'bcrypt'

const hashPassword = (password) => {
    const saltRounds = 10

    return new Promise((resolve, reject) => {
        bcrypt.hash(String(password), saltRounds, function(err, hash) {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
}

export default hashPassword

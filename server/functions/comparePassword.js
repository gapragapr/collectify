import bcrypt from 'bcrypt'

const comparePassword = (password, storedHash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, storedHash, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

export default comparePassword

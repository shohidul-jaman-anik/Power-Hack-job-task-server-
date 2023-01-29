const jwt = require("jsonwebtoken")
const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token =authorization.split(' ')[1];
        const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const {username,userid}=decoded;
        req.username=username;
        req.userid=userid;
        next()
    } catch (error) {
        console.log(error)
       next("Authentication failure")
    }
}

module.exports = checkLogin;

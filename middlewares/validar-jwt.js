const jwt = require('jsonwebtoken');


const validarJWT = (req, res, next) => {

    const token = req.header('x-token')

    if(!token){
        return res.status(404).json({ok: false, msg:'no hay token en la petición'})
    }
    
    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        console.log(uid);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(500).json({ok: false, msg: 'token invalido'})
        
    }
}

module.exports = {
    validarJWT
}
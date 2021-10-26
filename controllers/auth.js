const bcrypt = require('bcryptjs');
const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');

const login = async (req, res = response) =>{
    
    const {email, password} = req.body;
    try {

        //Verificar email
        const usuarioDB = await Usuario.findOne({ email: email})
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Crendenciales no validas'
            })
        }
        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Invalid contraseña'
            })
        }

        //Generar Token
        const token = await generarJWT(usuarioDB.id)

        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false, 
            msg:'error inesperado', 
            error: error})
    }
}

module.exports ={
    login
}
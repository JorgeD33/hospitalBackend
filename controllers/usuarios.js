const usuario = require('../models/usuario');
const Usuario = require('../models/usuario');
const { response } = require('express');
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {
    //estados del http --> res.status(400).

    const usuario = await Usuario.find();
        res.json({
            ok: true,
            usuario, 
            uid: req.uid
        })
    }

    const crearUsuarios = async (req, res = response) => {
        console.log(req.body);
        const {email, password, nombre} = req.body;

        

        try {
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({ok: false, msg: 'Email already exists'})
            }

            const usuario = new Usuario(req.body);
            // encriptar password
            const salt = bcrypt.genSaltSync();
            usuario.password = bcrypt.hashSync(password, salt)

            //guardar usuario
            const usuarioCreado = await usuario.save();
            const token = await generarJWT(usuarioCreado.id)
            //estados del http --> res.status(400).
                res.json({
                    ok: true,
                    usuario: usuarioCreado,
                    token
                });
        }
            
        catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'error inesperado'
            });
            
        }
    }

    const actualizarUsuario = async (req, res = response) => {
        
        const uid = req.params.id;
        
        try {

            const usuarioDB = await usuario.findById(uid);
            if(!usuarioDB){
                return res.status(400).json({
                    ok: false, 
                    msg: 'No existe un usuario con ese ID'
                })
            }

            const {password, google, email, ...campos} = req.body;
            if(usuarioDB.email !== email){
                const existeEmail = await Usuario.findOne({email});
                if(existeEmail){
                    return res.status(400).json({ok: false, msg:'Email ya existe en otro registro.'})
                }
            }
            campos.email = email;
            //actualizar Usuario
            const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true})

            //TODO: validar token y comprobar si es el usuario correcto.

            res.json({
                ok: true,
                usuario: usuarioActualizado

            })
            
        } catch (error) {   
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: 'error inesperado'
            })

            
        }
    }

    const borrarUsuario = async (req, res = response) => {

        const uid = req.params.id;
        try {
            const usuarioDB = await usuario.findById(uid);
            if(!usuarioDB){
                return res.status(404).json({
                    ok: false, 
                    msg: 'No existe un usuario con ese ID'
                })
            }
            await Usuario.findByIdAndDelete(uid);

            return res.status(200).json({ok:true, msg: 'Usuario Eliminado'})

        } catch (error) {
            console.log(error)
            res.status(500).json({ok:false, msg: 'Hable con el Admin'})
        }

    }
       
        


    

    module.exports = {
        getUsuarios,
        crearUsuarios,
        actualizarUsuario,
        borrarUsuario
    }
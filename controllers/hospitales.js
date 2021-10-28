
const Hospital = require('../models/hospital');
const { response } = require('express');
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt');



const getHospitales = async(req, res) => {
    //estados del http --> res.status(400).

    const hospitales = await Hospital.find().populate('usuario', 'nombre')
    res.json({
        ok: true,   
       hospitales
    })
}

    const crearHospitales = async (req, res = response) => {
        console.log(req.body);
        const uid = req.uid
        const hospital = new Hospital({
            usuario: uid,
            ...req.body
        })
       

        

        

        try {
            // const existeEmail = await Usuario.findOne({email});
            // if(existeEmail){
            //     return res.status(400).json({ok: false, msg: 'Email already exists'})
            // }

            // const usuario = new Usuario(req.body);
            // // encriptar password
            // const salt = bcrypt.genSaltSync();
            // usuario.password = bcrypt.hashSync(password, salt)

            //guardar usuario
           const hospitalDB = await hospital.save();
            
            //estados del http --> res.status(400).
                res.json({
                    ok: true,
                    hospital: hospitalDB
                    
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

    const actualizarHospital = async (req, res = response) => {
        
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

    const borrarHospital = async (req, res = response) => {

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
        getHospitales,
        crearHospitales,
        actualizarHospital,
        borrarHospital
    }
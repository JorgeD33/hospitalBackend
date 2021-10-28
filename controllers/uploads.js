const {response} = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const cargarArchivo = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValiodos = ['hospitales', 'medicos', 'usuarios'];
    //Validar tipo
    if(!tiposValiodos.includes(tipo)){
        return res.status(400).json({
            ok: false, msg: 'No es un medico, usuario o hospital'
        })
    }

    //Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ ok: false, msg: 'No files were uploaded.'});
    }

    //Procesar imagen

    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if(!extensionesValidas.includes(extension)){
        return res.status(400).json({
            ok: false, msg: 'Extensión No Valida'
        })
    }

    //Generar nombre unico para imagen
    const nombreArchivo = `${uuidv4()}.${extension}`;

    //Path para guardar imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, (err) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'error al mover el archivo'
            });
        }
    
       
      });



      actualizarImagen(tipo, id, nombreArchivo);


    res.json({ok: true, msg:'Archivo Subido', nombreArchivo})
}

const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    //imagen por defecto
    if(fs.existsSync(pathImg)){
        
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname, `../uploads/noimagen.png`);
        res.sendFile(pathImg);
    }
}

module.exports = {
    cargarArchivo,
    retornaImagen
};
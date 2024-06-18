const { response, request } = require('express')
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

/**
 * Funcion que permite crear un usuario en base de datos
 * @param {*} req objeto request de la peticion
 * @param {*} res objeto response de la peticion
 * @returns respuesta con status 201 en caso de guardar al usuario.
 */
const crearUsuario = async (req = request, res = response) => {
    const { email, name, password } = req.body;
    try {
        // Verificar el email
        const usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario ya existe con ese email"
            });
        }
        // Crear usuario con el modelo
        const dbUsuario = new Usuario(req.body);
        // Hashear la password
        const salt = bcrypt.genSaltSync();
        dbUsuario.password = bcrypt.hashSync(password, salt);
        // Generar el JWT
        const token = await generarJWT(dbUsuario.id, name);
        // Crear usuario en DB
        await dbUsuario.save();
        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUsuario.id,
            name,
            email: dbUsuario.email,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Por favor hable con el administrador',
        })
    }
}

/**
 * Funcion que permite hacer login a los usuarios.
 * @param {*} req objeto request de la peticion
 * @param {*} res objeto response de la peticion
 * @returns respuesta con status 200 en caso de que se haga login correctamente.
 */
const login = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: "El correo no existe"
            });
        }
        // Confirmar si el password hace match
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "El password no es valido"
            });
        }
        // Generar el JWT
        const token = await generarJWT(usuarioDB.id, usuarioDB.name);
        // Respuesta del servicio
        return res.json({
            ok: true,
            uid: usuarioDB.id,
            name: usuarioDB.name,
            email: usuarioDB.email,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

/**
 * Funcion que sirve para validar token del usuario
 * @param {*} req objeto request de la peticion
 * @param {*} res objeto response de la peticion
 * @returns respuesta con status 200 en caso de que el token sea validado correctamente. 
 */
const revalidarToken = async (req = request, res = response) => {

    const { uid } = req;

    // Leer la base de datos
    const usuarioDB = await Usuario.findById(uid);
    
    // Generar el JWT
    const token = await generarJWT(uid, usuarioDB.name);

    return res.json({
        ok: true,
        uid,
        name: usuarioDB.name,
        email: usuarioDB.email,
        token
    })
}



module.exports = {
    crearUsuario,
    login,
    revalidarToken
}
const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async(req, res = response) => {
    
    const eventos = await Evento.find().populate('user','name')   

    return res.json({
        ok:true,
        eventos
    })
}

const crearEvento = async(req, res = response) => {
    
    // Verificar el evento
    const evento = new Evento( req.body );
    try {
        evento.user = req.uid
        const eventoGuardado = await evento.save()
        return res.json({
            ok:true,
            evento:eventoGuardado
        })
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Hable con el administrador',
        });
    }
    
}

const actualizarEvento = async(req, res = response) => {
    const {uid, params} = req

    try {
        const evento = await Evento.findById( params.id );
        
        if( !evento){
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }

        if( evento.user.toString() != uid ){
            return res.status(401).json({
                ok:false,
                msg:'No esta autorizado para actualizar el evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user:uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( params.id, nuevoEvento, {new:true} )

        return res.json({
            ok:true,
            evento:eventoActualizado
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'Hable con el administrador',
        });
    }
}

const eliminarEvento = async(req, res = response) => {
    const {uid, params} = req

    try {
        const evento = await Evento.findById( params.id );

        if( !evento){
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }

        if( evento.user.toString() != uid ){
            return res.status(401).json({
                ok:false,
                msg:'No esta autorizado para eliminar el evento'
            })
        }

        await Evento.findByIdAndDelete( params.id )

        return res.json({
            ok:true,
            msg:'Evento eliminado correctamente'
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'Hable con el administrador',
        });
    }

}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
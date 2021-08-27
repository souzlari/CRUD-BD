const mongoose = require("mongoose")
const Estudio = require("../models/estudio")

const getAll = async (req, res ) => {  //assincrono
    const estudios = await Estudio.find()
    res.status(200).json(estudios)
}

const createStudio = async (req, res) => {
    const estudio = new Estudio({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        criadoEm: req.body.criadoEm
    })


    const estudioJaExiste = await Estudio.findOne({ nome: req.body.nome})
    if(estudioJaExiste){
        return res.status(409).json({ error: "Estudio já existe."})
    }

    try{
      const novoEstudio = await estudio.save()
      res.status(201).json(novoEstudio)
    } catch (err){
       res.status(404).json({ "message": err.message})
    }
}

const deleteEstudio = async (req, res) => { 
    const idStudio = req.params.id

    const estudioValido = await Estudio.findOne({ _id: idStudio})
    if(!estudioValido) {
        res.status(404).json({ "message": "Não há estudio com esse id" })
    }
    else{
      try{
            Estudio.remove({ _id:idStudio} , function (err){
                if(!err) {
                    res.status(200).json( "Estudio deletado com sucesso.")
                }
                else{
                    res.status(400).json({ message: err.message })
                }
            })
        }
        catch (err){
            res.status(400).json({ message: err.message })
        }
    }

}

const updateEstudio = async (req, res) => { 
    try{
        const estudio =  await Estudio.findById(req.params.id)
        if(estudio == null){
            return res.status(404).json({ message: "Estudio não encontrado."})
        }

         if( req.body.nome != null) {
            estudio.nome = req.body.nome
        }
        const estudioAtualizado = await estudio.save()
        res.status(200).json(estudioAtualizado)
    }
    catch (err) {
        res.status(500).json({ message: err.message})
    }
}

module.exports = {
    getAll,
    createStudio,
    deleteEstudio,
    updateEstudio
}
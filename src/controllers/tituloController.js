const mongoose = require("mongoose")
const Titulo = require("../models/titulo")

const getAll = async (req, res) => {
    const titulos = await Titulo.find().populate("estudio")
    res.status(200).json(titulos)
}

const getAllPixar = async (req, res) => {
    const titulos = await Titulo.find().populate("estudio")
    const filteredTitulo = titulos.filter( titulo => titulo.estudio.nome == "Pixar")
    res.status(200).json(filteredTitulo)
}

const getAllMarvel = async (req, res) => {
    const titulos = await Titulo.find().populate("estudio")
    const filteredTitulo = titulos.filter( titulo => titulo.estudio.nome == "Marvel")
    res.status(200).json(filteredTitulo)
}

const getAllGhibli = async (req, res) => {
    const titulos = await Titulo.find().populate("estudio")
    const filteredTitulo = titulos.filter( titulo => titulo.estudio.nome == "Ghibli")
    res.status(200).json(filteredTitulo)
}

const createTitulo = async(req,res) => {
    const titulo = new Titulo({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    genero: req.body.genero,
    descricao: req.body.descricao,
    estudio: req.body.estudio,
    criadoEm: req.body.criadoEm
 })
    const tituloJaExiste = await Titulo.findOne({ nome: req.body.nome})
    if(tituloJaExiste){
        return res.status(409).json({ error: "Titulo já existe."})
    }
    try{
        const novoTitulo = await titulo.save()
        res.status(201).json(novoTitulo)
    } catch(err) {
        res.status(404).json({ message: err.message})
    }
}

const deleteTitulo = async (req, res) => {
    const idTitulo = req.params.id 
    const tituloValido = await Titulo.findOne({ _id: idTitulo})
    if(!tituloValido) {
        res.status(404).json({ message: "Não há titulo com esse id." })
    }
    else{
        try{
            Titulo.remove({ _id:idTitulo} , function (err){
                if(!err){
                    res.status(200).json( "Titulo deletado com sucesso.")
                }
                else{
                    res.status(400).json({ message: err.message })
                }
            })
        }catch (err){
            res.status(500).json({ message: err.message })
        }
    }
}

const updateTitulo = async (req, res) => {
    try{
        const titulo =  await Titulo.findById(req.params.id)
        if(titulo == null){
            return res.status(404).json({ message: "Titulo não encontrado."})
        }

        if( req.body.nome != null) {
            titulo.nome = req.body.nome
        }
        if( req.body.genero != null){
            titulo.genero = req.body.genero
        }
        if( req.body.descricao != null){
            titulo.descricao = req.body.descricao
        }

        const tituloAtualizado = await titulo.save()
        res.status(200).json(tituloAtualizado)
    }
    catch (err) {
        res.status(500).json({ message: err.message})
    }
}

module.exports  = {
    getAll,
    getAllPixar,
    getAllMarvel,
    getAllGhibli,
    createTitulo,
    deleteTitulo,
    updateTitulo
}
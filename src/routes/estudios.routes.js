const express = require("express")
const router = express.Router()
const controller = require("../controller/estudioController")

//GET - listar todos os studios 
router.get("/", controller.getAll) 

//CREATE - criar um studio 
router.post("/create", controller.createStudio)

//DELETE - deletar um studio por id  
router.delete("/:id", controller.deleteEstudio) 

//PATCH - atualizar qualquer dado do studio por id  
router.patch("/update/:id", controller.updateEstudio)

module.exports = router
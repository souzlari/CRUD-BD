const express = require("express")
const router = express.Router()
const controller = require("../controller/tituloController")

router.get("/", controller.getAll)

router.get("/pixar", controller.getAllPixar)

router.get("/marvel", controller.getAllMarvel)

router.get("/ghibli", controller.getAllGhibli)

router.post("/create", controller.createTitulo)

router.delete("/:id", controller.deleteTitulo)

router.patch("/update/:id", controller.updateTitulo)

module.exports = router
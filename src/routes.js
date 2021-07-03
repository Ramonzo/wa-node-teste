const express = require("express");
const routes = express.Router();
//CONTROLLERS
const LabController = require("./app/controllers/labController");
const ExamController = require("./app/controllers/examController");
//ROOT
routes.get("/", function (req, res) {
    return res.status(200).send({error: '', message: 'Hellow World!'});
});
//LABs
routes.get("/lab", LabController.index);
routes.post("/lab", LabController.get);
routes.post("/lab/register", LabController.store);
routes.delete("/lab/remove", LabController.delete);
routes.post("/lab/restore", LabController.restore);
routes.put("/lab/update", LabController.update);
//EXAMs
routes.get("/exam", ExamController.index);
routes.post("/exam", ExamController.get);
routes.post("/exam/register", ExamController.store);
routes.delete("/exam/remove", ExamController.delete);
routes.post("/exam/restore", ExamController.restore);
routes.put("/exam/update", ExamController.update);
routes.put("/exam/associate", ExamController.associate);
routes.put("/exam/desassociate", ExamController.desassociate);
routes.get("/exam/search/labs", ExamController.searchLab);
//
module.exports = routes;

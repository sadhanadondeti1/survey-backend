module.exports = app => {
    const survey = require("../controllers/survey.controller.js");
    
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", survey.create);
    // Retrieve all Tutorials
   // Retrieve a single Tutorial with id
  router.get("/:id", survey.findOne);
   // Retrieve all Tutorials
   router.get("/", survey.findAll);
   router.put("/:id", survey.update);
   router.delete("/:id", survey.delete);
  
   router.delete("/", survey.deleteAll);
    app.use('/api/surveys+', router);
  };
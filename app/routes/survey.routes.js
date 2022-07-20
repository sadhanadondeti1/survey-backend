module.exports = app => {
    const survey = require("../controllers/survey.controller.js");
    
    var router = require("express").Router();
    // Create a new survey
    router.post("/", survey.create);
    // Retrieve all surveys
   // Retrieve a single survey with id
  router.get("/:id", survey.findOne);
   // Retrieve all surveys
   router.get("/", survey.findAll);
   router.put("/:id", survey.update);
   router.delete("/:id", survey.delete);
  
   router.delete("/", survey.deleteAll);
   router.post("/responses", survey.createSurveyResponse);
   router.get("/responses/0/getAllResponses", survey.findAllSurveyResponses);

   router.get("/responses/:id", survey.findOneSurveyResponse);
   // Retrieve all surveys
   router.put("/responses/:id", survey.updateSurveyResponse);
   router.delete("/responses/:id", survey.deleteSurveyResponse);
  
   router.delete("/responses/", survey.deleteAllSurveyResponses);
   app.use('/api/surveys+', router);
  };
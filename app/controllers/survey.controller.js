const db = require("../models");
const Survey = db.survey;
const SurveyResponse = db.survey_responses;
const Op = db.Sequelize.Op;
const fs = require("fs");
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.query.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Tutorial
    const survey = {
      name: req.query.name,
      createdBy: req.query.createdBy,
      json:req.body,
    };
    // Save survey in the database
    Survey.create(survey)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the survey."
        });
      });
  };
  exports.findOne = (req, res) => {
    const id = req.params.id;
    Survey.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find survey with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving survey with id=" + id
        });
      });
  };

  // Retrieve all surveys from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Survey.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving surveys."
      });
    });
};
// Update a survey by the id in the request
exports.update = (req, res) => {

  const survey = {
    name: req.query.name!=undefined ? req.query.name:null,
    createdBy: req.query.createdBy!=undefined ? req.query.createdBy:null,
    json:req.body!=undefined? req.body:null,  
  };
  const id = req.params.id;
  Survey.update(survey, {
    where: { id: id } 
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Survey was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Survey with id=${id}. Maybe Survey was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Survey with id=" + id
      });
    });
};
// Delete a Survey with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Survey.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Survey was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Survey with id=${id}. Maybe Survey was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Survey with id=" + id
      });
    });
};
// Delete all surveys from the database.
exports.deleteAll = (req, res) => {
  Survey.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Surveys were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all surveys."
      });
    });
};
exports.createSurveyResponse = (req, res) => {
  // Validate request
  if (!req.query.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a surveyresponse
  const surveyresponse = {
    name: req.query.name,
    surveyId: req.query.surveyId,
    respondedBy: req.query.respondedBy,
    json:req.body,
  };
  // Save survey response in the database
  SurveyResponse.create(surveyresponse)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the survey response."
      });
    });
};
exports.findOneSurveyResponse = (req, res) => {
  const id = req.params.id;
  SurveyResponse.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find survey response with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving survey response with id=" + id
      });
    });
};

// Retrieve all surveys from the database.
exports.findAllSurveyResponses = (req, res) => {
const name = req.query.name;
var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
SurveyResponse.findAll({ where: condition })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving survey responses."
    });
  });
};
// Update a survey by the id in the request
exports.updateSurveyResponse = (req, res) => {

const surveyresponse = {
  name: req.query.name,
  surveyId: req.query.surveyId,
  respondedBy: req.query.respondedBy,
  json:req.body,
};
const id = req.params.id;
SurveyResponse.update(surveyresponse, {
  where: { id: id } 
})
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Survey Response was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Survey Response with id=${id}. Maybe Survey Response was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Survey Response with id=" + id
    });
  });
};
// Delete a Survey response with the specified id in the request
exports.deleteSurveyResponse = (req, res) => {
const id = req.params.id;
SurveyResponse.destroy({
  where: { id: id }
})
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Survey Response was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Survey response with id=${id}. Maybe Survey response was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Survey response with id=" + id
    });
  });
};
// Delete all survey responses from the database.
exports.deleteAllSurveyResponses = (req, res) => {
SurveyResponse.destroy({
  where: {},
  truncate: false
})
  .then(nums => {
    res.send({ message: `${nums} Survey responses were deleted successfully!` });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all survey responses."
    });
  });
};
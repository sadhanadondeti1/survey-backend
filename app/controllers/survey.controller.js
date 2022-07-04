const db = require("../models");
const Survey = db.survey;
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
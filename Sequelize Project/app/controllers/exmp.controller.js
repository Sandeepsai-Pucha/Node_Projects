const dataBase = require('../models');
const Student = dataBase.students;
const Option = dataBase.Sequelize.Op;

// Creation of New Student

exports.create = (request, response) => {
  
  // Validating request
  if (!request.body.name) {
    response.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create Student Details

  const students = {
    name: request.body.name,
    roll_num: request.body.roll_num,
    age: request.body.age,
    address: request.body.address
  };

  // Save Student in the database
  Student.create(students)
    .then(data => {
      response.send(data);
    })
    .catch(error => {
      response.status(500).send({
        message:
          error.message || "Some error occurred while creating the Student Details."
      });
    });
};

// Getting All Student Details 

exports.findAll = (request, response) => {
    const name = request.query.name;
    let condition = name ? { name: { [Option.like]: `%${title}%` } } : null;
  
    Student.findAll({ where: condition })
      .then(data => {
        response.send(data);
      })
      .catch(error => {
        response.status(500).send({
          message:
            error.message || "Some error occurred while retrieving students details."
        });
      });
};

// Getting Student Details Based on Id

exports.findOne = (request, response) => {
    const id = request.params.id;
  
    Student.findByPk(id)
      .then(data => {
        if (data) {
          response.send(data);
        } else {
          response.status(404).send({
            message: `Cannot find Student with id: ${id}.`
          });
        }
      })
      .catch(error => {
        response.status(500).send({
          message: 
            error.message || "Error retrieving Student with id:" + id
        });
      });
};

// Updating Student Details Based on Id 

exports.update = (request, response) => {
    const id = request.params.id;
  
    Student.update(request.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          response.send({
            message: "Student Details was updated successfully."
          });
        } else {
          response.send({
            message: `Cannot update Student with id ${id}. Maybe Student was not found or requestuestuest.body is empty!`
          });
        }
      })
      .catch(error => {
        response.status(500).send({
          message: 
            error.message || "Error updating Student with id: " + id
        });
      });
  };

  // Deleting Student Details based on ID

  exports.delete = (request, response) => {
    const id = request.params.id;
  
    Student.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          response.send({
            message: "Student Details was deleted successfully!"
          });
        } else {
          response.send({
            message: `Cannot delete Student with id ${id}. Maybe Student was not found!`
          });
        }
      })
      .catch(err => {
        response.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };

  // Delete All Students Details 

  exports.deleteAll = (request, response) => {
    Student.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        response.send({ message: `${nums} Students were deleted successfully!` });
      })
      .catch(error => {
        response.status(500).send({
          message:
            error.message || "Some error occurred while removing all students details."
        });
      });
  };
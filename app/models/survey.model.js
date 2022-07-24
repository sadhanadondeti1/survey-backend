module.exports = (sequelize, Sequelize) => {
   
    const Survey = sequelize.define("survey", {
       
      name: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      json: {
        type: Sequelize.TEXT,
       // defaultValue: ‘[]’, //because we wanted an array of arrays
        get() {
          return (
            JSON.parse(this.getDataValue('json'))
          )
        },
        set(value) {
          this.setDataValue('json', JSON.stringify(value))
        }
      },
     
     

    });
  
    return Survey;
  };
  
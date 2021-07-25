module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      created_at:{
        type:timestamp
      },
      updated_at:{
        type:timestamp
      }
    });
  
    return Role;
  };
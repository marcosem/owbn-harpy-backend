module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('positions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Position ID',
      },
      poisition_en: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
        comment: 'Position name in English',
      },
      position_pt: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
        comment: 'Position name in Portuguese',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('positions');
  },
};

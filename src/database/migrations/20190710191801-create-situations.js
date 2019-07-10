module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('situations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Situation ID',
      },
      situation_en: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
        comment: 'Situation in English',
      },
      situation_pt: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
        comment: 'Situation in Portuguese',
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
    return queryInterface.dropTable('situations');
  },
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('status', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Status ID',
      },
      title_en: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
        comment: 'Title in English',
      },
      title_pt: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
        comment: 'Title in Portuguese',
      },
      isNegative: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Is this a negative Status?',
      },
      notes: {
        type: Sequelize.STRING,
        comment: 'Notes about this title',
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
    return queryInterface.dropTable('status');
  },
};

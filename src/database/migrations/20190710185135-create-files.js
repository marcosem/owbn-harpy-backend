module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('files', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: 'File ID',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'File name',
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'File full path',
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
    return queryInterface.dropTable('files');
  },
};

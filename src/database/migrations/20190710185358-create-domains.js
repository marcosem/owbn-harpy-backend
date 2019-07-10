module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('domains', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Domain ID',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'Domain name',
      },
      main_city: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        comment: 'Main city',
      },
      picture: {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
        field: 'domain_picture',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
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
    return queryInterface.dropTable('domains');
  },
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('status_position', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Status-Position ID',
      },
      position_id: {
        type: Sequelize.INTEGER,
        references: { model: 'positions', key: 'id' },
        field: 'position_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        comment: 'Position ID',
      },
      status_id: {
        type: Sequelize.INTEGER,
        references: { model: 'status', key: 'id' },
        field: 'status_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        comment: 'Status ID',
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
    return queryInterface.dropTable('status_position');
  },
};

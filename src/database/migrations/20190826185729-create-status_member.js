module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('status_member', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Status-Member ID',
      },
      member_id: {
        type: Sequelize.INTEGER,
        references: { model: 'members', key: 'id' },
        field: 'member_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        comment: 'Member ID',
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
      giver: {
        type: Sequelize.STRING(200),
        allowNull: true,
        comment: 'Status Giver and Position',
      },
      reason: {
        type: Sequelize.STRING(250),
        allowNull: true,
        comment: 'Status Reason',
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'When this status was granted?',
      },
      is_removed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        comment: 'Is this status removed?',
      },
      date_removed: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: 'When this status was removed?',
      },
      reason_removed: {
        type: Sequelize.STRING(250),
        allowNull: true,
        comment: 'Why this status was removed?',
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
    return queryInterface.dropTable('status_member');
  },
};

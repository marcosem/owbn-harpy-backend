module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('logins', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Login ID',
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Login',
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: 'User email',
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Crypted password',
      },
      is_st: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Is this a storyteller login?',
      },
      member_id: {
        type: Sequelize.INTEGER,
        references: { model: 'members', key: 'id' },
        field: 'member_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
        defaultValue: null,
        comment: 'Member Id, if not a ST',
      },
      domain_id: {
        type: Sequelize.INTEGER,
        references: { model: 'domains', key: 'id' },
        field: 'domain_id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
        comment: 'Domain',
      },
      super_user: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Am I a super user?',
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
    return queryInterface.dropTable('logins');
  },
};

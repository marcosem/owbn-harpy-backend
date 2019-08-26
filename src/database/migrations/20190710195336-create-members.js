module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('members', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Member ID',
      },
      kindred_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: 'Kindred name',
      },
      mortal_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: 'Mortal name, if known',
      },
      genre: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Genre: 1 - male; 2 - female; null - unknown',
      },
      clan_id: {
        type: Sequelize.INTEGER,
        references: { model: 'clans', key: 'id' },
        field: 'clan_id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
        comment: 'Clan, if known',
      },
      sire_id: {
        type: Sequelize.INTEGER,
        references: { model: 'members', key: 'id' },
        field: 'sire_id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
        comment: 'Sire, if known',
      },
      position_id: {
        type: Sequelize.INTEGER,
        references: { model: 'positions', key: 'id' },
        field: 'position_id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
        comment: 'Position, if any',
      },
      situation_id: {
        type: Sequelize.INTEGER,
        references: { model: 'situations', key: 'id' },
        field: 'situation_id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
        comment: 'Situation',
      },
      domain_id: {
        type: Sequelize.INTEGER,
        references: { model: 'domains', key: 'id' },
        field: 'domain_id',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
        comment: 'Domain, if any',
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'email',
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Notes about the member',
      },
      picture: {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
        field: 'member_picture',
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
    return queryInterface.dropTable('members');
  },
};

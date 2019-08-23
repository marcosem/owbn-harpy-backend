module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('clans', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: 'Clan ID',
      },
      clan_en: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
        comment: 'Clan name in English',
      },
      clan_pt: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
        comment: 'Clan name in Portuguese',
      },
      clan_short_name_en: {
        type: Sequelize.STRING(30),
        allowNull: true,
        unique: false,
        comment: 'Clan short name in English',
      },
      clan_short_name_pt: {
        type: Sequelize.STRING(30),
        allowNull: true,
        unique: false,
        comment: 'Clan short name in Portuguese',
      },
      clan_logo: {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
        field: 'clan_logo',
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
    return queryInterface.dropTable('clans');
  },
};

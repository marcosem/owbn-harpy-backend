module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'situations',
      [
        {
          situation_en: 'Active',
          situation_pt: 'Ativo',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          situation_en: 'Unknown',
          situation_pt: 'Desconhecida',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          situation_en: 'Destroyed',
          situation_pt: 'Destruído',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          situation_en: 'Torpor',
          situation_pt: 'Torpor',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          situation_en: 'Staked',
          situation_pt: 'Estacado',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          situation_en: 'Inactive',
          situation_pt: 'Inativo',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('situations', null, {});
  },
};

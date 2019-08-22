module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'positions',
      [
        {
          position_en: 'Justicar',
          position_pt: 'Justicar',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_en: 'Alastor',
          position_pt: 'Alastor',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_en: 'Archon',
          position_pt: 'Arconte',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_en: 'Harridan',
          position_pt: 'Harridan',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_en: 'Fury',
          position_pt: 'Fúria',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_en: 'Prince',
          position_pt: 'Príncipe',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_en: 'Seneschal',
          position_pt: 'Senescal',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_en: 'Harpy',
          position_pt: 'Harpia',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_en: 'Primogen',
          position_pt: 'Primogênito',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_en: 'Keeper of Elysium',
          position_pt: 'Guardião do Elísio',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_en: 'Sheriff',
          position_pt: 'Xerife',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_en: 'Scourge',
          position_pt: 'Algoz',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_en: 'Consul',
          position_pt: 'Cônsul',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_en: 'Whip',
          position_pt: 'Chicote',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_en: 'Steward',
          position_pt: 'Comissário',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_en: 'Deputy',
          position_pt: 'Delegado',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_en: 'Hound',
          position_pt: 'Cão de Caça',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_en: 'Lesser Harpy',
          position_pt: 'Harpia Menor',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_en: 'Servire',
          position_pt: 'Servire',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('positions', null, {});
  },
};

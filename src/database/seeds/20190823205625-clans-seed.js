module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'clans',
      [
        {
          clan_en: 'Assamite',
          clan_pt: 'Assamita',
          clan_short_name_en: '',
          clan_short_name_pt: '',
          clan_logo: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          clan_en: 'Brujah',
          clan_pt: 'Brujah',
          clan_short_name_en: '',
          clan_short_name_pt: '',
          clan_logo: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          clan_en: 'Daughter of Cacophony',
          clan_pt: 'Filha da Cacofonia',
          clan_short_name_en: '',
          clan_short_name_pt: '',
          clan_logo: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          clan_en: 'Follower of Set',
          clan_pt: 'Seguidor de Set',
          clan_short_name_en: 'Setite',
          clan_short_name_pt: 'Setita',
          clan_logo: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          clan_en: 'Gangrel',
          clan_pt: 'Gangrel',
          clan_short_name_en: '',
          clan_short_name_pt: '',
          clan_logo: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          clan_en: 'Giovanni',
          clan_pt: 'Giovanni',
          clan_short_name_en: '',
          clan_short_name_pt: '',
          clan_logo: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          clan_en: 'Lasombra Antitribu',
          clan_pt: 'Lasombra Antitribu',
          clan_short_name_en: 'Lasombra AT',
          clan_short_name_pt: 'Lasombra AT',
          clan_logo: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          clan_en: 'Malkavian',
          clan_pt: 'Malkavian',
          clan_short_name_en: '',
          clan_short_name_pt: '',
          clan_logo: 8,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          clan_en: 'Nosferatu',
          clan_pt: 'Nosferatu',
          clan_short_name_en: '',
          clan_short_name_pt: '',
          clan_logo: 9,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          clan_en: 'Ravnos',
          clan_pt: 'Ravnos',
          clan_short_name_en: '',
          clan_short_name_pt: '',
          clan_logo: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          clan_en: 'Samedi',
          clan_pt: 'Samedi',
          clan_short_name_en: '',
          clan_short_name_pt: '',
          clan_logo: 11,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          clan_en: 'Toreador',
          clan_pt: 'Toreador',
          clan_short_name_en: '',
          clan_short_name_pt: '',
          clan_logo: 12,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          clan_en: 'Tremere',
          clan_pt: 'Tremere',
          clan_short_name_en: '',
          clan_short_name_pt: '',
          clan_logo: 13,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          clan_en: 'Ventrue',
          clan_pt: 'Ventrue',
          clan_short_name_en: '',
          clan_short_name_pt: '',
          clan_logo: 14,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          clan_en: 'Caitiff',
          clan_pt: 'Caitiff',
          clan_short_name_en: '',
          clan_short_name_pt: '',
          clan_logo: 15,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('clans', null, {});
  },
};

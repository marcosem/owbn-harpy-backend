module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'files',
      [
        {
          name: 'assamita.png',
          type: 'clan',
          path: '8fb23a7d4a5cfb74266af460f5309d4a.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'brujah.png',
          type: 'clan',
          path: 'ee9bdd219a4795040cfa817adf923a71.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'daughter_of_cacophony.png',
          type: 'clan',
          path: 'a3849d1cdc15f21f9466a59af5668d22.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'follower_of_set.png',
          type: 'clan',
          path: '359af0bf0611bf8fe0b6f10d424365d0.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'gangrel.png',
          type: 'clan',
          path: '740f075c90244696393c1e376c1eb7b5.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'giovanni.png',
          type: 'clan',
          path: 'd72b7a7703cd7b9b286cc0fce80083c4.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'lasombra_at.png',
          type: 'clan',
          path: '227a6e8c3599b2acc2e9de15ac025e48.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'malkavian.png',
          type: 'clan',
          path: 'b58d14f5b7433ce189a26d08df3dd3e5.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'nosferatu.png',
          type: 'clan',
          path: '7a1c175d048482a9b23ea2c9f95996aa.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'ravnos.png',
          type: 'clan',
          path: '2df418733739f4327073827d870fc77a.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'samedi.png',
          type: 'clan',
          path: '079da0295688eb7079cdbdc98b9ff001.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'toreador.png',
          type: 'clan',
          path: '541f498b4ee9ef2a52e9149a4ce4371a.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'tremere.png',
          type: 'clan',
          path: 'f6860f75e80617d18d8281e8865b07a5.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'ventrue.png',
          type: 'clan',
          path: 'fe6fd558a0e891fc1b4f13a4a36a86cb.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Caitiff.png',
          type: 'clan',
          path: 'fb0cdae575f85b355e1c72c60714e0b0.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'city-night_1325-128.jpg',
          type: 'domain',
          path: 'de76d31e33375a3a71185f790ae192e5.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'female_kindred.jpg',
          type: 'member',
          path: '8496fb51a06dbc71739cf783c1517981.jpg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'male_kindred.jpg',
          type: 'member',
          path: '8bb47ac37a592e3543a29ea8b7b6055a.jpg',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('files', null, {});
  },
};

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'status_position',
      [
        {
          position_id: 6,
          status_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 6,
          status_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 6,
          status_id: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 6,
          status_id: 41,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 2,
          status_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 2,
          status_id: 29,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 3,
          status_id: 28,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 3,
          status_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 3,
          status_id: 23,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 13,
          status_id: 59,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 5,
          status_id: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 5,
          status_id: 19,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 5,
          status_id: 28,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 8,
          status_id: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 8,
          status_id: 19,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 4,
          status_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 4,
          status_id: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 4,
          status_id: 19,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 4,
          status_id: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 1,
          status_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 1,
          status_id: 40,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 1,
          status_id: 16,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 1,
          status_id: 17,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 1,
          status_id: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 10,
          status_id: 12,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 9,
          status_id: 8,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 12,
          status_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 7,
          status_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 7,
          status_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 7,
          status_id: 18,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          position_id: 11,
          status_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('status_position', null, {});
  },
};

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "John Doe",
          email: "john@email.com",
          id: 1,
          role: "admin",
          createdAt: "2022-05-29T19:00:15.490Z",
          updatedAt: "2022-05-29T19:00:15.490Z",
        },
        {
          name: "Jane Doe",
          email: "jane@email.com",
          id: 2,
          role: "admin",
          createdAt: "2022-05-29T19:00:15.490Z",
          updatedAt: "2022-05-29T19:00:15.490Z",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};

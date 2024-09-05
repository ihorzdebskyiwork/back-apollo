const fruitService = require("../services/fruit.service");
const { userRoles, ...userService } = require("../services/user.service");
const accessService = require("../services/access.service");

module.exports = {
  Query: {
    async login(_, { loginUserInput }) {
      return userService.login(loginUserInput);
    },
    async fruit(_, { id }, { headers }) {
      await accessService.access(headers?.authorization, [
        userRoles.VEGETERIANMARY,
      ]);
      return fruitService.getFruit(id);
    },
    async fruits(_, __, { headers }) {
      await accessService.access(headers?.authorization, []);
      return fruitService.getAllFruits();
    },
  },
  Mutation: {
    async createUser(_, { createUserInput }) {
      console.log(createUserInput);
      return userService.createUser(createUserInput);
    },
    async createFruit(_, { createFruitInput }, { headers }) {
      await accessService.access(headers?.authorization, []);
      return fruitService.createFruit(createFruitInput);
    },

    async removeFruit(_, { id }, { headers }) {
      await accessService.access(headers?.authorization, [
        userRoles.VEGETERIANMARY,
      ]);
      return fruitService.removeFruit(id);
    },

    async updateFruit(_, { id, updateFruitInput }, { headers }) {
      await accessService.access(headers?.authorization, [
        userRoles.VEGETERIANMARY,
      ]);
      return fruitService.updateFruit(id, updateFruitInput);
    },
  },
};

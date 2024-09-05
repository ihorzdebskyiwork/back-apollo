const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: String!
    name: String!
    role: String!
    accessToken: String!
  }

  type Fruit {
    id: String!
    name: String!
    price: Float!
  }

  type Query {
    fruit(id: String!): Fruit!
    fruits: [Fruit!]!
    login(loginUserInput: LoginUserInput!): User!
  }

  input LoginUserInput {
    name: String!
    password: String!
  }

  input CreateFruitInput {
    name: String!
    price: Float!
  }

  input UpdateFruitInput {
    name: String
    price: Float
  }

  input CreateUserInput {
    name: String!
    role: String!
    password: String!
  }

  type Mutation {
    createFruit(createFruitInput: CreateFruitInput!): Fruit!
    updateFruit(id: String!, updateFruitInput: UpdateFruitInput!): Fruit!
    removeFruit(id: String!): String!
    createUser(createUserInput: CreateUserInput!): User!
  }
`;

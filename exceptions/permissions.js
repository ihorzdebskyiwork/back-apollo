const { GraphQLError } = require("graphql");

const permissionErrors = {
  UNAUTHORIZED: new GraphQLError("Unauthorized.", {
    extensions: {
      code: 401,
    },
  }),
  FORBIDDEN: new GraphQLError("Forbiden.", {
    extensions: {
      code: 403,
    },
  }),
  INVALIDCREDS: new GraphQLError("Invalid credentials", {
    extensions: {
      code: 403,
    },
  }),
  USEREXISTS: new GraphQLError("Such user already exists", {
    extensions: {
      code: 422,
    },
  }),
};

module.exports = permissionErrors;

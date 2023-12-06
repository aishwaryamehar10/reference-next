//my utilities

import { GraphQLClient } from "graphql-request"; //for making graphql request this library is used

const hasuraEndPoint = process.env.HASURA_ENDPOINT ?? "";
const hasuraSecretKey = process.env.HASURA_SECRET_KEY ?? "";

const graphqlClient = new GraphQLClient(hasuraEndPoint, {
  headers: {
    "Content-type": "application/json",
    //In the context of Hasura's GraphQL API and many other APIs, the token is often referred to as a "Bearer token." It's a security best practice to use such tokens with the Bearer type in the Authorization header to authenticate and authorize requests.
    Authorization: `Bearer ${hasuraSecretKey}`,
  },
});

export default graphqlClient;

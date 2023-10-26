const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');
require('dotenv').config();

const typeDefs = gql`
  type Locality {
    category: String
    id: Int
    latitude: Float
    location: String
    longitude: Float
    postcode: Int
    state: String
  }

  type Localities {
    locality: [Locality]
  }

  type Query {
    getLocalities(q: String, state: String): Localities
  }
`;

const resolvers = {
  Query: {
    getLocalities: async (_: any, { q }: { q: string }) => {
      try {
        const customHeaders = {
          'auth-key': process.env.AUSPOST_AUTH_KEY,
          Accept: '*/*',
          'Accept-Encoding': 'gzip, deflate, br',
        };
        const response = await axios.get(
          `https://digitalapi.auspost.com.au/postcode/search.json?q=${q}`,
          {
            headers: customHeaders,
          }
        );
        return response.data.localities;
      } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀 Server ready at ${url}`);
});

import { gql } from '@apollo/client';

export const GET_LOCALITIES = gql`
  query GetLocalities($q: String) {
    getLocalities(q: $q) {
      locality {
        postcode
        state
      }
    }
  }
`;

import { graphql } from '../composables/gql/gql';

export const STATE_QUERY = graphql(`
    query ServerState {
        array {
            state
        }
        shares {
            free
            used
        }
    }
`);

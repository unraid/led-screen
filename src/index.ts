import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { createApolloClient } from "./client";
import { STATE_QUERY } from "./graphql/array.query";


let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const getArrayStateAndUpdateScreen = async () => {
  // Poll every 5 seconds to the API and get the state of the API + other state

  if (apolloClient) {
    const queryResult = await apolloClient.query({
      query: STATE_QUERY, 
    });

    console.log(queryResult.data.array);
    // Mutate LED Screen State Here Based On QueryResult
  } else {
    apolloClient = await createApolloClient();
  }

  await new Promise((resolve) => setTimeout(resolve, 5000));
  await getArrayStateAndUpdateScreen();
}

const main = async () => {
    await getArrayStateAndUpdateScreen();
}


main();
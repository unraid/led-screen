import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client/core';
import { getConfig } from './config';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { execSync } from 'child_process';

interface ApiKey {
    id: string
    key: string
    name: string
}


let apiKey;
const getApiKey = async (): Promise<string> => {
    // Check if API Key exists
try {
    const result = execSync('unraid-api key get --id "gridstack-helper"');
    // @todo Validate key is actually present here
     apiKey = result;
    return result.toString();
} catch (e) {
    // Create API Key with Exec to unraid-api binary
    execSync(
      'unraid-api key create --name "Gridstack Helper" --id "gridstack-helper"'
    );
}


export const createApolloClient = async () => {
    return  new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        headers: {
            'api-key': await getApiKey()
        },
        uri: '/var/run/unraid-api.sock',
    }),
    });
};

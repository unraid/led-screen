import { readFile, writeFile } from "fs/promises";

type ConfigFile = {
    apiKeyPath: string;
}

let loadedConfig: ConfigFile | null = null;

export const getConfig = async (): Promise<ConfigFile> => {
    if (loadedConfig) {
        return loadedConfig;
    }

    const configDirectory = __dirname + '/config.json';
    const config = await readFile(configDirectory, 'utf-8');
    if (config) {
        return JSON.parse(config);
    }
    await writeFile(configDirectory, JSON.stringify({}));
    return {
        apiKeyPath: ''
    };

}

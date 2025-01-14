import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  documents: ["./**/**/*.ts"],
  ignoreNoDocuments: true,
  config: {
    namingConvention: {
      typeNames: "./fix-array-type.js",
    },
    scalars: {
      DateTime: "string",
      Long: "number",
      JSON: "string",
      URL: "URL",
      Port: "number",
      UUID: "string",
    },
  },
  generates: {
    "src/composables/gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
      schema: [
        {
          "http://localhost:3001/graphql": {
            headers: {
              origin: "/var/run/unraid-php.sock",
            },
          },
        },
      ],
      plugins: [
        {
          add: {
            content: "/* eslint-disable */",
          },
        },
      ],
    },
  },
};

export default config;

import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'https://docs.pretalx.org/schema.yml',
  output: {
    path: 'loaders/pretalx/oapi',
  },
  plugins: ['@hey-api/client-fetch'],
})

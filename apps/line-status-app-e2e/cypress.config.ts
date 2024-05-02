import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run line-status-app:serve',
        production: 'nx run line-status-app:preview',
      },
      ciWebServerCommand: 'nx run line-status-app:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});

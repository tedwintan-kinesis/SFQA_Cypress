const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'auyzcr', // Ties your local codebase to the online dashboard
  e2e: {
    setupNodeEvents(on, config) {
      // your event listeners
    },
  },
});

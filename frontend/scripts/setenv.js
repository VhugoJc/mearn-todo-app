const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load from single .env file

// Get environment variables (CLI env vars take precedence over .env file)
const apiUrl = process.env.API_URL || process.env.BACKEND_URL || 'http://localhost:3000/api';
const production = process.env.NODE_ENV === 'production';

// Create environment configuration
const envConfig = `export const environment = {
  production: ${production},
  apiUrl: '${apiUrl}'
};
`;

// Determine which TypeScript environment file to update
const targetEnvFile = production 
  ? path.join(__dirname, '../src/environments/environment.prod.ts')
  : path.join(__dirname, '../src/environments/environment.ts');

// Write the environment file
fs.writeFileSync(targetEnvFile, envConfig);

console.log(`Environment file updated: ${targetEnvFile}`);
console.log(`API URL: ${apiUrl}`);
console.log(`Production: ${production}`);

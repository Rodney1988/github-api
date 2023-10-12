const env = process.env.NODE_ENV;
let baseUrl = '';

if (env === 'development') {
  baseUrl = 'http://localhost:5001/github-api-317c6/us-central1/nodeApi';
} else if (env === 'production') {
  baseUrl = '';
}

export { baseUrl };

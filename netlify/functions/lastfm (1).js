// Netlify Serverless Function - Last.fm API Proxy
// This keeps the API key secure on the server-side

const https = require('https');

exports.handler = async (event, context) => {
  // CORS headers for all responses
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle OPTIONS request (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    console.log('[Last.fm] Method not allowed:', event.httpMethod);
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { method, params } = JSON.parse(event.body);
    
    // Get API key from environment variable
    const API_KEY = process.env.LASTFM_API_KEY;
    
    if (!API_KEY) {
      console.error('[Last.fm] API key not configured in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }

    // Build Last.fm API URL
    const queryParams = new URLSearchParams({
      method: method,
      api_key: API_KEY,
      format: 'json',
      ...params
    });

    const apiUrl = `https://ws.audioscrobbler.com/2.0/?${queryParams.toString()}`;
    
    console.log('[Last.fm] Request:', method, 'Artist:', params.artist || params.album || 'N/A');

    // Make HTTP request using native https module (always available)
    const data = await new Promise((resolve, reject) => {
      https.get(apiUrl, (res) => {
        let body = '';
        
        res.on('data', (chunk) => {
          body += chunk;
        });
        
        res.on('end', () => {
          try {
            const json = JSON.parse(body);
            resolve(json);
          } catch (e) {
            reject(new Error('Invalid JSON from Last.fm'));
          }
        });
      }).on('error', (err) => {
        reject(err);
      });
    });

    console.log('[Last.fm] Success');

    // Return response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('[Last.fm] Error:', error.message);
    console.error('[Last.fm] Stack:', error.stack);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};

// Netlify Serverless Function - Last.fm API Proxy
// This keeps the API key secure on the server-side

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
      console.error('[Last.fm] API key not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }

    // Build Last.fm API URL
    const url = new URL('https://ws.audioscrobbler.com/2.0/');
    url.searchParams.append('method', method);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('format', 'json');
    
    // Add additional params
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, value);
    }

    console.log('[Last.fm] Request:', method, params.artist || params.album);

    // Fetch from Last.fm - using native fetch (Node 18+) or global fetch
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      console.error('[Last.fm] Response not OK:', response.status);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: 'Last.fm API error', status: response.status })
      };
    }

    const data = await response.json();

    // Return response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('[Last.fm] Error:', error.message, error.stack);
    
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

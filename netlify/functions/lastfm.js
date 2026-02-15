// Netlify Serverless Function - Last.fm API Proxy
// This keeps the API key secure on the server-side

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { method, params } = JSON.parse(event.body);
    
    // Get API key from environment variable
    const API_KEY = process.env.LASTFM_API_KEY;
    
    if (!API_KEY) {
      return {
        statusCode: 500,
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

    console.log('[Last.fm Proxy] Request:', method, params);

    // Fetch from Last.fm
    const response = await fetch(url.toString());
    const data = await response.json();

    // Return response with CORS headers
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('[Last.fm Proxy] Error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};

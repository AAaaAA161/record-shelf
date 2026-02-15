// Netlify Function - Save Albums to Blob Storage
const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { albums } = JSON.parse(event.body);
    
    if (!albums || !Array.isArray(albums)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid data: albums array required' })
      };
    }

    // Get credentials from environment variables
    const siteID = process.env.NETLIFY_SITE_ID;
    const token = process.env.NETLIFY_FUNCTIONS_TOKEN;
    
    if (!siteID || !token) {
      console.error('[Save Albums] Missing credentials:', {
        hasSiteID: !!siteID,
        hasToken: !!token
      });
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Blobs credentials not configured' })
      };
    }

    console.log('[Save Albums] Creating store with credentials...');
    
    // Create store with explicit credentials from env
    const store = getStore({
      name: 'album-data',
      siteID: siteID,
      token: token
    });
    
    console.log('[Save Albums] Saving', albums.length, 'albums...');
    
    // Save albums as JSON
    await store.setJSON('albums.json', {
      albums: albums,
      savedAt: new Date().toISOString(),
      count: albums.length
    });

    console.log('[Save Albums] ✅ Saved', albums.length, 'albums to blob storage');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        count: albums.length,
        savedAt: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('[Save Albums] ❌ Error:', error.message);
    console.error('[Save Albums] Stack:', error.stack);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to save albums',
        message: error.message
      })
    };
  }
};

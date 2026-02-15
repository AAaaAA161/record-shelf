// Netlify Function - Load Albums from Blob Storage
const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow GET
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get Netlify Blob store with explicit context
    // WICHTIG: siteID und token aus context übergeben!
    const store = getStore({
      name: 'album-data',
      siteID: context.site?.id,
      token: context.token
    });
    
    console.log('[Load Albums] Loading from blob storage...');
    
    // Load albums from blob
    const data = await store.get('albums.json', { type: 'json' });

    if (!data) {
      // No data saved yet
      console.log('[Load Albums] ℹ️  No data found in blob storage');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          albums: null,
          message: 'No data found'
        })
      };
    }

    console.log('[Load Albums] ✅ Loaded', data.albums?.length || 0, 'albums from blob storage');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        albums: data.albums,
        savedAt: data.savedAt,
        count: data.count
      })
    };

  } catch (error) {
    console.error('[Load Albums] ❌ Error:', error.message);
    console.error('[Load Albums] Stack:', error.stack);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to load albums',
        message: error.message
      })
    };
  }
};

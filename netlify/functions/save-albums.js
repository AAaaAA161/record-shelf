// Netlify Function - Save Albums (DEBUG VERSION)
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
    // DEBUG: Log everything about context
    console.log('[DEBUG] === CONTEXT DEBUG ===');
    console.log('[DEBUG] context keys:', Object.keys(context || {}));
    console.log('[DEBUG] context.site:', context.site);
    console.log('[DEBUG] context.token:', context.token ? 'EXISTS' : 'MISSING');
    console.log('[DEBUG] process.env.NETLIFY_BLOBS_CONTEXT:', process.env.NETLIFY_BLOBS_CONTEXT);
    console.log('[DEBUG] process.env keys:', Object.keys(process.env).filter(k => k.includes('NETLIFY')));
    
    const { albums } = JSON.parse(event.body);
    
    if (!albums || !Array.isArray(albums)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid data: albums array required' })
      };
    }

    console.log('[Save Albums] Attempting to create store...');
    
    // Try without any parameters first - should auto-detect
    const store = getStore('album-data');
    
    console.log('[Save Albums] Store created, saving', albums.length, 'albums...');
    
    // Save albums as JSON
    await store.setJSON('albums.json', {
      albums: albums,
      savedAt: new Date().toISOString(),
      count: albums.length
    });

    console.log('[Save Albums] ✅ SUCCESS! Saved', albums.length, 'albums');

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
    console.error('[Save Albums] Error name:', error.name);
    console.error('[Save Albums] Stack:', error.stack);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to save albums',
        message: error.message,
        errorName: error.name
      })
    };
  }
};

// Simple test endpoint to verify API functionality

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Log request details
    console.log('Test API called:', {
        method: req.method,
        body: req.body,
        headers: req.headers
    });

    try {
        // Test fetch capability
        const fetch = require('node-fetch');

        // Try to fetch a simple endpoint
        const testUrl = 'https://jsonplaceholder.typicode.com/todos/1';
        const response = await fetch(testUrl);
        const data = await response.json();

        return res.status(200).json({
            success: true,
            message: 'Test API is working',
            fetchTest: 'Fetch is working',
            testData: data,
            requestBody: req.body
        });
    } catch (error) {
        console.error('Test API error:', error);
        return res.status(500).json({
            success: false,
            error: error.message,
            stack: error.stack
        });
    }
};
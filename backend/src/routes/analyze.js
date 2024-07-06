const express = require('express');
const axios = require('axios');
const router = express.Router();

const projectId = 'motivedesign';
const location = 'us-central1';
const modelId = 'gemini-1.5-pro-001';
const apiKey = 'AIzaSyBg2VEmjaLN-g8FqzUjzE9MjSps8Pimq8I';

async function fetchImageAsBase64(imageUrl) {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    return `data:image/jpeg;base64,${base64}`;
}

async function analyzeDesign(data) {
    try {
        const apiUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${modelId}:generateContent`;

        const imageData = await fetchImageAsBase64(data.image_url);

        const payload = {
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: data.text || '' },
                        { inlineData: { mimeType: 'image/jpeg', data: imageData.split(',')[1] } }
                    ]
                }
            ],
            generation_config: {
                temperature: 0.7,
                topP: 0.9,
                topK: 40,
                maxOutputTokens: 100
            }
        };

        const response = await axios.post(apiUrl, payload, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error calling Gemini API:', error.response ? error.response.data : error.message);
        throw error;
    }
}

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const result = await analyzeDesign(data);
        res.json(result);
    } catch (error) {
        console.error('Internal Server Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

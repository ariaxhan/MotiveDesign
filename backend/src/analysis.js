const vision = require('@google-cloud/vision');
const language = require('@google-cloud/language');
const config = require('./config');

const visionClient = new vision.ImageAnnotatorClient({ keyFilename: 'path-to-your-service-account-file.json' });
const languageClient = new language.LanguageServiceClient({ keyFilename: 'path-to-your-service-account-file.json' });

async function analyzeDesign(data) {
    // Image analysis
    const [visionResult] = await visionClient.faceDetection(data.image_url);
    const faces = visionResult.faceAnnotations;

    // Text analysis
    const document = {
        content: data.text,
        type: 'PLAIN_TEXT',
    };
    const [languageResult] = await languageClient.analyzeSentiment({ document });

    const result = {
        color_analysis: "neutral",
        image_emotion: faces[0] ? faces[0].joyLikelihood : "unknown",
        text_sentiment: languageResult.documentSentiment.score
    };

    return result;
}

module.exports = { analyzeDesign };

import React, { useState } from 'react';
import ColorAnalysis from './components/ColorAnalysis';
import ImageAnalysis from './components/ImageAnalysis';
import TextAnalysis from './components/TextAnalysis';
import RealTimeFeedback from './components/RealTimeFeedback';
import { analyzeDesign } from './api';
import './App.css';

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const designData = { image_url: imageUrl, text: text };
    try {
      const result = await analyzeDesign(designData);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing design:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="App">
        <h1>Design Analyzer</h1>
        <div>
          <input
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
          />
          <textarea
              placeholder="Enter text for analysis"
              value={text}
              onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleAnalyze} disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze Design'}
          </button>
        </div>
        {analysis && (
            <div>
              <ColorAnalysis colorScore={analysis.color_analysis} />
              <ImageAnalysis imageScore={analysis.image_emotion} />
              <TextAnalysis textScore={analysis.text_sentiment} />
              <RealTimeFeedback feedback={analysis.feedback} />
            </div>
        )}
      </div>
  );
};

export default App;

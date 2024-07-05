import axios from 'axios';

const API_URL = 'http://localhost:3000/api/analyze';

export const analyzeDesign = async (designData) => {
    try {
        const response = await axios.post(API_URL, designData);
        return response.data;
    } catch (error) {
        console.error('Error analyzing design:', error);
        throw error;
    }
};

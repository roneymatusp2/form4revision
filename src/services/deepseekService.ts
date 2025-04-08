const DEEPSEEK_API_KEY = process.env.REACT_APP_DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1';

export const deepseekService = {
    async generateResponse(prompt: string) {
        try {
            const response = await fetch(`${DEEPSEEK_API_URL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'deepseek-chat',
                    messages: [{ role: 'user', content: prompt }]
                })
            });

            if (!response.ok) {
                throw new Error(`DeepSeek API error: ${response.statusText}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Error calling DeepSeek API:', error);
            throw error;
        }
    }
}; 
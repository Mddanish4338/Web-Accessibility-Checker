const axios = require('axios');

class OpenAIService {
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY;
    this.apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
  }

  async generateAccessibilityReport(issues, summary, url) {
    try {
      const prompt = this.buildPrompt(issues, summary, url);
      
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'openai/gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an expert web accessibility consultant. Generate detailed, helpful reports about website accessibility issues with specific solutions.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating report with OpenAI:', error);
      throw new Error(`Failed to generate report: ${error.message}`);
    }
  }

  buildPrompt(issues, summary, url) {
    return `
Generate a comprehensive web accessibility report for ${url}.

Here is a summary of the issues found:
- Total issues: ${summary.totalIssues}
- Critical: ${summary.critical}
- High: ${summary.high}
- Medium: ${summary.medium}
- Low: ${summary.low}

Here are the specific issues found:
${JSON.stringify(issues, null, 2)}

Please generate a detailed report that includes:
1. An executive summary of the accessibility status
2. Breakdown of issues by category and severity
3. Specific recommendations for fixing each issue with code examples
4. Best practices for maintaining accessibility
5. Potential impact of these issues on users with disabilities

Format the response in clear, well-structured markdown that would be appropriate for a professional report.
`;
  }
}

module.exports = OpenAIService;
import axios from 'axios';

export async function rewriteWithLLM(original, references) {
  const prompt = `
Rewrite the following article to improve clarity, structure, and depth.

Original Article:
${original}

Reference Articles:
${references.map(r => r.content).join('\n\n')}

Guidelines:
- Do not copy verbatim
- Improve formatting
- Maintain original intent
- Return plain text
`;

  const res = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );

  return res.data.choices[0].message.content;
}

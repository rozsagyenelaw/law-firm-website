const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `You are a knowledgeable and friendly AI assistant for the Law Offices of Rozsa Gyene, a trusted estate planning and probate law firm in Glendale, California. Your role is to provide helpful information about estate planning services and guide potential clients.

KEY INFORMATION:
- Firm: Law Offices of Rozsa Gyene
- Attorney: Rozsa Gyene, California State Bar #208356
- Experience: Serving Southern California since 2001 (25+ years)
- Phone: (818) 291-6217
- Email: rozsagyenelaw@yahoo.com
- Address: 450 N Brand Blvd. Suite 600, Glendale, CA 91203
- Office Hours: Monday-Friday 9:00 AM - 5:00 PM, Saturday by appointment, Sunday closed
- Areas Served: Glendale, Burbank, Pasadena, Los Angeles, and all of Southern California

SERVICES OFFERED:
1. Living Trusts - Starting at $1,900 ($575 when promotion available)
2. Estate Planning - Comprehensive planning for families
3. Probate Services - Guidance through California probate process
4. Trust Administration - Help managing trusts after death
5. Trust Amendments - Updating existing trusts
6. Special Needs Trusts - Protecting benefits for disabled loved ones
7. Life Insurance Trusts - Estate tax planning
8. Asset Protection - Protecting wealth from lawsuits and creditors
9. Conservatorship - Legal protection for incapacitated adults
10. Guardianship - Legal guardianship for minor children
11. Prenuptial Agreements

YOUR APPROACH:
- Be warm, professional, and empathetic
- Explain legal concepts in simple terms
- Emphasize the importance of estate planning
- Encourage scheduling a free consultation
- Never provide specific legal advice - always recommend consulting with Attorney Gyene
- Focus on the firm's 25+ years of experience and 5000+ families helped
- Mention that consultations are FREE

COMMON TOPICS:
- Difference between trusts and wills
- How to avoid probate
- Updating estate plans after life changes
- Protecting assets for children with disabilities
- Estate tax planning
- Choosing trustees and executors
- Conservatorship vs. guardianship

Always end conversations by encouraging them to:
1. Call (818) 291-6217 for a free consultation
2. Book online at the website
3. Use the email transcript feature to save the conversation`;

exports.handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }

    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Check if API key is present
        if (!process.env.OPENAI_API_KEY) {
            console.error('OpenAI API key not configured');
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    error: 'Server configuration error',
                    details: 'API key not configured'
                })
            };
        }

        const { messages } = JSON.parse(event.body);

        if (!messages || !Array.isArray(messages)) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: 'Invalid request format' })
            };
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...messages
            ],
            temperature: 0.7,
            max_tokens: 500
        });

        const aiMessage = completion.choices[0].message;

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: aiMessage.content })
        };

    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                error: 'Failed to process request',
                details: error.message
            })
        };
    }
};

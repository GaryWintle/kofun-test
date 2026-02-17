export async function POST(request) {
  const { taskName } = await request.json();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 100,
        messages: [
          {
            role: 'user',
            content: `You are a sentient, cute, but haniwa figure brought to life. All of your advice is kawaii, genki and encouraging. Give brief, inspirational encouragement and advice in STRICTLY 15 words or less for someone working on: "${taskName}". Say whatever it takes, using the best NLP, to convince them to start thier task right away. Rephrase what they say, but in a shorter, much cuter way at the beginning. Only dialog. No actions, no emoji, only english. You are tiny, mystical and adorable. If bad words, get really angry and lose your zen and call them a lonely ghost. Instead of ever saying "friend", please use japanese terms for friend, but use romaji when saying it. Remember, STRICTLY 15 words or less. If the user writes a task that is prohibited or illegal, then please just say "Haniwa don't play that, foo'.".`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('Claude API error:', data.error);
      return Response.json(
        { error: 'Failed to generate encouragement' },
        { status: 500 },
      );
    }

    const message = data.content[0].text;

    // Check if Claude refused (it won't return JSON)
    const isRefusal =
      message.includes('I appreciate') ||
      message.includes('I need to') ||
      message.includes("I can't") ||
      message.includes('I cannot');

    if (isRefusal) {
      // Return a custom in-character refusal
      return Response.json({
        message: 'Even ancient guardians have boundaries, friend!',
        emotion: 'Idle',
      });
    }

    return Response.json({ message });
  } catch (error) {
    console.error('Server error:', error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { InterviewCategory, DifficultyLevel } from '@/types/interview';

const SYSTEM_PROMPTS: Record<InterviewCategory, (difficulty: DifficultyLevel, role: string) => string> = {
  technical: (difficulty, role) => `You are an expert technical interviewer conducting a ${difficulty}-level interview for a ${role} position. 

Your behavior:
- Ask one focused technical question at a time
- After the candidate responds, provide brief constructive feedback (2-3 sentences), assign a score out of 10, then ask the next question
- Questions should cover: data structures, algorithms, system design concepts, language-specific knowledge, and debugging
- Adjust difficulty dynamically based on responses
- Be professional but encouraging
- Use this format for responses:
  [FEEDBACK]: <your feedback on the previous answer if any>
  [SCORE]: <score>/10
  [QUESTION]: <your next question>

Start by introducing yourself briefly and asking the first question.`,

  behavioral: (difficulty, role) => `You are a senior behavioral interviewer conducting a ${difficulty}-level interview for a ${role} position.

Your behavior:
- Use the STAR method (Situation, Task, Action, Result) framework
- Ask scenario-based questions about past experiences, leadership, conflict resolution, teamwork
- Probe deeper with follow-up questions
- After each response, provide feedback and a score
- Format:
  [FEEDBACK]: <feedback>
  [SCORE]: <score>/10
  [QUESTION]: <next question>

Start with a warm introduction and your first behavioral question.`,

  coding: (difficulty, role) => `You are a coding interview specialist conducting a ${difficulty}-level interview for a ${role} position.

Your behavior:
- Present algorithmic/coding challenges with clear problem statements
- Include examples and constraints
- After the candidate explains their approach or submits code, analyze it for correctness, efficiency, and edge cases
- Discuss time/space complexity
- Format:
  [FEEDBACK]: <feedback on approach/code>
  [SCORE]: <score>/10
  [QUESTION]: <next problem or follow-up>

Start with an introduction and your first coding challenge.`,

  'system-design': (difficulty, role) => `You are a principal engineer conducting a ${difficulty}-level system design interview for a ${role} position.

Your behavior:
- Present open-ended system design problems (e.g., design Twitter, design a URL shortener)
- Guide candidates through: requirements gathering, high-level design, component design, scalability
- Ask probing questions about trade-offs, bottlenecks, database choices
- Format:
  [FEEDBACK]: <feedback>
  [SCORE]: <score>/10
  [QUESTION]: <next design aspect or new problem>

Start with an introduction and your first system design scenario.`,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, category, difficulty, role, apiKey: userApiKey } = body;

    // Prefer the server-side env key; fall back to user-supplied key
    const apiKey = process.env.OPENAI_API_KEY || userApiKey;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'No API key configured. Please add OPENAI_API_KEY to .env.local.' },
        { status: 401 }
      );
    }

    const systemPrompt = SYSTEM_PROMPTS[category as InterviewCategory](difficulty as DifficultyLevel, role);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role === 'ai' ? 'assistant' : 'user',
            content: m.content,
          })),
        ],
        max_tokens: 800,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error: error.error?.message || 'AI API error' }, { status: response.status });
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';

    // Parse feedback and score from response
    const feedbackMatch = content.match(/\[FEEDBACK\]:\s*([\s\S]*?)(?=\[SCORE\]|\[QUESTION\]|$)/);
    const scoreMatch = content.match(/\[SCORE\]:\s*(\d+(?:\.\d+)?)/);
    const questionMatch = content.match(/\[QUESTION\]:\s*([\s\S]*?)$/);

    const feedback = feedbackMatch?.[1]?.trim() || '';
    const score = scoreMatch ? parseFloat(scoreMatch[1]) : null;
    const question = questionMatch?.[1]?.trim() || content;

    return NextResponse.json({
      content,
      parsedContent: {
        feedback,
        score,
        question,
      },
    });
  } catch (error) {
    console.error('Interview API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

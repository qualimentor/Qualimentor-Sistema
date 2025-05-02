// /src/app/api/mentor-ia/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client - ONLY ON SERVER
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use server-only variable
});

// GPT ID for Mentor-IA (optional)
const MENTOR_GPT_ID = process.env.GPT_MENTOR_ID; // Server-only variable

export async function POST(request: Request) {
  try {
    const { data } = await request.json();

    if (!data) {
      return NextResponse.json({ error: 'Nenhum dado fornecido para análise.' }, { status: 400 });
    }

    const prompt = typeof data === 'string'
      ? data
      : `Analise a seguinte não conformidade e sugira ações corretivas e preventivas de acordo com a ISO 15189 e RDC 786/2023:\n\n${JSON.stringify(data, null, 2)}`;

    const response = await openai.chat.completions.create({
      model: MENTOR_GPT_ID || "gpt-4-turbo", // Use GPT ID if available, otherwise default model
      messages: [
        {
          role: "system",
          content: "Você é o Mentor-IA da Qualimentor, especialista em análise de não conformidades e eventos adversos em laboratórios clínicos. Você conhece profundamente as normas ISO 15189, RDC 786/2023 e outras regulamentações relevantes para laboratórios. Sua função é analisar não conformidades, identificar causas raiz e sugerir ações corretivas e preventivas eficazes."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      // If using a specific GPT ID via model parameter is not supported yet,
      // you might need a different approach based on OpenAI's documentation for GPT Team API.
    });

    const analysis = response.choices[0].message.content;
    return NextResponse.json({ analysis });

  } catch (error) {
    console.error('Error in /api/mentor-ia:', error);
    // Avoid sending detailed error messages to the client
    return NextResponse.json({ error: 'Erro ao processar a solicitação do Mentor-IA.' }, { status: 500 });
  }
}

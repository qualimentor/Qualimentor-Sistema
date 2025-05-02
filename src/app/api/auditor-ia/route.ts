// /src/app/api/auditor-ia/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client - ONLY ON SERVER
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use server-only variable
});

// GPT ID for Auditor-IA (optional)
const AUDITOR_GPT_ID = process.env.GPT_AUDITOR_ID; // Server-only variable

export async function POST(request: Request) {
  try {
    const { data } = await request.json();

    if (!data) {
      return NextResponse.json({ error: 'Nenhum dado fornecido para análise.' }, { status: 400 });
    }

    const prompt = typeof data === 'string'
      ? data
      : `Analise o seguinte documento e verifique sua conformidade com as normas aplicáveis, identificando possíveis melhorias:\n\n${JSON.stringify(data, null, 2)}`;

    const response = await openai.chat.completions.create({
      model: AUDITOR_GPT_ID || "gpt-4-turbo", // Use GPT ID if available, otherwise default model
      messages: [
        {
          role: "system",
          content: "Você é o Auditor-IA da Qualimentor, especialista em auditoria e documentação de sistemas de gestão da qualidade em laboratórios clínicos. Você conhece profundamente as normas ISO 15189, RDC 786/2023 e outras regulamentações relevantes. Sua função é revisar documentos, verificar conformidade com normas e identificar oportunidades de melhoria na documentação."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const analysis = response.choices[0].message.content;
    return NextResponse.json({ analysis });

  } catch (error) {
    console.error('Error in /api/auditor-ia:', error);
    return NextResponse.json({ error: 'Erro ao processar a solicitação do Auditor-IA.' }, { status: 500 });
  }
}

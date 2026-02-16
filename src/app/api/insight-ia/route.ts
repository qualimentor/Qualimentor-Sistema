// /src/app/api/insight-ia/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// GPT ID for Insight-IA (optional)
const INSIGHT_GPT_ID = process.env.GPT_INSIGHT_ID; // Server-only variable

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OPENAI_API_KEY não configurada no servidor.' }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });
    const { data } = await request.json();

    if (!data) {
      return NextResponse.json({ error: 'Nenhum dado fornecido para análise.' }, { status: 400 });
    }

    const prompt = typeof data === 'string'
      ? data
      : `Analise os seguintes indicadores de qualidade e identifique tendências, oportunidades de melhoria e recomendações:\n\n${JSON.stringify(data, null, 2)}`;

    const response = await openai.chat.completions.create({
      model: INSIGHT_GPT_ID || "gpt-4-turbo", // Use GPT ID if available, otherwise default model
      messages: [
        {
          role: "system",
          content: "Você é o Insight-IA da Qualimentor, especialista em análise de indicadores de qualidade em laboratórios clínicos. Você tem conhecimento avançado em estatística, análise de tendências e benchmarking no setor laboratorial. Sua função é analisar indicadores, identificar tendências, comparar com referências do setor e sugerir melhorias baseadas em evidências."
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
    console.error('Error in /api/insight-ia:', error);
    return NextResponse.json({ error: 'Erro ao processar a solicitação do Insight-IA.' }, { status: 500 });
  }
}

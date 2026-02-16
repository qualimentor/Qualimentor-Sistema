// GPT Team integration for Qualimentor AI modules
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

/**
 * Analyze non-conformities using Mentor-IA GPT
 * @param {Object|string} data - Non-conformity data to analyze
 * @returns {Promise<string>} Analysis result
 */
export async function analyzeMentorIA(data) {
  try {
    const prompt = typeof data === 'string' 
      ? data 
      : `Analise a seguinte não conformidade e sugira ações corretivas e preventivas de acordo com a ISO 15189 e RDC 786/2023:\n\n${JSON.stringify(data, null, 2)}`;
    
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", // Will be replaced with GPT Team ID when available
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
      // When GPT Team API is available, add:
      // gpt_id: GPT_IDS.MENTOR_IA,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error in Mentor-IA analysis:', error);
    throw new Error('Não foi possível analisar a não conformidade. Por favor, tente novamente.');
  }
}

/**
 * Analyze quality indicators using Insight-IA GPT
 * @param {Object|string} data - Indicators data to analyze
 * @returns {Promise<string>} Analysis result
 */
export async function analyzeInsightIA(data) {
  try {
    const prompt = typeof data === 'string' 
      ? data 
      : `Analise os seguintes indicadores de qualidade e identifique tendências, oportunidades de melhoria e recomendações:\n\n${JSON.stringify(data, null, 2)}`;
    
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", // Will be replaced with GPT Team ID when available
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
      // When GPT Team API is available, add:
      // gpt_id: GPT_IDS.INSIGHT_IA,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error in Insight-IA analysis:', error);
    throw new Error('Não foi possível analisar os indicadores. Por favor, tente novamente.');
  }
}

/**
 * Analyze documents using Auditor-IA GPT
 * @param {Object|string} data - Document data to analyze
 * @returns {Promise<string>} Analysis result
 */
export async function analyzeAuditorIA(data) {
  try {
    const prompt = typeof data === 'string' 
      ? data 
      : `Analise o seguinte documento e verifique sua conformidade com as normas aplicáveis, identificando possíveis melhorias:\n\n${JSON.stringify(data, null, 2)}`;
    
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", // Will be replaced with GPT Team ID when available
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
      // When GPT Team API is available, add:
      // gpt_id: GPT_IDS.AUDITOR_IA,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error in Auditor-IA analysis:', error);
    throw new Error('Não foi possível analisar o documento. Por favor, tente novamente.');
  }
}

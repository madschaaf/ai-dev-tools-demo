/**
 * eBay AI Sandbox Service
 * Provides access to Core AI team managed AI capabilities
 * Documentation: https://github.com/aisandbox
 */

// Environment type for selecting the appropriate endpoint
type Environment = 'staging' | 'preprod' | 'production';

// Configuration for AI Sandbox endpoints
const AI_SANDBOX_CONFIG = {
  staging: 'https://jarvis-staging.ebay.com',
  preprod: 'https://jarvis-preprod.ebay.com',
  production: 'https://jarvis.ebay.com'
};

// Helper to get the current environment from env vars
const getCurrentEnvironment = (): Environment => {
  const env = import.meta.env.VITE_AI_SANDBOX_ENV || 'staging';
  return env as Environment;
};

// Base Jarvis endpoint
const getJarvisEndpoint = (): string => {
  const env = getCurrentEnvironment();
  return AI_SANDBOX_CONFIG[env];
};

/**
 * AI Sandbox Capabilities
 */
export interface AISandboxCapabilities {
  machineTranslation: typeof machineTranslation;
  languageDetection: typeof languageDetection;
  itemTitleRewrite: typeof itemTitleRewrite;
  aspectPrediction: typeof aspectPrediction;
  aspectExtraction: typeof aspectExtraction;
  descriptionSummarization: typeof descriptionSummarization;
  descriptionPrefill: typeof descriptionPrefill;
  text2Image: typeof text2Image;
  objectDetection: typeof objectDetection;
  backgroundSwap: typeof backgroundSwap;
}

/**
 * Machine Translation
 * Translate text from one language to another
 */
export async function machineTranslation(params: {
  input: string;
  sourceLanguage: string;
  targetLanguage: string;
  domain?: string;
  mimeType?: string;
}): Promise<any> {
  const endpoint = `${getJarvisEndpoint()}/jarvis/ai/text/machine-translation/v1`;
  
  const requestBody = {
    input: {
      input: params.input,
      context: {
        mimeType: params.mimeType || 'text/plain',
        sourceLanguage: params.sourceLanguage,
        targetLanguage: params.targetLanguage,
        domain: params.domain || 'query'
      }
    }
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_EBAY_AUTH_TOKEN || ''}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Translation failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Machine Translation Error:', error);
    throw error;
  }
}

/**
 * Language Detection
 * Detect the language of input text
 */
export async function languageDetection(text: string): Promise<any> {
  const endpoint = `${getJarvisEndpoint()}/jarvis/ai/text/language-detection/v1`;
  
  const requestBody = {
    input: { text }
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_EBAY_AUTH_TOKEN || ''}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Language detection failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Language Detection Error:', error);
    throw error;
  }
}

/**
 * Item Title Rewrite
 * Improve and rewrite item titles for better clarity
 */
export async function itemTitleRewrite(title: string): Promise<any> {
  const endpoint = `${getJarvisEndpoint()}/jarvis/ai/text/item-title-rewrite/v1`;
  
  const requestBody = { title };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_EBAY_AUTH_TOKEN || ''}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Title rewrite failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Item Title Rewrite Error:', error);
    throw error;
  }
}

/**
 * Aspect Prediction
 * Predict product aspects based on title and category
 */
export async function aspectPrediction(params: {
  title: string;
  category: string;
  requiredAspects: string;
}): Promise<any> {
  const endpoint = `${getJarvisEndpoint()}/jarvis/ai/text/aspect-prediction/v1`;
  
  const requestBody = {
    required_aspects: params.requiredAspects,
    category: params.category,
    title: params.title
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_EBAY_AUTH_TOKEN || ''}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Aspect prediction failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Aspect Prediction Error:', error);
    throw error;
  }
}

/**
 * Aspect Extraction
 * Extract product aspects from title
 */
export async function aspectExtraction(params: {
  title: string;
  category: string;
  aspects: string;
}): Promise<any> {
  const endpoint = `${getJarvisEndpoint()}/jarvis/ai/text/aspect-extraction/v1`;
  
  const requestBody = {
    aspects: params.aspects,
    category: params.category,
    title: params.title
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_EBAY_AUTH_TOKEN || ''}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Aspect extraction failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Aspect Extraction Error:', error);
    throw error;
  }
}

/**
 * Description Summarization
 * Summarize long product descriptions
 */
export async function descriptionSummarization(description: string): Promise<any> {
  const endpoint = `${getJarvisEndpoint()}/jarvis/ai/text/description-summarization/v1`;
  
  const requestBody = { description };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_EBAY_AUTH_TOKEN || ''}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Description summarization failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Description Summarization Error:', error);
    throw error;
  }
}

/**
 * Description Prefill
 * Generate description based on title and attributes
 */
export async function descriptionPrefill(params: {
  title: string;
  attributes: string;
}): Promise<any> {
  const endpoint = `${getJarvisEndpoint()}/jarvis/ai/text/description-prefill/v1`;
  
  const requestBody = {
    title: params.title,
    attributes: params.attributes
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_EBAY_AUTH_TOKEN || ''}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Description prefill failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Description Prefill Error:', error);
    throw error;
  }
}

/**
 * Text to Image (SDXL)
 * Generate images from text prompts
 */
export async function text2Image(params: {
  promptKeywords: string[];
  negativePromptKeywords?: string[];
  scheduler?: string[];
  steps?: number[];
  numGeneratedImages?: number[];
  cfgScale?: number[];
  imageWidth?: number[];
  imageHeight?: number[];
  refinerStart?: number[];
  seed?: string[];
}): Promise<any> {
  const endpoint = `${getJarvisEndpoint()}/jarvis/ai/image/text2image/v1`;
  
  const requestBody = {
    prompt_keywords: params.promptKeywords,
    n_prompt_keywords: params.negativePromptKeywords || [''],
    scheduler: params.scheduler || ['UniPCMultistep'],
    steps: params.steps || [20],
    num_generated_images: params.numGeneratedImages || [1],
    cfg_scale: params.cfgScale || [5],
    image_width: params.imageWidth || [1024],
    image_height: params.imageHeight || [1024],
    refiner_start: params.refinerStart || [0.8],
    seed: params.seed || ['12345']
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_EBAY_AUTH_TOKEN || ''}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Text to image failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Text to Image Error:', error);
    throw error;
  }
}

/**
 * Object Detection
 * Detect objects in images
 */
export async function objectDetection(imageUrl: string): Promise<any> {
  const endpoint = `${getJarvisEndpoint()}/jarvis/ai/image/object-detection/v1-1`;
  
  const requestBody = {
    payloads: [{ rgbim: imageUrl }]
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_EBAY_AUTH_TOKEN || ''}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Object detection failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Object Detection Error:', error);
    throw error;
  }
}

/**
 * Background Swap
 * Replace image backgrounds
 */
export async function backgroundSwap(imageUrl: string): Promise<any> {
  const endpoint = `${getJarvisEndpoint()}/jarvis/ai/image/background-swap/v1`;
  
  const requestBody = {
    payloads: [{ rgbim: imageUrl }]
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_EBAY_AUTH_TOKEN || ''}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Background swap failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Background Swap Error:', error);
    throw error;
  }
}

/**
 * Export all AI Sandbox capabilities
 */
const aiSandboxService: AISandboxCapabilities = {
  machineTranslation,
  languageDetection,
  itemTitleRewrite,
  aspectPrediction,
  aspectExtraction,
  descriptionSummarization,
  descriptionPrefill,
  text2Image,
  objectDetection,
  backgroundSwap
};

export default aiSandboxService;

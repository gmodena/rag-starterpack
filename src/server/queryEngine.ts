import { 
    Settings, 
    VectorStoreIndex, 
    HuggingFaceEmbedding
  } from 'llamaindex';
  import { Ollama } from 'llamaindex/llm/ollama';
  import { CONFIG } from './config.js';
  import { loadDocuments } from './documentLoader.js';
  
  export async function createQueryEngine() {
    Settings.embedModel = new HuggingFaceEmbedding({
        modelType: "BAAI/bge-small-en-v1.5",
      });
  
    Settings.llm = new Ollama({
      model: CONFIG.OLLAMA_MODEL,
    });
  
    const documents = await loadDocuments();
  
    const index = await VectorStoreIndex.fromDocuments(documents);
  
    const queryEngine = index.asQueryEngine();
    return queryEngine;
  }
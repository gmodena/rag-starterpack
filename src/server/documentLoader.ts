import { MarkdownReader, SimpleDirectoryReader, TextFileReader } from 'llamaindex';
import { CONFIG } from './config.js';

export async function loadDocuments() {
  const reader = new SimpleDirectoryReader();
  
  const documents = await reader.loadData({
    directoryPath: CONFIG.DOCS_PATH,
    defaultReader: new TextFileReader(),
    fileExtToReader: { md: new MarkdownReader() }
  });
  
  documents.forEach((doc) => {
    console.log(doc);
  });

  return documents;
}
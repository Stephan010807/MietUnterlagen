import { mergeAttachments } from './attachments';

self.onmessage = async ({ data }: MessageEvent<{ base: ArrayBuffer; files: File[] }>) => {
  try {
    const bytes = await mergeAttachments(data.base, data.files);
    self.postMessage({ bytes });
  } catch (error) {
    self.postMessage({ error: error instanceof Error ? error.message : 'Anlagen konnten nicht eingefügt werden.' });
  }
};

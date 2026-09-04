export interface PdfProcessOptions {
  onProgress?: (progress: number, currentPage?: number, totalPages?: number) => void;
  scale?: number;
}

export async function processPdfToImages(file: File, options?: PdfProcessOptions): Promise<string[]> {
  const { onProgress, scale = 2.0 } = options || {};
  
  try {
    // Dynamic import to avoid SSR 'canvas' module error
    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    const images: string[] = [];

    for (let i = 1; i <= numPages; i++) {
      if (onProgress) onProgress(Math.round((i / numPages) * 100), i, numPages);
      
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale });
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas 2D context not available');

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;

      // Convert to blob instead of base64 to save memory, then create ObjectURL
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.8));
      
      if (blob) {
        images.push(URL.createObjectURL(blob));
      } else {
        images.push(canvas.toDataURL('image/webp', 0.8));
      }
    }

    return images;
  } catch (error) {
    console.error("Error processing PDF:", error);
    throw new Error("Failed to process PDF file.");
  }
}

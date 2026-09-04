import { Scene, ProcessingJob, Layer, AnimationPresetType } from "@/types/story-anim";
import { processPdfToImages } from "./pdfProcessor";
import { mockStorage } from "./mockStorage";

// Simulates a background worker process
export class StoryPipeline {
  private dispatchJob: (job: ProcessingJob | null) => void;

  constructor(dispatchJob: (job: ProcessingJob | null) => void) {
    this.dispatchJob = dispatchJob;
  }

  async processFiles(files: File[]): Promise<Scene[]> {
    this.dispatchJob({ id: 'job-1', status: 'UPLOADING', progress: 0, message: 'Uploading files...' });
    
    let imageUrls: string[] = [];
    const pdfFiles = files.filter(f => f.type === 'application/pdf');
    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    
    if (pdfFiles.length > 0) {
      this.dispatchJob({ id: 'job-1', status: 'PROCESSING_PDF', progress: 0, message: 'Extracting pages from PDF...' });
      const urls = await processPdfToImages(pdfFiles[0], {
        onProgress: (p, cur, tot) => {
          this.dispatchJob({ id: 'job-1', status: 'PROCESSING_PDF', progress: p, message: `Processing page ${cur} of ${tot}` });
        }
      });
      imageUrls = [...imageUrls, ...urls];
    }
    
    if (imageFiles.length > 0) {
      for (let i = 0; i < imageFiles.length; i++) {
        this.dispatchJob({ id: 'job-1', status: 'UPLOADING', progress: Math.round((i / imageFiles.length) * 100), message: `Uploading image ${i+1}/${imageFiles.length}...` });
        const url = await mockStorage.uploadFile(imageFiles[i]);
        imageUrls.push(url);
      }
    }

    this.dispatchJob({ id: 'job-1', status: 'ANALYZING', progress: 50, message: 'Analyzing image content...' });
    // Mock analysis delay
    await new Promise(r => setTimeout(r, 1000));
    
    this.dispatchJob({ id: 'job-1', status: 'GENERATING', progress: 80, message: 'Generating animation configs...' });
    const scenes = this.generateIntelligentScenes(imageUrls);
    
    this.dispatchJob({ id: 'job-1', status: 'READY', progress: 100, message: 'Story is ready!' });
    setTimeout(() => this.dispatchJob(null), 2000); // clear after 2 seconds
    
    return scenes;
  }

  private generateIntelligentScenes(urls: string[]): Scene[] {
    const backgrounds = ['kenBurns', 'panLeft', 'panRight'];
    const scenes: Scene[] = [];
    
    urls.forEach((url, index) => {
      // Alternate presets logically
      const bgPreset = backgrounds[index % backgrounds.length] as AnimationPresetType;
      const isIntro = index === 0;
      
      const layers: Layer[] = [];
      
      if (isIntro) {
        layers.push({
          id: `layer_intro_${Date.now()}`,
          type: 'text',
          content: 'CHAPTER 1',
          x: 50, y: 50,
          scale: 1, rotation: 0, opacity: 1, zIndex: 10,
          visible: true, locked: false,
          fontSize: 32, fontWeight: 'bold', textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
          animation: {
            preset: 'fadeUp',
            duration: 2,
            delay: 0.5,
          }
        });
      }
      
      scenes.push({
        id: `scene_${Date.now()}_${index}`,
        order: index,
        duration: isIntro ? 8 : 6,
        status: 'ready',
        aspectRatio: '9:16',
        background: {
          url: url,
          animation: {
            preset: bgPreset,
            duration: isIntro ? 8 : 6,
            easing: 'ease-in-out'
          }
        },
        layers,
        transition: {
          type: index === urls.length - 1 ? 'fade' : 'crossfade',
          duration: 1.0
        }
      });
    });
    
    return scenes;
  }
}

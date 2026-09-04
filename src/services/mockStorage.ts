import { ChapterAnimConfig, Scene } from "@/types/story-anim";

export const MOCK_DELAY = 800;

class MockStorageService {
  private getStorageKey(storyId: string, chapterId: string) {
    return `story_${storyId}_chapter_${chapterId}_config`;
  }

  async uploadFile(file: File, onProgress?: (progress: number) => void): Promise<string> {
    return new Promise((resolve, reject) => {
      // Simulate progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        if (onProgress) onProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          try {
            // In a real app, upload to S3/Supabase and return public URL.
            // Here, we use ObjectURL (warning: these expire on refresh, but fine for MVP preview)
            // For persistence across reloads in mock, we'd need base64, but base64 is too large for localStorage if many images.
            // We will use ObjectURL for MVP since it's a mock.
            const url = URL.createObjectURL(file);
            resolve(url);
          } catch (e) {
            reject(e);
          }
        }
      }, 100);
    });
  }

  async saveChapterConfig(config: ChapterAnimConfig): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Stringify and save to localStorage
        // To avoid localStorage quota issues with large JSON (if using base64), we use ObjectURLs in the mock which just won't load on refresh.
        // If we want real persistence without a DB, we'd use IndexedDB. Let's just use localStorage for structural persistence.
        try {
          const json = JSON.stringify(config);
          localStorage.setItem(this.getStorageKey(config.storyId, config.chapterId), json);
          resolve();
        } catch (e) {
          console.error("Failed to save to localStorage", e);
          resolve(); // Resolve anyway so UI doesn't break
        }
      }, MOCK_DELAY);
    });
  }

  async getChapterConfig(storyId: string, chapterId: string): Promise<ChapterAnimConfig | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const json = localStorage.getItem(this.getStorageKey(storyId, chapterId));
          if (json) {
            resolve(JSON.parse(json) as ChapterAnimConfig);
          } else {
            resolve(null);
          }
        } catch (e) {
          console.error("Failed to load from localStorage", e);
          resolve(null);
        }
      }, MOCK_DELAY / 2);
    });
  }
}

export const mockStorage = new MockStorageService();

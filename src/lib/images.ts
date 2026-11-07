import { inferRemoteSize } from 'astro:assets';
import { PRODUCT_IMG } from '../config';

export interface Photo {
  src: string;
  width: number;
  height: number;
}

const cache = new Map<string, Promise<Photo>>();

async function measure(src: string): Promise<Photo> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const { width, height } = await inferRemoteSize(src);
      return { src, width, height };
    } catch (error) {
      lastError = error;
      await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
    }
  }
  throw lastError;
}

export function productPhoto(file: string): Promise<Photo> {
  return remotePhoto(`${PRODUCT_IMG}/${file}`);
}

export function remotePhoto(src: string): Promise<Photo> {
  let photo = cache.get(src);
  if (!photo) {
    photo = measure(src);
    cache.set(src, photo);
  }
  return photo;
}

import { inferRemoteSize } from 'astro:assets';
import { PRODUCT_IMG } from '../config';

/** A remote image plus its real size, so layouts can reserve the right space. */
export interface Photo {
  src: string;
  width: number;
  height: number;
}

// Each URL is measured once per build and shared by every page that uses it.
const cache = new Map<string, Promise<Photo>>();

// Remote size lookups occasionally fail on the CDN, so retry with a growing delay.
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

/** Product photo, given its file name under `/products`. */
export function productPhoto(file: string): Promise<Photo> {
  return remotePhoto(`${PRODUCT_IMG}/${file}`);
}

/** Any remote photo (full URL) with its real dimensions. */
export function remotePhoto(src: string): Promise<Photo> {
  let photo = cache.get(src);
  if (!photo) {
    photo = measure(src);
    cache.set(src, photo);
  }
  return photo;
}

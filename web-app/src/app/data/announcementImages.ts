// src/app/data/announcementImages.ts
import { Image11, Image12, Image13, Image14 } from '../../../public/images';
import ProgramData from './announcements.json';

const imageMap: Record<string, any> = {
  Image11,
  Image12,
  Image13,
  Image14,
};

// Export announcement images for Home page
export const announcementImages = ProgramData.map(
  (program) => imageMap[program.image] || Image12
);

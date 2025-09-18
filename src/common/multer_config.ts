import { diskStorage } from 'multer';
import { extname } from 'path';

export const bannerMulterOptions = {
  storage: diskStorage({
    destination: './uploads', // store all media in one folder
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);

      // Use the field name as prefix (e.g., overview_image-123456.mp4)
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (req: any, file: Express.Multer.File, cb: Function) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/webm',
      'video/avi',
      'video/mov',
      'video/mkv',
      'application/pdf'
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images, GIFs, or videos are allowed!'), false);
    }
  },
};

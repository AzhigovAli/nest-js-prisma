import { diskStorage } from 'multer';
import { extname } from 'path';

export const fileStorage = diskStorage({
  destination: './uploads', // Ensure this path exists or create it
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExt = extname(file.originalname);
    callback(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
  },
});

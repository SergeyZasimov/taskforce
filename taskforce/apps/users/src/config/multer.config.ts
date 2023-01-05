import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as nanoid from 'nanoid';

export const multerOptions = registerAs(
  'multer',
  (): MulterOptions => ({
    storage: diskStorage({
      destination: process.env.UPLOAD_DEST,
      filename: (_req, file, cb) => {
        const filename = nanoid();
        cb(null, `${filename}${path.extname(file.originalname)}`);
      },
    }),
  })
);

export function getMulterConfig() {
  return {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      storage: configService.get<string>('multer.storage'),
    }),
    inject: [ConfigService],
  };
}

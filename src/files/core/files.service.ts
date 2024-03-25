import * as path from 'path';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import useConfigurator from 'src/config';
import { ApiError } from 'src/utils/types/apiError';
import { HTTP_ERROR_CODES } from 'src/utils/constants/error';

const { UPLOADS_PATH } = useConfigurator();

@Injectable()
export class FilesService {
  async uploadFile(
    files: Express.Multer.File[],
    filePath: string,
    fileName: string,
  ) {
    const uploadPath = path.join(UPLOADS_PATH, `uploads/${filePath}`);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    await Promise.all(
      files.map(async (file) => {
        fileName += path.extname(file.originalname);

        const filePath = path.join(uploadPath, fileName);

        await fs.writeFileSync(filePath, file.buffer);
      }),
    );

    return;
  }

  async getImage(imagePath: string) {
    const filePath = path.join(process.cwd(), imagePath);
    const image = await fs.promises.readFile(filePath);
    return image;
  }

  validateAndProcess(identifier: string, file?: Express.Multer.File): void {
    if (!file)
      throw new ApiError(
        HTTP_ERROR_CODES.BAD_REQUEST,
        `Unattached ${identifier}`,
      );
  }

  isValidImage(file: Express.Multer.File): boolean {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedMimeTypes.includes(file.mimetype);
  }
}

import { FileTypeValidator, Injectable, ParseFilePipe } from "@nestjs/common";
import { unlink } from "fs/promises";
import { diskStorage } from "multer";
import * as path from "path";

@Injectable()
export class FileStorageService {
  static get imageRoot(): string {
    return "uploads/images";
  }

  static get storage() {
    return diskStorage({
      destination: this.imageRoot,
      filename: (req, file, cb) => {
        const filename =
          path.parse(file.originalname).name.replace(/\s/g, "") + Date.now();
        const extension = path.parse(file.originalname).ext;

        cb(null, `${filename}${extension}`);
      },
    });
  }

  static get parseFilePipe() {
    return new ParseFilePipe({
      validators: [
        new FileTypeValidator({
          fileType: /image\/(jpeg|png)/,
        }),
      ],
    });
  }

  deleteFile(filename: string): Promise<void> {
    return unlink(path.join(FileStorageService.imageRoot, filename));
  }
}

import { Injectable } from '@nestjs/common';
import { FileDTO } from './dto';
import * as fs from 'fs';
import { uploadFileURL } from 'src/config/multer.option';
import { v4 } from 'uuid';

@Injectable()
export class FileService {
  constructor() {}

  async singleUpload(file: Express.Multer.File, fileInfo: FileDTO) {
    try {
      const { file_nm, file_path } = fileInfo;

      if (!fs.existsSync(file_path)) {
        fs.mkdirSync(file_path);
      }
      let _file_nm = file_nm;
      if (!file_nm) {
        _file_nm = v4();
      }

      const result = this.uploadFile(file, file_path, _file_nm);

      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 파일 여러개 업로드
   * --
   * @param files
   * @param uploadDto
   * @returns
   */
  async multiUpload(files: Express.Multer.File[], fileInfo: FileDTO) {
    try {
      const { file_path, file_nm } = fileInfo;

      if (!fs.existsSync(file_path)) {
        fs.mkdirSync(file_path);
      }

      const result = files.map((file) => {
        let _file_nm = file_nm;
        if (!file_nm) {
          _file_nm = v4();
        }
        return this.uploadFile(file, file_path, _file_nm);
      });

      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 파일 업로드
   * --
   * 메모리에 저장된 파일을 실제 파일로 만들고, URL을 return 해주는 메서드
   * @param file
   * @param uploadFilePath
   * @param fileName
   * @returns
   */
  uploadFile(
    file: Express.Multer.File,
    uploadFilePath: string,
    fileName: string,
  ) {
    try {
      //파일 이름
      const fn = `${fileName}.png`;
      //파일 업로드 경로
      const uploadPath = __dirname + `/../../${uploadFilePath + '/' + fn}`;

      //파일 생성
      fs.writeFileSync(uploadPath, file.buffer); // file.path 임시 파일 저장소

      return uploadFileURL(uploadFilePath + '/' + fn);
    } catch (e) {
      throw e;
    }
  }
}

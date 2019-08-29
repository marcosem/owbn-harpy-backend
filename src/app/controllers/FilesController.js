import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import Files from '../models/Files';

class FileController {
  async store(req, res) {
    // Possible types are:
    // 'clan' - for clan logo;
    // 'member' - for member photo;
    // 'domain' - for domain picture;
    const type = req.params.type ? req.params.type : '';
    const { originalname: name, filename, path: filePath } = req.file;

    const [shortName] = filename.split('.');
    let newFilename = '';

    switch (type) {
      case 'clan': {
        newFilename = `${shortName}.png`;
        await sharp(filePath)
          .resize({ height: 100 })
          .png()
          .toFile(path.resolve(req.file.destination, 'clan', newFilename));
        break;
      }
      case 'member': {
        newFilename = `${shortName}.jpg`;
        await sharp(filePath)
          .resize(300)
          .jpeg({ quality: 72 })
          .toFile(path.resolve(req.file.destination, 'members', newFilename));
        break;
      }
      case 'domain': {
        newFilename = `${shortName}.png`;
        await sharp(filePath)
          .resize({ height: 300 })
          .png()
          .toFile(path.resolve(req.file.destination, 'domains', newFilename));
        break;
      }
      default:
      case 'none': {
        newFilename = `${shortName}.jpg`;
        await sharp(filePath)
          .resize(200)
          .jpeg({ quality: 72 })
          .toFile(path.resolve(req.file.destination, 'resized', newFilename));
        break;
      }
    }

    console.log(filePath);

    // delete the old image (path uploads)
    fs.unlinkSync(filePath);

    const file = await Files.create({
      name,
      type,
      path: newFilename,
    });

    return res.json(file);
  }
}

export default new FileController();

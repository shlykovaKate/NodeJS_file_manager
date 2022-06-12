import { readFile, writeFile, rename, copyFile, rm, readdir } from 'fs/promises';
import { constants, createReadStream } from 'fs';
import { resolve, basename, dirname } from 'path';

export const read = async (path) => {
    try {
        const readableStream = createReadStream(path, {encoding: 'utf8'});
        readableStream.on('error', () => {
            console.error('Operation failed');
        })

        readableStream.on('data', (chunk) => {
            console.log(chunk);
        });
    } catch (error) {
        console.error('Operation failed');
    }
};

export const create = async (path) => {
    try {
        await writeFile(path, '', { flag: 'wx'});
    } catch (error) {
        console.error('Operation failed');
    }
};

export const renameFile = async (oldPath, newPath) => {
    const filePath = resolve(process.cwd(), oldPath);
    const dirnameOfFile = dirname(filePath);
    const newFilePath = resolve(dirnameOfFile, newPath);
    try {
        const file = await readFile(newFilePath);
        throw new Error('You can not rename this file');
    } catch (error) {
        if (error.message !== 'You can not rename this file') {
            try {
                await rename(filePath, newFilePath);
            } catch (error) {
                console.error('Operation failed');
            }
        } else {
            console.error('Operation failed');
        }
    }
};

export const copy = async (sourcePath, destinationPath) => {
    const oldPath = resolve(process.cwd(), sourcePath);
    const newDir = resolve(process.cwd(), destinationPath);
    try {
        await readdir(newDir);
        const filename = basename(oldPath);
        const newPath = resolve(newDir, filename);
        await copyFile(oldPath, newPath, constants.COPYFILE_EXCL);
    } catch(error) {
        console.error('Operation failed');
    }
};

export const move = async (oldPath, newPath) => {
  const filePath = resolve(process.cwd(), oldPath);
  const filename = basename(filePath);
  const newFilePath = resolve(process.cwd(), newPath, filename);  
  try {
      const file = await readFile(newFilePath);
      throw new Error('You can not move this file');
  } catch (error) {
      if (error.message !== 'You can not move this file') {
          try {
              await rename(filePath, newFilePath);
          } catch (error) {
              console.error('Operation failed');
          }
      } else {
          console.error('Operation failed');
      }
  }
};

export const remove = async (path) => {
    try {
        await rm(path);
    } catch (error) {
        console.error('Operation failed');
    }
};

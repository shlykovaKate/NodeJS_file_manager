import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { resolve, basename } from 'path';
import { readFile } from 'fs/promises';

export const compress = async (filePath, brPath) => {
    const path = resolve(process.cwd(), filePath);
    const filename = basename(path);
    const newPath = resolve(process.cwd(), brPath, `${filename}.br`);

    try {
        const file = await readFile(path);
        const brotli = createBrotliCompress();
        const readableStream = createReadStream(path);
        const writableStream = createWriteStream(newPath);

        readableStream.pipe(brotli).pipe(writableStream);

        readableStream.on('error', () => {
            console.error('Operation failed');
        })
        writableStream.on('error', () => {
            console.error('Operation failed');
        })
        brotli.on('error', () => {
            console.error('Operation failed');
        })
    } catch(error) {
        console.error('Operation failed');
    }
};

export const decompress = async (brPath, filePath) => {
    const path = resolve(process.cwd(), brPath);
    const filename = basename(path).replace('.br', '');
    const newPath = resolve(process.cwd(), filePath, `${filename}`);

    try {
        const file = await readFile(path);
        const brotli = createBrotliDecompress();
        const readableStream = createReadStream(path);
        const writableStream = createWriteStream(newPath);
        readableStream.pipe(brotli).pipe(writableStream);

        readableStream.on('error', () => {
          console.error('Operation failed');
        })
        brotli.on('error', () => {
          console.error('Operation failed');
        })
        writableStream.on('error', () => {
          console.error('Operation failed');
        })
    } catch(error) {
        console.error('Operation failed');
    }
};

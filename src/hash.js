import { readFile } from 'fs/promises';

export const calculateHash = async (path) => {
    const { createHash } = await import('crypto');
    const hash = createHash('sha256');

    try {
        const file = await readFile(path, 'utf8');
        hash.update(file);
        console.log(hash.digest('hex'));
    } catch (error) {
        console.error('Operation failed');
    }
};

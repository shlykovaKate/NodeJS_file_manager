import { readdir, access } from 'fs/promises';

export const up = () => {
    process.chdir('../');
};

export const ls = async () => {
    try {
        const files = await readdir(process.cwd());
        console.log(files);
    } catch (error) {
        console.error('Operation failed');
    }
};

export const cd = async (path) => {
    try {
        await access(path);
        process.chdir(path);
    } catch {
        console.error('Operation failed');
    }
};

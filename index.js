import { resolve } from 'path';
import { parseLine } from './src/parseLine.js';
import { parseCommandLineArgs } from './src/parseCommandLineArgs.js';
import { createInterface } from 'readline';
import { getOsEOL, getCPUsInfo, getHomedir, getSystemUserName, getArchitecture } from './src/os.js';
import { calculateHash } from './src/hash.js';
import { compress, decompress } from './src/zlib.js';
import { EOL, homedir } from 'os';
import { read, create, renameFile, copy, remove, move } from './src/fs.js';
import { up, cd, ls } from './src/nwd.js';

export const startFM = async () => {
    const username = parseCommandLineArgs();

    if (username) {
        const rl = createInterface({
            input: process.stdin,
            output: process.stdout
        });
        process.chdir(homedir());
        console.log(`${EOL}You are currently in ${process.cwd()}${EOL}`);

        const commandsWithoutArgs = ['up', 'ls', '.exit'];
        const commandsWithOneArg = ['cd', 'cat', 'add', 'rm', 'os', 'hash'];
        const commandsWithTwoArgs = ['rn', 'cp', 'mv', 'compress', 'decompress'];

        rl.on('line', async (line) => {
            const { commandFromLine, arg1, arg2 } = parseLine(line);
            const isCommandWithoutArgs = commandsWithoutArgs.some((command) => commandFromLine.startsWith(command));
            const isCommandsWithOneArg = commandsWithOneArg.some((command) => commandFromLine.startsWith(command));
            const isCommandsWithTwoArgs = commandsWithTwoArgs.some((command) => commandFromLine.startsWith(command));

            if (isCommandWithoutArgs) {
                switch (commandFromLine) {
                    case 'up': {
                        up();
                        break;
                    }
                    case 'ls': {
                        await ls();
                        break;
                    }
                    case '.exit': {
                        rl.close();
                        break;
                    }
                }
            } else if (isCommandsWithOneArg) {
                if (arg1) {
                    const path = resolve(process.cwd(), arg1);
                    switch (commandFromLine) {
                        case 'cd': {
                            await cd(path);
                            break;
                        }
                        case 'cat': {
                            await read(path);
                            break;
                        }
                        case 'add': {
                            await create(path);
                            break;
                        }
                        case 'rm': {
                            await remove(path);
                            break;
                        }
                        case 'os': {
                            const arg = arg1;
                            switch (arg) {
                                case '--EOL': {
                                    console.log(`${EOL}EOL:`, getOsEOL());
                                    break;
                                }
                                case '--cpus': {
                                    console.log(`${EOL}CPUs info:`, getCPUsInfo());
                                    break;
                                }
                                case '--homedir': {
                                    console.log(`${EOL}HOMEDIR: ${getHomedir()}`);
                                    break;
                                }
                                case '--username': {
                                    console.log(`${EOL}USERNAME: ${getSystemUserName()}`);
                                    break;
                                }
                                case '--architecture': {
                                    console.log(`${EOL}ARCHITECTURE: ${getArchitecture()}`);
                                    break;
                                }
                                default: {
                                    console.error(`${EOL}Invalid input`);
                                }
                            }
                            break;
                        }
                        case 'hash': {
                            console.log(EOL);
                            await calculateHash(path);
                            break;
                        }
                    }
                } else {
                    console.error('Invalid input'); 
                }
            } else if (isCommandsWithTwoArgs) {
                if (arg1 && arg2) {
                    switch (commandFromLine) {
                        case 'rn': {
                            await renameFile(arg1, arg2);
                            break;
                        }
                        case 'cp': {
                            await copy(arg1, arg2);
                            break;
                        }
                        case 'mv': {
                            await move(arg1, arg2);
                            break;
                        }
                        case 'compress': {
                            await compress(arg1, arg2);
                            break;
                        }
                        case 'decompress': {
                            await decompress(arg1, arg2);
                            break;
                        }
                    }
                } else {
                    console.error('Invalid input');
                }
            } else {
                console.error('Invalid input');
            }

            if(commandFromLine !== '.exit') {
                console.log(`${EOL}You are currently in ${process.cwd()}${EOL}`);
            }
        });

        rl.on('close', () => {
            console.log(`Thank you for using File Manager, ${username}!`)
        });
    }
};

startFM();

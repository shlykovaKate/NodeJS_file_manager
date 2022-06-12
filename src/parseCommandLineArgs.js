export const parseCommandLineArgs = () => {

    const isUsernameArg = process.argv.some((argument) => argument.toLocaleLowerCase().startsWith('--username='));

    if (isUsernameArg) {
        const usernameArg = process.argv.find((argument) => argument.toLocaleLowerCase().startsWith('--username='));
        const username = usernameArg.split('=')[1];
        if (username) {
            console.log (`Welcome to the File Manager, ${username}!`);
            return username;
        } else {
            console.log (`The command line argument --username= is empty`);
            return false;
        }
    } else {
        console.log ('There are not TWO command line arguments -- and --username=');
        return false;
    }
};

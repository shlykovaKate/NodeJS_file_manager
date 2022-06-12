export const parseLine = (line) => {
  const command = line.split(' ')[0];
  const args = line.replace(command, '').split(' ').filter((arg) => {
      if (arg) {
          return arg;
      }
  });
  const arg1 = args[0];
  const arg2 = args[1];

  return {
      commandFromLine: command,
      arg1,
      arg2
  }
}

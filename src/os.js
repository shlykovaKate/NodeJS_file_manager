import { EOL, cpus, homedir, userInfo, arch } from 'os';

export const getOsEOL = () => {
  return [EOL];
};

export const getCPUsInfo = () => {
  const allCPUs = cpus();
  const cpusCount = allCPUs.length;
  const modelsAndSpeeds = allCPUs.map(({model}, index) => {
    return [index +1 , model.split(' CPU @ ')[0], model.split('CPU @ ')[1]];
  });
  return {
    CPUs: cpusCount,
    modelsAndSpeeds
  }
};

export const getHomedir = () => {
  return homedir();
};

export const getSystemUserName = () => {
  return userInfo().username;
};

export const getArchitecture = () => {
  return arch();
};

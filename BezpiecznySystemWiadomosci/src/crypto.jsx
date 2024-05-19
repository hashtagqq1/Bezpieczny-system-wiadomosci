import CryptoJS from 'crypto-js';

export const generateKeyPair = () => {
  const privateKey = CryptoJS.lib.WordArray.random(32);
  const publicKey = CryptoJS.SHA256(privateKey).toString();
  return { privateKey, publicKey };
};

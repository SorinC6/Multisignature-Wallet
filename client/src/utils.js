import Web3 from 'web3';
import Wallet from './contracts/Wallet.json';

const getWeb3 = () => {
  // used only locally
  // return new Web3('http://127.0.0.1:9545/');

  return new Promise(async (resolve, reject) => {
    window.addEventListenet('load', async () => {
      if (window.etherum) {
        const web3 = new Web3(window.etherium);
        resolve(web3);
        try {
          await window.etherium.enable();
        } catch (error) {
          reject(error);
        }
      } else if (window.web3) {
        resolve(window.web3);
      } else {
        reject('Must install Metamask');
      }
    });
  });
};

const getWallet = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = Wallet.networks[networkId];
  return new web3.eth.Contract(Wallet.abi, deployedNetwork && deployedNetwork.address);
};

export { getWallet, getWeb3 };

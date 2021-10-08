import React, { useEffect, useState } from 'react';
import { getWeb3, getWallet } from './utils';
import Header from './components/Header';
import Transfer from './components/Transfer';
import TransferList from './components/TransferList';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState(undefined);
  const [quorum, setQuorum] = useState(undefined);
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const init = async () => {
      const web3 = getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);

      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers = await wallet.methods.getTransfers().call();

      setWallet(wallet);
      setAccounts(accounts);
      setWeb3(web3);
      setApprovers(approvers);
      setQuorum(quorum);
      setTransfers(transfers);
    };
    init();
  }, []);

  const createTransfer = (transfer) => {
    console.log(transfer);
    wallet.methods.createTransfer(transfer.amount, transfer.to).send({ from: accounts[0] });
  };

  const approveTransfer = (transferId) => {
    wallet.methods.approveTransfers(transferId).send({ from: accounts[0] });
  };

  if (
    typeof web3 === 'undefined' ||
    typeof accounts === 'undefined' ||
    typeof approvers === 'undefined' ||
    typeof wallet === 'undefined' ||
    typeof quorum === 'undefined'
  ) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <h1>MultiSigApp [WIP]</h1>
      <Header approvers={approvers} quorum={quorum} />
      <Transfer createTransfer={createTransfer} />
      <TransferList transfers={transfers} approveTransfer={approveTransfer} />
    </div>
  );
}

export default App;

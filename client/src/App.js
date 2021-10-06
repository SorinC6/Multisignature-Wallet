import React, { useEffect, useState } from 'react';
import { getWeb3, getWallet } from './utils';
import Header from './components/Header';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState(undefined);
  const [quorum, setQuorum] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const web3 = getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);

      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      console.log('approvers', approvers);
      console.log('quorum', quorum);

      setWallet(wallet);
      setAccounts(accounts);
      setWeb3(web3);
      setApprovers(approvers);
      setQuorum(quorum);
    };
    init();
  }, []);

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
    </div>
  );
}

export default App;

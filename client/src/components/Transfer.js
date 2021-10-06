import React, { useState } from 'react';

const Transfer = ({ createTransfer }) => {
  const [transfer, setTransfer] = useState(undefined);

  const submit = (e) => {
    e.preventDefault();
    createTransfer(transfer);
  };

  const updateTransfer = (e, field) => {
    const value = e.target.value;
    setTransfer({ ...transfer, [field]: value });
  };

  return (
    <div>
      <h3>Create Transfer</h3>
      <form onSubmit={(e) => submit(e)}>
        <label htmlFor="amount">Amount</label>
        <input id="amount" type="text" onChange={(e) => updateTransfer(e, 'amount')} />
        <label htmlFor="to">Amount</label>
        <input id="to" type="text" onChange={(e) => updateTransfer(e, 'to')} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Transfer;

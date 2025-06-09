import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Transfer() {

  const [recipientId,setId]=useState("");
  const [amount,setAmount]=useState("");
  //const [transferStatus,setStatus]=useState("");
  const [disableButton,setDisable]=useState(false);
  const [feedback,setFeedback]=useState("");
  const [hiddenMessage,setHidden]=useState(true);

  
  async function handleClick() {
    setDisable(true);
    setHidden(true);
    const recipient=Principal.fromText(recipientId);
    const transferAmount=Number(amount);

    const result=await token.transfer(recipient,transferAmount);
    setFeedback(result);
    setHidden(false);
    setDisable(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e)=>setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" disabled={disableButton} onClick={handleClick} >
            Transfer
          </button>
        </p>
      </div>
      <p hidden={hiddenMessage}>{feedback}</p>
    </div>
  );
}

export default Transfer;

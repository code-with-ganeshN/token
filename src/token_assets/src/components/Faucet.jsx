import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet() {

  const [disableButton,setDisable]=useState(false);
  const [buttonText,setText]=useState("paisa bhai paisa");

  async function handleClick(event) {
    setDisable(true);
    //const result=await token.payOut();

    const authClient=await AuthClient.create();
    const identity=await authClient.getIdentity();

    const authenticatedCanister=createActor(canisterId,{
      agentOptions:{
        identity,
      },
    });
    
    const result=await authenticatedCanister.payOut();

    setText(result);
    //setDisable(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" disabled={disableButton} onClick={handleClick}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;

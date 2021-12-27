import Web3 from "web3";
import { data } from "./abi.js";
let account;
let contract;
let web3;
export const init = async () => {
  const result1 = await new Promise((resolve) => {
    let provider = window.ethereum;
    if (typeof provider !== "undefined") {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          console.log(accounts);
          account = accounts[0];
          window.ethereum.on("accountsChanged", (accounts) => {
            console.log(accounts);
            account = accounts[0];
          });
          web3 = new Web3(provider);
          web3.eth.defaultAccount = web3.eth.accounts[0];

          const abi = data;
          contract = new web3.eth.Contract(
            abi,
            "0xd6801a1DfFCd0a410336Ef88DeF4320D6DF1883e"
          );
          resolve(contract);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  return result1;
};

export const mint = (value) => {
  return contract.methods
    .mint()
    .send({ from: account, value: Web3.utils.toWei(value, "ether") });
};

export const getAccBal = async () => {
  const result1 = await new Promise((resolve) => {
    contract.methods
      .balanceOfUnderlying(account)
      .call()
      .then((r) => {
        resolve(r);
      });
  });
  return result1;
  // return contract.methods
  //   .balanceOfUnderlying(account)
  //   .call()
  //   .then((result) => {
  //     console.log(result);
  //     console.log(result / 1e18);
  //   });
};

export const redeem = (value) => {
  return contract.methods
    .redeemUnderlying(Web3.utils.toWei(value, "ether"))
    .send({ from: account });
};

export const totalBal = async () => {
  const result1 = await new Promise((resolve) => {
    contract.methods
      .getCash()
      .call()
      .then((r) => {
        resolve(r);
      });
  });
  return result1;
};
export const getApy = async () => {
  const result1 = await new Promise((resolve) => {
    contract.methods
      .supplyRatePerBlock()
      .call()
      .then((srpy) => {
        console.log(srpy);
        resolve((Math.pow((srpy / 1e18) * 6570 + 1, 365) - 1) * 100);
      });
  });
  return result1;
};

export const getBalance = async () => {
  const result1 = await new Promise((resolve) => {
    web3.eth.getBalance(account).then((r) => {
      resolve(r);
    });
  });
  return result1;
};

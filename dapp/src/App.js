import "./App.css";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { init, getBalance, getAccBal, totalBal, getApy } from "./Web3Client";
import "bootstrap/dist/css/bootstrap.min.css";
import Supply from "./components/Supply";
import FormSubmit from "./components/FormSubmit";

function App() {
  const [bal, setBal] = useState(0);
  const [balance, setBalance] = useState(0);
  const [totalSup, setTotalSup] = useState(0);
  const [apy, setApy] = useState(0);

  const update = () => {
    getAccBal().then((r) => setBal(Web3.utils.fromWei(r)));
    totalBal().then((r) => setTotalSup(Web3.utils.fromWei(r)));
    getApy().then((r) => setApy(r));
    getBalance().then((r) => setBalance(Web3.utils.fromWei(r)));
  };
  useEffect(() => {
    init().then((r) => {
      update();
    });
  }, []);
  const [isSupply, setSupply] = useState(true);
  return (
    <div className="container my-3">
      <div className="container mt-5 mb-3">
        <button
          className={
            isSupply ? "btn btn-primary mx-3" : "btn btn-outline-primary mx-3"
          }
          onClick={() => {
            setSupply(true);
          }}
        >
          Supply
        </button>
        <button
          className={
            !isSupply ? "btn btn-primary mx-3" : "btn btn-outline-primary mx-3"
          }
          onClick={() => {
            setSupply(false);
            update();
          }}
        >
          Withdraw
        </button>
      </div>
      <Supply bal={bal} totalSup={totalSup} apy={apy} />
      <br />
      <FormSubmit
        balance={balance}
        onSubmit={update}
        isSupply={isSupply}
        accBal={bal}
      />
    </div>
  );
}

export default App;

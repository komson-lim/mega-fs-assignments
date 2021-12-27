import { useRef, useState } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import { mint, redeem } from "../Web3Client";
import ModalTransaction from "./ModalTransaction";

function FormSubmit(props) {
  const eth = useRef(0);
  const [show, setshow] = useState(false);
  const [tx, settx] = useState();
  const [txFin, settxFin] = useState(false);
  const handleClose = () => {
    setshow(false);
    settxFin(false);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    console.log("vvvvvvv");
    console.log(eth.current.value !== "" ? eth.current.value : 0);
    setshow(true);
    if (props.isSupply) {
      mint(eth.current.value !== "" ? eth.current.value : "0")
        .on("transactionHash", (hash) => {
          console.log(hash);
          settxFin(true);
          settx(hash);
          console.log("sdfsdf");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      redeem(eth.current.value !== "" ? eth.current.value : "0")
        .on("transactionHash", (hash) => {
          console.log(hash);
          settxFin(true);
          settx(hash);
          console.log("sdfsdf");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    props.onSubmit();
  };
  const maxHandler = () => {
    if (props.isSupply) {
      eth.current.value = props.balance;
    } else {
      eth.current.value = props.accBal;
    }
  };
  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title as="h3" style={{ textAlign: "center" }}>
            <strong>{props.isSupply ? "Supply" : "Withdraw"}</strong>
          </Card.Title>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasic">
              <Row className="my-2">
                <Col>{/* <Form.Label>Email address</Form.Label> */}</Col>
                <Col className="col-auto">
                  <Form.Text className="text-muted">
                    Balance: {props.balance} ETH
                  </Form.Text>
                </Col>
              </Row>
              <Row>
                <Col className="col-auto mt-1">
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={maxHandler}
                  >
                    MAX
                  </Button>
                </Col>
                <Col xs={8} className="ms-1">
                  <Form.Control
                    type="number"
                    placeholder="0"
                    ref={eth}
                    step="0.000000000000000001"
                    precision="20"
                  />
                </Col>
                <Col className="col-auto mt-1">ETH</Col>
              </Row>
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit">
                {props.isSupply ? "Supply" : "Withdraw"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <ModalTransaction
        show={show}
        onClose={handleClose}
        tx={tx}
        txFin={txFin}
      />
    </div>
  );
}

export default FormSubmit;

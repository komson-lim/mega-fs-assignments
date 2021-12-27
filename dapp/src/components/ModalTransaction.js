import { Button, Modal } from "react-bootstrap";

function ModalDelete(props) {
  return (
    // <div></div>
    <Modal show={props.show} onHide={props.onClose} centered>
      <Modal.Header>
        <Modal.Title>Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.txFin ? (
          <a
            href={"https://rinkeby.etherscan.io/tx/" + props.tx}
            target="_blank"
          >
            View transaction
          </a>
        ) : (
          "Loading ..."
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onClose}>
          close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDelete;

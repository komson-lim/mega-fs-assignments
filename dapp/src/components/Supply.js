import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import CardInfo from "./CardInfo";

function Supply(props) {
  return (
    <div className="container">
      <Row>
        <Col>
          <CardInfo title="Your Supplied" text={props.bal + " ETH"} />
        </Col>
        <Col>
          <CardInfo title="Total Supplied" text={props.totalSup + " ETH"} />
        </Col>
        <Col>
          <CardInfo title="APY" text={props.apy + " %"} />
        </Col>
      </Row>
    </div>
  );
}

export default Supply;

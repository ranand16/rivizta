import { get } from "lodash";
import React, { MouseEventHandler } from "react";
import { Button, Modal } from "react-bootstrap";

interface IProps { 
  show: boolean,
  onHide: MouseEventHandler<HTMLButtonElement>,
  modalbody: any, 
  size?: "sm" | "lg" | "xl" | undefined,
  heading?: string, 
  showClose?: boolean, 
  secondaryBtnText?: string
}

export default function GenericModal({ 
  show,
  onHide,
  size = "lg",
  heading="Modal heading", 
  modalbody, 
  showClose=true,
  secondaryBtnText="Close" 
}: IProps) {
  return (
    <Modal
      show={show}
      size={size}
      aria-labelledby="contained-modal-title"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title">
          {heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalbody}
      </Modal.Body>
      {
          showClose && 
          <Modal.Footer>{showClose && <Button onClick={onHide}>{secondaryBtnText}</Button>}</Modal.Footer>
      }
    </Modal>
  );
}
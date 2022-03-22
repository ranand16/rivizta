import { get } from "lodash";
import React, { MouseEventHandler } from "react";
import { Button, Modal } from "react-bootstrap";
import { ModalMode } from "../../config/Interfaces";

interface IProps { 
  show: boolean,
  modalbody: any,
  onPrimaryButtonClick?: MouseEventHandler<HTMLButtonElement>,
  onSecondaryButtonClick?: MouseEventHandler<HTMLButtonElement>,
  size?: "sm" | "lg" | "xl" | undefined,
  heading?: string, 
  showPrimaryBtn?: boolean,
  showSecondaryBtn?: boolean, 
  primaryBtnText?: string
  secondaryBtnText?: string
}

export default function GenericModal({ 
  show,
  modalbody, 
  onPrimaryButtonClick = () => {},
  onSecondaryButtonClick = () => {},
  size = "lg",
  heading="Modal heading", 
  showPrimaryBtn=false,
  showSecondaryBtn=false,
  primaryBtnText="Confirm",
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
          (showPrimaryBtn || showSecondaryBtn) && 
          <Modal.Footer>
            {showPrimaryBtn && <Button onClick={onPrimaryButtonClick}>{primaryBtnText}</Button>}
            {showSecondaryBtn && <Button onClick={onSecondaryButtonClick}>{secondaryBtnText}</Button>}            
          </Modal.Footer>
      }
    </Modal>
  );
}
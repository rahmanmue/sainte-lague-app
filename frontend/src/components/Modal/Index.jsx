import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalCustom({ show, handleClose, title, children }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h4 className=" fw-semibold text-center w-100 text-capitalize">
            {title} data
          </h4>
        </Modal.Header>
        <Modal.Body className="px-4">{children}</Modal.Body>
      </Modal>
    </>
  );
}

export default ModalCustom;

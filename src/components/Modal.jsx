export const Modal = () => {
  
  return (
    <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer className="justify-content-start">
          <Form.Check
            label="Only even"
            name="group1"
            // type={type}
            // id={`inline-${type}-2`}
          />
        </Modal.Footer>
      </Modal>
  )
};

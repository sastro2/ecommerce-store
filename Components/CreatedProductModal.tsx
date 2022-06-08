import { Button, Card, Modal } from 'react-bootstrap';

type CreatedProductModalProps = Omit<CreatePageProps, 'userId' | 'roleId'>;

let showModal = false;

export const handleShow = (props: CreatedProductModalProps) => {
  showModal = !showModal;
  props.setRerender(!props.rerender);
};

export default function CreatedProductModal(props: CreatedProductModalProps) {
  return (
    <Modal show={showModal} onHide={() => handleShow(props)}>
      <Modal.Header closeButton>
        <Modal.Title>Product successfully created</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <Card.Img src="https://hinacreates.com/wp-content/uploads/2021/06/dummy2.png" />
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleShow(props)}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleShow(props)}>
          Your Products
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

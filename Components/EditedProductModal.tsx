import { useRouter } from 'next/router';
import { Button, Card, Modal } from 'react-bootstrap';

type DeletedProductModalProps = ProfilePageModalProps;

let showModal = false;

export const editedHandleShow = (props: DeletedProductModalProps) => {
  showModal = !showModal;
  props.setRerender(!props.rerender);
};

export default function EditedProductModal(props: DeletedProductModalProps) {
  const router = useRouter();

  const reroute = async (userId: number) => {
    await router.push(`/User/Profile/${userId}`);
  };

  return (
    <Modal
      show={showModal}
      onHide={async () => {
        editedHandleShow(props);
        await reroute(props.user!.id);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Product successfully edited</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <Card.Img src="https://hinacreates.com/wp-content/uploads/2021/06/dummy2.png" />
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={async () => {
            editedHandleShow(props);
            await reroute(props.user!.id);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ComparePasswordResponseBody } from '../pages/api/Authentication/ComparePassword';
import DeletedProductModal, { deleteHandleShow } from './DeletedProductModal';

type ConfirmPasswordModalProps = ProfilePageModalProps;

let showModal = false;
let currentProduct: Product;

export const confirmPasswordHandleShow = (
  props: ConfirmPasswordModalProps,
  product?: Product,
) => {
  if (product) {
    currentProduct = product;
  }

  showModal = !showModal;
  props.setRerender(!props.rerender);
};

export default function ConfirmPasswordModal(props: ConfirmPasswordModalProps) {
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);

  const comparePassword = async () => {
    if (!props.user) return;

    const response = await fetch(
      'http://localhost:3000/api/Authentication/ComparePassword',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: props.user.username,
          password: password,
        }),
      },
    );

    const comparePasswordResponseBody =
      (await response.json()) as ComparePasswordResponseBody;

    if ('errors' in comparePasswordResponseBody) {
      setErrors(comparePasswordResponseBody.errors);
      return;
    }

    if ('passwordMatches' in comparePasswordResponseBody) {
      console.log(currentProduct);
      if (comparePasswordResponseBody.passwordMatches) {
        await fetch('http://localhost:3000/api/Data/Products/DeleteProduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: currentProduct.id,
          }),
        });

        setErrors([]);

        confirmPasswordHandleShow(props);
        deleteHandleShow(props);
        props.setRerender(!props.rerender);
      }
    }
  };

  return (
    <>
      <DeletedProductModal {...props} />
      <Modal show={showModal} onHide={() => confirmPasswordHandleShow(props)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="password"
              placeholder="Please type in your password"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
            <div>
              {errors.map((error) => {
                return (
                  <div key={`error-${error.message}`}>{error.message}</div>
                );
              })}
            </div>
            <Button
              variant="danger"
              onClick={comparePassword}
              style={{ marginTop: '15px' }}
            >
              Delete
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => confirmPasswordHandleShow(props)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

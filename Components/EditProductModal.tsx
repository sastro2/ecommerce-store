import { useRef, useState } from 'react';
import { Button, Col, Form, ListGroup, Modal, Row } from 'react-bootstrap';
import EditedProductModal, { editedHandleShow } from './EditedProductModal';

type EditProductModalProps = ProfilePageModalProps;

let showModal = false;
let hasRunChangeKeywordsFunction = false;
let currentProduct: Product | undefined;
let iterator = 0;

export const editHandleShow = (
  props: EditProductModalProps,
  product?: Product,
) => {
  if (product) {
    currentProduct = product;
  }

  showModal = !showModal;
  hasRunChangeKeywordsFunction = false;
  props.setRerender(!props.rerender);
};

export default function EditProductModal(props: EditProductModalProps) {
  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const keywordsHandler = useRef<HTMLInputElement>(null);
  const nameHandler = useRef<HTMLInputElement>(null);
  const priceHandler = useRef<HTMLInputElement>(null);
  const descriptionHandler = useRef<HTMLInputElement>(null);

  if (currentProduct && !hasRunChangeKeywordsFunction) {
    setName(currentProduct.product_name);
    setPrice(currentProduct.product_price.toString());
    setDescription(currentProduct.product_description);
    setKeywords(currentProduct.product_keywords.split(','));
    hasRunChangeKeywordsFunction = true;
  }

  const addKeywordToArray = (event: any) => {
    console.log(keywords);
    if (
      event.key === 'Enter' &&
      keyword !== '' &&
      keyword.length <= 20 &&
      keywordsHandler.current !== null
    ) {
      const tempArray = [...keywords, keyword];
      setKeywords(tempArray);
      setKeyword('');
      keywordsHandler.current.value = '';
      props.setRerender(!props.rerender);
    }
  };

  const editTheProduct = async () => {
    if (
      keywordsHandler.current === null ||
      nameHandler.current === null ||
      priceHandler.current === null ||
      descriptionHandler.current === null ||
      !props.user
    ) {
      return;
    }

    const parsedPrice = parseInt(price);
    if (isNaN(parsedPrice)) return;

    const productSlug = name.replace(/ +/g, '-');
    const productName = name;
    const productPrice = parsedPrice;
    const productImgPath =
      'https://hinacreates.com/wp-content/uploads/2021/06/dummy2.png';
    const productDescription = description;
    const productKeywords = keywords.join(',');
    const userId = props.user.id;

    await fetch('/api/Data/Products/EditProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productSlug: productSlug,
        productName: productName,
        productPrice: productPrice,
        productImgPath: productImgPath,
        productDescription: productDescription,
        productKeywords: productKeywords,
        userId: userId,
      }),
    });

    nameHandler.current.value = '';
    priceHandler.current.value = '';
    descriptionHandler.current.value = '';
    keywordsHandler.current.value = '';

    editedHandleShow(props);
    editHandleShow(props);

    setKeyword('');
    setKeywords([]);
    setName('');
    setPrice('');
    setDescription('');
  };

  return (
    <>
      <EditedProductModal {...props} />
      <Modal
        show={showModal}
        onHide={() => {
          editHandleShow(props);
          setKeywords([]);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                placeholder="Name"
                onChange={(event) => setName(event.currentTarget.value)}
                ref={nameHandler}
                value={name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicProductPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                placeholder="Price in €"
                onChange={(event) => setPrice(event.currentTarget.value)}
                ref={priceHandler}
                value={price}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicProductKeywords">
              <Form.Label>Product Keywords</Form.Label>
              <Form.Control
                placeholder="Press ENTER to add a keyword"
                onChange={(event) =>
                  setKeyword(event.currentTarget.value.toLowerCase())
                }
                onKeyDown={addKeywordToArray}
                ref={keywordsHandler}
              />
            </Form.Group>

            <Row>
              {keywords.length > 0 ? (
                <Col lg={1}>
                  <ListGroup horizontal>
                    {keywords.map((word) => {
                      iterator++;
                      return (
                        <ListGroup.Item key={iterator}>{word}</ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                </Col>
              ) : null}
            </Row>

            <Form.Group
              className="mb-3"
              controlId="formBasicProductDescription"
            >
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                placeholder="Description"
                onChange={(event) => setDescription(event.currentTarget.value)}
                ref={descriptionHandler}
                value={description}
              />
            </Form.Group>
            <Button onClick={editTheProduct}>Edit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

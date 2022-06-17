import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRef, useState } from 'react';
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import CreatedProductModal, {
  handleShow,
} from '../../../Components/CreatedProductModal';
import { getUserByValidSessionToken } from '../../../util/Database';

export default function CreateAProduct(props: CreatePageProps) {
  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const keywordsHandler = useRef<HTMLInputElement>(null);
  const nameHandler = useRef<HTMLInputElement>(null);
  const priceHandler = useRef<HTMLInputElement>(null);
  const descriptionHandler = useRef<HTMLInputElement>(null);

  let iterator = 0;

  const addKeywordToArray = (event: any) => {
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

  const createTheProduct = async () => {
    if (
      keywordsHandler.current === null ||
      nameHandler.current === null ||
      priceHandler.current === null ||
      descriptionHandler.current === null
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
    const userId = props.userId;

    await fetch('/api/Data/Products/CreateProduct', {
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

    handleShow(props);

    nameHandler.current.value = '';
    priceHandler.current.value = '';
    descriptionHandler.current.value = '';
    keywordsHandler.current.value = '';

    setKeyword('');
    setKeywords([]);
    setName('');
    setPrice('');
    setDescription('');
  };

  console.log(props.roleId);

  if (props.roleId !== 1) {
    return (
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '3rem',
        }}
      >
        You do not have permission to access this page
      </h1>
    );
  }

  return (
    <>
      <Head>
        <title>Luzon.com</title>
        <meta
          name="Create a product"
          content="Create and customize your own products to sell on Luzon"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <CreatedProductModal {...props} />
        <Form>
          <Form.Group className="mb-3" controlId="formBasicProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              placeholder="Name"
              onChange={(event) => setName(event.currentTarget.value)}
              ref={nameHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicProductPrice">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              placeholder="Price in €"
              onChange={(event) => setPrice(event.currentTarget.value)}
              ref={priceHandler}
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

          <Form.Group className="mb-3" controlId="formBasicProductDescription">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              placeholder="Description"
              onChange={(event) => setDescription(event.currentTarget.value)}
              ref={descriptionHandler}
            />
          </Form.Group>
          <Button onClick={createTheProduct}>Create</Button>
        </Form>
      </Container>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = context.req.cookies.sessionToken;
  const user = await getUserByValidSessionToken(session);

  console.log(user);

  if (!user) {
    return {
      props: {},
    };
  }

  return {
    props: {
      userId: user.id,
      roleId: user.roleId,
    },
  };
}

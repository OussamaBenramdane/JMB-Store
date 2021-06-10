import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match, dispatch]);

  const ingredients = product.composition;
  const ingrTable = [];

  //Ingreedients Table

  for (const key in ingredients) {
    ingrTable.push(
      <tr key={key}>
        <td>{key}</td>{' '}
        <td className='text-muted ms-auto'>{ingredients[key]} / 100 g</td>
      </tr>
    );
  }

  //EXP Date Parsing method

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Return
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={5} className='ms-auto'>
              <Image src={product.image} alt={product.name} fluid></Image>
            </Col>
            <Col className='ms-auto' md={5}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Exp Date: {product.expDate}</ListGroup.Item>
                <ListGroup.Item>
                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            <strong>${product.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {product.countInStock > 0
                              ? 'In Stock'
                              : 'Out Of Stock'}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button
                          className='btn-block'
                          type='button'
                          disabled={product.countInStock === 0}
                        >
                          Add To Carte
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col md={8} className='me-auto'>
              <ListGroup.Item>
                {' '}
                <h3 className='text-info'>Description :</h3>{' '}
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col md={8} className='me-auto'>
              <ListGroup.Item>
                {' '}
                <h3 className='text-info'>Ingredients / Composition :</h3>{' '}
              </ListGroup.Item>
              <ListGroup.Item>
                <table className='table '>
                  <thead>
                    <tr>Valeurs nutritionnelles pour 100 g</tr>
                  </thead>
                  <tbody>{ingrTable}</tbody>
                </table>
              </ListGroup.Item>
            </Col>
          </Row>
          <Row className='mt-5'>
            <Col md={8} className='me-auto'>
              <ListGroup.Item>
                {' '}
                <h3 className='text-info'>Product features :</h3>{' '}
                <h5 className='text-info'>Nutri-score</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={8}>
                    <div>
                      <p>
                        The Nutri-score allows you to identify the nutritional
                        quality of the product at a glance. You can thus
                        identify the products to favor and those to consume
                        occasionally or in small quantities.
                      </p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className='mt-auto'>
                      <img
                        alt=''
                        src={`/nutriscore/${product.nutriScore}.png`}
                        width='100'
                        height='40'
                        className='d-inline-block align-top offset-md-3'
                      />
                    </div>
                  </Col>
                </Row>
                <div>
                  <p>
                    To classify each product, research teams have developed a
                    score that takes into account, for 100 grams of product, the
                    content:
                  </p>
                </div>
                <div>
                  <ul>
                    <li>
                      <p>
                        in nutrients and foods to promote: fiber, protein,
                        fruits and vegetables
                      </p>
                    </li>
                    <li>
                      <p>
                        in nutrients to limit: energy, saturated fatty acids,
                        sugars, salt
                      </p>
                    </li>
                  </ul>
                </div>
              </ListGroup.Item>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductScreen;

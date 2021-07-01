import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  //Compositon
  const [energyKJ, setEnergyKj] = useState('');
  const [energyKcal, setEnergyKcal] = useState('');
  const [fat, setFat] = useState('');
  const [acids, setAcids] = useState('');
  const [carbohydrates, setCarbohydrates] = useState('');
  const [sugars, setSugars] = useState('');
  const [fiber, setFiber] = useState('');
  const [protein, setProtein] = useState('');
  const [salt, setSalt] = useState('');
  //BarreCode
  const [origCode, setOrigCode] = useState('');
  const [fabCode, setFabCode] = useState('');
  const [prodCode, setProdCode] = useState('');
  const [contrCode, setContrCode] = useState('');

  const [isPromp, setIsPromp] = useState(true);
  const [nutriScore, setNutriScore] = useState('');
  const [expDate, setExpDate] = useState('');
  const [prodDate, setProdDate] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setOrigCode(product.barreCode.origCode);

        setFabCode(product.barreCode.fabCode);
        setProdCode(product.barreCode.prodCode);
        setContrCode(product.barreCode.contrCode);

        setIsPromp(product.isPromp);
        setNutriScore(product.nutriScore);
        setExpDate(product.expDate);
        setProdDate(product.prodDate);

        setEnergyKj(product.composition.EnergyKJ);
        setEnergyKcal(product.composition.EnergyKcal);
        setFat(product.composition.Fat);
        setAcids(product.composition.Acids);
        setCarbohydrates(product.composition.Carbohydrates);
        setSugars(product.composition.Sugars);
        setFiber(product.composition.Fiber);
        setProtein(product.composition.Protein);
        setSalt(product.composition.salt);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  const composition = {
    EnergyKJ: energyKJ,
    EnergyKcal: energyKcal,

    Fat: fat,
    Acids: acids,
    Carbohydrates: carbohydrates,
    Sugars: sugars,
    Fiber: fiber,
    Protein: protein,
    salt,
  };
  const barreCode = {
    origCode,
    fabCode,
    prodCode,
    contrCode,
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
        expDate,
        prodDate,
        isPromp,
        nutriScore,
        composition,
        barreCode,
      })
    );
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
                style={{
                  marginTop: '20px',
                  display: 'block',
                }}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <h1>Product composition</h1>
            <Row>
              <Col>
                <Form.Group controlId='EnergyKJ'>
                  <Form.Label>Energy KJ</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Energy KJ'
                    value={energyKJ}
                    onChange={(e) => setEnergyKj(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='EnergyKcal'>
                  <Form.Label>Energy Kcal</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Energy Kcal'
                    value={energyKcal}
                    onChange={(e) => setEnergyKcal(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='Fat'>
                  <Form.Label>Fat</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Fat'
                    value={fat}
                    onChange={(e) => setFat(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId='Acids'>
                  <Form.Label>Acids</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Acids'
                    value={acids}
                    onChange={(e) => setAcids(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='Carbohydrates'>
                  <Form.Label>Carbohydrates</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Carbohydrates'
                    value={carbohydrates}
                    onChange={(e) => setCarbohydrates(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='Sugars'>
                  <Form.Label>Sugars</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Sugars'
                    value={sugars}
                    onChange={(e) => setSugars(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId='Fiber'>
                  <Form.Label>Fiber</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Fiber'
                    value={fiber}
                    onChange={(e) => setFiber(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='Protein'>
                  <Form.Label>Carbohydrates</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Protein'
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='Salt'>
                  <Form.Label>Salt</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Salt'
                    value={salt}
                    onChange={(e) => setSalt(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className='md-3'>
                <Form.Group controlId='Exprd'>
                  <Form.Label>Can be expierd</Form.Label>
                  <Form.Control
                    as='select'
                    type='bool'
                    placeholder='Product expiration'
                    value={isPromp}
                    onChange={(e) => setIsPromp(e.target.value)}
                  >
                    <option>true</option>
                    <option>false</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <h1>Barre code</h1>
            <Row>
              <Col>
                <Form.Group controlId='origCode'>
                  <Form.Label>Country of origine</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter Country of origine code'
                    value={origCode}
                    onChange={(e) => setOrigCode(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='FabCode'>
                  <Form.Label>Producer code</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter Producer Code'
                    value={fabCode}
                    onChange={(e) => setFabCode(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='prodCode'>
                  <Form.Label>Product Code</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter Product Code'
                    value={prodCode}
                    onChange={(e) => setProdCode(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='contrCode'>
                  <Form.Label>Control key</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter Control key'
                    value={contrCode}
                    onChange={(e) => setContrCode(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <h1>Expiration and Production</h1>
            <Row>
              <Col>
                <Form.Group controlId='expDate'>
                  <Form.Label>Expiration date</Form.Label>
                  <Form.Control
                    type='date'
                    placeholder='Enter the expiration date'
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='prodDate'>
                  <Form.Label>Production date</Form.Label>
                  <Form.Control
                    type='date'
                    placeholder='Enter Production date'
                    value={prodDate}
                    onChange={(e) => setProdDate(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='nutriScore'>
              <Form.Label>Nutrition Score</Form.Label>

              <Form.Control
                as='select'
                type='text'
                placeholder='Enter the nutrition score'
                value={nutriScore}
                onChange={(e) => setNutriScore(e.target.value)}
              >
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
                <option>E</option>
              </Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{
                marginTop: '20px',
                display: 'block',
              }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;

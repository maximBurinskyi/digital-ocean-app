import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form, FormGroup, Navbar } from 'react-bootstrap';
import axios from 'axios';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const { state, dispatch: ctxDispatch} = useContext(Store);
  const { userInfo } = state;

  const submitHandler =  async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('https://rhino-api-alquo.ondigitalocean.app/Users/sendPinCodeViaPhone', {
        phone,
        password,
        udid: 'test'
      })
      ctxDispatch({type: 'USER_SIGNIN', payload: data});
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/parse-excel');
      console.log(data);
      
    } catch (err) {
      alert('Invalid email or password')
    }
  }

  const submitHandler2 =  async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('https://rhino-api-alquo.ondigitalocean.app/Users/authenticate', {
        phone,
        password,
        udid: 'test'
      })
      ctxDispatch({type: 'USER_SIGNIN', payload: data});
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/parse-excel');
      console.log(data);
      
    } catch (err) {
      alert('Invalid email or password')

    }
  }

  useEffect(() => {
    if (userInfo) {
        navigate('/');
    }
}, [navigate, userInfo]);

  return (
    <div>
     <Container className='small-container'>
      <h1 className='my-3'>Логин</h1>
      <Form onSubmit={submitHandler2}>
        <FormGroup className='mb-3' controlId='phone' >
          <Form.Label>Телефон</Form.Label>
          <Form.Control type='phone' required onChange={(e) => setPhone(e.target.value)} />
        </FormGroup>

        <FormGroup className='mb-3' controlId='password' >
          <Form.Label>Пароль</Form.Label>
          <Form.Control type='password'  onChange={(e) => setPassword(e.target.value)} />
        </FormGroup>
        <div className='mb-3'>
          <Button type='submit' >Логин</Button>
        </div>
      </Form>
      </Container>
    </div>
  )
}

export default Home

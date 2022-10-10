import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { selectCartArray, placeOrder } from './../../slices/cartSlice';
import { Button } from './../Button/Button';

export const OrderForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');

  const cart = useSelector(selectCartArray);
  const dispatch = useAppDispatch();

  const placeOrderHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const order = cart.map((item) => {
      return { id: item.id, quantity: item.quantity };
    });
    const requestObject = {
      order,
      first_name: firstName,
      last_name: lastName,
      city: city,
      zip_code: zipCode,
    };
    dispatch(placeOrder(requestObject));
  };

  return (
    <form
      className="flex flex-col gap-6 justify-center items-center border-4 rounded-md sm:w-1/2 xl:w-1/4 border-black p-10"
      onSubmit={placeOrderHandler}
    >
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={firstName}
        required
        minLength={4}
        maxLength={50}
        className="border-2 border-black w-full"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        minLength={5}
        maxLength={50}
        required
        value={lastName}
        className="border-2 border-black w-full"
        onChange={(e) => setLastName(e.target.value)}
      />
      <label htmlFor="city">City</label>
      <input
        type="text"
        id="city"
        name="city"
        required
        value={city}
        className="border-2 border-black w-full"
        onChange={(e) => setCity(e.target.value)}
      />
      <label htmlFor="zipCode">Zip Code</label>
      <input
        type="text"
        id="zipCode"
        name="zipCode"
        required
        value={zipCode}
        pattern="\d{2}-\d{3}"
        className="border-2 border-black w-full"
        onChange={(e) => setZipCode(e.target.value)}
      />
      <Button text="I Order and Pay" />
    </form>
  );
};

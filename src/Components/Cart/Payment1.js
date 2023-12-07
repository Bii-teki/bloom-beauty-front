import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

const PayPalClientId = 'YOUR_PAYPAL_CLIENT_ID'; // Replace with your PayPal client ID

function Payment1() {
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: '10.00', // Replace with the amount you want to charge
            currency_code: 'USD', // Change to your desired currency
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    const order = await actions.order.capture();
    // Send the order details to your server for processing
    try {
      await axios.post('/api/process-payment', order);
      // Payment was successful
      console.log('Payment successful');
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div>
      <h1>Complete your payment</h1>
      <PayPalScriptProvider options={{ 'client-id': PayPalClientId }}>
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
      </PayPalScriptProvider>
    </div>
  );
}

export default Payment1;

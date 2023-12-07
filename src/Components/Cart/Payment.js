import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Product from './Product';

function Payment() {
  return (
<div className="mt-8">
        <PayPalScriptProvider options={{ 'client-id': 'WGX598MUFVG8J' }}>
          <PayPalButtons
            createOrder={(_data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: 'USD', // or your currency code
                      value: '408.00', // The total amount for the order
                    },
                  },
                ],
              });
            }}
            onApprove={(_data, actions) => {
              return actions.order.capture().then(function (details) {
                console.log(details);

              });
            }}
          />
        </PayPalScriptProvider>
      </div>
  )
}

export default Payment
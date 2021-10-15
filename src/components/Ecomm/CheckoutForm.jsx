import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import { withAuthorization, withEmailVerification, withAuthentication, AuthUserContext } from '../Session';
import { withRouter, Link } from 'react-router-dom';
import ROUTES from 'common/Routes';
import { withFirebase } from '../Firebase';


function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentMode, setPaymentMode] = useState(true)
  const stripe = useStripe();
  const elements = useElements();
  

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({items: [{ id: "One Year of Scale Navigator" }]})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);

    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setPaymentMode(false)
    }
  };

  return (
    <div align="center">


    {paymentMode && (<form id="payment-form" onSubmit={handleSubmit}>
     
        <p>Upgrade to a pro Account</p>
         <p>$29.99 </p>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />

      <button
        style={{backgroundColor:'blue', color:'white', marginTop:15}}
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
    
    </form>)}

    {succeeded &&(<><p>Awesome! That worked. You are now a pro</p></>)}
  </div>  
  );
}

export default withFirebase (CheckoutForm)
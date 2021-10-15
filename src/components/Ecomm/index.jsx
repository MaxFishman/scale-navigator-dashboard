import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./Ecomm.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe("pk_test_51JjRz3FeioqIIHkQEeKyEDCr2UpFShHWDblur71AEr58xt9PTHiXv7tSYEIaVByOFkLi0jzxVh5hEARcDRHHY5nI000TqADWjm");

export default function Ecomm() {
  return (
    <div align="center" className="App">
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

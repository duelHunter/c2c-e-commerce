import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please try again.");
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Call your backend to create a PaymentIntent
      const { data: clientSecret } = await axios.post(
        "http://localhost:5000/api/create-payment-intent",
        { amount: totalPrice * 100 } // Amount in cents
      );

      // Confirm the payment with the card details
      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setIsProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setPaymentSuccess(true);
        setError(null);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
      />
      {error && <p className="text-red-500">{error}</p>}
      {paymentSuccess && <p className="text-green-500">Payment successful!</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
        disabled={isProcessing || !stripe || !elements}
      >
        {isProcessing ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;

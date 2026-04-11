import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/success",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <form 
        id="payment-form" 
        onSubmit={handleSubmit}
        className="w-full max-w-[500px] min-w-[300px] shadow-lg rounded-lg p-10 bg-white border border-gray-200 self-center"
      >
        <LinkAuthenticationElement
          id="link-authentication-element"
          className="mb-6"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PaymentElement 
          id="payment-element" 
          options={paymentElementOptions} 
          className="mb-6"
        />
        
        <button 
          disabled={isLoading || !stripe || !elements} 
          id="submit"
          className={`w-full bg-[#5469d4] text-white rounded-md py-3 px-4 font-semibold shadow-md transition-all duration-200 ease-in-out cursor-pointer block hover:contrast-[115%] disabled:opacity-50 disabled:cursor-default`}
        >
          <span id="button-text" className="flex items-center justify-center">
            {isLoading ? (
              <div 
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" 
                id="spinner"
              ></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>

        {/* Show any error or success messages */}
        {message && (
          <div 
            id="payment-message"
            className="text-[#697386] text-sm text-center pt-3 font-medium"
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
import axios from "axios";

/* global Razorpay */

export const initiatePayment = async (amount) => {
        try {
            // Create an order on the backend
            const orderResponse = await axios.post("http://localhost:2002/payment/create-order", {
                amount: amount, // Example amount calculation (rate per hour)
            });

            if (orderResponse.data.status) {
                const { id: order_id, amount, currency } = orderResponse.data.order;

                // Razorpay options
                const options = {
                    key: "rzp_test_ZDKLvpt3QrKHB9", // Replace with your Razorpay Key ID
                    amount: amount * 100, // Amount in paise
                    currency: currency,
                    name: "Parker",
                    description: "Parking Payment",
                    image: "https://example.com/your_logo",
                    order_id: order_id,
                    handler: function (response) {
                        alert("Payment Successful!");
                        handlePaymentSuccess(response);
                    },
                    prefill: {
                        name: "John Doe",
                        email: "john.doe@example.com",
                        contact: "9999999999",
                    },
                    notes: {
                        address: "Razorpay Corporate Office",
                    },
                    theme: {
                        color: "#3399cc",
                    },
                };

                const rzp1 = new Razorpay(options);

                // Handle payment failure
                rzp1.on("payment.failed", function (response) {
                    alert("Payment Failed!");
                    console.error(response.error);
                });

                // Open Razorpay payment gateway
                rzp1.open();
            } else {
                alert("Order creation failed!");
            }
        } catch (err) {
            console.error("Error initiating payment:", err);
            alert("An error occurred while initiating payment.");
        }
    };

    const verifyPayment = async (response) => {
    try {
      const verifyResponse = await axios.post("http://localhost:2002/payment/verify-payment", {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      });

      if (verifyResponse.data.status) {
        alert("Payment Verified Successfully!");
      } else {
        alert("Payment Verification Failed!");
      }
    } catch (err) {
      console.error("Error verifying payment:", err);
      alert("An error occurred while verifying payment.");
    }
  };

    const handlePaymentSuccess = (response) => {
        alert("Payment successful! Proceeding to generate the bill...");
        verifyPayment(response); // Proceed to generate the bill
    };
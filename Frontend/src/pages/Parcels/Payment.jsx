import React, { useState } from "react";
import axios from "axios"

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = "This field is required";
    if (!formData.mobile.trim()) formErrors.mobile = "This field is required";
    else if (!/^\d{10}$/.test(formData.mobile))
      formErrors.mobile = "Enter a valid 10-digit mobile number";
    if (!formData.amount.trim()) formErrors.amount = "This field is required";
    else if (isNaN(formData.amount) || Number(formData.amount) <= 0)
      formErrors.amount = "Enter a valid amount";

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
  
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Set form errors if validation fails
      return;
    }
  
    setErrors({}); // Clear errors if validation passes
    const data = {
      name: formData.name,
      mobile: formData.mobile,
      amount: formData.amount,
      MUID: "MUID" + Date.now(),
      transactionId: "T" + Date.now(),
    };
    try {

      // Optional: Add a loading state
      const response = await axios.post("http://localhost:5000/parcel/payment", data);
      console.log("response", response);
  
      if (response.status === 200) {
        alert("Payment details submitted successfully!");
        setFormData({ name: "", mobile: "", amount: "" }); // Clear form fields
      } else {
        alert("Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error("Error submitting payment details:", error);
      alert("Failed to submit payment details. Please check your network and try again.");
    } 
  };
  
  return (
    <div className="bg-gray-800 text-white p-8 rounded-md shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Saman-Bhejo Payment Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full bg-gray-900 border border-gray-600 rounded-md text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Mobile Number Field */}
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="mt-1 p-2 block w-full bg-gray-900 border border-gray-600 rounded-md text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
          )}
        </div>

        {/* Amount Field */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium">
            Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="mt-1 p-2 block w-full bg-gray-900 border border-gray-600 rounded-md text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;

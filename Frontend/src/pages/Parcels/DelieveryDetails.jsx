import React, { useEffect, useState } from "react";
import { useParcelRegistration } from "../../context/ParcelContext";
import axios from "axios"; // Backend par data bhejne ke liye axios ya fetch use karenge
import { useMessage } from "../../context/MessageContext";

const DeliveryDetailsForm = () => {
  const { formData, setFormData, setCurrentState } = useParcelRegistration();
  // const { currentState } = useParcelRegistration();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setTimedMessage } = useMessage();

  let [localFormData, setLocalFormData] = useState({
    fromCity: "",
    fromState: "",
    fromZip: "",
    toCity: "",
    toState: "",
    toZip: "",
    expectedDeliveryDate: "",
  });
  const [errors, setErrors] = useState({});
  // const [isSubmitting, setIsSubmitting] = useState(false); // To control backend submission
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("parcelFormData"));
    if (savedData) {
      setLocalFormData((prevData) => ({
        ...prevData,
        ...savedData,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const updatedData = { ...localFormData, [e.target.name]: e.target.value };
    setLocalFormData(updatedData);
  };

  const validateFields = () => {
    let newErrors = {};
    if (!localFormData.fromCity) newErrors.fromCity = "This field is required";
    if (!localFormData.fromState)
      newErrors.fromState = "This field is required";
    if (!localFormData.fromZip) newErrors.fromZip = "This field is required";
    if (!localFormData.toCity) newErrors.toCity = "This field is required";
    if (!localFormData.toState) newErrors.toState = "This field is required";
    if (!localFormData.toZip) newErrors.toZip = "This field is required";
    if (!localFormData.expectedDeliveryDate)
      newErrors.expectedDeliveryDate = "This field is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (validateFields()) {
      const updatedFormData = { ...formData, ...localFormData };
      setFormData(updatedFormData);
      localStorage.setItem("parcelFormData", JSON.stringify(updatedFormData));
      setIsSubmitting(true);
    }
  };

  useEffect(() => {
    // Form submit only when `isSubmitting` is true and `formData` has updated data
    if (isSubmitting) {
      console.log("Submit: ", isSubmitting);
      const submitDataToBackend = async () => {
        try {
          const response = await axios.post(
            "/api/parcel/getPriceDistance",
            formData
          );
          console.log("Data sent successfully:", formData);
          setTimedMessage("Form submitted successfully!", "success");
          const updatedFormData = { ...formData, ...response.data };
          setFormData(updatedFormData);
          setCurrentState(5);
        } catch (error) {
          const errorMessage =
            error.response?.data?.error ||
            "Failed to submit data. Please try again.";
          console.error("Error submitting data:", errorMessage);
          setTimedMessage(errorMessage); // Display the backend error message in alert
        } finally {
          setIsSubmitting(false); // Reset submitting state
        }
      };
      submitDataToBackend();
    }
  }, [formData, isSubmitting]); // Re-run when `formData` or `isSubmitting` changes

  const handlePrevClick = () => {
    const updatedFormData = { ...formData, ...localFormData };
    localStorage.setItem("parcelFormData", JSON.stringify(updatedFormData));
    setCurrentState(3);
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#000000] overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-6 sm:px-12 lg:px-40 flex flex-1 justify-center py-10">
          <div className="layout-content-container flex flex-col w-full max-w-[600px] bg-[#000000] shadow-xl rounded-lg p-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-4">
                <p className="text-[#f3f2f1] text-sm font-semibold ">
                  Step 4/4
                </p>
              </div>
              <div className="rounded-full bg-gray-700 overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-600"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>
            <h2 className="text-gray-200 text-[24px] font-bold leading-snug tracking-tight pt-6 text-center pb-4">
              Delivery Details
            </h2>

            {/* Form Fields */}
            {[
              {
                label: "From City",
                name: "fromCity",
                placeholder: "E.g. New York",
              },
              {
                label: "From State",
                name: "fromState",
                placeholder: "E.g. NY",
              },
              {
                label: "From Zip Code",
                name: "fromZip",
                placeholder: "E.g. 10001",
              },
              {
                label: "To City",
                name: "toCity",
                placeholder: "E.g. Los Angeles",
              },
              { label: "To State", name: "toState", placeholder: "E.g. CA" },
              {
                label: "To Zip Code",
                name: "toZip",
                placeholder: "E.g. 90001",
              },
              {
                label: "Expected Delivery Date",
                name: "expectedDeliveryDate",
                placeholder: "",
                type: "date",
              },
            ].map((field) => (
              <div key={field.name} className="flex flex-col gap-2 mb-6">
                <label className="text-[#D1D5DB] text-base font-medium">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={localFormData[field.name]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  className="form-input w-full rounded-lg bg-[#0F172A] border border-[#334155] focus:border-[#F4C753] text-[#F9FAFA] placeholder:text-[#6B7280] p-4 text-sm outline-none focus:ring-2 focus:ring-[#F4C753]"
                />
                {errors[field.name] && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors[field.name]}
                  </span>
                )}
              </div>
            ))}

            {/* Buttons */}
            <div className="flex gap-4 px-2 sm:px-4 pt-6">
              <button
                onClick={handlePrevClick}
                className="w-full py-3 rounded-lg bg-gray-700 text-gray-300 font-medium hover:bg-gray-600 transition-all duration-300"
              >
                Prev
              </button>
              <button
                onClick={handleSubmitClick}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetailsForm;

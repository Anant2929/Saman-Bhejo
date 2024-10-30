
import React, { useEffect, useState } from 'react';
import { useParcelRegistration } from '../../context/ParcelContext';
import axios from 'axios'; // Backend par data bhejne ke liye axios ya fetch use karenge

const DeliveryDetailsForm = () => {
  const { formData, setFormData, setCurrentState } = useParcelRegistration();
  const [localFormData, setLocalFormData] = useState({
    fromCity: '',
    fromState: '',
    fromZip: '',
    toCity: '',
    toState: '',
    toZip: '',
    expectedDeliveryDate: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // To control backend submission

  const handleInputChange = (e) => {
    setLocalFormData({ ...localFormData, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    let newErrors = {};
    if (!localFormData.fromCity) newErrors.fromCity = 'This field is required';
    if (!localFormData.fromState) newErrors.fromState = 'This field is required';
    if (!localFormData.fromZip) newErrors.fromZip = 'This field is required';
    if (!localFormData.toCity) newErrors.toCity = 'This field is required';
    if (!localFormData.toState) newErrors.toState = 'This field is required';
    if (!localFormData.toZip) newErrors.toZip = 'This field is required';
    if (!localFormData.expectedDeliveryDate) newErrors.expectedDeliveryDate = 'This field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (validateFields()) {
      setFormData((prevData) => ({ ...prevData, ...localFormData }));
      setIsSubmitting(true); // Set flag to trigger useEffect for submission
    }
  };

  useEffect(() => {
    // Form submit only when `isSubmitting` is true and `formData` has updated data
    if (isSubmitting) {
      const submitDataToBackend = async () => {
        try {
          // const response = await axios.post('/api/delivery', formData); // Replace with your backend API URL
          console.log('Data sent successfully:', formData);
          alert('Form submitted successfully!');
          setCurrentState(1)
        } catch (error) {
          console.error('Error submitting data:', error);
          alert('Failed to submit data. Please try again.');
        } finally {
          setIsSubmitting(false); // Reset submitting state
        }
      };
      submitDataToBackend();
    }
  }, [formData, isSubmitting]); // Re-run when `formData` or `isSubmitting` changes

  const handlePrevClick = () => {
    setCurrentState(3);
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#131C24] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <div className="flex flex-col gap-3 p-4">
              <div className="flex gap-6 justify-between">
                <p className="text-[#F8F9FB] text-base font-medium leading-normal">Step 4/4</p>
              </div>
              <div className="rounded bg-[#32415D]">
                <div className="h-2 rounded bg-[#F4C753]" style={{ width: '100%' }}></div>
              </div>
            </div>
            <h2 className="text-[#F8F9FB] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Delivery Details
            </h2>

                     {/* From City */}
                     <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F8F9FB] text-base font-medium leading-normal pb-2">From City</p>
                <input
                  name="fromCity"
                  value={localFormData.fromCity}
                  onChange={handleInputChange}
                  placeholder="E.g. New York"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F8F9FB] focus:outline-0 focus:ring-0 border border-[#32415D] bg-[#1D2A36] focus:border-[#32415D] h-14 placeholder:text-[#8A9DC0] p-[15px] text-base font-normal leading-normal"
                />
                {errors.fromCity && <span className="text-red-500 text-sm">{errors.fromCity}</span>}
              </label>
            </div>

            {/* From State */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F8F9FB] text-base font-medium leading-normal pb-2">From State</p>
                <input
                  name="fromState"
                  value={localFormData.fromState}
                  onChange={handleInputChange}
                  placeholder="E.g. NY"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F8F9FB] focus:outline-0 focus:ring-0 border border-[#32415D] bg-[#1D2A36] focus:border-[#32415D] h-14 placeholder:text-[#8A9DC0] p-[15px] text-base font-normal leading-normal"
                />
                {errors.fromState && <span className="text-red-500 text-sm">{errors.fromState}</span>}
              </label>
            </div>

            {/* From Zip Code */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F8F9FB] text-base font-medium leading-normal pb-2">From Zip Code</p>
                <input
                  name="fromZip"
                  value={localFormData.fromZip}
                  onChange={handleInputChange}
                  placeholder="E.g. 10001"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F8F9FB] focus:outline-0 focus:ring-0 border border-[#32415D] bg-[#1D2A36] focus:border-[#32415D] h-14 placeholder:text-[#8A9DC0] p-[15px] text-base font-normal leading-normal"
                />
                {errors.fromZip && <span className="text-red-500 text-sm">{errors.fromZip}</span>}
              </label>
            </div>

                      {/* to City */}
                      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F8F9FB] text-base font-medium leading-normal pb-2">to City</p>
                <input
                  name="toCity"
                  value={localFormData.toCity}
                  onChange={handleInputChange}
                  placeholder="E.g. New York"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F8F9FB] focus:outline-0 focus:ring-0 border border-[#32415D] bg-[#1D2A36] focus:border-[#32415D] h-14 placeholder:text-[#8A9DC0] p-[15px] text-base font-normal leading-normal"
                />
                {errors.toCity && <span className="text-red-500 text-sm">{errors.toCity}</span>}
              </label>
            </div>

            {/* to State */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F8F9FB] text-base font-medium leading-normal pb-2">to State</p>
                <input
                  name="toState"
                  value={localFormData.toState}
                  onChange={handleInputChange}
                  placeholder="E.g. NY"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F8F9FB] focus:outline-0 focus:ring-0 border border-[#32415D] bg-[#1D2A36] focus:border-[#32415D] h-14 placeholder:text-[#8A9DC0] p-[15px] text-base font-normal leading-normal"
                />
                {errors.toState && <span className="text-red-500 text-sm">{errors.toState}</span>}
              </label>
            </div>

            {/* to Zip Code */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F8F9FB] text-base font-medium leading-normal pb-2">to Zip Code</p>
                <input
                  name="toZip"
                  value={localFormData.toZip}
                  onChange={handleInputChange}
                  placeholder="E.g. 10001"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F8F9FB] focus:outline-0 focus:ring-0 border border-[#32415D] bg-[#1D2A36] focus:border-[#32415D] h-14 placeholder:text-[#8A9DC0] p-[15px] text-base font-normal leading-normal"
                />
                {errors.toZip && <span className="text-red-500 text-sm">{errors.toZip}</span>}
              </label>
            </div>

            {/* Expected Delivery Date */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#F8F9FB] text-base font-medium leading-normal pb-2">Expected Delivery Date</p>
                <input
                  type="date"
                  name="expectedDeliveryDate"
                  value={localFormData.expectedDeliveryDate}
                  onChange={handleInputChange}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#F8F9FB] focus:outline-0 focus:ring-0 border border-[#32415D] bg-[#1D2A36] focus:border-[#32415D] h-14 placeholder:text-[#8A9DC0] p-[15px] text-base font-normal leading-normal"
                />
                {errors.expectedDeliveryDate && <span className="text-red-500 text-sm">{errors.expectedDeliveryDate}</span>}
              </label>
            </div>

            {/* Prev and Submit Buttons */}
            <div className="flex gap-4 px-4 py-3">
              <button
                onClick={handlePrevClick}
                className="bg-[#32415D] text-white font-medium py-3 px-6 rounded-lg w-full"
              >
                Prev
              </button>
              <button
                onClick={handleSubmitClick}
                className="bg-[#F4C753] text-white font-medium py-3 px-6 rounded-lg w-full"
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

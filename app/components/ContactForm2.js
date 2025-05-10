"use client";
import { useState } from "react";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    message: "",
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message envoyé !");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 ">
      {/* Progression visuelle */}
      <div className="flex items-center justify-between mb-8">
        {["Personal", "Account", "Message", "Confirm"].map((label, index) => {
          const current = index + 1;
          const isActive = step === current;
          const isComplete = step > current;
          return (
            <div
              key={label}
              className="flex flex-col items-center text-center flex-1"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2
                ${
                  isComplete
                    ? "bg-teal-500 text-white"
                    : isActive
                    ? "bg-teal-600 text-white"
                    : "border-2 border-gray-300 text-gray-400"
                }`}
              >
                {current}
              </div>
              <span
                className={`${
                  isActive ? "text-teal-600 font-semibold" : "text-gray-400"
                }`}
              >
                {label.toUpperCase()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Étapes conditionnelles */}
      {step === 1 && (
        <section className="min-h-[400px] bg-gray-50 ">
          <p className="text-center font-thin"> vous pouvez nous contacter par mail ou par telephone ou directement via ce formulaire </p>
          <div className="text-center  grid grid-cols-3 ">
           
          </div>
        </section>
      )}

      {step === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1">Full Name</label>
            <div className="flex gap-2">
              <input
                name="firstName"
                placeholder="First Name"
                className="w-full border p-2 rounded"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                name="lastName"
                placeholder="Last Name"
                className="w-full border p-2 rounded"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Username</label>
            <input
              name="username"
              placeholder="Just a hint.."
              className="w-full border p-2 rounded"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Your Email</label>
            <input
              name="email"
              placeholder="jhon@doe.com"
              className="w-full border p-2 rounded"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <label className="block font-semibold mb-2">Your Message</label>
          <textarea
            name="message"
            rows="5"
            className="w-full border p-3 rounded"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
          />
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4 text-gray-700">
          <p>
            <strong>Full Name:</strong> {formData.firstName} {formData.lastName}
          </p>
          <p>
            <strong>Username:</strong> {formData.username}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Message:</strong> {formData.message}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          disabled={step === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <div className="flex gap-2">
          {step < 4 ? (
            <>
              <button
                type="button"
                className="px-4 py-2 border rounded text-teal-600 border-teal-500"
                onClick={() => alert("Skipped")}
              >
                Skip
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-teal-600 text-white rounded"
                onClick={nextStep}
              >
                Next
              </button>
            </>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-teal-600 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

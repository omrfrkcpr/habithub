import React from "react";
import Navbar from "../layouts/Navbar";
import FormInput from "../components/inputs/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { setContactFormField } from "../features/contactSlice";
import { RootState } from "../app/store";
import { contactFormInputs } from "../helpers/constants";
import { CircleLoader } from "react-spinners";
import useFeedback from "../hooks/useFeedback";
import toastNotify from "../helpers/toastNotify";

const Contact = () => {
  const dispatch = useDispatch();
  const { form, loading } = useSelector((state: RootState) => state.contact);
  const { sendFeedback } = useFeedback();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(`Setting ${name} to ${value}`); // Log to check state updates
    dispatch(setContactFormField({ field: name, value }));
  };

  console.log(form);

  const handleSendFeedback = async () => {
    console.log("Form submitted"); // Log to check form submit
    const { name, email, feedback } = form;

    if (name && email && feedback) {
      await sendFeedback();
    } else {
      toastNotify("warn", "Please fill the contact form!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-start md:justify-center h-[calc(100vh-60px)] mt-[60px] bg-white md:bg-habit-light-gray md:p-6">
        <div className="max-w-4xl w-full bg-white rounded-lg md:shadow-lg p-5 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#CA87F4]">
            Contact Us
          </h1>
          <p className="text-sm md:text-md lg:text-lg mb-6 text-gray-700 text-center">
            If you have any questions, feedback, or need assistance, please feel
            free to reach out to us by filling out the form below. We look
            forward to hearing from you!
          </p>
          <section id="contact-form" className="space-y-4">
            {contactFormInputs.map(({ name, label, type }) => (
              <FormInput
                key={name}
                label={label}
                type={type}
                name={name}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
              />
            ))}
            <div className="flex flex-col space-y-2 mt-4 flex-1">
              <label className="font-semibold text-[11px] md:text-[14px]">
                Feedback
              </label>
              <textarea
                name="feedback"
                value={form.feedback}
                onChange={handleChange}
                className="p-1 border border-gray-300 rounded-md outline-none text-[10px] md:text-[14px] text-black/60"
                rows={4}
                required
              ></textarea>
            </div>
            <button
              onClick={handleSendFeedback}
              className={`w-full bg-[#CA87F4] text-white p-2 rounded-md ${
                loading
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-[#ca87f4dd]"
              } transition duration-300`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex gap-1 items-center justify-center">
                  <span>Submitting...</span>
                  <CircleLoader size={16} color="white" />
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default Contact;

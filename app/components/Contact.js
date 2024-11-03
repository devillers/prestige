// components/Contact.js

'use client';

import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 200) {
        setStatus('Message Sent Successfully!');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        setStatus('Failed to Send Message');
      }
    } catch (error) {
      setStatus('Failed to Send Message');
    }
  };

  return (
    <section className="w-full text-slate-900 grid md:grid-cols-3 gap-6">
      <div className="container max-w-[1200px] mx-auto flex flex-col justify-center p-6 sm:col-span-1 md:col-span-2 ">
        <h1 className="text-2xl text-center md:text-left mt-6">
          Vous avez des questions ou souhaitez un devis personnalisé ?
        </h1>

        <p className="leading-loose text-center md:text-left mt-6 md:pr-10">
          Notre objectif est de vous offrir des solutions personnalisées qui
          répondent à vos attentes en toute transparence. N'hésitez pas à
          demander un devis gratuit pour évaluer vos besoins.
        </p>

        <p className="font-extrabold text-center md:text-left mt-6 md:pr-10">
          Care Prestige Sallanches
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 space-y-6 p-6">
        <div>
          <label className="block mb-1">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border text-black"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border text-black"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-pink-600 rounded-md text-white p-2 w-full md:w-1/2"
        >
          Envoyer
        </button>
        {status && <p className="p-6 text-pink-300">{status}</p>}
      </form>
    </section>
  );
};

export default Contact;

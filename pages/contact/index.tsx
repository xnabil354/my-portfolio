import { createRef, useState, useRef } from 'react';
import type { SyntheticEvent } from 'react';
import { motion } from 'framer-motion';
import { contentAnimation, fadeAnimation } from '@/data/animations';
import { contacts } from '@/data/contacts';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [messageAlert, setMessageAlert] = useState(false);


  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      subject: { value: string };
      message: { value: string };
    };

    fetch('/api/contact-form', {
      method: 'POST',
      body: JSON.stringify({
        name: target.name.value,
        email: target.email.value,
        subject: target.subject.value,
        message: target.message.value,
      }),
    })
      .then(() => {
        if (formRef.current && formRef.current.reset) formRef.current.reset();
        setMessageAlert(true);
        setOpenModal(true);
      })
      .catch(() => {
        setMessageAlert(false);
        setOpenModal(true);
      });
  };

  const handleReset = () => {
    if (formRef.current) {
      (formRef.current as HTMLFormElement).reset();
    }
  };



  return (
    <section className="relative flex w-full flex-col items-center justify-evenly py-40 md:h-screen md:flex-row md:overflow-hidden">
      <motion.span
        {...fadeAnimation}
        className="fixed left-0 -bottom-32 origin-top-left -rotate-90 text-9xl font-extrabold text-secondary-dark md:bottom-0 md:rotate-0">
        CONTACT
      </motion.span>

      <motion.div
        {...contentAnimation}
        className="relative my-10 w-9/12 text-right md:my-0 md:w-2/5">
        {contacts.map((contact, id) => (
          <a
            key={id}
            target="_blank"
            href={contact.url}
            rel="noreferrer noopener nofollow"
            className="my-4 flex justify-end fill-secondary-light transition-all duration-500 hover:fill-primary-light hover:text-primary-light">
            <div className="mr-8">
              <h4 className="text-base">{contact.name}</h4>
              <h3 className="text-sm font-extralight">{contact.value}</h3>
            </div>
            <div className="h-12 w-12">
              <svg
                className="p-1"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path d={contact.svg} />
              </svg>
            </div>
          </a>
        ))}
      </motion.div>

      <motion.div {...contentAnimation} className="relative my-10 w-9/12 md:my-0 md:w-1/3">
        <div className="relative w-full md:w-4/5">
          <form ref={formRef} onSubmit={submitForm}>
            <input
              type="text"
              name="name"
              className="mb-3 w-full rounded-md border border-secondary-light bg-primary-dark px-4 py-1 transition duration-500 ease-in-out placeholder:text-secondary-light hover:border-primary-light hover:bg-secondary-dark hover:text-primary-light hover:outline-none focus:border-primary-light focus:bg-secondary-dark focus:text-primary-light focus:outline-none"
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              className="mb-3 w-full rounded-md border border-secondary-light bg-primary-dark px-4 py-1 transition duration-500 ease-in-out placeholder:text-secondary-light hover:border-primary-light hover:bg-secondary-dark hover:text-primary-light hover:outline-none focus:border-primary-light focus:bg-secondary-dark focus:text-primary-light focus:outline-none"
              placeholder="Email"
              required
            />
            <input
              type="text"
              name="subject"
              className="mb-3 w-full rounded-md border border-secondary-light bg-primary-dark px-4 py-1 transition duration-500 ease-in-out placeholder:text-secondary-light hover:border-primary-light hover:bg-secondary-dark hover:text-primary-light hover:outline-none focus:border-primary-light focus:bg-secondary-dark focus:text-primary-light focus:outline-none"
              placeholder="Subject"
              required
            />
            <textarea
              name="message"
              className="mb-2 h-40 w-full rounded-md border border-secondary-light bg-primary-dark px-4 py-1 transition duration-500 ease-in-out placeholder:text-secondary-light hover:border-primary-light hover:bg-secondary-dark hover:text-primary-light hover:outline-none focus:border-primary-light focus:bg-secondary-dark focus:text-primary-light focus:outline-none"
              placeholder="Write your message..."
              required
            />
            <button
              onSubmit={handleReset}
              type="submit"
              className="w-full cursor-none rounded-md border border-secondary-light bg-primary-dark px-4 py-1 font-semibold transition duration-500 ease-in-out placeholder:text-secondary-light hover:border-primary-light hover:bg-secondary-dark hover:text-primary-light hover:outline-none focus:border-primary-light focus:bg-secondary-dark focus:text-primary-light focus:outline-none">
              Send Message
            </button>
          </form>

          <div
            className={`absolute left-0 -top-12 flex w-full justify-center rounded-md border border-secondary-light bg-secondary-dark py-1 transition-all duration-500 md:-left-[80%] ${!openModal ? 'hidden' : ''
              }`}>
            <p className="font-semibold text-primary-light">
              {messageAlert ? 'Thanks, Message Sent!' : 'Sorry, Message Not Sent!'}
            </p>
            <p
              className="absolute right-0 top-0 py-[3px] px-4 font-bold transition-all duration-500 hover:text-primary-light"
              onClick={() => setOpenModal(false)}>
              x
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

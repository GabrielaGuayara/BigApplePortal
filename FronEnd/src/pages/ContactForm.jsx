import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm(
            'service_t6irti8', // Replace with your service ID
            'template_c4vbj9i', // Replace with your template ID
            form.current,
            '-J2ktRsUyo3rjSXie' // Replace with your public key
        ).then(
            () => {
                toast.success('SUCCESS!');
            },
            (error) => {
                toast.error('FAILED...', error.text);
            }
        );
    };
    

    return (
        <div className="min-h-screen bg-[#F0F6EF] flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-[#023e8a]">Contact Us</h2>
                </div>
                <form className="mt-8 space-y-6" ref={form} onSubmit={sendEmail}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#E7EAED] placeholder-[#373A40] text-[#373A40] rounded-t-md focus:outline-none focus:ring-[#006992] focus:border-[#006992] focus:z-10 sm:text-sm"
                                placeholder="Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#E7EAED] placeholder-[#373A40] text-[#373A40] focus:outline-none focus:ring-[#006992] focus:border-[#006992] focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="sr-only">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#E7EAED] placeholder-[#373A40] text-[#373A40] rounded-b-md focus:outline-none focus:ring-[#006992] focus:border-[#006992] focus:z-10 sm:text-sm"
                                placeholder="Your message"
                                rows={4}
                            ></textarea>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#023e8a] hover:bg-[#27476E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006992]"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;

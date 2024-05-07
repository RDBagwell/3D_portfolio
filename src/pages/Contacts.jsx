import React, { Suspense, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Fox from '../models/Fox';
import UseAlert from '../hooks/UseAlert';
import Alert from '../components/Alert';

const Contacts = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimaton, setCurrentAnimaton] = useState('idle');

  const formRef = useRef();
  const {alert, showAlert, hideAlert} = UseAlert();

  const handleChang = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handelFocus = () => setCurrentAnimaton('walk');
  const handelBlur = () => setCurrentAnimaton('idle');
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID)
    setIsLoading(true);
    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: "Robert Bagwell",
        from_email: form.email,
        to_email: 'erbagwell@yahoo.com',
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setIsLoading(false);
      setCurrentAnimaton('hit');
      showAlert({text: "Message sent successfuly.", type: 'success'});

      setTimeout(() => {
        setCurrentAnimaton('idle');
        hideAlert()
        setForm(
          {
            name: '',
            email: '',
            message: ''
          }
        );
      }, 3000);
    }).catch((err) => {
      setIsLoading(false);
      setCurrentAnimaton('idle');
      showAlert({text: `Error: ${err}`})
    });
  }

  return (
    <section className='relative flex lg:flex-row flex-col max-container h-[100vh]'>
      {alert.show && <Alert {...alert} />}
      <div className="flex-1 min-w0[50%] flex flex-col">
        <h1 className="head-text">Get In Touch</h1>
        <form
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <label className='text-black-500 font-semibold'>
            Name
            <input
              name='name'
              type='text'
              placeholder='John'
              className='input'
              required
              value={form.name}
              onChange={handleChang}
              onFocus={handelFocus}
              onBlur={handelBlur}
            />
          </label>
          <label className='text-black-500 font-semibold'>
            Email
            <input
              name='email'
              type='email'
              placeholder='John@doe.com'
              className='input'
              required
              value={form.email}
              onChange={handleChang}
              onFocus={handelFocus}
              onBlur={handelBlur}
            />
          </label>
          <label className='text-black-500 font-semibold'>
            Your Message
            <textarea
              name='message'
              rows='4'
              placeholder='Write your thoughts here...'
              className='textarea'
              required
              value={form.message}
              onChange={handleChang}
              onFocus={handelFocus}
              onBlur={handelBlur}
            />
          </label>
          <button
            type='submit'
            className='btn'
            onFocus={handelFocus}
            onBlur={handelBlur}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000
          }}
        >
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          <pointLight />
          <spotLight />
          <Suspense fallback={<Loader />}>
            <Fox
              position={[0.5, 0.35, 0]}
              scale={[0.5, 0.5, 0.5]}
              rotation={[12.629, -0.6, 0]}
              currentAnimaton={currentAnimaton}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}
export default Contacts
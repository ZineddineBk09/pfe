import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Header2 from '../../Header2'

import { setClientImage } from '../../../React-Context-Api/Actions/clientActions'

export default function Register() {
  const router = useRouter()
  const initialValues = {
    username: '',
    email: '',
    password: '',
  }

  const [values, setValues] = useState(initialValues)
  //Error message when the client sign up
  const [err, setErr] = useState('')
  const [disableSubmit, setDisableSubmit] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('/api/clients', {
      method: 'POST',
      body: JSON.stringify({
        date: new Date(),
        ...values,
      }),
    }).then((result) => {
      console.log('Sign up result : ', result)
      if (!result.ok) {
        console.log('Error:  ', result)
        setErr(result.error)
        //setValues(initialValues)
        setErr('Email, username existe déjà')
      } else {
        setDisableSubmit(true)
        alert('Vérifier votre email pour activer votre compte.')
        //router.push('/client/auth/signin')
      }
    })
  }

  const handleInputChange = (e) => {
    //Reset the err message to empty message
    setErr('')
    console.log('handleInputChange : ', values)
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  return (
    <div className='flex mt-10 bg-slate-900/20 h-screen'>
      <Header2 hideSearch={true} hideBasket={true} hideOptions={true} />
      <div className='mt-16 border-slate-700 m-auto w-full max-w-md rounded-lg border bg-white px-1'>
        <div className='text-primary m-6'>
          <div className='mt-3 flex flex-col items-center justify-center'>
            {err && (
              <p className='text-red-500 font-medium text-sm bg-red-200 p-1 rounded'>
                {err}
              </p>
            )}
            <h1 className='text-primary mt-4 mb-2 text-2xl font-medium'>
              Créez votre compte
            </h1>
          </div>
          <form action='' onSubmit={handleSubmit}>
            {/* ----------------Nom------------- */}
            <label className='text-left'>
              Quel est votre nom? <i className='text-red-500'>*</i>
            </label>
            <input
              name='username'
              type='text'
              value={values.username}
              onChange={handleInputChange}
              placeholder='nom'
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              maxLength='12'
              required
            />
            {/* ----------------E-mail------------- */}
            <label className='text-left'>
              Quel est votre e-mail? <i className='text-red-500'>*</i>
            </label>
            <input
              name='email'
              type='email'
              value={values.email}
              onChange={handleInputChange}
              placeholder='E-mail'
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              required
            />
            {/* ----------------Password------------- */}
            <label className='text-left'>
              Entrer votre mot de passe <i className='text-red-500'>*</i>
            </label>
            <input
              name='password'
              type='password'
              value={values.password}
              onChange={handleInputChange}
              placeholder='mot de passe'
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              required
            />
            <div className='mt-3 flex items-center justify-center'>
              <button
                className={
                  'disabled:opacity-60 text-md border-blue rounded border bg-amber-500 py-2 px-4 text-white hover:bg-amber-400 focus:border-black focus:outline-none'
                }
                disabled={disableSubmit}
                type='submit'
              >
                S&apos;inscrire
              </button>
            </div>
          </form>
          <div className='mt-3 flex items-center justify-center'>
            <Link href='/client/auth/signin' passHref>
              <a className='justify-center text-amber-500 hover:underline'>
                Besoin de vous connecter ? Connectez vous maintenant
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

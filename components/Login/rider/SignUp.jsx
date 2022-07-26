import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header2 from '../../Header2'
import { useStateValue } from '../../../React-Context-Api/context'
import { getCookie } from '../../../lib/useCookie'

export default function SignUp() {
  const router = useRouter()
  const initialValues = {
    username: '',
    email: '',
    phoneNumber: '',
    haveTransport: false,
    havePermis: false,
    militaryFree: false,
    startingDate: new Date(),
    region: '',
    password: '',
    passwordConfirm: '',
  }

  const [values, setValues] = useState(initialValues)

  //Error message when the client sign up
  const [err, setErr] = useState('')
  const [disableSubmit, setDisableSubmit] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('values submited: ', values)
    if (values.password === values.passwordConfirm) {
      await fetch('/api/riders', {
        method: 'POST',
        body: JSON.stringify({
          date: new Date(),
          ...values,
          //password: await hashPassword(values.password),
        }),
      }).then((result) => {
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
    } else {
      alert('password not match')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setDisableSubmit(false)
    console.log('handleInputChange : ', values)

    if (name === 'region') {
      console.log('region : ', JSON.parse(value))
      setValues({
        ...values,
        region: {
          name: JSON.parse(value).name,
          isoCode: JSON.parse(value).id,
        },
      })
    } else {
      setValues({
        ...values,
        [name]: value,
      })
    }
  }

  const [regions, setRegions] = useState([])

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        //fetch the regions(willayas)
        const response = await fetch(`/api/regions/allRegions`)
        await response.json().then((data) => {
          setRegions(data)
        })
      } catch (err) {
        alert(err)
      }
    }
    fetchRegions()
  }, [])

  return (
    <div className='flex mt-10 bg-slate-900/20'>
      <Header2 hideSearch={true} hideBasket={true} hideOptions={true} />

      <div className='mt-8 border-slate-700 m-auto w-full max-w-md rounded-lg border bg-white px-1'>
        <div className='text-primary m-6'>
          <div className='mt-3 flex flex-col items-center justify-center'>
            {err && (
              <p className='text-red-500 font-medium text-sm bg-red-200 p-1 rounded'>
                {err}
              </p>
            )}
            <h1 className='text-primary mt-4 mb-2 text-2xl font-medium'>
              Créez votre compte livreur
            </h1>
          </div>
          <form action='/rider/auth/signup' onSubmit={handleSubmit}>
            {/* ----------------Nom------------- */}
            <label className='text-left'>
              Quel est votre nom? <i className='text-red-500'>*</i>
            </label>
            <input
              name='username'
              type='text'
              value={values.name}
              onChange={handleInputChange}
              placeholder='nom'
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
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

            {/* ----------------Num téléphone------------- */}
            <label>
              Quel est votre numéro de téléphone?{' '}
              <i className='text-red-500'>*</i>
            </label>
            <div className='flex'>
              <p
                className={
                  'text-primary mb-4 rounded-md border p-2 text-sm outline-none'
                }
              >
                +213
              </p>
              <input
                name='phoneNumber'
                type='text'
                value={values.phoneNumber}
                onChange={handleInputChange}
                placeholder='0000 000 000'
                className={
                  'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
                }
                reaquired
              />
            </div>

            {/* ----------------Transport------------- */}
            <label className='text-left'>
              Avez-vous un moyen de transport? <i className='text-red-500'>*</i>
            </label>
            <select
              name='haveMoto'
              value={values.haveMoto}
              onChange={handleInputChange}
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out cursor-pointer'
              }
              required
            >
              <option value={null}>Sélectionner </option>
              <option value={true}>Oui </option>
              <option value={false}>Non </option>
            </select>

            {/* ----------------Permis------------- */}
            <label className='text-left'>
              Avez-vous le permis de catégorie A?{' '}
              <i className='text-red-500'>*</i>
            </label>
            <select
              name='havePermis'
              value={values.havePermis}
              onChange={handleInputChange}
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out cursor-pointer'
              }
              required
            >
              <option value={null}>Sélectionner </option>
              <option value={true}>Oui </option>
              <option value={false}>Non </option>
            </select>

            {/* ----------------Service militaire------------- */}
            <label className='text-left'>
              Etes-vous dégagés du service militaire?
              <i className='text-red-500'>*</i>
            </label>
            <select
              name='militaryFree'
              value={values.militaryFree}
              onChange={handleInputChange}
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out cursor-pointer'
              }
              required
            >
              <option value={null}>Sélectionner </option>
              <option value={true}>Oui </option>
              <option value={false}>Non </option>
            </select>

            {/* ------------Region------------- */}
            <label className='text-left'>
              Willaya <i className='text-red-500'>*</i>
            </label>
            <select
              name='region'
              value={values.region}
              onChange={(e) => handleInputChange(e)}
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'
              }
              required
            >
              <option value={null}>
                {values.region?.name
                  ? values.region.isoCode + ' - ' + values.region?.name
                  : 'Sélectionner'}
              </option>
              {regions.map((state) => (
                <option
                  value={JSON.stringify(state)}
                  key={state.id || Math.random() * 1000}
                >
                  {state.id + ' - ' + state.name}
                </option>
              ))}
            </select>

            {/* ----------------Date de debut------------- */}
            <label className='text-left'>
              A partir de quand pouvez vous commencer?
              <i className='text-red-500'>*</i>
            </label>
            <input
              name='startingDate'
              type='date'
              value={values.startingDate}
              onChange={handleInputChange}
              className={
                'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out cursor-pointer'
              }
              required
            />

            {/* ----------------Mot de passe------------- */}
            <label className='text-left'>
              Créez votre mot de passe
              <i className='text-red-500'>*</i>
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
              minLength='6'
              required
            />

            {/* ----------------Confirmer mot de passe------------- */}
            <label className='text-left'>
              Confirmer votre mot de passe <i className='text-red-500'>*</i>
            </label>
            <input
              name='passwordConfirm'
              type='password'
              value={values.passwordConfirm}
              onChange={handleInputChange}
              placeholder='mot de passse'
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
                type='submit'
                disabled={disableSubmit}
              >
                S&apos;inscrire
              </button>
            </div>
          </form>
          <div className='mt-3 flex items-center justify-center'>
            <Link href='/rider/auth/signin' passHref>
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

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { set, useForm } from "react-hook-form";
const inter = Inter({ subsets: ['latin'] })
import { useState } from 'react'
export default function Home() {
  const [user, setUser] = useState({
    name: '',
    surname: '',
    email: '',
    checkbox: false
  })
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      checkbox: false
    }
  });
  function onSubmit(data) {
    console.log(data)
    setUser({
      name: data.name,
      surname: data.surname,
      email: data.email,
      checkbox: data.checkbox
    })
    console.log(user);
    reset()
  }
  return (
    <>
      <div className='h-screen flex items-center'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-1/3 mx-auto'>
          <div className='mb-2 '>
            <input
              name='name'
              type="text"
              placeholder="Name"
              className='w-full h-10 px-3 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
              {...register("name", { required: true })}
            />
            {errors.name && <span className='text-red-500'>This field is required</span>}
          </div>
          <div className='mb-2'>
            <input
              placeholder='Surname'
              type='text'
              className='w-full h-10 px-3  text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
              {...register("surname", { required: true })}
            />
            {errors.surname && <span className='text-red-500'>This field is required</span>}
          </div>
          <div className=''>
            <input
              type='email'
              placeholder='Email'
              className='w-full h-10 px-3 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email?.type === "required" ? <span className='text-red-500'>This field is required</span> : null}
            {(errors.email && errors.email?.type) === "pattern" && <span className='text-red-500'>Email is not valid</span>}
          </div>
          <div className="flex flex-row m items-center">
            <label>
              Do you wanna subscribe the newsletter?
            </label>
            <input
              type="checkbox"
              className='ml-2 p-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
              {...register("checkbox")}
            />
          </div>
          <input
            type='submit'
            className='w-full h-10 px-3 mb-2 text-base text-gray-700 border rounded-lg cursor-pointer focus:shadow-outline transition-colors duration-300 hover:bg-cyan-300'
          />
        </form>
      </div>
      {
        (user.checkbox && user.surname && user.name && user.email) &&
        <div>
          <h1 className='text-2xl font-bold'>{user.name} {user.surname}</h1>
          <h2 className='text-xl font-bold'>{user.email}</h2>
          <h3 className='text-xl font-bold'>{user.checkbox ? 'Yes' : 'No'}</h3>
        </div>
      }
    </>
  )
}

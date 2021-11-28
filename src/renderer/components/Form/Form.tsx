import React, { PropsWithChildren } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router";
import Loader from "../Loader";
import WrapIcon from "../WrapIcon";

interface FormProps {
  title: string
  layout: string
  isLoading: boolean
}

const Form = ({ title, layout, isLoading, children }: PropsWithChildren<FormProps>) => {
  const navigate = useNavigate()

  const classes = [
    layout,
    'container',
    'flex',
    'flex-col',
    'gap-4',
    'py-6'
  ].join(' ')

  function back() {
    navigate(-1)
  }

  return (
    <div className={classes}>
      <WrapIcon icon={<MdArrowBack />} content="Back" onClick={back.bind(this)} />

      <h1>{title}</h1>

      <div className={`absolute gap-6 top-0 bottom-0 left-0 right-0 bg-icon bg-opacity-50 ${isLoading ? 'block' : 'hidden'}`}>
        <div className="h-screen flex-col flex items-center justify-center">
          <h1>Loading...</h1>
          <Loader />
        </div>
      </div>

      {children}
    </div>
  )
}

export default Form
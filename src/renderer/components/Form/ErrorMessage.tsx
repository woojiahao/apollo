import React from "react";
import { MdError } from "react-icons/md";

interface ErrorMessageProps {
  message: string
  visibility: boolean
}

const ErrorMessage = ({ message, visibility }: ErrorMessageProps) => {
  return (
    <div className={`${visibility ? 'block' : 'hidden'} flex flex-row border-red bg-red-lighter border-2 rounded-md box-border px-4 py-4`}>
      <MdError className="fill-current text-white mr-4" />
      <p className="text-white font-bold">{message}</p>
    </div>
  )
}

export default ErrorMessage
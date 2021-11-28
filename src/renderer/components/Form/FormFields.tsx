import React, { PropsWithChildren } from "react";
import ErrorMessage from "./ErrorMessage";

interface FormFieldsProps {
  error: string
}

const FormFields = ({ error, children }: PropsWithChildren<FormFieldsProps>) => {
  return (
    <div className="mb-4 flex flex-col gap-4">
      <ErrorMessage visibility={error !== undefined} message={error} />
      {children}
    </div>
  )
}

export default FormFields
import React, { PropsWithChildren } from "react";

interface FormSectionProps {
  title: string
  visibility?: boolean | undefined
}

const FormSection = ({ title, visibility, children }: PropsWithChildren<FormSectionProps>) => {
  return (
    <div className={`flex-col gap-4 ${visibility === undefined ? 'flex' : visibility ? 'flex' : 'hidden'}`}>
      <h2>{title}</h2>
      {children}
    </div>
  )
}

export default FormSection
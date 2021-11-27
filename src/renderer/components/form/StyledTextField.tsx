import React from "react";

interface StyledTextFieldProps {
  title: string
  label: string
}

const StyledTextField = React.forwardRef<HTMLInputElement, StyledTextFieldProps>(({ title, label }, ref) => {
  return (
    <div className="flex flex-col">
      <label className="block mb-2 text-subtitle font-bold" htmlFor={label}>{title}</label>
      <input ref={ref} type="text" id={label} name={label} className="py-2 px-4 rounded-md border-2 border-icon" />
    </div>
  )
})

export default StyledTextField
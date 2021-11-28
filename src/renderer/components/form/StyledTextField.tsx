import React from "react";

interface StyledTextFieldProps {
  title: string
  label: string
  disabled?: boolean
  value?: string
}

const StyledTextField = React.forwardRef<HTMLInputElement, StyledTextFieldProps>(({ title, label, disabled, value }, ref) => {
  // TODO: Fix disabled styling
  return (
    <div className="flex flex-col">
      <label className="block mb-2 text-subtitle font-bold" htmlFor={label}>{title}</label>
      <input
        ref={ref}
        type="text"
        id={label}
        name={label}
        disabled={disabled}
        defaultValue={value}
        className="py-2 px-4 rounded-md border-2 border-icon disabled:bg-disabled:font-bold:text-subtitle" />
    </div>
  )
})

export default StyledTextField
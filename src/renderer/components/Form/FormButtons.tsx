import React, { PropsWithChildren } from "react";

const FormButtons = ({ children }: PropsWithChildren<any>) => {
  return (
    <div className="flex gap-4 justify-end">
      {children}
    </div>
  )
}

export default FormButtons
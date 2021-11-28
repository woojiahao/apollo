import React from "react";

interface StyledButtonProps {
  text: string
  color: 'bg-red' | 'bg-accent'
  className?: string
  onClick?: () => void
}

const StyledButton = ({ text, color, className, onClick }: StyledButtonProps) => {
  const classes = [
    className,
    color,
    `hover:${color}-darker`,
    'py-2',
    'px-6',
    'rounded-md'
  ].join(' ')

  return (
    <button type="button" onClick={onClick} className={classes}>
      <span className="font-bold text-background">{text}</span>
    </button>
  )
}

export default StyledButton
import React, { createRef, useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

interface AutocompleteProps {
  title: string
  label: string
  initialData: string[]
}

const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  ({ title, label, initialData }, ref) => {
    const [data, setData] = useState<string[]>(initialData)
    const [selection, setSelection] = useState<string>(undefined)
    const [dropdownShown, setDropdownShown] = useState(false)

    const dataRef = createRef<HTMLUListElement>()

    function onInput(e: React.FormEvent<HTMLInputElement>) {
      const input = e.currentTarget.value
      const updatedData = initialData.filter(d => d.includes(input))
      setData(updatedData)
      if (updatedData.length === 0) {
        setData([input])
      }
    }

    function onSelect(selection: string) {
      setDropdownShown(false)
      setSelection(selection)
      setData(initialData.concat([selection]))
    }

    return (
      <div className="flex flex-col relative">
        <label className="block mb-2 text-subtitle font-bold" htmlFor={label}>{title}</label>
        <div className="flex w-full">
          <input
            ref={ref}
            type="text"
            onInput={onInput}
            onFocus={() => setDropdownShown(true)}
            defaultValue={selection}
            id={label}
            name={label}
            className="flex-1 py-2 px-4 rounded-md rounded-r-none border-2 border-r-0 border-icon focus:outline-none" />

          <div className="flex items-center cursor-pointer h-full rounded-md rounded-l-none border-2 border-l-0 border-icon"
            onClick={() => setDropdownShown(!dropdownShown)}>
            {dropdownShown ? <MdExpandLess className="w-8 h-8" /> : <MdExpandMore className="w-8 h-8" />}
          </div>
        </div>

        <ul className={`bg-background hidden-scroll max-h-32 ${dropdownShown ? 'block' : 'hidden'}`} ref={dataRef}>
          {data.map(d => <li className={`py-2 px-4 hover:bg-hover cursor-pointer ${d === selection ? 'bg-hover' : 'bg-background'}`} key={d} onClick={() => onSelect(d)}>{d}</li>)}
        </ul>
      </div>
    )
  })

export default Autocomplete
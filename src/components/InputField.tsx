import React, { FC } from 'react'
import { useAppSelector } from '../hooks'

interface InputFieldProps {
  value: string
  updateText: (str: string) => void
  handleAction: () => void
}

const InputField: FC<InputFieldProps> = ({ value, updateText, handleAction }) => {
  const { loading } = useAppSelector((state) => state.accounts)

  return (
    <div className={'input-container'}>
      <input
        className={'input'}
        type={'text'}
        value={value}
        placeholder={'Enter your pkh here..'}
        onChange={(e) => updateText(e.target.value)}
      />
      <button className={'add-button'} onClick={handleAction} disabled={loading}>
        ADD
      </button>
    </div>
  )
}

export default InputField

import React, { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { getBalanceByPkh } from './store/accountsSlice'
import './App.css'
import List from './components/List'
import InputField from './components/InputField'

export const App: FC = () => {
  const [pkh, setPkh] = useState('')
  const { loading, error } = useAppSelector((state) => state.accounts)
  const dispatch = useAppDispatch()

  const handleAction = () => {
    if (pkh.trim().length) {
      dispatch(getBalanceByPkh(pkh))
      setPkh('')
    }
  }

  return (
    <div className="app">
      <div className="content">
        <InputField value={pkh} updateText={setPkh} handleAction={handleAction} />
        <h3>{error}</h3>
        {loading ? 'Loading..' : <List />}
      </div>
    </div>
  )
}

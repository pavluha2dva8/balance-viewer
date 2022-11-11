import React, { FC } from 'react'
import { useAppSelector } from '../hooks'
import ListItem from './ListItem'

const List: FC = () => {
  const accounts = useAppSelector((state) => state.accounts.accounts)

  return (
    <ul className={'list'}>
      {accounts.map((account) => (
        <ListItem key={account.pkh} pkh={account.pkh} balance={account.balance} />
      ))}
    </ul>
  )
}

export default List

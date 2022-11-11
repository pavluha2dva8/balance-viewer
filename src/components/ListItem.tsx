import React, { FC } from 'react'
import { removeAccount } from '../store/accountsSlice'
import { useAppDispatch } from '../hooks'

interface ListItemProps {
  pkh: string
  balance: number
}

const ListItem: FC<ListItemProps> = ({ pkh, balance }) => {
  const dispatch = useAppDispatch()

  return (
    <li className={'list-item'}>
      <span className={'list-item-pkh'}>{pkh.slice(0, 15)}..</span>
      <span className={'list-item-balance'}>{balance}</span>
      <span className={'list-item-delete-button'} onClick={() => dispatch(removeAccount(pkh))}></span>
    </li>
  )
}

export default ListItem

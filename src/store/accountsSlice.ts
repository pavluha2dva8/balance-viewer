import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getBalance } from '../utils'
import { AppDispatch, RootState } from './index'

interface IAccount {
  pkh: string
  balance: number
}

interface AccountsState {
  accounts: IAccount[]
  loading: boolean
  error: string | null
}

export const getBalanceByPkh = createAsyncThunk<
  void,
  string,
  {
    state: RootState
    dispatch: AppDispatch
    rejectValue: string
  }
>('accounts/getBalance', async (pkh, { rejectWithValue, dispatch, getState }) => {
  try {
    const accounts = getState().accounts.accounts
    if (accounts.some((account) => account.pkh === pkh)) {
      rejectWithValue('This address has already been added')
    }
    const balance = await getBalance(pkh)
    dispatch(addAccount({ pkh, balance }))
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

const initialState: AccountsState = {
  accounts: [],
  loading: false,
  error: null,
}

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    addAccount(state, action: PayloadAction<IAccount>) {
      state.accounts.push({ pkh: action.payload.pkh, balance: action.payload.balance })
    },
    removeAccount(state, action: PayloadAction<string>) {
      state.accounts = state.accounts.filter((account) => account.pkh !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBalanceByPkh.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getBalanceByPkh.fulfilled, (state) => {
        state.loading = false
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { addAccount, removeAccount } = accountsSlice.actions
export default accountsSlice.reducer

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}

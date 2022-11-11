import { TezosToolkit } from '@taquito/taquito'

const rpcUrl = 'https://mainnet-node.madfish.solutions'
const tezos = new TezosToolkit(rpcUrl)

export const getBalance = async (pkh: string) => {
  const balance = await tezos.tz.getBalance(pkh)
  return balance.toNumber() / 1000000
}

import { getBtcMineTokenContract } from './index'
import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import moment from 'moment'

export interface MineToken {
  decimals: number
  symbol?: string
  name?: string
  comment?: string
  startTime?: number
  endTime?: number
  buyStartTime?: number
  buyEndTime?: number
  address?: string
  buyPrice?: string
  buyTotalSupply?: string
  buySupply?: string
  usdt?: string
  balance?: any
  accReward?: BigNumber
  waitReward?: BigNumber
  reward?: BigNumber
}
export default async function getMineToken(
  token: string,
  account?: string | null | undefined,
  library?: any
): Promise<MineToken> {
  if (!account) return { decimals: 18 }
  const btcMineToken = getBtcMineTokenContract(token, library, account)
  const buyStartTime = await btcMineToken.buyStartTime().then((buyStartTime: BigNumberish) => {
    return moment(parseInt(buyStartTime.toString()) * 1000).format('YYYY-MM-DD HH:mm:ss')
  })
  const comment = await btcMineToken.comment().then((comment: string) => {
    return comment
  })
  const buyTotalSupply = await btcMineToken.buyTotalSupply().then((buyTotalSupply: string) => {
    return buyTotalSupply
  })
  const buyPrice = await btcMineToken.buyPrice().then((buyPrice: string) => {
    return buyPrice
  })
  const buySupply = await btcMineToken.buySupply().then((buySupply: string) => {
    return buySupply
  })
  const symbol = await btcMineToken.symbol().then((symbol: string) => {
    return symbol
  })
  const usdt = await btcMineToken.usdt().then((usdt: string) => {
    return usdt
  })
  const buyEndTime = await btcMineToken.buyEndTime().then((buyEndTime: BigNumberish) => {
    return moment(parseInt(buyEndTime.toString()) * 1000).format('YYYY-MM-DD HH:mm:ss')
  })
  const startTime = await btcMineToken.startTime().then((startTime: BigNumberish) => {
    return moment(parseInt(startTime.toString()) * 1000).format('YYYY-MM-DD HH:mm:ss')
  })
  const endTime = await btcMineToken.endTime().then((endTime: BigNumberish) => {
    return moment(parseInt(endTime.toString()) * 1000).format('YYYY-MM-DD HH:mm:ss')
  })
  const json = {
    decimals: 18,
    buyStartTime: buyStartTime,
    symbol: symbol,
    buyEndTime: buyEndTime,
    startTime: startTime,
    endTime: endTime,
    comment: comment,
    buyPrice: buyPrice,
    buyTotalSupply: buyTotalSupply,
    buySupply: buySupply,
    usdt: usdt
  }
  return json
}

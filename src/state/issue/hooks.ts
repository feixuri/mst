import { useActiveWeb3React } from '../../hooks'
import { useCallback, useMemo } from 'react'
import { Field, typeInput } from './actions'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { isAddress } from '@ethersproject/address'
import { ISSUER_LISTS } from '../../constants/issuer/list'
import { useMultipleContractSingleData, useTest } from '../multicall/hooks'
import { ISSUERMANAGER_ADDRESS } from '../../constants'
import { useIssuerManagerContract } from '../../hooks/useContract'
import { useSingleContractMultipleData } from '../../state/multicall/hooks'
import { AddressZero } from '@ethersproject/constants'
import { abi as IssuerBTCABI } from '../../constants/abis/IssuerBTC.json'
import { abi as BtcMineTokenABI } from '../../constants/abis/BtcMineToken.json'
import { Interface } from '@ethersproject/abi'
import { MineToken } from '../../utils/getMineToken'

export interface Issuer {
  hostname?: string
  address?: string
  serialNumber?: number
  SYMBOL?: string
}

const ISSUERBTC_INTERFACE = new Interface(IssuerBTCABI)
const BTCMINETOKEN_INTERFACE = new Interface(BtcMineTokenABI)

export function useHomeAllMineTokens(allMineTokenAddressess: string[], address?: string): MineToken[] {
  const balances = useMultipleContractSingleData(allMineTokenAddressess, BTCMINETOKEN_INTERFACE, 'balanceOf', [address])
  const symbols = useMultipleContractSingleData(allMineTokenAddressess, BTCMINETOKEN_INTERFACE, 'symbol')
  const comments = useMultipleContractSingleData(allMineTokenAddressess, BTCMINETOKEN_INTERFACE, 'comment')
  const rewards = useMultipleContractSingleData(allMineTokenAddressess, BTCMINETOKEN_INTERFACE, 'getReward',[address])
  console.log(rewards)
  const buyAllMineTokens: MineToken[] = useMemo(() => {
    return allMineTokenAddressess
      .map((result, i) => {
        const symbol = symbols?.[i]?.result?.[0]
        const comment = comments?.[i]?.result?.[0]
        const balance = balances?.[i]?.result?.[0]
        const accReward = rewards?.[i]?.result?.[0]
        const waitReward = rewards?.[i]?.result?.[1]
        return {
          decimals: 18,
          address: result,
          symbol: symbol,
          comment: comment,
          balance: balance,
          accReward: accReward,
          waitReward: waitReward
        }
      })
      .filter(address => {
        return address
      })
  }, [symbols, comments])
  return buyAllMineTokens
}

export function useBuyAllMineTokens(allMineTokenAddressess: string[]): MineToken[] {
  const symbols = useMultipleContractSingleData(allMineTokenAddressess, BTCMINETOKEN_INTERFACE, 'symbol')
  const buyStartTimes = useMultipleContractSingleData(allMineTokenAddressess, BTCMINETOKEN_INTERFACE, 'buyStartTime')
  const buyEndTimes = useMultipleContractSingleData(allMineTokenAddressess, BTCMINETOKEN_INTERFACE, 'buyEndTime')
  const comments = useMultipleContractSingleData(allMineTokenAddressess, BTCMINETOKEN_INTERFACE, 'comment')
  const buyAllMineTokens: MineToken[] = useMemo(() => {
    return allMineTokenAddressess
      .map((result, i) => {
        const symbol = symbols?.[i]?.result?.[0]
        const comment = comments?.[i]?.result?.[0]
        const buyStartTime = buyStartTimes?.[i]?.result?.[0]
        const buyEndTime = buyEndTimes?.[i]?.result?.[0]
        return {
          decimals: 18,
          address: result,
          symbol: symbol,
          comment: comment,
          buyStartTime: buyStartTime ? buyStartTime.toString() : 0,
          buyEndTime: buyEndTime ? buyEndTime.toString() : 0
        }
      })
      .filter(address => {
        return address
      })
  }, [symbols, buyEndTimes, buyStartTimes, comments])
  return buyAllMineTokens
}

export function useAllMineTokenAddressess(): string[] {
  const issuerManagerContract = useIssuerManagerContract(ISSUERMANAGER_ADDRESS)
  const issuerAddressResults = useSingleContractMultipleData(
    issuerManagerContract,
    'getIssuerAddress',
    ISSUER_LISTS.map(issuerInfo => [issuerInfo.hostname])
  )
  const issuerAddresss = useMemo(
    () =>
      issuerAddressResults
        ?.filter(issuerAddressResult => {
          if (issuerAddressResult.result?.[1] && issuerAddressResult.result[1] !== AddressZero) {
            return issuerAddressResult.result[1]
          }
        })
        .map(issuerAddressResult => {
          if (issuerAddressResult.result?.[1] && issuerAddressResult.result[1] !== AddressZero) {
            return issuerAddressResult.result[1]
          }
        }) ?? [],
    [issuerManagerContract, issuerAddressResults]
  )
  console.log(issuerAddresss)
  const serialNumbers = useMultipleContractSingleData(issuerAddresss, ISSUERBTC_INTERFACE, 'serialNumber')

  const symbols = useMultipleContractSingleData(issuerAddresss, ISSUERBTC_INTERFACE, 'SYMBOL')
  const issuers: Issuer[] = useMemo(
    () =>
      issuerAddresss
        .map<Issuer>((issuerAddress, i) => {
          const serialNumber = serialNumbers?.[i]?.result?.[0]
          const symbol = symbols?.[i]?.result?.[0]
          if (serialNumber && symbol) {
            return {
              hostname: ISSUER_LISTS[i].hostname,
              address: issuerAddress,
              serialNumber: serialNumber,
              SYMBOL: symbol
            }
          }
          return {}
        })
        .filter(issuer => {
          const serialNumber = issuer.serialNumber
          const symbol = issuer.SYMBOL
          return serialNumber && symbol
        }),
    [serialNumbers, symbols]
  )
  console.log(issuers)
  const results = useTest(issuers, ISSUERBTC_INTERFACE, 'getMineToken')
  return useMemo(() => {
    return results
      .map(result => {
        const { result: reserves, loading } = result
        if (loading || !reserves) return null
        if (reserves[0]) {
          return reserves[0]
        }
        return null
      })
      .filter(address => {
        return address
      })
  }, [results])
}

export function useIsssueState(): AppState['issue'] {
  return useSelector<AppState, AppState['issue']>(state => state.issue)
}
export function useIssuerActionHandlers(): {
  onUserInput: (typedValue: string) => void
} {
  const dispatch = useDispatch<AppDispatch>()
  const onUserInput = useCallback(
    (typedValue: string) => {
      dispatch(typeInput({ field: Field.INPUT, typedValue }))
    },
    [dispatch]
  )
  return {
    onUserInput
  }
}

export function useIssueActionHandlers(): {
  onUserInput: (field: Field, typedValue: string) => void
} {
  const dispatch = useDispatch<AppDispatch>()

  const onUserInput = useCallback(
    (field: Field, typedValue: string) => {
      dispatch(typeInput({ field, typedValue }))
    },
    [dispatch]
  )

  return {
    onUserInput
  }
}

export function useDerivedIssueInfo(): {
  inputError?: string
  // parsedValues: any
} {
  const { account } = useActiveWeb3React()
  const { independentField, typedValue } = useIsssueState()
  console.log(independentField)
  let inputError: string | undefined
  if (!account) {
    inputError = 'Connect Wallet'
  }
  if (!typedValue) {
    inputError = inputError ?? 'Enter an name'
  }

  // inputError = 'hostname already exist!'
  return {
    inputError
  }
}

export function buyInput(
  buyAmount: string
): {
  inputError?: string
} {
  let inputError: string | undefined
  if (!buyAmount) {
    inputError = 'Enter an amount'
  }

  return {
    inputError
  }
}

export function useInput(issueInput: {
  COMMENT: string
  BTC: string
  CURRENCY: string
  BUYPRICE: string
  BUYTOTALSUPPLY: string
  PREMINTNUMBER: string
  BUYSTARTTIME: string
  BUYENDTIME: string
  STARTTIME: string
  ENDTIME: string
}): {
  inputError?: string
} {
  let inputError: string | undefined
  console.log(issueInput)
  if (!issueInput.COMMENT || !issueInput.CURRENCY) {
    inputError = 'Enter an name'
  }
  if (!issueInput.BTC) {
    inputError = 'Select an currency'
  }
  if (!isAddress(issueInput.CURRENCY)) {
    inputError = inputError ?? 'Enter an address'
  }
  if (!Number(issueInput.BUYPRICE) || !Number(issueInput.BUYTOTALSUPPLY) || !Number(issueInput.PREMINTNUMBER)) {
    inputError = inputError ?? 'Enter an amount'
  }
  if (new Date().getTime() / 1000 > Number(issueInput.BUYSTARTTIME)) {
    inputError = inputError ?? 'Wrong time'
  }
  if (Number(issueInput.BUYENDTIME) <= Number(issueInput.BUYSTARTTIME)) {
    inputError = inputError ?? 'Wrong time'
  }
  if (Number(issueInput.STARTTIME) <= Number(issueInput.BUYENDTIME)) {
    inputError = inputError ?? 'Wrong time'
  }
  if (Number(issueInput.ENDTIME) <= Number(issueInput.STARTTIME)) {
    inputError = inputError ?? 'Wrong time'
  }

  return {
    inputError
  }
}

export function useDerivedIssuerInfo(
  hostname: string | undefined
): {
  inputError?: string
} {
  const { account } = useActiveWeb3React()
  const { typedValue } = useIsssueState()
  let inputError: string | undefined
  if (!account) {
    inputError = 'Connect Wallet'
  }
  if (!typedValue) {
    inputError = inputError ?? 'Enter an name'
  }

  // inputError = 'hostname already exist!'
  return {
    inputError
  }
}

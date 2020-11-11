// import { ISSUER_LISTS } from '../constants/issuer/list'
// import { useIssuerManagerContract } from './useContract'
// import { ISSUERMANAGER_ADDRESS } from '../constants'
// import { useSingleCallResult } from '../state/multicall/hooks'
// import { useCallback, useEffect } from 'react'

// interface Issuer {
//   hostname: string
// }

export function useAllHostname() {
  // const issuerManagerContract = useIssuerManagerContract(ISSUERMANAGER_ADDRESS)
  // console.log(issuerManagerContract)
  // const issuerAddress = useSingleCallResult(issuerManagerContract, 'getIssuerAddress', [hostname])?.result?.[1]
  //
  // console.log(issuerAddress)
  //
  //
  // useEffect(() => {
  //   ISSUER_LISTS.forEach(issuer => {
  //     const issuerAddress = useSingleCallResult(issuerManagerContract, 'getIssuerAddress', ['issuer.hostname'])
  //
  //     console.log(issuerAddress)
  //   })
  // }, [])
  // ISSUER_LISTS.forEach(issuer => {
  // console.log(issuer.hostname)
  // })
  // const symbol = useSingleCallResult(token ? undefined : tokenContract, 'symbol', undefined, NEVER_RELOAD)
  //
  // const Row = useCallback(
  //   ({ data, index, style }) => {
  //     const currency: Currency = data[index]
  //     const handleSelect = () => onCurrencySelect(currency)
  //     return <CurrencyRow style={style} currency={currency} isSelected={false} onSelect={handleSelect} />
  //   },
  //   [onCurrencySelect]
  // )
  // const issuers: Issuer[] = []
  // issuers.push({ hostname: '111' })
  // return issuers
}

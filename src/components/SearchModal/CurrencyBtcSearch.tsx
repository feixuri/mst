import { Currency, Token } from '@uniswap/sdk'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactGA from 'react-ga'
import { FixedSizeList } from 'react-window'
import { Text } from 'rebass'
import { isAddress } from '../../utils'
import Column from '../Column'
import { RowBetween } from '../Row'
import CurrencyBtcList from './CurrencyBtcList'
import { PaddedColumn, Separator } from './styleds'
import AutoSizer from 'react-virtualized-auto-sizer'
import { CloseIcon } from '../../theme'

interface CurrencySearchProps {
  isOpen: boolean
  onDismiss: () => void
  onCurrencySelect: (currency: Currency) => void
}

export function CurrencyBtcSearch({
  onCurrencySelect,
  onDismiss,
  isOpen
}: CurrencySearchProps) {
  const fixedList = useRef<FixedSizeList>()
  const [searchQuery, setSearchQuery] = useState<string>('')
  // const [invertSearchOrder, setInvertSearchOrder] = useState<boolean>(false)
  // if they input an address, use it
  const isAddressSearch = isAddress(searchQuery)

  useEffect(() => {
    if (isAddressSearch) {
      ReactGA.event({
        category: 'Currency Select',
        action: 'Search by address',
        label: isAddressSearch
      })
    }
  }, [isAddressSearch])

  const filteredSortedTokens: Token[] = useMemo(() => {
    // return [
    //   ...(searchToken ? [searchToken] : []),
    //   // sort any exact symbol matches first
    //   ...sorted.filter(token => token.symbol?.toLowerCase() === symbolMatch[0]),
    //   ...sorted.filter(token => token.symbol?.toLowerCase() !== symbolMatch[0])
    // ]

    const wBTC = new Token(3, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 18, 'wBTC', 'WBTC')
    const hBTC = new Token(3, '0x0316EB71485b0Ab14103307bf65a021042c6d380', 18, 'hBTC', 'HBTC')
    const sBTC = new Token(3, '0xfE18be6b3Bd88A2D2A7f928d00292E7a9963CfC6', 18, 'sBTC', 'SBTC')
    return [wBTC, hBTC, sBTC]
  }, [])
  // console.log(filteredSortedTokens)

  // const handleCurrencySelect = useCallback(
  //   (currency: Currency) => {
  //     onCurrencySelect(currency)
  //     onDismiss()
  //   },
  //   [onDismiss, onCurrencySelect]
  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      // console.log(currency)
      onCurrencySelect(currency)
      onDismiss()
    },
    [onDismiss, onCurrencySelect]
  )

  // clear the input on open
  useEffect(() => {
    if (isOpen) setSearchQuery('')
  }, [isOpen])

  return (
    <Column style={{ width: '100%', flex: '1 1' }}>
      <PaddedColumn gap="14px">
        <RowBetween>
          <Text fontSize={14} fontWeight={500}>
            Select a token
          </Text>
          <CloseIcon onClick={onDismiss} />
        </RowBetween>
      </PaddedColumn>

      <Separator />

      <div style={{ flex: '1' }}>
        <AutoSizer disableWidth>
          {({ height }) => (
            <CurrencyBtcList
              height={height}
              currencies={filteredSortedTokens}
              onCurrencySelect={handleCurrencySelect}
              fixedListRef={fixedList}
            />
          )}
        </AutoSizer>
      </div>

      <Separator />
    </Column>
  )
}

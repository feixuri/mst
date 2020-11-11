import { Currency } from '@uniswap/sdk'
import React, { useCallback, useEffect, useState } from 'react'
import useLast from '../../hooks/useLast'
import { useSelectedListUrl } from '../../state/lists/hooks'
import Modal from '../Modal'
import { CurrencyBtcSearch } from './CurrencyBtcSearch'

interface CurrencySearchModalProps {
  isOpen: boolean
  onDismiss: () => void
  onCurrencySelect: (currency: Currency) => void
}

export default function CurrencyBtcModal({ isOpen, onDismiss, onCurrencySelect }: CurrencySearchModalProps) {
  const [listView, setListView] = useState<boolean>(false)
  const lastOpen = useLast(isOpen)

  useEffect(() => {
    if (isOpen && !lastOpen) {
      setListView(false)
    }
  }, [isOpen, lastOpen])

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onCurrencySelect(currency)
      onDismiss()
    },
    [onDismiss, onCurrencySelect]
  )
  const selectedListUrl = useSelectedListUrl()
  const noListSelected = !selectedListUrl

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90} minHeight={listView ? 40 : noListSelected ? 0 : 80}>
      <CurrencyBtcSearch isOpen={isOpen} onDismiss={onDismiss} onCurrencySelect={handleCurrencySelect} />
    </Modal>
  )
}

import AppBody from '../AppBody'
import React, { useCallback, useState } from 'react'
import { ButtonError, ButtonLight } from '../../components/Button'
import { RouteComponentProps } from 'react-router-dom'
import { Text } from 'rebass'
import { AutoColumn } from '../../components/Column'
import { AutoRow, RowFlat } from '../../components/Row'
import QuestionHelper from '../../components/QuestionHelper'
import { BackArrow, TYPE } from '../../theme'
import { getIssuerBTCContract } from '../../utils'
import { useWeb3React } from '@web3-react/core'
import { useMintInput } from '../../state/issue/hooks'
import { useWalletModalToggle } from '../../state/application/hooks'
import ReactGA from 'react-ga'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { LightCard } from '../../components/Card'
import { ConfirmRegisterModalBottom } from './ConfirmRegisterModalBottom'
import { AddRemoveTabs } from '../../components/NavigationTabs'
import { Wrapper } from '../Pool/styleds'
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../components/TransactionConfirmationModal'
import {
  NumericalInputPanel
} from '../../components/CurrencyInputPanel'
import { BottomGrouping } from '../../components/swap/styleds'
import { parseUnits } from '@ethersproject/units'

export function IssueMint({
  match: {
    params: { tokens, symbol, hostname }
  }
}: RouteComponentProps<{ tokens: string; symbol: string; hostname: string }>) {
  const [mintInput, setMintInput] = useState({
    AMOUNT: ''
  })
  const { inputError } = useMintInput(mintInput)
  const isValid = !inputError
  const toggleWalletModal = useWalletModalToggle()
  const { account, chainId, library } = useWeb3React()
  const [showErrorInfo, setShowErrorInfo] = useState<boolean>(false)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>('')

  const onAmountInput = useCallback((typedValue: string): void => {
    mintInput['AMOUNT'] = typedValue
    setMintInput({ ...mintInput })
  }, [])

  async function onAdd() {
    setShowErrorInfo(false)
    ReactGA.event({
      category: 'Liquidity',
      action: 'Add',
      label: 'testlabel'
    })
    if (!chainId || !library || !account) return
    const issuerBTC = getIssuerBTCContract(tokens, library, account)

    const mint = issuerBTC.mint
    const args = [symbol, parseUnits(mintInput['AMOUNT'], 18).toString()]
    const value = null
    setShowConfirm(true)
    setAttemptingTxn(true)
    await mint(...args, {
      ...(value ? { value } : {})
    })
      .then((response: TransactionResponse) => {
        setAttemptingTxn(false)
        setTxHash(response.hash)
      })
      .catch((error: { code: number }) => {
        // setShowConfirm(true)
        console.log(error)
      })
  }
  const modalHeader = () => {
    return (
      <AutoColumn gap="20px">
        <LightCard mt="20px" borderRadius="20px">
          <RowFlat>
            <Text lineHeight="20px" marginRight={10} />
          </RowFlat>
        </LightCard>
      </AutoColumn>
    )
  }

  const modalBottom = () => {
    return <ConfirmRegisterModalBottom onAdd={onAdd} />
  }
  const pendingText = `Issue Mint`
  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false)
    if (txHash) {
    }
    setTxHash('')
  }, ['', txHash])

  return (
    <>
      <AppBody>
        <AddRemoveTabs adding={true} />
        <Wrapper>
          <TransactionConfirmationModal
            isOpen={showConfirm}
            onDismiss={handleDismissConfirmation}
            attemptingTxn={attemptingTxn}
            hash={txHash}
            content={() => (
              <ConfirmationModalContent
                title={'You are register Issuer'}
                onDismiss={handleDismissConfirmation}
                topContent={modalHeader}
                bottomContent={modalBottom}
              />
            )}
            pendingText={pendingText}
          />
          <AutoColumn gap="20px">
            <AutoRow style={{ alignItems: 'center', justifyContent: 'space-between' }} gap="8px">
              <BackArrow to={`/issues/${tokens}/${hostname}`} />
              <TYPE.mediumHeader>Mint {symbol}</TYPE.mediumHeader>
              <div>
                <QuestionHelper text="说明文字" />
              </div>
            </AutoRow>
            <AutoColumn gap={'md'}>
              <NumericalInputPanel
                label={'amount'}
                value={mintInput.AMOUNT}
                id="add-issue-input-buyPrice"
                onUserInput={onAmountInput}
              />
            </AutoColumn>
            {!account ? (
              <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
            ) : (
              <AutoColumn gap={'md'}>
                <BottomGrouping>
                  <ButtonError
                    onClick={() => {
                      onAdd()
                    }}
                    disabled={!isValid || showErrorInfo}
                    error={!isValid || showErrorInfo}
                  >
                    <Text fontSize={16} fontWeight={500}>
                      {!isValid ? inputError : showErrorInfo ? 'comment already exist!' : 'Mint'}
                    </Text>
                  </ButtonError>
                </BottomGrouping>
              </AutoColumn>
            )}
          </AutoColumn>
        </Wrapper>
      </AppBody>
    </>
  )
}

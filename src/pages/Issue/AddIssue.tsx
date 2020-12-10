import React, { useCallback, useState } from 'react'

import AppBody from '../AppBody'
import { AddRemoveTabs } from '../../components/NavigationTabs'
import { Wrapper } from '../Pool/styleds'
import { AutoColumn } from '../../components/Column'
import { BottomGrouping } from '../../components/swap/styleds'
import { ButtonError, ButtonLight } from '../../components/Button'
import { Text } from 'rebass'
import { AutoRow, RowFlat } from '../../components/Row'
import { BackArrow, TYPE } from '../../theme'
import { useWeb3React } from '@web3-react/core'
import { getIssuerBTCContract } from '../../utils'
import { useWalletModalToggle } from '../../state/application/hooks'
import { useInput } from '../../state/issue/hooks'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import ReactGA from 'react-ga'
import QuestionHelper from '../../components/QuestionHelper'
import { RouteComponentProps } from 'react-router'
import {
  TextInputPanel,
  NumericalInputPanel,
  TimeInputPanel,
  CurrencyBtcInputPanel
} from '../../components/CurrencyInputPanel'
import { Currency } from '@uniswap/sdk'
import { parseUnits } from '@ethersproject/units'
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../components/TransactionConfirmationModal'
import { LightCard } from '../../components/Card'
import { ConfirmRegisterModalBottom } from './ConfirmRegisterModalBottom'
import { useIsExpertMode } from '../../state/user/hooks'
export function AddIssue({
  match: {
    params: { tokens, hostname }
  }
}: RouteComponentProps<{ tokens: string; hostname: string }>) {
  const [issueInput, setIssueInput] = useState({
    COMMENT: '',
    BTC: '',
    CURRENCY: '',
    BUYPRICE: '',
    BUYTOTALSUPPLY: '',
    PREMINTNUMBER: '',
    BUYSTARTTIME: new Date()
      .getTime()
      .toString()
      .substr(0, 10),
    BUYENDTIME: new Date()
      .getTime()
      .toString()
      .substr(0, 10),
    STARTTIME: new Date()
      .getTime()
      .toString()
      .substr(0, 10),
    ENDTIME: new Date()
      .getTime()
      .toString()
      .substr(0, 10)
  })
  const { inputError } = useInput(issueInput)
  const isValid = !inputError
  const toggleWalletModal = useWalletModalToggle()
  const expertMode = useIsExpertMode()
  const { account, chainId, library } = useWeb3React()
  const [showErrorInfo, setShowErrorInfo] = useState<boolean>(false)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>('')
  const [currency, setCurrency] = useState<Currency>()

  const handleInputSelect = useCallback(inputCurrency => {
    issueInput['BTC'] = inputCurrency.symbol
    setIssueInput({ ...issueInput })
    setCurrency(inputCurrency)
  }, [])
  const onCommentInput = useCallback((typedValue: string): void => {
    issueInput['COMMENT'] = typedValue
    setIssueInput({ ...issueInput })
  }, [])
  const onCurrencyInput = useCallback((typedValue: string): void => {
    issueInput['CURRENCY'] = typedValue
    setIssueInput({ ...issueInput })
  }, [])
  const onBtcInput = useCallback((typedValue: string): void => {}, [])
  const onBuyPriceInput = useCallback((typedValue: string): void => {
    issueInput['BUYPRICE'] = typedValue
    setIssueInput({ ...issueInput })
  }, [])
  const onBuyTotalSupply = useCallback((typedValue: string): void => {
    issueInput['BUYTOTALSUPPLY'] = typedValue
    setIssueInput({ ...issueInput })
  }, [])
  const onPreMintNumber = useCallback((typedValue: string): void => {
    issueInput['PREMINTNUMBER'] = typedValue
    setIssueInput({ ...issueInput })
  }, [])
  const onStartTime = useCallback((typedValue: Date): void => {
    issueInput['STARTTIME'] = typedValue
      .getTime()
      .toString()
      .substr(0, 10)
    setIssueInput({ ...issueInput })
  }, [])
  const onEndTime = useCallback((typedValue: Date): void => {
    issueInput['ENDTIME'] = typedValue
      .getTime()
      .toString()
      .substr(0, 10)
    setIssueInput({ ...issueInput })
  }, [])
  const onBuyEndTime = useCallback((typedValue: Date): void => {
    issueInput['BUYENDTIME'] = typedValue
      .getTime()
      .toString()
      .substr(0, 10)
    setIssueInput({ ...issueInput })
  }, [])
  const onBuyStartTime = useCallback((typedValue: Date): void => {
    issueInput['BUYSTARTTIME'] = typedValue
      .getTime()
      .toString()
      .substr(0, 10)
    setIssueInput({ ...issueInput })
  }, [])
  async function onAdd() {
    console.log(issueInput)
    setShowErrorInfo(false)
    ReactGA.event({
      category: 'Liquidity',
      action: 'Add',
      label: 'testlabel'
    })
    if (!chainId || !library || !account) return
    const issuerBTC = getIssuerBTCContract(tokens, library, account)

    const issue = issuerBTC.issue
    const args = [
      issueInput['BTC'],
      issueInput['CURRENCY'],
      issueInput['BUYPRICE'],
      parseUnits(issueInput['BUYTOTALSUPPLY'], 18).toString(),
      parseUnits(issueInput['PREMINTNUMBER'], 18).toString(),
      issueInput['BUYSTARTTIME'],
      issueInput['BUYENDTIME'],
      issueInput['STARTTIME'],
      issueInput['ENDTIME'],
      issueInput['COMMENT']
    ]
    const value = null
    setShowConfirm(true)
    setAttemptingTxn(true)
    await issue(...args, {
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
            <Text lineHeight="20px" marginRight={10}>
              {/*{hostname}*/}
            </Text>
            {/*/>*/}
          </RowFlat>
        </LightCard>
      </AutoColumn>
    )
  }

  const modalBottom = () => {
    return <ConfirmRegisterModalBottom onAdd={onAdd} />
  }
  const pendingText = `Issue Register`
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
              <TYPE.mediumHeader>Issue</TYPE.mediumHeader>
              <div>
                <QuestionHelper text="说明文字" />
              </div>
            </AutoRow>
            <AutoColumn gap={'md'}>
              <TextInputPanel
                label={'comment'}
                value={issueInput.COMMENT}
                id="add-issue-input-comment"
                onUserInput={onCommentInput}
              />
              <TextInputPanel
                label={'currency'}
                value={issueInput.CURRENCY}
                id="add-issue-input-currency"
                onUserInput={onCurrencyInput}
              />
              <CurrencyBtcInputPanel
                label={'btc'}
                value={issueInput.BTC}
                id="add-issue-input-currency"
                currency={currency}
                onCurrencySelect={handleInputSelect}
                onUserInput={onBtcInput}
              />
              <NumericalInputPanel
                label={'buyPrice'}
                value={issueInput.BUYPRICE}
                id="add-issue-input-buyPrice"
                onUserInput={onBuyPriceInput}
              />
              <NumericalInputPanel
                label={'buyTotalSupply'}
                value={issueInput.BUYTOTALSUPPLY}
                id="add-issue-input-buyTotalSupply"
                onUserInput={onBuyTotalSupply}
              />
              <NumericalInputPanel
                label={'preMintNumber'}
                value={issueInput.PREMINTNUMBER}
                id="add-issue-input-preMintNumber"
                onUserInput={onPreMintNumber}
              />
              <TimeInputPanel onUserInput={onBuyStartTime} label={'buyStartTime'} />
              <TimeInputPanel onUserInput={onBuyEndTime} label={'buyEndTime'} />
              <TimeInputPanel onUserInput={onStartTime} label={'startTime'} />
              <TimeInputPanel onUserInput={onEndTime} label={'endTime'} />
            </AutoColumn>
            {!account ? (
              <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
            ) : (
              <AutoColumn gap={'md'}>
                <BottomGrouping>
                  <ButtonError
                    onClick={() => {
                      expertMode ? onAdd() : setShowConfirm(true)
                    }}
                    disabled={!isValid || showErrorInfo}
                    error={!isValid || showErrorInfo}
                  >
                    <Text fontSize={16} fontWeight={500}>
                      {/*{inputError ?? 'Register'}*/}
                      {!isValid ? inputError : showErrorInfo ? 'comment already exist!' : 'Issue'}
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

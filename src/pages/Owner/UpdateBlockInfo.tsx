import AppBody from '../AppBody'
import React, { useCallback, useState } from 'react'
import { ButtonError, ButtonLight } from '../../components/Button'
import { Text } from 'rebass'
import { AutoColumn } from '../../components/Column'
import { AutoRow } from '../../components/Row'
import QuestionHelper from '../../components/QuestionHelper'
import { BackArrow, TYPE } from '../../theme'
import { getBitcoinOracleContract } from '../../utils'
import { useWeb3React } from '@web3-react/core'
import { useBlockinfoInput } from '../../state/issue/hooks'
import { useWalletModalToggle } from '../../state/application/hooks'
import ReactGA from 'react-ga'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { AddRemoveTabs } from '../../components/NavigationTabs'
import { Wrapper } from '../Pool/styleds'
import TransactionConfirmationModal from '../../components/TransactionConfirmationModal'
import { NumericalInputPanel } from '../../components/CurrencyInputPanel'
import { BottomGrouping } from '../../components/swap/styleds'
import { RouteComponentProps } from 'react-router'

export function UpdateBlockInfo({
  match: {
    params: { tokens }
  }
}: RouteComponentProps<{ tokens: string }>) {
  const [blockinfoInput, setBlockinfoInput] = useState({
    timestamp: '',
    rewardPerTPerSecond: ''
  })
  const { inputError } = useBlockinfoInput(blockinfoInput)
  const isValid = !inputError
  const toggleWalletModal = useWalletModalToggle()
  const { account, chainId, library } = useWeb3React()
  const [showErrorInfo, setShowErrorInfo] = useState<boolean>(false)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>('')

  const onTimestampInput = useCallback((typedValue: string): void => {
    blockinfoInput['timestamp'] = typedValue
    setBlockinfoInput({ ...blockinfoInput })
  }, [])
  const onRewardPerTPerSecondInput = useCallback((typedValue: string): void => {
    blockinfoInput['rewardPerTPerSecond'] = typedValue
    setBlockinfoInput({ ...blockinfoInput })
  }, [])
  async function onAdd() {
    setShowErrorInfo(false)
    ReactGA.event({
      category: 'Liquidity',
      action: 'Add',
      label: 'testlabel'
    })
    if (!chainId || !library || !account) return
    const bitcoinOracle = getBitcoinOracleContract(tokens, library, account)

    const updateLatestBlockInfo = bitcoinOracle.updateLatestBlockInfo
    const args = [blockinfoInput['timestamp'], blockinfoInput['rewardPerTPerSecond']]
    const value = null
    setShowConfirm(true)
    setAttemptingTxn(true)
    await updateLatestBlockInfo(...args, {
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
  const pendingText = `Update blockInfo`
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
            content={() => <></>}
            pendingText={pendingText}
          />
          <AutoColumn gap="20px">
            <AutoRow style={{ alignItems: 'center', justifyContent: 'space-between' }} gap="8px">
              <BackArrow to={`/owner`} />
              <TYPE.mediumHeader>Update blockInfo</TYPE.mediumHeader>
              <div>
                <QuestionHelper text="说明文字" />
              </div>
            </AutoRow>
            <AutoColumn gap={'md'}>
              <NumericalInputPanel
                label={'timestamp'}
                value={blockinfoInput.timestamp}
                id="add-input-timestamp"
                onUserInput={onTimestampInput}
              />
              <NumericalInputPanel
                label={'rewardPerTPerSecond'}
                value={blockinfoInput.rewardPerTPerSecond}
                id="add-input-rewardPerTPerSecond"
                onUserInput={onRewardPerTPerSecondInput}
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
                      {!isValid ? inputError : showErrorInfo ? 'comment already exist!' : 'Set'}
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

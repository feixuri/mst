import React, { useCallback, useContext, useState } from 'react'

import styled, { ThemeContext } from 'styled-components'

import AppBody from '../AppBody'
import { AddRemoveTabs } from '../../components/NavigationTabs'
import { Wrapper } from '../Pool/styleds'
import { AutoColumn } from '../../components/Column'
import { BottomGrouping } from '../../components/swap/styleds'
import { ButtonError, ButtonLight } from '../../components/Button'
import { Text } from 'rebass'
import { AutoRow, RowBetween, RowFlat } from '../../components/Row'
import { parseUnits } from '@ethersproject/units'
import { BackArrow, TYPE } from '../../theme'
import { darken } from 'polished'
import { useWeb3React } from '@web3-react/core'
import { AddressZero } from '@ethersproject/constants'
import { getIssuerManagerContract } from '../../utils'
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../components/TransactionConfirmationModal'
import { LightCard } from '../../components/Card'
import { useIsExpertMode } from '../../state/user/hooks'
import { ConfirmRegisterModalBottom } from './ConfirmRegisterModalBottom'
import { useWalletModalToggle } from '../../state/application/hooks'
import { useDerivedIssuerInfo, useIssuerActionHandlers } from '../../state/issue/hooks'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import ReactGA from 'react-ga'
import QuestionHelper from '../../components/QuestionHelper'

export function RegistIssuer() {
  const inputHostname = ''
  const { inputError } = useDerivedIssuerInfo(inputHostname ?? undefined)
  const isValid = !inputError
  // console.log(Math.floor(new Date().getTime() / 1000))
  const expertMode = useIsExpertMode()
  const toggleWalletModal = useWalletModalToggle()
  const { account, chainId, library } = useWeb3React()
  // console.log(account)
  // const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [showErrorInfo, setShowErrorInfo] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirm

  // txn values
  // const [deadline] = useUserDeadline() // custom from users settings
  // const [allowedSlippage] = useUserSlippageTolerance() // custom from users
  const [txHash, setTxHash] = useState<string>('')
  const [hostname, setHostname] = useState<string>('')

  const { onUserInput } = useIssuerActionHandlers()
  async function onAdd() {
    ReactGA.event({
      category: 'Liquidity',
      action: 'Add',
      label: 'testlabel'
    })
    setShowConfirm(true)
    if (!chainId || !library || !account) return
    const issuerManager = getIssuerManagerContract(chainId, library, account)

    const issuerAddress = issuerManager.getIssuerAddress
    // const estimate = issuerManager.estimateGas.registIssuerBTC
    setAttemptingTxn(true)
    await issuerAddress(hostname.toString()).then((address: any) => {
      if (address[0] != AddressZero) {
        setShowConfirm(false)
        setAttemptingTxn(false)
        setShowErrorInfo(true)
      } else {
        setAttemptingTxn(true)
        const registIssuerBTC = issuerManager.registIssuerBTC
        const args = [hostname.toString(), Math.floor(new Date().getTime() / 1000)]
        const value = null
        registIssuerBTC(...args, {
          ...(value ? { value } : {}),
          gasLimit: 5000000,
          gasPrice: parseUnits('10', 'gwei').toString()
        })
          .then((response: TransactionResponse) => {
            setAttemptingTxn(false)
            setTxHash(response.hash)
            console.log(response)
          })
          .catch((error: { code: number }) => {
            // setShowConfirm(true)
            setAttemptingTxn(false)
            setTxHash('response.hash')
            console.log(error)
          })
      }
    })
  }

  const modalHeader = () => {
    return (
      <AutoColumn gap="20px">
        <LightCard mt="20px" borderRadius="20px">
          <RowFlat>
            <Text lineHeight="20px" marginRight={10}>
              {hostname}
              {/*{currencies[Field.CURRENCY_A]?.symbol + '/' + currencies[Field.CURRENCY_B]?.symbol}*/}
            </Text>
            {/*<DoubleCurrencyLogo*/}
            {/*  currency0={currencies[Field.CURRENCY_A]}*/}
            {/*  currency1={currencies[Field.CURRENCY_B]}*/}
            {/*  size={30}*/}
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
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      // onFieldAInput('')
    }
    setTxHash('')
  }, ['', txHash])
  const theme = useContext(ThemeContext)

  const hostnameInput = useCallback(
    (value: string) => {
      setShowErrorInfo(false)
      onUserInput(value)
      // console.log(value)
      setHostname(value)
    },
    [onUserInput]
  )
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
              <BackArrow to="/issue" />
              <TYPE.mediumHeader>Issue Registered</TYPE.mediumHeader>
              <div>
                <QuestionHelper text="说明文字" />
              </div>
            </AutoRow>
            <AutoColumn gap={'md'}>
              <InputPanel>
                <Container>
                  <LabelRow>
                    <RowBetween>
                      <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
                        Hostname
                      </TYPE.body>
                    </RowBetween>
                  </LabelRow>
                  <InputRow selected={false}>
                    <>
                      <StyledInput
                        value={hostname}
                        type="text"
                        onChange={event => {
                          hostnameInput(event.target.value.replace(/,/g, '.'))
                        }}
                      />
                    </>
                  </InputRow>
                </Container>
              </InputPanel>
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
                      {!isValid ? inputError : showErrorInfo ? 'hostname already exist!' : 'Register'}
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

const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.bg2};
  z-index: 1;
`

const Container = styled.div<{ hideInput?: boolean }>`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`
const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`

const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`

const StyledInput = styled.input<{ error?: boolean; fontSize?: string; align?: string }>`
  color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
  width: 0;
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: ${({ theme }) => theme.bg1};
  font-size: 24px;
  text-align: ${({ align }) => align && align};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
`

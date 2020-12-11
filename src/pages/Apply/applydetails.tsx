import { RouteComponentProps } from 'react-router'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import AppBody from '../AppBody'
import { AddRemoveTabs } from '../../components/NavigationTabs'
import { Dots, Wrapper } from '../Pool/styleds'
import { AutoColumn, ColumnCenter } from '../../components/Column'
import { BottomGrouping, TruncatedText } from '../../components/swap/styleds'
import { ButtonError, ButtonPrimary } from '../../components/Button'
import { Text } from 'rebass'
import { RowBetween, RowFixed } from '../../components/Row'
import styled, { ThemeContext } from 'styled-components'
import { TYPE } from '../../theme'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import { NumericalInputPanel } from '../../components/CurrencyInputPanel'
import { buyInput } from '../../state/issue/hooks'
import { useIsExpertMode } from '../../state/user/hooks'
import TransactionConfirmationModal, { ConfirmationModalContent } from '../../components/TransactionConfirmationModal'
import { ConfirmRegisterModalBottom } from '../Issue/ConfirmRegisterModalBottom'
import ReactGA from 'react-ga'
import { getBtcMineTokenContract } from '../../utils'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { useWeb3React } from '@web3-react/core'
import { formatUnits, parseUnits } from '@ethersproject/units'
import Token from '../../components/IssuerCard/Token'
import getMineToken, { MineToken } from '../../utils/getMineToken'
import { useCurrency } from '../../hooks/Tokens'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { CurrencyAmount } from '@uniswap/sdk'
import { tryParseAmount } from '../../state/swap/hooks'
import { ApprovalState, useApproveCallback } from '../../hooks/useApproveCallback'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { ArrowDown } from 'react-feather'
import { BigNumber } from '@ethersproject/bignumber'
export function ApplyDetails({
  match: {
    params: { token, symbol }
  }
}: RouteComponentProps<{ token: string; symbol: string }>) {
  const { account, chainId, library } = useWeb3React()
  const [buyAmount, setBuyAmount] = useState<string>('')
  const expertMode = useIsExpertMode()
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [mineToken, setMineToken] = useState<MineToken>()
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>('')
  const { inputError } = buyInput(buyAmount)
  const isValid = !inputError
  const onBuyAmount = useCallback((typedValue: string): void => {
    setBuyAmount(typedValue)
  }, [])
  const currencyPay = useCurrency(mineToken ? (mineToken.usdt ? mineToken.usdt : 'ETH') : 'ETH')
  const currencyPayBalance = useCurrencyBalance(account ?? undefined, currencyPay ?? undefined)
  const independentAmount: CurrencyAmount | undefined = tryParseAmount(buyAmount, currencyPay ? currencyPay : undefined)
  const addTransaction = useTransactionAdder()
  useEffect(() => {
    getMineToken(token, account, library).then(mineTokenInfo => {
      setMineToken(mineTokenInfo)
    })
  }, [])
  const [approvalA, approveACallback] = useApproveCallback(independentAmount, token)
  async function onAdd() {
    ReactGA.event({
      category: 'Liquidity',
      action: 'Add',
      label: 'testlabel'
    })
    if (!chainId || !library || !account) return
    const btcMineToken = getBtcMineTokenContract(token, library, account)

    const buy = btcMineToken.buy
    const args = [parseUnits(buyAmount, 18).toString()]
    const value = null
    setShowConfirm(true)
    setAttemptingTxn(true)
    await buy(...args, {
      ...(value ? { value } : {}),
      gasLimit: 5000000
    })
      .then((response: TransactionResponse) => {
        setAttemptingTxn(false)
        setTxHash(response.hash)

        addTransaction(response, {
          summary: 'Buy ' + symbol + ' Puy ' + independentAmount?.toSignificant(3)
        })
      })
      .catch((error: { code: number }) => {
        // setShowConfirm(true)
        console.log(error)
      })
  }

  const modalBottom = () => {
    return <ConfirmRegisterModalBottom onAdd={onAdd} />
  }
  const pendingText = `Buy`
  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false)
    if (txHash) {
    }
    setTxHash('')
  }, ['', txHash])
  const theme = useContext(ThemeContext)
  const modalHeader = () => {
    return (
      <AutoColumn gap={'md'} style={{ marginTop: '20px' }}>
        <RowBetween align="flex-end">
          <RowFixed gap={'0px'}>
            {/*<CurrencyLogo currency={trade.inputAmount.currency} size={'24px'} style={{ marginRight: '12px' }} />*/}
            <TruncatedText fontSize={18} fontWeight={500}>
              {BigNumber.from(buyAmount)
                .mul(BigNumber.from(mineToken && mineToken.buyPrice ? mineToken.buyPrice : 0))
                .toString()}
            </TruncatedText>
          </RowFixed>
          <RowFixed gap={'0px'}>
            <Text fontSize={18} fontWeight={500} style={{ marginLeft: '10px' }}>
              {currencyPay ? currencyPay.symbol : ''}
            </Text>
          </RowFixed>
        </RowBetween>
        <RowFixed>
          <ArrowDown size="16" color={theme.text2} style={{ marginLeft: '4px', minWidth: '16px' }} />
        </RowFixed>
        <RowBetween align="flex-end">
          <RowFixed gap={'0px'}>
            {/*<CurrencyLogo currency={trade.inputAmount.currency} size={'24px'} style={{ marginRight: '12px' }} />*/}
            <TruncatedText fontSize={18} fontWeight={500} color={theme.primary1}>
              {buyAmount}
            </TruncatedText>
          </RowFixed>
          <RowFixed gap={'0px'}>
            <Text fontSize={18} fontWeight={500} style={{ marginLeft: '10px' }}>
              {symbol}
            </Text>
          </RowFixed>
        </RowBetween>
      </AutoColumn>
    )
  }
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
                title={'Confirm Buy'}
                onDismiss={handleDismissConfirmation}
                topContent={modalHeader}
                bottomContent={modalBottom}
              />
            )}
            pendingText={pendingText}
          />
          <AutoColumn gap="20px">
            <ColumnCenter />
            <StyledContent style={{ padding: '0 20px' }}>
              <StyledInfo>
                <StyledEthereumLogo src={EthereumLogo} size={'40px'} style={{}} />
              </StyledInfo>
              <StyledTitle>{symbol}</StyledTitle>
              <StyledDetails>
                <StyledDetail>{mineToken ? mineToken.comment : ''}</StyledDetail>
              </StyledDetails>
            </StyledContent>
            <AutoColumn style={{ padding: '0 20px' }}>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    Contract address
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  <Token hash={token} />
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    BuyTotalSupply
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  {mineToken && mineToken.buyTotalSupply
                    ? formatUnits(mineToken.buyTotalSupply.toString(), 18).toString()
                    : ''}
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    BuySupply
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  {mineToken && mineToken.buySupply ? formatUnits(mineToken.buySupply.toString(), 18).toString() : ''}
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    Starting time of Revenue
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  {mineToken ? mineToken.startTime : ''}
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    End time of Revenue
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  {mineToken ? mineToken.endTime : ''}
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    Subscription price
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  {mineToken && mineToken.buyPrice ? mineToken.buyPrice.toString() : '-'}
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    BuyStartTime
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  {mineToken ? mineToken.buyStartTime : ''}
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    BuyEndTime
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  {mineToken ? mineToken.buyEndTime : ''}
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    PayToken address
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  <Token hash={mineToken ? (mineToken.usdt ? mineToken.usdt : token) : token} />
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    PayToken symbol
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  {currencyPay ? currencyPay.symbol : ''}
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    Yours Balance
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  {currencyPayBalance?.toSignificant(6)}
                </TYPE.black>
              </RowBetween>
            </AutoColumn>
            <AutoColumn gap={'md'}>
              <NumericalInputPanel
                label={'BuyAmount'}
                value={buyAmount}
                id="add-issue-input-buyAmount"
                onUserInput={onBuyAmount}
              />
            </AutoColumn>
            <BottomGrouping>
              {(approvalA === ApprovalState.NOT_APPROVED || approvalA === ApprovalState.PENDING) && isValid && (
                <RowBetween>
                  {
                    <ButtonPrimary
                      onClick={approveACallback}
                      disabled={approvalA === ApprovalState.PENDING}
                      width={'100%'}
                    >
                      {approvalA === ApprovalState.PENDING ? (
                        <Dots>Approving {currencyPay?.symbol}</Dots>
                      ) : (
                        'Approve ' + currencyPay?.symbol
                      )}
                    </ButtonPrimary>
                  }
                </RowBetween>
              )}
              <ButtonError
                onClick={() => {
                  expertMode ? onAdd() : setShowConfirm(true)
                }}
                disabled={!isValid || approvalA !== ApprovalState.APPROVED}
                error={!isValid}
              >
                <Text fontSize={16} fontWeight={500}>
                  {!isValid ? inputError : 'Buy'}
                </Text>
              </ButtonError>
            </BottomGrouping>
          </AutoColumn>
        </Wrapper>
      </AppBody>
    </>
  )
}

const StyledInfo = styled.div`
  display: grid;
  gap: 0px;
  -webkit-box-align: center;
  align-items: center;
  padding: 1rem;
`
const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`
const StyledTitle = styled.h4`
  color: ${({ theme }) => theme.grey600};
  font-size: 24px;
  font-weight: 700;
  margin: ${({ theme }) => theme.spacing[2]}px 0 0;
  padding: 0;
`
const StyledDetails = styled.div`
  margin-top: ${({ theme }) => theme.spacing[2]}px;
  font-size: 12px;
`
const StyledDetail = styled.div`
  color: #aa9584;
`
const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

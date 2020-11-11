import { JSBI, Pair } from '@uniswap/sdk'
import moment from 'moment'
import { darken } from 'polished'
import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Link } from 'react-router-dom'
import { Text } from 'rebass'
import styled from 'styled-components'
import { useTotalSupply } from '../../data/TotalSupply'

import { useActiveWeb3React } from '../../hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import { ButtonSecondary } from '../Button'

import Card, { GreyCard } from '../Card'
import { AutoColumn } from '../Column'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween, RowFixed } from '../Row'
import Token from './Token'
import { useWeb3React } from '@web3-react/core'
import { getBtcMineTokenContract } from '../../utils'
import { BigNumberish } from '@ethersproject/bignumber'
import { formatUnits } from '@ethersproject/units'

export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`

export const HoverCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.bg2};
  :hover {
    border: 1px solid ${({ theme }) => darken(0.06, theme.bg2)};
  }
`

interface PositionCardProps {
  pair: Pair
  showUnwrapped?: boolean
  border?: string
}

export function MinimalPositionCard({ pair, showUnwrapped = false, border }: PositionCardProps) {
  const { account } = useActiveWeb3React()

  const currency0 = showUnwrapped ? pair.token0 : unwrappedToken(pair.token0)
  const currency1 = showUnwrapped ? pair.token1 : unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false)
        ]
      : [undefined, undefined]

  return (
    <>
      {userPoolBalance && (
        <GreyCard border={border}>
          <AutoColumn gap="12px">
            <FixedHeightRow>
              <RowFixed>
                <Text fontWeight={500} fontSize={16}>
                  Your position
                </Text>
              </RowFixed>
            </FixedHeightRow>
            <FixedHeightRow onClick={() => setShowMore(!showMore)}>
              <RowFixed>
                <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin={true} size={20} />
                <Text fontWeight={500} fontSize={20}>
                  {currency0.symbol}/{currency1.symbol}
                </Text>
              </RowFixed>
              <RowFixed>
                <Text fontWeight={500} fontSize={20}>
                  {userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}
                </Text>
              </RowFixed>
            </FixedHeightRow>
            <AutoColumn gap="4px">
              <FixedHeightRow>
                <Text color="#888D9B" fontSize={16} fontWeight={500}>
                  {currency0.symbol}:
                </Text>
                {token0Deposited ? (
                  <RowFixed>
                    <Text color="#888D9B" fontSize={16} fontWeight={500} marginLeft={'6px'}>
                      {token0Deposited?.toSignificant(6)}
                    </Text>
                  </RowFixed>
                ) : (
                  '-'
                )}
              </FixedHeightRow>
              <FixedHeightRow>
                <Text color="#888D9B" fontSize={16} fontWeight={500}>
                  {currency1.symbol}:
                </Text>
                {token1Deposited ? (
                  <RowFixed>
                    <Text color="#888D9B" fontSize={16} fontWeight={500} marginLeft={'6px'}>
                      {token1Deposited?.toSignificant(6)}
                    </Text>
                  </RowFixed>
                ) : (
                  '-'
                )}
              </FixedHeightRow>
            </AutoColumn>
          </AutoColumn>
        </GreyCard>
      )}
    </>
  )
}

export default function IssuerCard({ hostname, issuerAddress }: { hostname: string; issuerAddress: string }) {
  const border = 'test'
  const [showMore, setShowMore] = useState(false)

  return (
    <HoverCard border={border}>
      <AutoColumn gap="12px">
        <FixedHeightRow onClick={() => setShowMore(!showMore)} style={{ cursor: 'pointer' }}>
          <RowFixed>
            <Text fontWeight={500} fontSize={20}>
              {hostname}
            </Text>
          </RowFixed>
          <RowFixed>
            {showMore ? (
              <ChevronUp size="20" style={{ marginLeft: '10px' }} />
            ) : (
              <ChevronDown size="20" style={{ marginLeft: '10px' }} />
            )}
          </RowFixed>
        </FixedHeightRow>
        {showMore && (
          <AutoColumn gap="8px">
            <FixedHeightRow>
              <RowFixed>
                <Text fontSize={16} fontWeight={500}>
                  IssuerAddress
                </Text>
              </RowFixed>
              <RowFixed>
                <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                  <Token hash={issuerAddress} />
                </Text>
              </RowFixed>
            </FixedHeightRow>

            <RowBetween marginTop="10px">
              <ButtonSecondary as={Link} to={`/issues/${issuerAddress}/${hostname}`} width="100%">
                View issuer information
              </ButtonSecondary>
            </RowBetween>
          </AutoColumn>
        )}
      </AutoColumn>
    </HoverCard>
  )
}
export function IssueCard({ symbol = '', symbolAddress = '' }: { symbol?: string | ''; symbolAddress?: string | '' }) {
  const border = 'test'
  const [showMore, setShowMore] = useState(false)
  const [issue, setIssue] = useState({
    COMMET: '',
    BTC: '',
    CURRENCY: '',
    BUYPRICE: '',
    BUYTOTALSUPPLY: '',
    PREMINTNUMBER: '',
    BUYSTARTTIME: '',
    BUYENDTIME: '',
    STARTTIME: '',
    ENDTIME: '',
    TOTALSUPPLY: ''
  })
  const { account, library } = useWeb3React()
  const showIssue = function() {
    setShowMore(!showMore)
    if (account) {
      const btcMineToken = getBtcMineTokenContract(symbolAddress, library, account)
      btcMineToken.startTime().then((startTime: BigNumberish) => {
        issue['STARTTIME'] = moment(parseInt(startTime.toString()) * 1000).format('YYYY-MM-DD HH:mm:ss')
        setIssue({ ...issue })
      })
      btcMineToken.endTime().then((endTime: BigNumberish) => {
        issue['ENDTIME'] = moment(parseInt(endTime.toString()) * 1000).format('YYYY-MM-DD HH:mm:ss')
        setIssue({ ...issue })
      })
      btcMineToken.buyStartTime().then((buyStartTime: BigNumberish) => {
        issue['BUYSTARTTIME'] = moment(parseInt(buyStartTime.toString()) * 1000).format('YYYY-MM-DD HH:mm:ss')
        setIssue({ ...issue })
      })
      btcMineToken.buyEndTime().then((buyEndTime: BigNumberish) => {
        issue['BUYENDTIME'] = moment(parseInt(buyEndTime.toString()) * 1000).format('YYYY-MM-DD HH:mm:ss')
        setIssue({ ...issue })
      })
      btcMineToken.totalSupply().then((totalSupply: BigNumberish) => {
        issue['TOTALSUPPLY'] = formatUnits(totalSupply.toString(), 18).toString()
        setIssue({ ...issue })
      })
    }
  }
  return (
    <HoverCard border={border}>
      <AutoColumn gap="12px">
        <FixedHeightRow onClick={() => showIssue()} style={{ cursor: 'pointer' }}>
          <RowFixed>
            <Text fontWeight={500} fontSize={20}>
              {symbol}
            </Text>
          </RowFixed>
          <RowFixed>
            {showMore ? (
              <ChevronUp size="20" style={{ marginLeft: '10px' }} />
            ) : (
              <ChevronDown size="20" style={{ marginLeft: '10px' }} />
            )}
          </RowFixed>
        </FixedHeightRow>
        {showMore && (
          <AutoColumn gap="8px">
            <FixedHeightRow>
              <RowFixed>
                <Text fontSize={16} fontWeight={500}>
                  totalSupply
                </Text>
              </RowFixed>
              <RowFixed>
                <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                  {issue.TOTALSUPPLY}
                </Text>
              </RowFixed>
            </FixedHeightRow>
            <FixedHeightRow>
              <RowFixed>
                <Text fontSize={16} fontWeight={500}>
                  startTime
                </Text>
              </RowFixed>
              <RowFixed>
                <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                  {issue.STARTTIME}
                </Text>
              </RowFixed>
            </FixedHeightRow>
            <FixedHeightRow>
              <RowFixed>
                <Text fontSize={16} fontWeight={500}>
                  endTime
                </Text>
              </RowFixed>
              <RowFixed>
                <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                  {issue.ENDTIME}
                </Text>
              </RowFixed>
            </FixedHeightRow>
            <FixedHeightRow>
              <RowFixed>
                <Text fontSize={16} fontWeight={500}>
                  buyStartTime
                </Text>
              </RowFixed>
              <RowFixed>
                <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                  {issue.BUYSTARTTIME}
                </Text>
              </RowFixed>
            </FixedHeightRow>
            <FixedHeightRow>
              <RowFixed>
                <Text fontSize={16} fontWeight={500}>
                  buyEndTime
                </Text>
              </RowFixed>
              <RowFixed>
                <Text fontSize={16} fontWeight={500} marginLeft={'6px'}>
                  {issue.BUYENDTIME}
                </Text>
              </RowFixed>
            </FixedHeightRow>

            <RowBetween marginTop="10px">
              <StyledInput className="token-amount-input" value={''} />
              <ButtonSecondary as={Link} to={`/issue/${symbolAddress}`} width="100%">
                增发
              </ButtonSecondary>
            </RowBetween>
          </AutoColumn>
        )}
      </AutoColumn>
    </HoverCard>
  )
}

const StyledInput = styled.input<{ error?: boolean; fontSize?: string; align?: string }>`
  color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
  width: 100%;
  position: relative;
  font-weight: 500;
  outline-style: none;
  border: 1px solid #ccc;
  flex: 1 1 auto;
  background-color: ${({ theme }) => theme.bg1};
  font-size: ${({ fontSize }) => fontSize ?? '24px'};
  text-align: ${({ align }) => align && align};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px;
  margin-right: 10px;
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

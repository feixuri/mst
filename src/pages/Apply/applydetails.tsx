import { RouteComponentProps } from 'react-router'
import React, { useContext } from 'react'
import AppBody from '../AppBody'
import { AddRemoveTabs } from '../../components/NavigationTabs'
import { Wrapper } from '../Pool/styleds'
// import TransactionConfirmationModal, { ConfirmationModalContent } from '../../components/TransactionConfirmationModal'
import { AutoColumn, ColumnCenter } from '../../components/Column'
import { ArrowWrapper, BottomGrouping } from '../../components/swap/styleds'
// import { BlueCard, GreyCard, LightCard } from '../../components/Card'
// import { TYPE } from '../../theme'
// import CurrencyInputPanel from '../../components/CurrencyInputPanel'
// import { Field } from '../../state/mint/actions'
// import { Plus } from 'react-feather'
// import { PairState } from '../../data/Reserves'
// import { RowBetween } from '../../components/Row'
// import { PoolPriceBar } from '../AddLiquidity/PoolPriceBar'
// import { ButtonError, ButtonLight, ButtonPrimary } from '../../components/Button'
import { ButtonError } from '../../components/Button'
import { Text } from 'rebass'
import { AutoRow, RowBetween, RowFixed } from '../../components/Row'
// import TradePrice from '../../components/swap/TradePrice'
// import { INITIAL_ALLOWED_SLIPPAGE } from '../../constants'
// import Card from '../../components/Card'
import styled, { ThemeContext } from 'styled-components'
import { TYPE } from '../../theme'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import ApplyInputPanelProps from '../../components/ApplyInputPanel'
// import { Field } from '../../state/swap/actions'
import { ArrowDown } from 'react-feather'
// import AddressInputPanel from '../../components/AddressInputPanel'
// import Card from '../../components/Card'
// import TradePrice from '../../components/swap/TradePrice'
// import { INITIAL_ALLOWED_SLIPPAGE } from '../../constants'
// import { TradeType } from '@uniswap/sdk'
// import QuestionHelper from '../../components/QuestionHelper'
// import { Field } from '../../state/swap/actions'
// import { ApprovalState } from '../../hooks/useApproveCallback'
// import { Text } from 'rebass'
// import { MinimalPositionCard } from '../../components/PositionCard'

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
export function ApplyDetails(props: RouteComponentProps<{ applyId: string }>) {
  //   const {
  //     match: {
  //       params: { applyId }
  //     }
  //   } = props

  const theme = useContext(ThemeContext)
  return (
    <>
      <AppBody>
        <AddRemoveTabs adding={true} />
        <Wrapper>
          <AutoColumn gap="20px">
            <ColumnCenter></ColumnCenter>
            <StyledContent style={{ padding: '0 20px' }}>
              <StyledInfo>
                <StyledEthereumLogo src={EthereumLogo} size={'40px'} style={{}} />
              </StyledInfo>
              <StyledTitle>AR-ETH</StyledTitle>
              <StyledDetails>
                <StyledDetail>
                  Arweave is a new blockchain storage platform designed to overcome the scalability, data availability,
                  and cost issues that exist in blockchain data storage.{' '}
                </StyledDetail>
              </StyledDetails>
            </StyledContent>
            <AutoColumn style={{ padding: '0 20px' }}>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    Token总量
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  10,000,000,000
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    发⾏合约地址
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  0xb132F38...a7C1A6
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    储备率
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  0.22ETH
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    生效周期
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  7day
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    收益开始时间
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  2020-12-21
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    收益结束时间
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  2023-12-11
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    矿机品牌
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  XXXXX
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    矿机型号
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  XXXXX
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    认购价格
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  0.22ETH
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    starttime
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  2020-12-30 12:30:00
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    endtime
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  2020-12-30 12:30:00
                </TYPE.black>
              </RowBetween>
            </AutoColumn>
            <AutoColumn gap={'md'}>
              <ApplyInputPanelProps label={'认购数量'} />
              <AutoColumn justify="space-between">
                <AutoRow justify={'center'}>
                  <ArrowWrapper clickable>
                    <ArrowDown size="16" color={theme.text2} />
                  </ArrowWrapper>
                </AutoRow>
              </AutoColumn>
              <ApplyInputPanelProps label={'总价'} />
            </AutoColumn>
            <BottomGrouping>
              <ButtonError>
                <Text fontSize={16} fontWeight={500}>
                  Pay
                </Text>
              </ButtonError>
            </BottomGrouping>
          </AutoColumn>
        </Wrapper>
      </AppBody>
    </>
  )
}

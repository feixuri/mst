// import React, { useContext, useMemo } from 'react'

// import AppBody from '../AppBody'
import React from 'react'
import PageHeader from '../../components/PageHeader'
import chef from '../../assets/img/chef.png'
// import { Wrapper } from '../../components/swap/styleds'
// import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import Container from '../../components/CardContent'
import Balances from './components/Balances'
import Value from '../../components/Value'
import Label from '../../components/Label'
const Div1 = styled.div`
  display: grid;
  grid-auto-rows: auto;
  row-gap: 24px;
  justify-items: center;
  max-width: 640px;
  width: 100%;
  // background: ${({ theme }) => theme.bg1};
  // box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
  //   0px 24px 32px rgba(0, 0, 0, 0.01);
  // background:linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 154, 0) 10%, rgb(208, 222, 33) 20%, rgb(79, 220, 74) 30%, rgb(63, 218, 216) 40%, rgb(47, 201, 226) 50%, rgb(28, 127, 238) 60%, rgb(95, 21, 242) 70%, rgb(186, 12, 248) 80%, rgb(251, 7, 217) 90%, rgb(255, 0, 0) 100%) 0% 0% / 300% 300%;
  border-radius: 10px;
  // margin-bottom: 1rem;
  padding: 8px 16px;
`

const Div11 = styled.div`
  background: ${({ theme }) => theme.grey200};
  border: 1px solid ${({ theme }) => theme.grey300}ff;
  border-radius: 12px;
  box-shadow: inset 1px 1px 0px ${({ theme }) => theme.grey100};
  width: 100%;
  max-width: 720px;
  display: grid;
  grid-auto-rows: auto;
`

const CardHome = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  gap: 0px;
  -webkit-box-align: center;
  align-items: center;
  padding: 1rem;
  z-index: 1;
`
const BalCard = styled.div`
  text-align: center;
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  border-right: solid 1px ${({ theme }) => theme.grey300};
`
const BalSumCard = styled.div`
  text-align: center;
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
`
const Footnote = styled.div`
  font-size: 14px;
  padding: 8px 20px;
  color: ${({ theme }) => theme.grey400};
  border-top: solid 1px ${({ theme }) => theme.grey300};
`
const FootnoteValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  float: right;
`
export default function Home() {
  return (
    <>
      <PageHeader
        icon={<img src={chef} height={120} alt="" />}
        title="MasterChef is Ready"
        subtitle="Stake MinerSwap LP tokens to claim your very own great MST!"
      />
      <Container>
        <Balances />
      </Container>
      <StyledInfo>
        🏆<b>Pro Tip</b>: MST-ETH SLP token pool yields 10.0x more token rewards per block.
      </StyledInfo>
      <Div1>
        <Div11>
          <CardHome>
            <BalCard>
              <Label text="Your Earnings" />
              <Value value={'0.5'} />
              <Label text="WBTC" />
            </BalCard>
            <BalSumCard>
              <Label text="Hash Token" />
              <Value value={'2,100'} />
              <Label text="HB.COM.BTC.30.01" />
            </BalSumCard>
          </CardHome>
          <Footnote>
            Pending
            <FootnoteValue>1,000 WBTC</FootnoteValue>
          </Footnote>
        </Div11>
      </Div1>
      <Div1>
        <Div11>
          <CardHome>
            <BalCard>
              <Label text="Your Earnings" />
              <Value value={'80'} />
              <Label text="WBTC" />
            </BalCard>
            <BalSumCard>
              <Label text="Hash Token" />
              <Value value={'9,100'} />
              <Label text="HB.COM.BTC.30.01" />
            </BalSumCard>
          </CardHome>
          <Footnote>
            Pending
            <FootnoteValue>8,000 WBTC</FootnoteValue>
          </Footnote>
        </Div11>
      </Div1>
      <Div1>
        <Div11>
          <CardHome>
            <BalCard>
              <Label text="Your Earnings" />
              <Value value={'20.5'} />
              <Label text="WBTC" />
            </BalCard>
            <BalSumCard>
              <Label text="Hash Token" />
              <Value value={'3,100'} />
              <Label text="HB.COM.BTC.30.01" />
            </BalSumCard>
          </CardHome>
          <Footnote>
            Pending
            <FootnoteValue>4,000 WBTC</FootnoteValue>
          </Footnote>
        </Div11>
      </Div1>
    </>
  )
}

const StyledInfo = styled.h3`
  color: ${({ theme }) => theme.grey500};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${({ theme }) => theme.grey600};
  }
`

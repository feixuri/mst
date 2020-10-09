import React from 'react'

import styled from 'styled-components'

import { StyledCard } from '../../components/Card'
import CardContent from '../../components/CardContent'
import CardIcon from '../../components/CardIcon'
import CardButton from '../../components/CardButton'
import Spacer from '../../components/Spacer'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import UsdtLogo from '../../assets/images/usdt-logo.png'
import GrinLogo from '../../assets/images/grin.png'
// import AppBody from '../AppBody'

// import ListLogo from '../../components/ListLogo'
export default function Pool() {
  return (
    <>
      <StyledCards>
        <StyledRow>
          <StyledCardWrapper>
            <StyledCard>
              <CardContent>
                <StyledContent>
                  <CardIcon><StyledEthereumLogo src={EthereumLogo} size={'40px'} style={{}}/></CardIcon>
                  <StyledTitle>ETH</StyledTitle>
                  <StyledDetails>
                    <StyledDetail>Deposit ETH</StyledDetail>
                    <StyledDetail>Earn MST</StyledDetail>
                  </StyledDetails>
                  <Spacer/>
                  <CardButton disabled={false} text={'Select'} to={`/liquidityMining`}></CardButton>
                </StyledContent>
              </CardContent>
            </StyledCard>
          </StyledCardWrapper>
          <Spacer/>
          <StyledCardWrapper>
            <StyledCard>
              <CardContent>
                <StyledContent>
                  <CardIcon><StyledEthereumLogo src={UsdtLogo} size={'40px'} style={{}}/></CardIcon>
                  {/*<ListLogo style={{ marginRight: '1rem' }} logoURI={'https://raw.githubusercontent.com/compound-finance/token-list/master/assets/asset_USDT.svg'} alt={`usdt logo`} />*/}
                  <StyledTitle>USDT</StyledTitle>
                  <StyledDetails>
                    <StyledDetail>Deposit USDT</StyledDetail>
                    <StyledDetail>Earn MST</StyledDetail>
                  </StyledDetails>
                  <Spacer/>
                  <CardButton disabled={true} text={'Select'} to={`/liquidityMining`}></CardButton>
                </StyledContent>
              </CardContent>
            </StyledCard>
          </StyledCardWrapper>
          <Spacer/>
          <StyledCardWrapper>
            <StyledCard>
              <CardContent>
                <StyledContent>
                  {/*<CardIcon>🍣</CardIcon>*/}
                  <CardIcon><StyledEthereumLogo src={GrinLogo} size={'40px'} style={{}}/></CardIcon>
                  <StyledTitle>WGRIN</StyledTitle>
                  <StyledDetails>
                    <StyledDetail>Deposit WGRIN</StyledDetail>
                    <StyledDetail>Earn MST</StyledDetail>
                  </StyledDetails>
                  <Spacer/>
                  <CardButton disabled={true} text={'Select'} to={`/liquidityMining`}></CardButton>
                </StyledContent>
              </CardContent>
            </StyledCard>
          </StyledCardWrapper>
        </StyledRow>
        <StyledRow>
          <StyledCardWrapper>
            <StyledCard>
              <CardContent>
                <StyledContent>
                  <StyledInfo>
                    <StyledEthereumLogo src={EthereumLogo} size={'40px'} style={{}} />
                    <StyledEthereumLogo src={UsdtLogo} size={'40px'} style={{}} />
                  </StyledInfo>
                  <StyledTitle>MST-ETH</StyledTitle>
                  <StyledInsight>
                    <span> Total deposited</span>
                    <span>$519,942,513</span>
                  </StyledInsight>
                  <Spacer/>
                  <CardButton disabled={false} text={'Deposit'} to={`/liquidityMining`}></CardButton>
                </StyledContent>
              </CardContent>
            </StyledCard>
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <StyledCard>
              <CardContent>
                <StyledContent>
                  <StyledInfo>
                    <StyledEthereumLogo src={EthereumLogo} size={'40px'} style={{}}/>
                    <StyledEthereumLogo src={UsdtLogo} size={'40px'} style={{}}/>
                  </StyledInfo>
                  <StyledTitle>MST-USDT</StyledTitle>
                  <StyledInsight>
                    <span> Total deposited</span>
                    <span>$519,942,513</span>
                  </StyledInsight>
                  <Spacer/>
                  <CardButton disabled={false} text={'Deposit'} to={`/liquidityMining`}></CardButton>
                </StyledContent>
              </CardContent>
            </StyledCard>
          </StyledCardWrapper>
        </StyledRow>
      </StyledCards>
      {/*<AppBody></AppBody>*/}
    </>
  )
}

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  color: #aa9584;
  width: 100%;
  margin-top: 12px;
  line-height: 32px;
  font-size: 13px;
  text-align: center;
  padding: 0 12px;
`
const StyledInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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
const StyledDetail = styled.div`
  color: ${({ theme }) => theme.grey500};
`

const StyledDetails = styled.div`
  margin-top: ${({ theme }) => theme.spacing[2]}px;
  text-align: center;
`
const StyledTitle = styled.h4`
  color: ${({ theme }) => theme.grey600};
  font-size: 24px;
  font-weight: 700;
  margin: ${({ theme }) => theme.spacing[2]}px 0 0;
  padding: 0;
`
const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: ${({ theme }) => theme.spacing[4]}px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`
const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - 24px * 2) / 3);
  position: relative;
`
// const ParticipatingWrapper = styled.div`
//   display: flex;
//   width: 100%;
//   position: relative;
// `

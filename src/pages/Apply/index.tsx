import React from 'react'

import styled from 'styled-components'

import { StyledCard } from '../../components/Card'
import CardContent from '../../components/CardContent'
import CardButton from '../../components/CardButton'
import Spacer from '../../components/Spacer'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import UsdtLogo from '../../assets/images/usdt-logo.png'
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
                  <StyledInfo>
                    <StyledEthereumLogo src={EthereumLogo} size={'40px'} style={{}} />
                  </StyledInfo>
                  <StyledTitle>AR-ETH</StyledTitle>
                  <StyledDetails>
                    <StyledDetail>Arweave is a new blockchain storage platform designed to overcome the scalability, data availability, and cost issues that exist in blockchain data storage. </StyledDetail>
                  </StyledDetails>
                  <StyledInsight>
                    <span>Start Time</span>
                    <span>2020-09-04 15:08:09</span>
                  </StyledInsight>
                  <StyledInsight>
                    <span>End Time</span>
                    <span>2020-09-14 20:08:09</span>
                  </StyledInsight>
                  <Spacer/>
                  <CardButton disabled={false} text={'Buy'} to={`/apply`}></CardButton>
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
                    <StyledEthereumLogo src={UsdtLogo} size={'40px'} style={{}} />
                  </StyledInfo>
                  <StyledTitle>RFUEL-USDT</StyledTitle>
                  <StyledDetails>
                    <StyledDetail>Rio DeFi is creating technological infrastructure for a new decentralized financial system powered by blockchains and smart contracts.</StyledDetail>
                  </StyledDetails>
                  <StyledInsight>
                    <span>Start Time</span>
                    <span>2020-09-04 15:08:09</span>
                  </StyledInsight>
                  <StyledInsight>
                    <span>End Time</span>
                    <span>2020-09-14 20:08:09</span>
                  </StyledInsight>
                  <Spacer/>
                  <CardButton disabled={false} text={'Buy'} to={`/apply`}></CardButton>
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
                    <StyledEthereumLogo src={UsdtLogo} size={'40px'} style={{}} />
                  </StyledInfo>
                  <StyledTitle>RFUEL-USDT</StyledTitle>
                  <StyledDetails>
                    <StyledDetail>Rio DeFi is creating technological infrastructure for a new decentralized financial system powered by blockchains and smart contracts.</StyledDetail>
                  </StyledDetails>
                  <StyledInsight>
                    <span>Start Time</span>
                    <span>2020-09-04 15:08:09</span>
                  </StyledInsight>
                  <StyledInsight>
                    <span>End Time</span>
                    <span>2020-09-14 20:08:09</span>
                  </StyledInsight>
                  <Spacer/>
                  <CardButton disabled={false} text={'Buy'} to={`/apply`}></CardButton>
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
  margin-top: ${({ theme }) => theme.spacing[2]}px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  color: #aa9584;
  width: 100%;
  line-height: 20px;
  font-size: 13px;
  text-align: center;
`
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
// color: ${({ theme }) => theme.grey500};
const StyledDetail = styled.div`
  color: #aa9584;
`

const StyledDetails = styled.div`
  margin-top: ${({ theme }) => theme.spacing[2]}px;
  font-size: 12px;
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

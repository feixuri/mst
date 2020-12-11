import React from 'react'
import styled from 'styled-components'
import { StyledCard } from '../../components/Card'
import CardContent from '../../components/CardContent'
import CardButton from '../../components/CardButton'
import Spacer from '../../components/Spacer'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import { useAllMineTokenAddressess, useBuyAllMineTokens } from '../../state/issue/hooks'
import moment from 'moment'

export default function Buy() {
  const mineTokens = useAllMineTokenAddressess()
  const allMineTokenInfos = useBuyAllMineTokens(mineTokens)
  // console.log(allMineTokenInfos)
  const cardList = (allMineTokenInfos || []).map((item, index) => {
    // return item && item.buyEndTime && item.buyEndTime * 1000 > new Date().getTime() ? (
    return item && item.buyEndTime ? (
      <>
        <StyledCardWrapper key={index} style={{ padding: '10px' }}>
          <StyledCard>
            <CardContent>
              <StyledContent>
                <StyledDetails style={{ width: '100%', textAlign: 'right' }}>
                  {/*<StyledTime>End countdown:1D15H</StyledTime>*/}
                  <StyledTime></StyledTime>
                </StyledDetails>
                <StyledInfo>
                  <StyledEthereumLogo src={EthereumLogo} size={'40px'} style={{}} />
                </StyledInfo>
                <StyledTitle>{item.symbol}</StyledTitle>
                <StyledDetails>
                  <StyledDetail>{item.comment} </StyledDetail>
                </StyledDetails>
                <StyledInsight>
                  <span>Starting time of purchase</span>
                  <span>
                    {item.buyStartTime
                      ? moment(parseInt(item.buyStartTime.toString()) * 1000).format('YYYY-MM-DD HH:mm:ss')
                      : '-'}
                  </span>
                </StyledInsight>
                {/*style={{ minHeight: 200, justifyContent: 'center', alignItems: 'center' }}>*/}
                <StyledInsight style={{ borderTop: 'solid 1px #e2d6cf', borderRadius: 'unset' }}>
                  <span>End time of purchase</span>
                  <span>
                    {item.buyEndTime
                      ? moment(parseInt(item.buyEndTime.toString()) * 1000).format('YYYY-MM-DD HH:mm:ss')
                      : '-'}
                  </span>
                </StyledInsight>
                <Spacer />
                <CardButton disabled={false} text={'Buy'} to={`/apply/${item.address}/${item.symbol}`} />
              </StyledContent>
            </CardContent>
          </StyledCard>
        </StyledCardWrapper>
      </>
    ) : null
  })
  return (
    <>
      <StyledCards>
        <StyledRow>
          <>{cardList}</>
        </StyledRow>
      </StyledCards>
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
const StyledTime = styled.div`
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

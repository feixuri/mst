import AppBody from '../AppBody'
import React, { useContext, useEffect, useState } from 'react'
import { ButtonSecondary } from '../../components/Button'
import { AutoColumn, ColumnCenter } from '../../components/Column'
import { AutoRow, RowBetween, RowFixed } from '../../components/Row'
import { BackArrow, TYPE } from '../../theme'
import { getBitcoinOracleContract } from '../../utils'
import { useWeb3React } from '@web3-react/core'
import { AddRemoveTabs } from '../../components/NavigationTabs'
import { Wrapper } from '../Pool/styleds'
// import { ISSUERMANAGER_ADDRESS } from '../../constants'
import styled, { ThemeContext } from 'styled-components'
import Token from '../../components/IssuerCard/Token'
// import Adderss from '../../components/IssuerCard/Adderss'
import { Link, RouteComponentProps } from 'react-router-dom'

export function BitcoinOracle({
  match: {
    params: { tokens }
  }
}: RouteComponentProps<{ tokens: string }>) {
  // const token = ISSUERMANAGER_ADDRESS
  const { account, chainId, library } = useWeb3React()
  const [latestBlockInfo, setLatestBlockInfo] = useState<any>()
  const getIssuers = async () => {
    if (!chainId || !library || !account) return
    const bitcoinOracle = getBitcoinOracleContract(tokens, library, account)
    setLatestBlockInfo(
      await bitcoinOracle.latestBlockInfo().then((latestBlockInfo: any) => {
        return latestBlockInfo
      })
    )
  }
  useEffect(() => {
    getIssuers()
  }, [])
  const theme = useContext(ThemeContext)
  return (
    <>
      <AppBody>
        <AddRemoveTabs adding={true} />
        <Wrapper>
          <AutoColumn gap="20px">
            <AutoRow style={{ alignItems: 'center', justifyContent: 'space-between' }} gap="8px">
              <BackArrow to={`/owner`} />
            </AutoRow>
            <ColumnCenter />
            <StyledContent style={{ padding: '0 20px' }}>
              <StyledTitle>BitcoinOracle</StyledTitle>
            </StyledContent>
            <AutoColumn style={{ padding: '0 20px' }}>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    合约地址
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  <Token hash={tokens} />
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    timestamp
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  {latestBlockInfo ? latestBlockInfo[0].toString() : '0'}
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    rewardPerTPerSecond
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  {latestBlockInfo ? latestBlockInfo[1].toString() : '0'}
                </TYPE.black>
              </RowBetween>
              <RowBetween marginTop="10px">
                <ButtonSecondary as={Link} to={`/updateBlockInfo/${tokens}`} width="100%">
                  Update blockInfo
                </ButtonSecondary>
              </RowBetween>
            </AutoColumn>
          </AutoColumn>
        </Wrapper>
      </AppBody>
    </>
  )
}

const StyledTitle = styled.h4`
  color: ${({ theme }) => theme.grey600};
  font-size: 24px;
  font-weight: 700;
  margin: ${({ theme }) => theme.spacing[2]}px 0 0;
  padding: 0;
`
const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

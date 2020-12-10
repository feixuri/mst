import React, { useContext, useEffect, useState } from 'react'
import AppBody from '../AppBody'
import { AddRemoveTabs } from '../../components/NavigationTabs'
import { Wrapper } from '../Pool/styleds'
import { AutoColumn, ColumnCenter } from '../../components/Column'
import { ButtonSecondary } from '../../components/Button'
import { RowBetween, RowFixed } from '../../components/Row'
import styled, { ThemeContext } from 'styled-components'
import { TYPE } from '../../theme'
import { getIssuerManagerContract } from '../../utils'
import { useWeb3React } from '@web3-react/core'
import Token from '../../components/IssuerCard/Token'
import { ISSUERMANAGER_ADDRESS } from '../../constants'
import Adderss from '../../components/IssuerCard/Adderss'
import { Link } from 'react-router-dom'
export default function Owner() {
  const token = ISSUERMANAGER_ADDRESS
  const { account, chainId, library } = useWeb3React()
  const [feeTo, setFeeTo] = useState<string>('')
  const [countOfIssuer, setCountOfIssuer] = useState<string>('0')
  const [owner, setOwner] = useState<string>('')
  const [bitcoinOracle, setBitcoinOracle] = useState<string>('')
  const getIssuers = async () => {
    if (!chainId || !library || !account) return
    const issuerManager = getIssuerManagerContract(chainId, library, account)
    setFeeTo(
      await issuerManager.getFeeTo().then((feeTo: string) => {
        return feeTo
      })
    )
    setOwner(
      await issuerManager.owner().then((owner: string) => {
        return owner
      })
    )
    setCountOfIssuer(
      await issuerManager.countOfIssuer().then((countOfIssuer: string) => {
        console.log(countOfIssuer)
        return countOfIssuer
      })
    )
    setBitcoinOracle(
      await issuerManager.bitcoinOracle().then((bitcoinOracle: string) => {
        return bitcoinOracle
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
            <ColumnCenter />
            <StyledContent style={{ padding: '0 20px' }}>
              <StyledTitle>IssuerManager</StyledTitle>
            </StyledContent>
            <AutoColumn style={{ padding: '0 20px' }}>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    合约地址
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  <Token hash={token} />
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    OwnerAddress
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  <Adderss hash={owner ? owner : '0x0000000000000000000000000000000000000000'} />
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    countOfIssuer
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  {countOfIssuer.toString()}
                </TYPE.black>
              </RowBetween>
              <RowBetween marginTop="10px">
                <ButtonSecondary as={Link} to={`/removeIssuer`}>
                  RemoveIssuer
                </ButtonSecondary>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    BitcoinOracleAdderss
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  <Adderss hash={bitcoinOracle ? bitcoinOracle : '0x0000000000000000000000000000000000000000'} />
                </TYPE.black>
              </RowBetween>
              <RowBetween marginTop="10px">
                <ButtonSecondary as={Link} to={`/bitcoinOracle/${bitcoinOracle}`} width="100%">
                  View bitcoinOracle information
                </ButtonSecondary>
              </RowBetween>
              <RowBetween marginTop="10px">
                <ButtonSecondary as={Link} to={`/bitcoinOracleSet`} width="100%">
                  Update bitcoinOracle
                </ButtonSecondary>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    FeeToAddress
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  <Adderss hash={feeTo ? feeTo : '0x0000000000000000000000000000000000000000'} />
                </TYPE.black>
              </RowBetween>
              <RowBetween marginTop="10px">
                <ButtonSecondary as={Link} to={`/feeToSet`}>
                  Set FeeTo Address
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

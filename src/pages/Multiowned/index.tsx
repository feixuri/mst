import React, { useContext, useEffect, useState } from 'react'
import AppBody from '../AppBody'
import { AddRemoveTabs } from '../../components/NavigationTabs'
import { Wrapper } from '../Pool/styleds'
import { AutoColumn, ColumnCenter } from '../../components/Column'
import { ButtonSecondary } from '../../components/Button'
import { RowBetween, RowFixed } from '../../components/Row'
import styled, { ThemeContext } from 'styled-components'
import { TYPE } from '../../theme'
import { getMultiownedContract } from '../../utils'
import { useWeb3React } from '@web3-react/core'
import Token from '../../components/IssuerCard/Token'
import { MULTIOWNED_ADDRESS } from '../../constants'
import { Link } from 'react-router-dom'
export default function Owner() {
  const token = MULTIOWNED_ADDRESS
  const { account, chainId, library } = useWeb3React()
  const [required, setRequired] = useState<string>('0')
  const [numOwners, setNumOwners] = useState<string>('0')
  const getIssuers = async () => {
    if (!chainId || !library || !account) return
    const multiowned = getMultiownedContract(token, library, account)
    setRequired(
      await multiowned.m_required().then((required: string) => {
        return required
      })
    )
    setNumOwners(
      await multiowned.m_numOwners().then((numOwners: string) => {
        return numOwners
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
              <StyledTitle>Multiowned</StyledTitle>
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
                    numOwners
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  {numOwners.toString()}
                </TYPE.black>
              </RowBetween>
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text6}>
                    required
                  </TYPE.black>
                </RowFixed>
                <TYPE.black fontSize={14} color={theme.text6}>
                  {required.toString()}
                </TYPE.black>
              </RowBetween>
              <RowBetween marginTop="10px">
                <ButtonSecondary as={Link} to={`/addOwner`}>
                  AddOwner
                </ButtonSecondary>
              </RowBetween>
              <RowBetween marginTop="10px">
                <ButtonSecondary as={Link} to={`/changeRequirement`}>
                  ChangeRequirement
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

import AppBody from '../AppBody'
import React, { useContext, useEffect, useState } from 'react'
import { ButtonPrimary } from '../../components/Button'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Text } from 'rebass'
import { AutoColumn } from '../../components/Column'
import { AutoRow, RowBetween } from '../../components/Row'
// import Question from '../../components/QuestionHelper'
import { ThemeContext } from 'styled-components'
import { IssueCard } from '../../components/IssuerCard'
import { BackArrow, TYPE } from '../../theme'
import { getIssuerBTCContract } from '../../utils'
import { useWeb3React } from '@web3-react/core'

export function IssueList({
  match: {
    params: { tokens, hostname }
  }
}: RouteComponentProps<{ tokens: string; hostname: string }>) {
  const theme = useContext(ThemeContext)
  const [data, setData] = useState([
    {
      symbol: '',
      minetoken: ''
    }
  ])
  const { account, library } = useWeb3React()
  const getMinetokens = async () => {
    if (!library || !account) return
    const tokenArry = [
      {
        symbol: '',
        minetoken: ''
      }
    ]
    const issuerBTC = getIssuerBTCContract(tokens, library, account)
    const serialNumber = await issuerBTC.serialNumber().then((serialNumber: number) => {
      return serialNumber
    })
    const symbol = await issuerBTC.SYMBOL().then((symbol: string) => {
      return symbol
    })
    for (let sn = 1; sn <= serialNumber; sn++) {
      await issuerBTC.getMineToken(hostname + '-' + symbol + sn).then((token: string) => {
        tokenArry.push({
          symbol: hostname + '-' + symbol + sn,
          minetoken: token
        })
      })
    }
    setData(
      tokenArry.filter(function(s) {
        return s
      })
    )
  }
  useEffect(() => {
    getMinetokens()
  }, [])

  const cardList = (data || []).map(item => {
    return item && item.minetoken ? (
      <IssueCard
        key={item.minetoken}
        symbol={item.symbol}
        symbolAddress={item.minetoken}
        tokens={tokens}
        hostname={hostname}
      />
    ) : null
  })
  return (
    <>
      <AppBody>
        <AutoColumn gap="lg" justify="center">
          <AutoRow style={{ alignItems: 'center', justifyContent: 'space-between' }} gap="8px">
            <BackArrow to="/issue" />
            <TYPE.mediumHeader>{hostname}</TYPE.mediumHeader>
            <div>
              {/*<QuestionHelper text="说明文字" />*/}
            </div>
          </AutoRow>
          <ButtonPrimary id="join-pool-button" as={Link} style={{ padding: 16 }} to={`/issue/${tokens}/${hostname}`}>
            <Text fontWeight={500} fontSize={20}>
              Issued New Token
            </Text>
          </ButtonPrimary>
          <AutoColumn gap="12px" style={{ width: '100%' }}>
            <RowBetween padding={'0 8px'}>
              <Text color={theme.text1} fontWeight={500}>
                Your Minetokens
              </Text>
              {/*<Question text="说明文字." />*/}
            </RowBetween>
            <>{cardList}</>
          </AutoColumn>
        </AutoColumn>
      </AppBody>
    </>
  )
}

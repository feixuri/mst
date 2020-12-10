import AppBody from '../AppBody'
import React, { useContext, useEffect, useState } from 'react'
import { ButtonPrimary } from '../../components/Button'
import { Link } from 'react-router-dom'
import { Text } from 'rebass'
import { AutoColumn } from '../../components/Column'
import { RowBetween } from '../../components/Row'
import Question from '../../components/QuestionHelper'
import { ThemeContext } from 'styled-components'
import IssuerCard from '../../components/IssuerCard'
import { getIssuerManagerContract } from '../../utils'
import { useWeb3React } from '@web3-react/core'
// import ERC20_INTERFACE from '../../constants/abis/erc20'

export default function IssueList() {
  const theme = useContext(ThemeContext)

  const [data, setData] = useState([
    {
      hostname: '',
      issuerAddress: ''
    }
  ])
  const { account, chainId, library } = useWeb3React()
  const getIssuers = async () => {
    if (!chainId || !library || !account) return
    const issuerManager = getIssuerManagerContract(chainId, library, account)
    const countOfIssuer = await issuerManager.countOfIssuer().then((countOfIssuer: number) => {
      return countOfIssuer
    })
    const hostnames: string[] = []
    for (let sn = 0; sn < countOfIssuer; sn++) {
      await issuerManager.hostnameAtIndex(sn).then((hostname: string) => {
        hostnames.push(hostname)
      })
    }
    const issuerArry = [
      {
        hostname: '',
        issuerAddress: ''
      }
    ]
    for (let i = 0; i < hostnames.length; i++) {
      await issuerManager.getIssuerAddress(hostnames[i]).then((addresss: any) => {
        issuerArry.push({ hostname: hostnames[i], issuerAddress: addresss[1] })
      })
    }
    setData(
      issuerArry.filter(function(issuers) {
        return issuers
      })
    )
  }
  useEffect(() => {
    getIssuers()
  }, [])
  const cardList = (data || []).map(item => {
    return item && item.hostname ? (
      <IssuerCard key={item.issuerAddress} hostname={item.hostname} issuerAddress={item.issuerAddress} />
    ) : null
  })
  //获取ERC20 代币余额
  // const balances = useMultipleContractSingleData(validatedTokenAddresses, ERC20_INTERFACE, 'balanceOf', [address])
  return (
    <>
      <AppBody>
        <AutoColumn gap="lg" justify="center">
          <ButtonPrimary id="join-pool-button" as={Link} style={{ padding: 16 }} to="/registIssuer">
            <Text fontWeight={500} fontSize={20}>
              Add New Issuer
            </Text>
          </ButtonPrimary>
          <AutoColumn gap="12px" style={{ width: '100%' }}>
            <RowBetween padding={'0 8px'}>
              <Text color={theme.text1} fontWeight={500}>
                Your Issuers
              </Text>
              <Question text="说明文字." />
            </RowBetween>
            <>{cardList}</>
          </AutoColumn>
        </AutoColumn>
      </AppBody>
    </>
  )
}

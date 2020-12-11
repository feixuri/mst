import React from 'react'
import PageHeader from '../../components/PageHeader'
import chef from '../../assets/img/chef.png'
import styled from 'styled-components'
import Value from '../../components/Value'
import Label from '../../components/Label'
import { useAllMineTokenAddressess, useHomeAllMineTokens, useAllMineTokenInfo } from '../../state/issue/hooks'
import { formatUnits } from '@ethersproject/units'
import CardButton from '../../components/CardButton'
import { BigNumber } from '@ethersproject/bignumber'
import { useActiveWeb3React } from '../../hooks'
import { getBtcMineTokenContract } from '../../utils'
export default function Home() {
  const { account, chainId, library } = useActiveWeb3React()
  useAllMineTokenInfo(account ?? undefined)
  const mineTokens = useAllMineTokenAddressess()
  const homeAllMineTokens = useHomeAllMineTokens(mineTokens, account ?? undefined)

  const tokenCard = (homeAllMineTokens || []).map((item, index) => {
    return item && item.balance && item.balance > 0 ? (
      <ColumnHome key={index}>
        <Div11>
          <CardHome>
            <BalSumCard>
              <Label text={item.symbol} />
              <Value value={item.balance ? formatUnits(item.balance.toString(), 18).toString() : 0} />
            </BalSumCard>
          </CardHome>
          <Footnote>
            Reward
            <FootnoteValue>{item.reward ? formatUnits(item.reward.toString(), 18).toString() : 0}</FootnoteValue>
          </Footnote>
          <StyledCardActions>
            <CardButton
              disabled={item.reward && item.reward.toString() !== '0' ? false : true}
              text={'Harvest'}
              onClick={async () => {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                await onHarvest(item.reward, item.address)
              }}
            />
          </StyledCardActions>
        </Div11>
      </ColumnHome>
    ) : null
  })

  const onHarvest = function(reward: BigNumber | undefined, address: string | undefined) {
    console.log(reward ? reward.toString() : '')
    if (!chainId || !library || !account) return
    const btcMineToken = getBtcMineTokenContract(address ? address : '', library, account)
    const method = btcMineToken.harvest
    const args = [reward ? reward.toString() : '']
    const value = null
    method(...args, {
      ...(value ? { value } : {}),
      gasLimit: 5000000
    }).then((response: any) => {
      console.log(response)
    })
  }
  return (
    <>
      {/*<Container>*/}
      {/*  <Balances />*/}
      {/*</Container>*/}

      {tokenCard.length === 0 && (
        <PageHeader
          icon={<img src={chef} height={120} alt="" />}
          title="Excavator is ready"
          subtitle="Please move to “BUY” or “SWAP” to purchase token"
        />
      )}
      {tokenCard.length > 0 && (
        <PageHeader icon={<img src={chef} height={120} alt="" />} title="Excavator is ready" subtitle="" />
      )}
      <>{tokenCard}</>
      {/*<>{}</>*/}
    </>
  )
}
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing[3]}px;
  width: 100%;
`

const ColumnHome = styled.div`
  display: grid;
  grid-auto-rows: auto;
  row-gap: 24px;
  justify-items: center;
  max-width: 640px;
  width: 100%;
  border-radius: 10px;
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
  padding: ${({ theme }) => theme.spacing[3]}px;
`

const CardHome = styled.div`
  display: grid;
  gap: 0px;
  -webkit-box-align: center;
  align-items: center;
  padding: 1rem;
  z-index: 1;
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

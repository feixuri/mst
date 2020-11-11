import { ChainId } from '@uniswap/sdk'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'

import styled from 'styled-components'

// import Logo from '../../assets/svg/logo.svg'
// import Logo from '../../assets/svg/logo.svg'
import Logo from '../../assets/img/chef.png'
import LogoDark from '../../assets/svg/logo_white.svg'
// import Wordmark from '../../assets/svg/wordmark.svg'
// import WordmarkDark from '../../assets/svg/wordmark_white.svg'
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances } from '../../state/wallet/hooks'

import { YellowCard } from '../Card'
import Settings from '../Settings'
import Menu from '../Menu'

// import Row, { RowBetween } from '../Row'
import { RowBetween } from '../Row'
import Web3Status from '../Web3Status'
import { NavLink } from 'react-router-dom'
// import VersionSwitch from './VersionSwitch'

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  top: 0;
  position: absolute;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    // padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: calc(100%);
`};
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 0.5rem;
`};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  text-decoration: none
  :hover {
    cursor: pointer;
  }
`
const TitleMenu = styled.div`
  box-sizing: border-box;
  margin-left: 20px;
  margin: 0px;
  min-width: 0px;
  width: 100%;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 1rem 0px 1rem 1rem;
    -webkit-box-pack: end;
    justify-content: flex-end;
}
`};
`
const TitleMenuText = styled(NavLink)`
  display: flex;
  flex-flow: row nowrap;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: rgb(86, 90, 105);
  font-size: 1rem;
  width: fit-content;
  margin: 0px 12px;
  font-weight: 500;
  &.active {
    color: ${({ theme }) => theme.yellow2};
  }
`

// const TitleText = styled(Row)`
//   width: fit-content;
//   white-space: nowrap;
//   ${({ theme }) => theme.mediaWidth.upToExtraSmall`
//     display: none;
//   `};
// `

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 1px solid blue;
  }
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`

const NetworkCard = styled(YellowCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    img { 
      width: 2.5rem;
    }
  `};
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: flex-end;
  `};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    justify-self: center;
    max-width: 960px;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px 12px 0px 0px;
    background-color: rgb(255, 255, 255);
  `};
`
const StyledText = styled.span`
  width: 220px;
  color: ${({ theme }) => theme.grey600};
  font-family: 'Reem Kufi', sans-serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-left: ${({ theme }) => theme.spacing[2]}px;
  @media (max-width: 400px) {
    display: none;
  }
`

const MasterChefText = styled.span`
  font-family: 'Kaushan Script', sans-serif;
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan'
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const [isDark] = useDarkModeManager()

  return (
    <HeaderFrame>
      <RowBetween style={{ alignItems: 'flex-start' }} padding="1rem 1rem 1rem 1rem">
        <HeaderElement>
          <Title href=".">
            <UniIcon>
              <img src={isDark ? LogoDark : Logo} alt="logo" height="32" style={{ marginTop: -4 }} />
            </UniIcon>
            <StyledText>
              MistSwap
              <MasterChefText>HashChampion</MasterChefText>
            </StyledText>
            {/*<TitleText>*/}
            {/*  <img style={{ marginLeft: '4px', marginTop: '4px' }} src={isDark ? WordmarkDark : Wordmark} alt="logo" />*/}
            {/*</TitleText>*/}
          </Title>
          <TitleMenu>
            <TitleMenuText to="/home">Home</TitleMenuText>
            <TitleMenuText to="/swap">Swap</TitleMenuText>
            {/*<TitleMenuText to="/pool">Pool</TitleMenuText>*/}
            <TitleMenuText to="/apply">Buy</TitleMenuText>
            <TitleMenuText to="/issue">Issue</TitleMenuText>
          </TitleMenu>
        </HeaderElement>
        <HeaderControls>
          <HeaderElement>
            <TestnetWrapper>
              {!isMobile && chainId && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
            </TestnetWrapper>
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {account && userEthBalance ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)} ETH
                </BalanceText>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
          <HeaderElementWrap>
            {/*<VersionSwitch />*/}
            <Settings />
            <Menu />
          </HeaderElementWrap>
        </HeaderControls>
      </RowBetween>
    </HeaderFrame>
  )
}

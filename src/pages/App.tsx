import React, { Suspense } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import Header from '../components/Header'
// import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import AddLiquidity from './AddLiquidity'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity
} from './AddLiquidity/redirects'
import MigrateV1 from './MigrateV1'
import MigrateV1Exchange from './MigrateV1/MigrateV1Exchange'
import RemoveV1Exchange from './MigrateV1/RemoveV1Exchange'
import Pool from './Pool'
import LiquidityMining from './LiquidityMining'
import Apply from './Apply'
import Issue from './Issue'
import { RegistIssuer } from './Issue/RegistIssuer'
import { AddIssue } from './Issue/AddIssue'
import { IssueMint } from './Issue/IssueMint'
import { FeeToSet } from './Owner/FeeToSet'
import { BitcoinOracleSet } from './Owner/BitcoinOracleSet'
import { RemoveIssuer } from './Owner/RemoveIssuer'
import { BitcoinOracle } from './Owner/BitcoinOracle'
import { UpdateBlockInfo } from './Owner/UpdateBlockInfo'
import { IssueList } from './Issue/IssueList'
import { ApplyDetails } from './Apply/applydetails'
import Home from './Home'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import Swap from './Swap'
import { RedirectPathToSwapOnly, RedirectPathToHomeOnly, RedirectToSwap } from './Swap/redirects'
import Owner from './Owner'
import Multiowned from './Multiowned'
import { AddOwner } from './Multiowned/AddOwner'
import { ChangeRequirement } from './Multiowned/ChangeRequirement'
const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 160px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding: 16px;
  `};

  z-index: 1;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  return (
    <Suspense fallback={null}>
      <HashRouter>
        <Route component={GoogleAnalyticsReporter} />
        <Route component={DarkModeQueryParamReader} />
        <AppWrapper>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <BodyWrapper>
            {/*<Popups />*/}
            <Web3ReactManager>
              <Switch>
                <Route exact strict path="/home" component={Home} />
                <Route exact strict path="/swap" component={Swap} />
                <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
                <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
                <Route exact strict path="/find" component={PoolFinder} />
                <Route exact strict path="/pool" component={Pool} />
                <Route exact strict path="/liquidityMining" component={LiquidityMining} />
                <Route exact strict path="/apply" component={Apply} />
                <Route exact strict path="/issue" component={Issue} />
                <Route exact strict path="/owner" component={Owner} />
                <Route exact strict path="/multiowned" component={Multiowned} />
                <Route exact strict path="/addOwner" component={AddOwner} />
                <Route exact strict path="/changeRequirement" component={ChangeRequirement} />
                <Route exact strict path="/feeToSet" component={FeeToSet} />
                <Route exact strict path="/bitcoinOracleSet" component={BitcoinOracleSet} />
                <Route exact strict path="/bitcoinOracle/:tokens" component={BitcoinOracle} />
                <Route exact strict path="/updateBlockInfo/:tokens" component={UpdateBlockInfo} />
                <Route exact strict path="/removeIssuer" component={RemoveIssuer} />
                <Route exact strict path="/registIssuer" component={RegistIssuer} />
                <Route exact strict path="/issues/:tokens/:hostname" component={IssueList} />
                <Route exact strict path="/issue/:tokens/:hostname" component={AddIssue} />
                <Route exact strict path="/issueMint/:tokens/:symbol/:hostname" component={IssueMint} />
                <Route exact strict path="/apply/:token/:symbol" component={ApplyDetails} />
                <Route exact strict path="/create" component={RedirectToAddLiquidity} />
                <Route exact path="/add" component={AddLiquidity} />
                <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                <Route exact strict path="/remove/v1/:address" component={RemoveV1Exchange} />
                <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                <Route exact strict path="/migrate/v1" component={MigrateV1} />
                <Route exact strict path="/migrate/v1/:address" component={MigrateV1Exchange} />
                {/*<Route component={RedirectPathToSwapOnly} />*/}
                <Route component={RedirectPathToHomeOnly} />
              </Switch>
            </Web3ReactManager>
            <Marginer />
          </BodyWrapper>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}

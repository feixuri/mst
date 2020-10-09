import React from 'react'

import styled from 'styled-components'

export default function Pool() {
  return (
    <>
      <StyledLiquidityMining>
        <HwjYkd>
          <div style={{ boxSizing: 'border-box', margin: '0px', minWidth: '0px', fontWeight: 500, fontSize: '20px' }}>
            MST-ETH Liquidity Mining
          </div>
        </HwjYkd>
        <EfdODL>
          <GUsaEN>
            <HXeOUM>
              <KuSmHG>Total deposits</KuSmHG>
              <KuSmHG500>$518,939,106</KuSmHG500>
            </HXeOUM>
          </GUsaEN>
          <GUsaEN>
            <HXeOUM>
              <KuSmHG>Pool Rate</KuSmHG>
              <KuSmHG500>583,333 MST / week</KuSmHG500>
            </HXeOUM>
          </GUsaEN>
        </EfdODL>
        <BwtpWJ>
          <GnzOrw>
            <DcxnAx>
              <HwjYkd>
                <WmMZl>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  UNI-V2 LP tokens are required. Once you've added liquidity to the ETH-USDC pool you can stake your
                  your liquidity tokens on this page.
                </WmMZl>
              </HwjYkd>
              <CaQxQC>Add ETH-MST liquidity</CaQxQC>
            </DcxnAx>
          </GnzOrw>
        </BwtpWJ>
        <BwtpWJ>
          <GnzOrw>
            <DcxnAx>
              <HwjYkd>
                <WmMZl>Your liquidity deposits</WmMZl>
              </HwjYkd>
              <HwjYkd>
                <WmMZl style={{ fontWeight: 600, fontSize: '36px' }}>0</WmMZl>
                <WmMZl style={{ fontWeight: 500, fontSize: '16px' }}>MST-ETH</WmMZl>
              </HwjYkd>
            </DcxnAx>
          </GnzOrw>
        </BwtpWJ>
      </StyledLiquidityMining>
    </>
  )
}
const CaQxQC = styled.a`
  padding: 8px;
  width: fit-content;
  font-weight: 500;
  text-align: center;
  border-radius: 8px;
  outline: none;
  border: 1px solid transparent;
  text-decoration: none;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  flex-wrap: nowrap;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  background-color: rgb(255, 0, 122);
  color: white;
`
const EfdODL = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  width: 100%;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  gap: 24px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const GUsaEN = styled.div`
  display: grid;
  grid-auto-rows: auto;
  border-radius: 12px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: none;
  border: 1px solid rgb(206, 208, 217);
  padding: 1rem;
  z-index: 1;
`
const HXeOUM = styled.div`
  display: grid;
  grid-auto-rows: auto;
  row-gap: 8px;
`
const KuSmHG = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-weight: 400;
  font-size: 16px;
`
const KuSmHG500 = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-weight: 500;
  font-size: 24px;
`
const BwtpWJ = styled.div`
  display: grid;
  grid-auto-rows: auto;
  border-radius: 12px;
  width: 100%;
  position: relative;
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, rgb(39, 174, 96) 0%, rgb(0, 0, 0) 100%);
  overflow: hidden;
`
const GnzOrw = styled.div`
  display: grid;
  grid-auto-rows: auto;
  padding: 1rem;
  z-index: 1;
`
const DcxnAx = styled.div`
  display: grid;
  grid-auto-rows: auto;
  row-gap: 12px;
`
const HwjYkd = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  width: 100%;
  display: flex;
  padding: 0px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
`
const WmMZl = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-weight: 500;
  color: white;
  font-size: 14px;
`
const StyledLiquidityMining = styled.div`
  display: grid;
  grid-auto-rows: auto;
  row-gap: 24px;
  justify-items: center;
  max-width: 640px;
  width: 100%;
`

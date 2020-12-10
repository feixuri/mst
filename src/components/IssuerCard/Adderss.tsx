import React from 'react'
import styled from 'styled-components'

import { useActiveWeb3React } from '../../hooks'
import { getEtherscanLink, shortenAddress } from '../../utils'
import { ExternalLink } from '../../theme'
import { RowFixed } from '../Row'

const TransactionWrapper = styled.div``

const TransactionStatusText = styled.div`
  display: flex;
  align-items: center;
  :hover {
    text-decoration: underline;
  }
`

const TransactionState = styled(ExternalLink)<{ pending: boolean; success?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none !important;
  border-radius: 0.5rem;
  padding: 0.25rem 0rem;
  font-weight: 500;
  font-size: 0.825rem;
  color: ${({ theme }) => theme.primary1};
`

export default function Adderss({ hash }: { hash: string }) {
  const { chainId } = useActiveWeb3React()

  const summary = shortenAddress(hash)

  if (!chainId) return null

  return (
    <TransactionWrapper>
      <TransactionState href={getEtherscanLink(chainId, hash, 'address')} pending={false} success={true}>
        <RowFixed>
          <TransactionStatusText>{summary ?? hash} ↗</TransactionStatusText>
        </RowFixed>
      </TransactionState>
    </TransactionWrapper>
  )
}

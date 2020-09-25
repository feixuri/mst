import React from 'react'
import styled from 'styled-components'

// eslint-disable-next-line react/prop-types
const CardContent: React.FC = ({ children }) => (
  <StyledCardContent>{children}</StyledCardContent>
)

const StyledCardContent = styled.div`
  max-width: 640px;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px;
`

export default CardContent

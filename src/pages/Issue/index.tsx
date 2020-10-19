import React, { useContext } from 'react'

import styled, { ThemeContext } from 'styled-components'

import AppBody from '../AppBody'
import { AddRemoveTabs } from '../../components/NavigationTabs'
import { Wrapper } from '../Pool/styleds'
import { AutoColumn } from '../../components/Column'
import { BottomGrouping } from '../../components/swap/styleds'
import { ButtonError } from '../../components/Button'
import { Text } from 'rebass'
import { RowBetween } from '../../components/Row'
import { TYPE } from '../../theme'
import { darken } from 'polished'

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledTitle = styled.h4`
  color: ${({ theme }) => theme.grey600};
  font-size: 24px;
  font-weight: 700;
  margin: ${({ theme }) => theme.spacing[2]}px 0 0;
  padding: 0;
`

const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.bg2};
  z-index: 1;
`

const Container = styled.div<{ hideInput?: boolean }>`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`
const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`

const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`

const StyledInput = styled.input<{ error?: boolean; fontSize?: string; align?: string }>`
  color: ${({ error, theme }) => (error ? theme.red1 : theme.text1)};
  width: 0;
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: ${({ theme }) => theme.bg1};
  font-size: ${({ fontSize }) => fontSize ?? '24px'};
  text-align: ${({ align }) => align && align};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme.text4};
  }
`
export default function Pool() {
  const theme = useContext(ThemeContext)
  return (
    <>
      <AppBody>
        <AddRemoveTabs adding={true} />
        <Wrapper>
          <AutoColumn gap="20px">
            <StyledContent style={{ padding: '0 20px' }}>
              <StyledTitle>Issue Registered</StyledTitle>
            </StyledContent>
            <AutoColumn gap={'md'}>
              <InputPanel>
                <Container>
                  <LabelRow>
                    <RowBetween>
                      <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
                        Token Domain
                      </TYPE.body>
                    </RowBetween>
                  </LabelRow>
                  <InputRow selected={false}>
                    <>
                      <StyledInput value={'0'}></StyledInput>
                    </>
                  </InputRow>
                </Container>
              </InputPanel>
              <InputPanel>
                <Container>
                  <LabelRow>
                    <RowBetween>
                      <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
                        Domain Introduce
                      </TYPE.body>
                    </RowBetween>
                  </LabelRow>
                  <InputRow selected={false}>
                    <>
                      <StyledInput value={'0'}></StyledInput>
                    </>
                  </InputRow>
                </Container>
              </InputPanel>
            </AutoColumn>
            <BottomGrouping>
              <ButtonError>
                <Text fontSize={16} fontWeight={500}>
                  Register
                </Text>
              </ButtonError>
            </BottomGrouping>
          </AutoColumn>
        </Wrapper>
      </AppBody>
    </>
  )
}

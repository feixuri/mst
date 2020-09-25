import React from 'react'
import styled from 'styled-components'

const Div1 = styled.div`
  display: grid;
  grid-auto-rows: auto;
  row-gap: 24px;
  justify-items: center;
  max-width: 640px;
  width: 100%;
  // background: ${({ theme }) => theme.bg1};
  // box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
  //   0px 24px 32px rgba(0, 0, 0, 0.01);
  background:linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 154, 0) 10%, rgb(208, 222, 33) 20%, rgb(79, 220, 74) 30%, rgb(63, 218, 216) 40%, rgb(47, 201, 226) 50%, rgb(28, 127, 238) 60%, rgb(95, 21, 242) 70%, rgb(186, 12, 248) 80%, rgb(251, 7, 217) 90%, rgb(255, 0, 0) 100%) 0% 0% / 300% 300%;
  border-radius: 10px;
  margin-bottom: 1rem;
`

const Div11 = styled.div`
  width: 100%;
  max-width: 720px;
  display: grid;
  grid-auto-rows: auto;
`
const Div111 = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px 10px;
  width: 100%;
  justify-self: center;
`
const Div1111 = styled.div`
  display: grid;
  grid-auto-rows: auto;
  border-radius: 12px;
  width: 100%;
  overflow: hidden;
  position: relative;
  opacity: 1;
`
const Div11111 = styled.div`
  display: grid;
  grid-template-columns: 1fr 96px;
  gap: 0px;
  -webkit-box-align: center;
  align-items: center;
  padding: 1rem;
  z-index: 1;
`
//
// const Div111111 = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: row;
// `
const Div111112 = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-weight: 600;
  font-size: 24px;
`
const Div111113 = styled.button`
  padding: 8px;
  width: 100%;
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
const Div11112 = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  flex-direction: column;
  gap: 0px;
  margin-right: 1rem;
  margin-left: 1rem;
`

const Div111121 = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  width: 100%;
  display: flex;
  padding-bottom: 10px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
`

const Div1111211 = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  font-weight: 500;
`

export default function Apply() {
  return (
    <>
      <Div1>
        <Div11>
          <Div111>
            <Div1111>
              <Div11111>
                <Div111112>huobi.fm</Div111112>
                <Div111113>申购</Div111113>
              </Div11111>
              <Div11112>
                <Div111121>
                  <Div1111211> Time </Div1111211>
                  <Div1111211> 50 Day</Div1111211>
                </Div111121>
                <Div111121>
                  <Div1111211> Unit Price</Div1111211>
                  <Div1111211> 2,000 ETH</Div1111211>
                </Div111121>
                <Div111121>
                  <Div1111211> Remaining</Div1111211>
                  <Div1111211> 1,000 T</Div1111211>
                </Div111121>
              </Div11112>
            </Div1111>
          </Div111>
        </Div11>
      </Div1>
      <Div1>
        <Div11>
          <Div111>
            <Div1111>
              <Div11111>
                <Div111112>canaan-creative.com</Div111112>
                <Div111113>申购</Div111113>
              </Div11111>
              <Div11112>
                <Div111121>
                  <Div1111211> Time </Div1111211>
                  <Div1111211> 60 Day</Div1111211>
                </Div111121>
                <Div111121>
                  <Div1111211> Unit Price</Div1111211>
                  <Div1111211> 2,000 ETH</Div1111211>
                </Div111121>
                <Div111121>
                  <Div1111211> Remaining</Div1111211>
                  <Div1111211> 1,000 T</Div1111211>
                </Div111121>
              </Div11112>
            </Div1111>
          </Div111>
        </Div11>
      </Div1>
    </>
  )
}

import React from 'react'
import { Text } from 'rebass'
import { ButtonPrimary } from '../../components/Button'

export function ConfirmRegisterModalBottom({ onAdd }: { onAdd: () => void }) {
  return (
    <>
      <ButtonPrimary style={{ margin: '20px 0 0 0' }} onClick={onAdd}>
        <Text fontWeight={500} fontSize={20}>
          Confirm
        </Text>
      </ButtonPrimary>
    </>
  )
}

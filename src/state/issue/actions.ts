import { createAction } from '@reduxjs/toolkit'

export enum Field {
  INPUT = 'INPUT',
  COMMENT = 'COMMENT',
  BTC = 'BTC',
  CURRENCY = 'CURRENCY'
}

export const typeInput = createAction<{ field: Field; typedValue: string }>('issue/typeInputIssue')

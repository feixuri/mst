import { createReducer } from '@reduxjs/toolkit'
import { Field, typeInput } from './actions'

export interface IssueState {
  readonly independentField: Field
  readonly typedValue: string
}

const initialState: IssueState = {
  independentField: Field.INPUT,
  typedValue: ''
}

export default createReducer<IssueState>(initialState, builder =>
  builder.addCase(typeInput, (state, { payload: { field, typedValue } }) => {
    return {
      ...state,
      independentField: field,
      typedValue
    }
  })
)

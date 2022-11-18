import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'

// Define a type for the slice state
interface TimeState {
    value: number,
    rotate: number,
    rotateDiff: number
}

// Define the initial state using that type
const initialState: TimeState = {
    value: 1,
    rotate: 0,
    rotateDiff: 0
}

export const timeSlice = createSlice({
    name: 'time',
    initialState,
    reducers: {
        setActiveTime: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        },
        setRotate: (state, action: PayloadAction<number>) => {
            state.rotate = state.rotate + action.payload
        },
        setRotateDiff: (state, action: PayloadAction<number>) => {
            state.rotateDiff = action.payload - state.rotate
        },
    },
})

export const { setActiveTime, setRotate } = timeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectActiveTime = (state: RootState) => state.time.value
export const selectRotate = (state: RootState) => state.time.rotate

export default timeSlice.reducer
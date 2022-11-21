import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'


interface TimeState {
    value: number,
    rotate: number,
    rotateDiff: number,
    fromYear: number[],
    toYear: number[]
}

const initialState: TimeState = {
    value: 1,
    rotate: 0,
    rotateDiff: 0,
    fromYear: [1987],
    toYear: [1991]
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
        setFromYear: (state, action: PayloadAction<number>) => {
            let arr = [...state.fromYear, action.payload];
            state.fromYear = arr.slice(-2);
        },
        setToYear: (state, action: PayloadAction<number>) => {
            let arr = [...state.fromYear, action.payload];
            state.toYear = arr.slice(-2);
        },
    },
})

export const { setActiveTime, setRotate, setFromYear, setToYear } = timeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectActiveTime = (state: RootState) => state.time.value
export const selectRotate = (state: RootState) => state.time.rotate
export const selectFromYear = (state: RootState) => state.time.fromYear
export const selectToYear = (state: RootState) => state.time.toYear

export default timeSlice.reducer
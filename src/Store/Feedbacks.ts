import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { revertAll } from './RevertAll'
import { Feedback } from '../Types/CommonTypes'

// interface Feedback {
//   id: number
//   name: string | null
//   mobileNumber: string | null
//   service: { id: number; name: string } | null
//   rating: number | null
//   selectedMedia: string | null
// }

const initialState: {
  feedbacks: Feedback[]
} = {
  feedbacks: [],
}

export const feedbacksSlice = createSlice({
  name: 'Feedbacks',
  initialState,
  extraReducers: (builder) =>
    builder.addCase(revertAll, () => {
      return initialState
    }),
  reducers: {
    createFeedback: (
      state,
      action: PayloadAction<{
        feedback: Feedback
      }>,
    ) => {
      state.feedbacks = [...state.feedbacks, action.payload.feedback]
    },

    deleteFeedback: (state, action: PayloadAction<{ id: number }>) => {
      state.feedbacks = state.feedbacks.filter((feedback) => feedback.id !== action.payload.id)
    },
  },
})

export const { createFeedback, deleteFeedback } = feedbacksSlice.actions

export default feedbacksSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { revertAll } from './RevertAll'

interface Feedback {
  id: string
  feedback: string
}

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
    updateFeedbacks: (
      state,
      action: PayloadAction<{
        feedback: string
      }>,
    ) => {
      state.feedbacks = [
        ...state.feedbacks,
        {
          id: crypto.randomUUID(),
          feedback: action.payload.feedback,
        },
      ]
    },
    deleteFeedback: (state, action: PayloadAction<{ id: string }>) => {
      state.feedbacks = state.feedbacks.filter((feedback) => feedback.id !== action.payload.id)
    },
  },
})

export const { updateFeedbacks } = feedbacksSlice.actions

export default feedbacksSlice.reducer

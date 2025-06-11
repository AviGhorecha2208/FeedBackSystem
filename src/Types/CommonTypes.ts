export interface Feedback {
  name: string | null
  mobileNumber: string | null
  service: { id: number; name: string } | null
  rating: number | null
  selectedMedia: string | null
}

export interface AddFeedbackPayload {
  name: string
  mobileNumber: string
  service: string
  rating: number
  videoUrl: string
}

export interface AddFeedbackResponse {
  id: number
  name: string
  mobileNumber: string
  service: string
  rating: number
  selectedMedia: string
}

export type UploadMediaToAwsResponse = {
  data: {
    id: number
    filetype: string
    filename: string
    alr: string
    tags: null
  }
}

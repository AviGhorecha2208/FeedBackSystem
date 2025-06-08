export interface Feedback {
  name: string | null
  mobileNumber: string | null
  Address: string | null
  feedback: string | null
  service: { id: number; name: string } | null
  rating: number | null
  selectedMedia: string | null
}

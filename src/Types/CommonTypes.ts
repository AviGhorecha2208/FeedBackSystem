export interface Feedback {
  id: number | null
  name: string | null
  mobileNumber: string | null
  service: { id: number; name: string } | null
  rating: number | null
  selectedMedia: string | null
}

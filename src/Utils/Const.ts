enum Screens {
  StartupScreen = 'StartupScreen',
  Dashboard = 'Dashboard',
  CreateFeedBack = 'CreateFeedBack',
  PreviewFeedBack = 'PreviewFeedBack',
  FeedBackList = 'FeedBackList',
}

enum ToastType {
  success = 'success',
  error = 'error',
  info = 'info',
}

const Service = [
  {
    id: 1,
    name: 'Darshanam',
  },
  {
    id: 2,
    name: 'Seva',
  },
  {
    id: 3,
    name: 'Prasadam',
  },
  {
    id: 4,
    name: 'Annadanam',
  },
  {
    id: 5,
    name: 'Accomodation',
  },
  {
    id: 6,
    name: 'General',
  },
]

export { Screens, ToastType, Service }

const DEFAULT_STATE = {
  repository: '',
  buildCommand: '',
  mainBranch: ''
}

function settings (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case 'CHANGE_SETTINGS':
      return action.payload
    default:
      return state
  }
}

export default settings

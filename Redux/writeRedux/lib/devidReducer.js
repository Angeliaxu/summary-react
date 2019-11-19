export default function devidReducer(state = { devid :0}, action) {
    let { type } = action;
    switch (type) {
        case 'devid':
            return {
                ...state,
               devid: --state.devid
            }
        default:
            return {
              ...state
            }
    }
}
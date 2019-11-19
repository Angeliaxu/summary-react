
export default function countReducer(state = { count: 0 }, action) {
    let { type } = action;
    switch (type) {
        case 'add':
            return {
                ...state,
                count: ++state.count
            }
        default:
            return {
                ...state
            }
    }
}
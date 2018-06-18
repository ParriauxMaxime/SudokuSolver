const defaultState = {
    status: true,
    title: 'Resolver',
}

export const RESET = "RESET";
export const STOP = "STOP";
export const START_ANALYZE = "START_ANALYZE";
export const CHANGE_TITLE = "CHANGE_TITLE";


export const system = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_TITLE:
            return { ...state, title: action.payload };
        case STOP:
            return { ...state, status: false };
        case RESET:
            return { ...state, status: false };
        case START_ANALYZE:
            return { ...state, status: true };
        default:
            return state;
    }
}
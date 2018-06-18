export const CHANGE_TRACKER_DATA = "CHANGE_TRACKER_DATA";

const defaultState = null;

export const tracker = (state = defaultState, action) => {
    console.info(action);
    switch (action.type) {
        case CHANGE_TRACKER_DATA:
            return action.payload
        default:
            return state;
    }
}
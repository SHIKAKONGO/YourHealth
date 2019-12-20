export interface State {
    isloading: boolean;
}

const initialState: State = {
    isloading: false
};


export function appReducer(state = initialState , action) {
    switch (action.type) {
        case 'START_LOADING':
            return {
            isloading: true
        };
        case 'STOP_LOADING':
            return {
            isloading: false
        };
        default:
            return state;
    }
}

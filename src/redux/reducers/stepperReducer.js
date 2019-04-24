const stepperReducer = (state = 1, action) => {
    console.log(state)
    switch (action.type) {
        case 'STEP_ONE':
            return 1;
        case 'STEP_TWO':
            return 2
        case 'STEP_THREE':
            return 3;
        case 'STEP_FOUR':
            return 4;
        case 'STEP_FIVE':
            return 5;
        case 'GET_STEPPER':
            return state;
        default:
            return state;
    }
}
export default stepperReducer
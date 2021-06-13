export const setJobTabNumber = (index) => async(dispatch) => {
    await dispatch({
        type:'SET_JOB_VIEW_TAB_NUMBER',
        payload: index
    })
}

export const getTabNumber = () => {
    return {
        type: "GET_TAB_NUMBER"
    };
}

export const finishSettingTab = () => {
    return {
        type: "TAB_NUMBER_SET"
    };
}
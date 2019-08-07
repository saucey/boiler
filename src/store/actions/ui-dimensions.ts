export const dimensionsDataStateActions = {
    SET_FOOTER_HEIGHT: 'SET_FOOTER_HEIGHT',
}

export const setFooterHeight = (footerHeight: number): any => ({
    type: dimensionsDataStateActions.SET_FOOTER_HEIGHT,
    payload: footerHeight
});
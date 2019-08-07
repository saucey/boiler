export const setFormState = (changedState: any, form: any) => {
    return {
    form: {
    ...form,
    ...changedState
    }
}
};
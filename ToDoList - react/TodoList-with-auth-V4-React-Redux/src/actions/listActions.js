export const CHOOSE_VIEW = 'CHOOSE_VIEW';


export function chooseView(view) {
    return ({
        type: CHOOSE_VIEW,
        payload: view
    });
}
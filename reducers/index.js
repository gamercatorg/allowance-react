import { ADJUST_BALANCE, SET_BALANCE } from '../constants'

const initialState = {
    accounts: [
        { id: 0, name: 'Savings', balanceCents: 0 },
        { id: 1, name: 'Instant Spending', balanceCents: 0 },
        { id: 2, name: 'Charity', balanceCents: 0 },
    ]
};

function rootReducer(state = initialState, action) {

    const { payload } = action

    switch (action.type) {
        case ADJUST_BALANCE: // { id: 0, adjustmentCents: 0 (can be negative) }
            return {
                ...state, accounts: state.accounts.map((account) => {
                    if (account.id != payload.id) return account
                    const newBalance = account.balanceCents + payload.adjustmentCents
                    return { ...account, balanceCents: newBalance }
                })
            }
        case SET_BALANCE: // { id: 0, balanceCents: 0 }
            const newState = { ...state, accounts: state.accounts.map((account) => account.id != payload.id ? account : { ...account, balanceCents: payload.balanceCents }) }
            console.log({ id: payload.id, state, newState })
            return newState
    }

    return state;
};

export default rootReducer;
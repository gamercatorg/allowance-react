import { ADJUST_BALANCE, SET_BALANCE } from '../constants'

const initialState = {
    accounts: [
        { id: 0, name: 'Savings', balanceCents: 900 },
        { id: 1, name: 'Instant Spending', balanceCents: 800 },
        { id: 2, name: 'Charity', balanceCents: 1200 },
    ]
};

function rootReducer(state = initialState, action) {

    const { payload } = action

    switch (action) {
        case ADJUST_BALANCE: // { id: 0, adjustmentCents: 0 (can be negative) }
            return {
                ...state, accounts: state.accounts.map((account) => {
                    if (account.id !== payload.id) return account
                    const newBalance = account.balanceCents + payload.adjustmentCents
                    return { ...account, balanceCents: newBalance }
                })
            }
        case SET_BALANCE: // { id: 0, balanceCents: 0 }
            return { ...state, accounts: state.accounts.map((account) => account.id !== payload.id ? account : { ...account, balanceCents }) }
    }

    return state;
};

export default rootReducer;
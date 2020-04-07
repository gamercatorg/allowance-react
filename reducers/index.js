import { ADJUST_BALANCE, SET_BALANCE, SET_ALLOWANCE, DISPERSE_ALLOWANCE } from '../constants'

const initialState = {
    pinCode: '0000',
    allowanceCents: 300,
    allowanceLastDistributed: new Date('2020/03/01'),
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
            return { ...state, accounts: state.accounts.map((account) => account.id != payload.id ? account : { ...account, balanceCents: payload.balanceCents }) }
        case SET_ALLOWANCE: // { allowanceCents: 0 }
            return { ...state, allowanceCents: Math.max(payload.allowanceCents, 0) }
        case DISPERSE_ALLOWANCE: // { pinCode: '1111', disperseCents: 0 }
            if(state.pinCode != payload.pinCode) return state // dont do security logic in reducers lol
            return {
                ...state,
                accounts: state.accounts.map((account) => {
                    const newBalance = account.balanceCents + payload.disperseCents
                    return { ...account, balanceCents: newBalance }
                }),
                allowanceLastDistributed: new Date()
            }
    }

    return state;
};

export default rootReducer;
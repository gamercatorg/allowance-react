import { ADJUST_BALANCE, SET_BALANCE } from '../constants'

export function adjustBalance(payload) {
    return { type: ADJUST_BALANCE, payload }
};

export function setBalance(payload) {
    return { type: SET_BALANCE, payload }
};
import { ADJUST_BALANCE, SET_BALANCE, SET_ALLOWANCE, DISPERSE_ALLOWANCE } from '../constants'

export function adjustBalance(payload) {
    return { type: ADJUST_BALANCE, payload }
};

export function setBalance(payload) {
    return { type: SET_BALANCE, payload }
};

export function setAllowance(payload) {
    return { type: SET_ALLOWANCE, payload }
};

export function disperseAllowance(payload) {
    return { type: DISPERSE_ALLOWANCE, payload }
}
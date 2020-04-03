import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'

const startDateMonth = 4 // 1 is jan, 2 is feb, 3 is march
const startDateDay = 1
const startDateYear = 2020

const centsPerWeek = 300

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

// Do the initial setup on first load
const bootstrap = async () => {
    const loadedAt = await AsyncStorage.getItem('@loaded') // Is this the first time the app has been opened on this device?

    if (!loadedAt) {
        await AsyncStorage.setItem('@loaded', Date.now())
        await AsyncStorage.setItem('balances.savings', 100)
        await AsyncStorage.setItem('balances.instantSpending', 200)
        await AsyncStorage.setItem('balances.charity', 300)
    }
}

const flush = async () => {
    await AsyncStorage.clear()
    await bootstrap()
}

export default function allowance() { }
allowance.flush = flush

allowance.getWeeksSinceStart = () => {
    const startDate = moment([startDateYear, (startDateMonth - 1), startDateDay])
    const currentDate = moment()
    return Math.max(0, currentDate.diff(startDate, "weeks"))
}

// Returns an integer representing the number of cents in a given account (Javascript is bad at floating point math so we must store in cents)
allowance.getBalanceCents = async (account) => {
    await bootstrap()
    const [[, savings], [, instantSpending], [, charity]] = await AsyncStorage.multiGet(['balances.savings', 'balances.instantSpending', 'balances.charity'])
    const balances = { savings, instantSpending, charity }
    return parseInt(balances[account]) + (allowance.getWeeksSinceStart() * centsPerWeek)
}

// Returns a string $n.nn representing the balance of a given account in dollars
allowance.getBalanceDollars = async (account) => {
    const cents = await allowance.getBalanceCents(account)
    return currencyFormatter.format(cents / 100)
}

// Returns either the int or string balance depending on what is passed to "format"
allowance.getBalanceWithFormat = (account, format = 'cents') => format == 'cents' ? allowance.getBalanceCents(account) : allowance.getBalanceDollars(account)

allowance.getAllBalances = async (format = 'cents') => {
    const savings = await allowance.getBalanceWithFormat('savings', format)
    const instantSpending = await allowance.getBalanceWithFormat('instantSpending', format)
    const charity = await allowance.getBalanceWithFormat('charity', format)
    return { savings, instantSpending, charity }
}

// Helper functions
allowance.getSavingsBalance = (format = 'cents') => allowance.getBalanceWithFormat('savings', format)
allowance.getInstantSpendingBalance = (format = 'cents') => allowance.getBalanceWithFormat('instantSpending', format)
allowance.getCharityBalance = (format = 'cents') => allowance.getBalanceWithFormat('charity', format)

allowance.setBalance = async (account, valueCents) => {
    await bootstrap()
    const key = `balances.${account}`
    await AsyncStorage.setItem(key, valueCents)
    return allowance.getBalanceCents()
}
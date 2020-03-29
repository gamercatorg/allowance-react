import moment from 'moment'

const startDateMonth = 3 // 1 is jan, 2 is feb, 3 is march
const startDateDay = 20
const startDateYear = 2020

const startDate = moment([startDateYear, (startDateMonth - 1), startDateDay])
const currentDate = moment()

const weeksToAdd = currentDate.diff(startDate, "weeks")

const initialData = {
    'savings': 0,
    'instantSpending': 0,
    'charity': 0
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

export default function allowance() {}

// Returns an integer representing the number of cents in a given account (Javascript is bad at floating point math so we must store in cents)
allowance.getBalanceCents = (account) => initialData[account] + (weeksToAdd * 300)

// Returns a string $n.nn representing the balance of a given account in dollars
allowance.getBalanceDollars = (account) => currencyFormatter.format(allowance.getBalanceCents(account))

// Returns either the int or string balance depending on what is passed to "format"
allowance.getBalanceWithFormat = (account, format = 'cents') => format === 'cents' ? allowance.getBalanceCents(account) : allowance.getBalanceDollars(account)

// Helper functions
allowance.getSavingsBalance = (format = 'cents') => allowance.getBalanceWithFormat('savings', format)
allowance.getInstantSpendingBalance = (format = 'cents') => allowance.getBalanceWithFormat('instantSpending', format)
allowance.getCharityBalance = (format = 'cents') => allowance.getBalanceWithFormat('charity', format)
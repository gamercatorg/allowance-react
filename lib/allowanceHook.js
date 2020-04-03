import allowance from './allowance'
import { useState, useEffect } from "react"

export default function useAllowance() {

    const [state, setState] = useState({
        loading: true,
        error: null,
        success: null,
        balances: {
          'savings': null,
          'instantSpending': null,
          'charity': null
        }
      })
    
      const { loading, success, error } = state
      const isLoaded = !state.loading && !state.error && state.success
      const balances = state.balances
    
      useEffect(() => {
        const load = async () => {
          const balances = await allowance.getAllBalances('dollars')
          if(balances){
            setState({
              loading: false,
              error: false,
              success: true,
              balances
            })
          }
          else {
            setState({
              loading: false,
              error: true,
              success: false
            })
          }
        }
        if(!state.error && !state.success) load()
      })

      return {
          isLoading: loading,
          isLoaded,
          balances,
          success,
          error
      }

}
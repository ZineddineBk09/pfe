import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../React-Context-Api/basketContext'
import { getBasketTotal } from '../React-Context-Api/reducer'

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue()

  return (
    <div className="flex h-32 w-full max-w-xl flex-col justify-between rounded border border-gray-300 bg-gray-100 p-2 md:p-5">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Subtotal ({basket.length} items):
              <strong> {value} DA</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket) || 0} // Part of the homework
        displayType={'text'}
        thousandSeparator={true}
      />
      <button className="h-8 w-full rounded-sm border border-amber-500 bg-amber-400 hover:bg-amber-500">
        Proceed to Checkout
      </button>
    </div>
  )
}

export default Subtotal

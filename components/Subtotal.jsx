import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { getCookie } from '../lib/useCookie'
import { useStateValue } from '../React-Context-Api/context'
import { getBasketTotal } from '../React-Context-Api/reducer'

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue()
  const [myBasket, setMyBasket] = useState([])
  useEffect(() => {
    setMyBasket(getCookie('basket'))
    //--------------------------------------------------------------
  }, [basket])

  return (
    <div className='flex h-32 w-full max-w-xl flex-col justify-between rounded border border-gray-300 bg-gray-100 p-2 md:p-5'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* Part of the homework */}
              Total ({myBasket?.length || 0} articles):
              <strong> {value} DA</strong>
            </p>
            <small className='subtotal__gift'>
              <p>Frais de livraison non inclus à ce stade</p>
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(myBasket) || 0} // Part of the homework
        displayType={'text'}
        thousandSeparator={true}
      />
      <Link href='/checkout/delivery' passHref>
        <a>
          <button
            disabled={myBasket?.length == 0}
            className='h-8 w-full rounded-sm border border-amber-500 bg-amber-400 hover:bg-amber-500'
          >
            Procéder au Paiement
          </button>
        </a>
      </Link>
    </div>
  )
}

export default Subtotal

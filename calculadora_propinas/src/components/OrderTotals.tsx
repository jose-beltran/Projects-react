import { useCallback, useMemo, Dispatch } from "react";
import { formatCurrency } from "../helpers";
import type { OrderItem } from "../types";
import { OrderActions } from "../reducers/order-reducer";

type OrderTotalProps = {
    order: OrderItem[]
    tip: number
    dispatch: Dispatch<OrderActions>

}

export default function OrderTotals({order, tip, dispatch} : OrderTotalProps) {

    const subTotalAmount = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), 
        [order])

    const tipAmount = useMemo(() => subTotalAmount * tip, [tip, order]) 
    const totalAmount = useCallback(() => subTotalAmount + tipAmount, [tip,order])

  return (
    <>
        <div className="space-y-3">
            <h2 className="font-black text-2xl">Totales y Propina: </h2>
            <p>Subtotal a pagar:{''}
                <span className="font-bold">{formatCurrency(subTotalAmount)}</span>
            </p>
            <p>Propina:{''}
                <span className="font-bold">{formatCurrency(tipAmount)}</span>
            </p>
            <p>Total a pagar:{''}
                <span className="font-bold">{formatCurrency(totalAmount())}</span>
            </p>
        </div>

        <button className="mx-1 bg-black p-3 uppercase text-white font-bold m-10
            disabled:opacity-10 cursor-pointer"
            disabled={totalAmount() === 0}
            onClick={() => dispatch({type:'place-order'})}
        >
            Guardar Orden
        </button>
    </>
  )
}

import type { MenuItem } from "../types"
import { formatCurrency } from "../helpers";
import { Dispatch } from "react";
import { OrderActions } from "../reducers/order-reducer";

type MenuItemProps = {
  item: MenuItem
  dispatch: Dispatch<OrderActions>

}

const MenuItem = ({item, dispatch} : MenuItemProps) => {
  return (
    <button className="border-2 rounded-md border-teal-400 min-w-lg p-2 flex justify-between my-3 hover:bg-teal-200"
      onClick={() => dispatch({type: 'add-item', payload:{item}})}>
      <p>{item.name}</p>
      <p className="font-black">{formatCurrency(item.price)}</p>
    </button>
  )
}

export default MenuItem


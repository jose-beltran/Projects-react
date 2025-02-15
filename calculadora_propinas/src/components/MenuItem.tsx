import type { MenuItem } from "../types"
import { formatCurrency } from "../helpers";

type MenuItemProps = {
  item: MenuItem
  addItem: (item: MenuItem) => void
}

const MenuItem = ({item, addItem} : MenuItemProps) => {
  return (
    <button className="border-2 rounded-md border-teal-400 w-full p-2 flex justify-between my-3 hover:bg-teal-200"
      onClick={() => addItem(item)}>
      <p>{item.name}</p>
      <p className="font-black">{formatCurrency(item.price)}</p>
    </button>
  )
}

export default MenuItem


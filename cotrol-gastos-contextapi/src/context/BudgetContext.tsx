import {
  useReducer,
  createContext,
  Dispatch, ReactNode, useMemo
} from "react";
import {
  BudgetActions,
  budgetReducer,
  BudgetState,
  initialState,
} from "../reducers/budget-reducer";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalExpenses: number
  remainingBudget:  number
};

type BudgetProviderProps = {
  children: ReactNode;
};

export const BudgetContext = createContext<BudgetContextProps>(
  {} as BudgetContextProps
);

//Provider de donde vienen los datos
export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);
  
    const totalExpenses = useMemo(
      () => state.expenses.reduce((total, expense) => expense.amount + total, 0),
      [state.expenses]
    );
  
    const remainingBudget = state.budget - totalExpenses

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        totalExpenses,
        remainingBudget
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

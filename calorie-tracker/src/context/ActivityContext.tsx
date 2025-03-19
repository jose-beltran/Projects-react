import { createContext, ReactNode, useReducer, useMemo } from "react";
import {
    ActivityActions,
    activityReducer,
    ActivityState,
    initialState,
} from "../reducers/activity-reducer";
import { Activity } from "../types";
import { categories } from "../data/categories";

interface ActivityProviderProps {
  children: ReactNode;
}

interface ActivityContextProps {
  state: ActivityState;
  dispatch: React.Dispatch<ActivityActions>;
  caloriesConsumed: number
  caloriesBurned: number
  diferenceCalories: number
  categoryName: (category: Activity["category"]) => string[]
  isEmptyActivities: boolean
}

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  //Contadores
  const caloriesConsumed = useMemo(
    () =>
      state.activities.reduce(
        (total, activitie) =>
          activitie.category === 1 ? total + activitie.calories : total,
        0
      ),
    [state.activities]
  );

  const caloriesBurned = useMemo(
    () =>
      state.activities.reduce(
        (total, activitie) =>
          activitie.category === 2 ? total + activitie.calories : total,
        0
      ),
    [state.activities]
  );

  const diferenceCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [state.activities]
  );

  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [state.activities]
  );

  const isEmptyActivities = useMemo(
    () => state.activities.length === 0,
    [state.activities]
  );

  

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        caloriesConsumed,
        caloriesBurned,
        diferenceCalories,
        categoryName,
        isEmptyActivities
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

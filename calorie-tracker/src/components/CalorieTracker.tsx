import CalorieDisplay from "./CalorieDisplay";
import { useActivity } from "../hooks/useActivity";

const CalorieTracker = () => {

  const { caloriesConsumed, caloriesBurned, diferenceCalories } = useActivity()
  
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de Calorias
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay calories={caloriesConsumed} text="Consumido" />
        <CalorieDisplay calories={caloriesBurned} text="Ejercicio" />
        <CalorieDisplay calories={diferenceCalories} text="Diferencia" />
      </div>
    </>
  );
};

export default CalorieTracker;

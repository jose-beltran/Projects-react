import styles from "./App.module.css";
import Alert from "./components/Alert/Alert";
import Form from "./components/Form/Form";
import Spinner from "./components/Spinner/Spinner";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import useWewather from "./hooks/UseWeather";

function App() {
  const { weather, loading, notFound, fetchWeather, hasWeatherData } =
    useWewather();

  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        {loading && <Spinner />}
        {hasWeatherData && <WeatherDetail weather={weather} />}
        {notFound && <Alert>Ciudad no encontrada</Alert>}{" "}
      </div>
    </>
  );
}

export default App;

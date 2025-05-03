import { useMemo } from "react";
import { useCryptoStore } from "../store";
import Spiner from "./Spiner";

export default function CryptoPriceDisplay() {
  const result = useCryptoStore((state) => state.result);
  const loading = useCryptoStore((state) => state.loading);
  const hasResult = useMemo(() => {
    return (
      result &&
      Object.keys(result).length > 0 &&
      Object.values(result).every((value) => value !== '' && value !== null && value !== undefined)
    );
  }, [result]);
  return (
    <div className="result-wrapper">
      {loading ? <Spiner/> : hasResult && (
        <>
          <h2>Cotización</h2>
          <div className="result">
            <img src={`https://cryptocompare.com/${result.IMAGEURL}`} alt="Imagen Cryptomoneda" />
            <div>
              <p>
                El precio es de: <span>{result.PRICE}</span>
              </p>
              <p>
                Precio más alto del día: <span>{result.HIGHDAY}</span>
              </p>
              <p>
                Precio más bajo del día: <span>{result.LOWDAY}</span>
              </p>
              <p>
                Variación últimas 24 hoas: <span>{result.CHANGE24HOUR}</span>
              </p>
              <p>
                Última actualización: <span>{result.LASTUPDATE}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

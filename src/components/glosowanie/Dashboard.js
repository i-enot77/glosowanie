import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="mx-auto p-4">
      <h1 className="text-2xl font-bold py-4 border-b-1 border-b-gray-200">
        Budowa tężni solankowej (w parku przy ul. Racławickiej)
      </h1>
      <div>
        <p className="font-medium py-2">
          Park przy ul. Racławickiej – Osiedle Marina Mokotów
        </p>
        <p>
          Budowa tężni solankowej wraz z zadaszeniem, oświetleniem i ławeczkami.
        </p>
        <p>Lokalizacja w miejscu często odwiedzanym przez mieszkańców.</p>
        <p className="font-medium py-2">Całkowity koszt projektu: 800 000 zł</p>
      </div>

      <div>
        <Link
          className="p-2 underline decoration-sky-500 underline-offset-4"
          to={"/register"}
        >
          Zarejestruj się
        </Link>{" "}
        lub{" "}
        <Link
          className="p-2 underline decoration-sky-500 underline-offset-4"
          to={"/login"}
        >
          Zaloguj się
        </Link>{" "}
        żeby oddać swój głos
      </div>
    </div>
  );
}

export default Dashboard;

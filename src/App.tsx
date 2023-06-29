import { useEffect } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Home from "./Home";
import { stateActions, useMyState } from "./states";

function App() {
  const [searchParams] = useSearchParams();
  const { snap } = useMyState();

  useEffect(() => {
    async function getOpenapi() {
      console.log("App::useEffect::setOpenApi");
      const response = await fetch("/api/docs/openapi");
      const jsonData = await response.json();
      stateActions.setOpenApi(jsonData);
    }
    getOpenapi();
  }, []);

  useEffect(() => {
    const type = searchParams.get("type") || "api";
    const key = searchParams.get("key") || "";
    console.log("App::useEffect::searchParams", type, key);
    stateActions.setType(type);
    stateActions.setKey(key);
  }, [searchParams]);

  useEffect(() => {
    if (snap.session.openapi) stateActions.setReady(true);
  }, [snap.session.openapi]);

  if (!snap.session.ready) return <>Loading...</>;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;

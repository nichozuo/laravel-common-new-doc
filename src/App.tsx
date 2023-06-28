import { message } from "antd";
import { useEffect } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import Home from "./Home";
import { stateActions } from "./states";

function App() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 初始化接口数据
    fetch("http://0.0.0.0:8000/api/docs/openapi")
      .then((response) => response.json())
      .then((data) => {
        stateActions.setOpenApi(data);
        console.log("App::useEffect", data);
      })
      .catch((error) => {
        message.error(error.message);
      });

    // 初始化
    stateActions.setType(searchParams.get("type") || "api");
    stateActions.setKey(searchParams.get("key") || undefined);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;

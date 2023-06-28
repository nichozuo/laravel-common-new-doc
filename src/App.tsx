import { message } from "antd";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import { stateActions } from "./states";

function App() {
  useEffect(() => {
    // 初始化接口数据
    fetch("http://0.0.0.0:8000/api/docs/openapi")
      .then((response) => response.json())
      .then((data) => {
        stateActions.setOpenApi(data);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;

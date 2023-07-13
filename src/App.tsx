import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  // const [searchParams] = useSearchParams();
  // const { snap } = useMyState();

  // useEffect(() => {
  //   async function getOpenapi() {
  //     const response = await fetch("http://0.0.0.0:8001/api/docs/openapi");
  //     const jsonData = await response.json();
  //     stateActions.setOpenApi(jsonData);
  //     console.log("App::useEffect::setOpenApi", jsonData);
  //   }
  //   getOpenapi();
  // }, []);

  // useEffect(() => {
  //   const type = searchParams.get("type") || "api";
  //   const key = searchParams.get("key") || "";
  //   stateActions.setType(type);
  //   stateActions.setKey(key);
  //   console.log("App::useEffect::searchParams", type, key);
  // }, [searchParams]);

  // useEffect(() => {
  //   if (snap.session.openapi) stateActions.setReady(true);
  // }, [snap.session.openapi]);

  // if (!snap.session.ready) return <>Loading...</>;
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

import TanStackProvider from "./Providers/TanStackProvider";
import RouterProvider from "./Providers/Router/RouterProvider";
import GlobalStyle from "./Styles/GlobalStyle";

const App=()=> {
  
  return (
    <TanStackProvider>
      <GlobalStyle />
      <RouterProvider />
    </TanStackProvider>
  );
}

export default App

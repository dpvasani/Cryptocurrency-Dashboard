import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Dashboard from "./components/Dashboard";
import { CryptoProvider } from "./context/CryptoContext";

//App is the parent component of dashboard

function App() {

  return (
    <Provider store={store}>
      <CryptoProvider>
        <Dashboard />
      </CryptoProvider>
    </Provider>
  );
}

export default App;

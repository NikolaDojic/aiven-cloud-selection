import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "../pages/Main";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App" data-test="appComponent">
      <Header />
      <main data-testid="appMain">
        <Main />
      </main>
      <Footer />
    </div>
  );
};

export default App;

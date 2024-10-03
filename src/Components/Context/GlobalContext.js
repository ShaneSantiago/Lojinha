import React, { createContext, useContext, useEffect, useState } from "react";
import propTypes from "prop-types";

const Results = createContext(null);

export function useResults() {
  return useContext(Results);
}

export function ResultsProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <Results.Provider
      value={{
        carrinho,
        setCarrinho,
        modalIsOpen,
        setModalIsOpen,
      }}
    >
      {children}
    </Results.Provider>
  );
}
ResultsProvider.propTypes = {
  children: propTypes.node.isRequired,
};
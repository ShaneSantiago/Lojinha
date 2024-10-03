import React from "react";
import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";
import { useResults } from "./Context/GlobalContext";

const Header = () => {
  const { modalIsOpen, setModalIsOpen, carrinho } = useResults();

  return (
    <>
      <HeaderContainer>
        <Logo>LOJA</Logo>
        <CartIcon onClick={() => setModalIsOpen(!modalIsOpen)}>
          <FaShoppingCart size={24} />
          {carrinho.length > 0 && <ItemCount>{carrinho.length}</ItemCount>}
        </CartIcon>
      </HeaderContainer>
    </>
  );
};

export default Header;

const HeaderContainer = styled.header`
    padding: 20px;
    background-color: #27ae60;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
    font-size: 24px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
}
`;

const CartIcon = styled.div`
    color: #fff;
    position: relative; /* Adicionado para posicionar o badge */
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
  }
`;

const ItemCount = styled.span`
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 2px 8px;
    font-size: 12px;
    font-weight: bold;
`;

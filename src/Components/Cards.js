import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useResults } from "./Context/GlobalContext";
import "react-toastify/dist/ReactToastify.css";
import { toast, Bounce } from 'react-toastify';


const Cards = ({ produto }) => {
    const { carrinho, setCarrinho } = useResults()

    const adicionarItemAoCarrinho = (produto) => {
        const novosItens = [...carrinho]
        const itemExistente = novosItens.find(item => item.id === produto.id);
        toast.success('Item adicionado ao carrinho', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });

        if (itemExistente) {
            itemExistente.quantidade += 1;
        } else {
            novosItens.push({ ...produto, quantidade: 1 });
       
        } 
        setCarrinho(novosItens)

    }
  return (
    <Card>
      <ImagemProduto src={produto.image_url} alt={produto.name} />
      <InfoProduto>
        <NomeProduto>{produto.name}</NomeProduto>
        <DescricaoProduto>{produto.description}</DescricaoProduto>
        <PrecoProduto>R$ {produto.price.toFixed(2)}</PrecoProduto>
        <BotaoComprar onClick={() => adicionarItemAoCarrinho(produto)}>Comprar</BotaoComprar>
      </InfoProduto>
    </Card>
  );
};

export default Cards;

const Card = styled.div`
    width: 250px;
    height: 400px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.2);
    margin: 15px;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
  
    &:hover {
      transform: translateY(-10px) scale(1.05);
      box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.3);
  }
`;

const ImagemProduto = styled.img`
    width: 80%;
    height: 150px;
    margin-top: 10px;
    object-fit: contain;
    object-position: center;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    max-width: 100%;
    max-height: 200px;
`;

const InfoProduto = styled.div`
    padding: 20px;
`;

const NomeProduto = styled.h2`
    font-size: 18px;
    font-weight: 500;
    color: #333;
    margin-bottom: 10px;
`;

const DescricaoProduto = styled.p`
    font-size: 14px;
    color: #777;
    margin-bottom: 15px;
`;

const PrecoProduto = styled.p`
    font-size: 18px;
    font-weight: 500;
    color: #27ae60;
`;

const BotaoComprar = styled.button`
    background-color: #27ae60;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
`;


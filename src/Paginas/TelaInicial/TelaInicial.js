import React, { useState } from "react"
import styled from 'styled-components';
import Cards from "../../Components/Cards";
import { produtos } from '../../Produtos';
import { useResults } from "../../Components/Context/GlobalContext";
import CarrinhoModal from "../Carrinho/Carrinho";


const TelaInicial = () => {
    const { modalIsOpen, setModalIsOpen } = useResults()
    return(
        <Container>
            <ContainerCards>
                {produtos.map((produto) => (
                    <Cards key={produto.id} produto={produto}/>
                ))}
                            {modalIsOpen && <CarrinhoModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>}
            </ContainerCards>
        </Container>
    )
}
export default TelaInicial

const Container = styled.div`
    background-color: #fff;
    max-width: 100%;
    flex-direction: row;
    display: flex;
    justify-content: center;
    height: 100%;
`
const ContainerCards = styled.div`
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    margin: 2rem;
    align-items: center;
    justify-content: center;
    height: 80%;
`;


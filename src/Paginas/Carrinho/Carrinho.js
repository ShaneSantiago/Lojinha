import React, { useEffect } from "react";
import styled from "styled-components";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { useResults } from "../../Components/Context/GlobalContext";
import "react-toastify/dist/ReactToastify.css";
import { toast, Bounce } from 'react-toastify';

const CarrinhoModal = ({ modalIsOpen, setModalIsOpen }) => {
    const { carrinho, setCarrinho } = useResults();

    const valorTotal = carrinho.reduce((total, item) => total + item.price * item.quantidade, 0);

    const removerItemDoCarrinho = (id) => {
        const item = carrinho.find((item) => item.id === id);

        if (item.quantidade > 1) {
            item.quantidade -= 1;
            setCarrinho([...carrinho]);
        } else {
            setCarrinho(carrinho.filter((item) => item.id !== id));
        }
    };

    const adicionarItemAoCarrinho = (id) => {
        const item = carrinho.find((item) => item.id === id);

        if (item) {
            item.quantidade += 1;
            setCarrinho([...carrinho]);
        } else {
            setCarrinho([...carrinho, { ...item, quantidade: 1 }]);
        }
    };

    const finalizarCompra = () => {
        setCarrinho([]);
        setModalIsOpen(false);
        toast.success('Compra finalizada com sucesso', {
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
    };
    
    const closeModalOnClickOutside = (e) => {
        setModalIsOpen(false);
    };

    return (
        <Overlay onClick={closeModalOnClickOutside}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CabecalhoCarrinho>
                    <Titulo>Carrinho</Titulo>
                    <CloseButton onClick={() => setModalIsOpen(false)}>
                    <FaTimes />
                </CloseButton>
                </CabecalhoCarrinho>
                <ItemsList>
                    {carrinho.length > 0 ? (
                        carrinho.map((item) => (
                            <ItemContainer key={item.id}>
                                <Image src={item.image_url} alt={item.name} />
                                <ItemDetails>
                                    <h5>{item.name}</h5>
                                    <Price>R${item.price.toFixed(2)}</Price>
                                    <QuantityContainer>
                                        <RemoveButton onClick={() => removerItemDoCarrinho(item.id)}>
                                            <FaMinus />
                                        </RemoveButton>
                                        <Quantity>Qtd: {item.quantidade}</Quantity>
                                        <AddButton onClick={() => adicionarItemAoCarrinho(item.id)}>
                                            <FaPlus />
                                        </AddButton>
                                    </QuantityContainer>
                                </ItemDetails>
                            </ItemContainer>
                        ))
                    ) : (
                        <p>Seu carrinho está vazio.</p>
                    )}
                </ItemsList>
                {carrinho.length > 0 && (
                    <TotalContainer>
                        <Total>Total: R${valorTotal.toFixed(2)}</Total>
                        <ButtonFinalizar onClick={finalizarCompra}>Finalizar Compra</ButtonFinalizar>
                    </TotalContainer>
                )}
            </ModalContent>
        </Overlay>
    );
};

export default CarrinhoModal;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: flex-end; /* Empurrar o modal para a direita */
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    width: 90%;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 400px;
    height: 100%; /* Fazer o modal ocupar toda a altura */
    text-align: center;
    position: relative;
`;

const CabecalhoCarrinho = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CloseButton = styled.button`
    right: 10px;
    background: none;
    border: none;
    margin-top: 20px;
    cursor: pointer;
`;

const Titulo = styled.h5`
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
    font-weight: 500;
`;

const ItemsList = styled.div`
    max-height: 400px;
    overflow-y: auto;
    margin-top: 15px;
    padding: 10px;
`;

const ItemContainer = styled.div`
    display: flex;
    margin-bottom: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 8px;
    align-items: center;
`;

const Image = styled.img`
    width: 80px;
    height: auto;
    border-radius: 5px;
`;

const ItemDetails = styled.div`
    margin-left: 10px;
    text-align: left;
`;

const Price = styled.p`
    font-weight: 500;
    color: #27ae60;
    margin: 0;
    font-size: 15px;
`;

const Quantity = styled.p`
    color: #7f8c8d;
    margin: 0;
`;

const QuantityContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
`;

const RemoveButton = styled.button`
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #c0392b;
    }
`;

const AddButton = styled.button`
    background-color: #27ae60;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #2ecc71;
    }
`;

const TotalContainer = styled.div`
    margin-top: 20px;
    padding: 10px;
    background-color: #f8f8f8;
    border-radius: 5px;
`;

const Total = styled.p`
    font-weight: 500;
    font-size: 1.em;
    color: #27ae60;
    margin: 0;
`;

const ButtonFinalizar = styled.button`
    background-color: #27ae60;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px; 
    width: 100%;

    &:hover {
        background-color: #2ecc71;
    }
`;

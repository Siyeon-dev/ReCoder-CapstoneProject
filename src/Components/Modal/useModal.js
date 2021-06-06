import React, {useState} from 'react'
import styled from 'styled-components';

const StyledModal = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .8);
  z-index:100;
  .modal {
    box-shadow: 0 0 15px rgba(0, 0, 0, .1);
    background-color: #fff;
    border-radius:10px;
    position: relative;
    z-index:9999;
    animation-name: grow-modal;
    animation-duration: .3s;
    animation-timing-function: ease-in-out;
    @keyframes grow-modal {
      0% { opacity: .2; }
      25% { opacity: .4; }
      50% { opacity: .6; }
      75% { opacity: .8; }
      100% {opacity: .9; }
    }
  }
`;

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const Component = ({ children }) =>
    isOpen ? <StyledModal>{children}</StyledModal> : <></>;
    return [isOpen, setIsOpen, Component];
}

export default useModal;
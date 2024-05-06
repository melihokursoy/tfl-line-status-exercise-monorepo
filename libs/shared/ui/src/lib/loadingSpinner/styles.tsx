import styled from 'styled-components';

export const StyledOverlay = styled.div<{loading:boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  width: 100dvw;
  height: 100vh;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: visibility 1s, opacity 0.5s ease;
  visibility: ${(props) => props.loading ? 'visible':'hidden'};
  opacity: ${(props) => props.loading ? 1:0};
`;

export const StyledSpinner = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
`;

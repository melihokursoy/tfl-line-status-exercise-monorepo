import styled from 'styled-components';

export const StyledH1 = styled.h1`
  margin-bottom:32px;
`

export const StyledUl = styled.ul`
  display: grid;
  width:100%;
  grid-gap: 0px 16px;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.laptop}) {
    grid-template-columns: repeat(2, calc(100% / 2 - 16px / 2));
    // grid-template-columns: repeat(3, calc(100% / 3 - 32px / 3));
}

  @media screen and (max-width:  ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, calc(100% / 2 - 16px / 2));
}

  @media screen and (max-width:  ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(1, 100%);
}

`;

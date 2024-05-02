import styled from 'styled-components';

export const StyledLi = styled.li<{lineId?:string}>`
  list-style-type: none;
  padding: 0;
  border: 1px solid ${(props) => props.theme.colors['lightgrey']};
  border-left: 10px solid ${(props) => props.theme.colors.lines[props.lineId || 'default']};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  & span {
    display: block;
    max-width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & span:first-child {
    margin-right:32px;
  }
`;

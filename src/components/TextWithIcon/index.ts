import styled, { css } from 'styled-components';

interface Props {
  marginLeft?: string;
}

export const TextWithIcon = styled.div<Props>`
  margin-top: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${props =>
    props.marginLeft &&
    css`
      margin-left: ${props.marginLeft};
    `}

  span {
    margin-left: 8px;
    font-weight: bold;
  }
`;

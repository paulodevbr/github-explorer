import styled, { css } from 'styled-components';

interface Props {
  full?: boolean;
  width?: string;
  withSpaceBetween?: boolean;
}

export const Row = styled.div<Props>`
  display: flex;
  flex-direction: row;

  ${props =>
    props.withSpaceBetween &&
    css`
      justify-content: space-between;
    `}

  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}

  ${props =>
    props.full &&
    css`
      width: 100%;
    `}
`;

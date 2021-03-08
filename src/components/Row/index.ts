import styled, { css } from 'styled-components';

interface Props {
  full?: boolean;
}

export const Row = styled.div<Props>`
  display: flex;
  flex-direction: row;

  ${props =>
    props.full &&
    css`
      width: 100%;
    `}
`;

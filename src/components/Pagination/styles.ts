import styled, { css } from 'styled-components';
import Button from '../Button';
import { colors } from '../../styles/colors';
import { Row } from '../Row';

interface ButtonPaginationProps {
  selected?: boolean;
}

export const ButtonPagination = styled(Button)<ButtonPaginationProps>`
  height: 32px;
  width: 32px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
  color: white;

  &:not(:first-child) {
    margin-left: 6px;
  }
  ${props =>
    props.selected &&
    css`
      background-color: ${colors.accent};
      color: black;
    `}
`;

export const RowPagination = styled(Row)`
  padding-top: 16px;
  padding-bottom: 16px;
  overflow: hidden;
`;

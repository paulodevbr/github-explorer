import React from 'react';
import { ButtonPagination, RowPagination } from './styles';
import getArrayOfNumbers from '../../utils/getArrayOfNumbers';
import isMobile from '../../utils/isMobile';

interface Props {
  total: number;
  perPage: number;
  selectedPage: number;
  onChangePage(page: number): Promise<void>;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  onChangePage,
  selectedPage,
}) => {
  const numberOfPages = Math.floor(total / perPage);
  const pagesLimit = isMobile() ? 10 : 19;

  return (
    <RowPagination full>
      {getArrayOfNumbers(numberOfPages)
        .filter(page => page < pagesLimit)
        .map(pageNumber => (
          <ButtonPagination
            selected={selectedPage === pageNumber}
            onClick={() => onChangePage(pageNumber)}
          >
            {pageNumber}
          </ButtonPagination>
        ))}
    </RowPagination>
  );
};

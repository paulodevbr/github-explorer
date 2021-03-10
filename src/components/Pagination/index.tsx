import React, { useCallback } from 'react';
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

  const handleChangePage = useCallback(
    async (pageNumber: number) => {
      if (selectedPage !== pageNumber) {
        await onChangePage(pageNumber);
      }
    },
    [onChangePage, selectedPage],
  );

  return (
    <RowPagination full>
      {getArrayOfNumbers(numberOfPages)
        .filter(page => page < pagesLimit)
        .map(pageNumber => (
          <ButtonPagination
            selected={selectedPage === pageNumber}
            onClick={() => handleChangePage(pageNumber)}
          >
            {pageNumber}
          </ButtonPagination>
        ))}
    </RowPagination>
  );
};

import TableBody from './ETableBody';
import TableFooter from './ETableFooter';
import TableHead, { ColumnProps } from './ETableHead';
import { ELoader } from 'app/components';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { pxToRem } from 'styles/theme/utils';
import tw, { styled } from 'twin.macro';
import { SORT_TYPE } from 'utils/constants';

interface TableSettingProps {
  scrollable?: boolean;
  hideFooter?: boolean;
  tableLayout?: 'auto' | 'fixed';
}

interface IProps {
  isLoading?: boolean;
  columns: ColumnProps[];
  tableData: any[];
  rowsPerPage: number;
  paginationRange: (string | number)[];
  handleSorting: (sortField: string, sortOrder: SORT_TYPE) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  sortField?: string;
  sortOrder?: SORT_TYPE;
  totalItems: number;
  tableSetting?: TableSettingProps;
  dataKey?: string;
  noDataLabel?: string;
}

const TableContainer = styled.div<TableSettingProps>`
  width: 100%;
  margin: 0 auto;
  display: block;
  ${(p) => p.tableLayout === 'auto' && 'overflow-x: auto;'}
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledTable = styled.table<TableSettingProps>`
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  margin: 0;
  font-size: ${pxToRem(14)}rem;
  ${(p) => p.tableLayout === 'auto' && 'table-layout: auto;'}
  ${(p) => p.tableLayout === 'fixed' && 'table-layout: fixed;'}
`;

const TableLoading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: ${(p) => p.theme.backgroundLowOpacityTable};
  ${tw`w-full h-full flex justify-center items-center`}
`;

const NoData = styled.div`
  ${tw`w-full flex justify-center items-center`}
  height: 120px;
  border: ${pxToRem(1)}rem solid ${(p) => p.theme.tableBorder};
  border-top: none;
`;

export interface TableQueryProps {
  page: number;
  rowsPerPage: number;
  orderBy?: string;
  order?: SORT_TYPE;
  search?: string;
}

const Table: React.FC<IProps> = (props) => {
  const { t } = useTranslation();
  const {
    paginationRange: range,
    handleSorting,
    currentPage,
    setCurrentPage,
    sortField,
    sortOrder,
    columns,
    tableData,
    totalItems,
    dataKey,
    tableSetting,
    rowsPerPage = 10,
    isLoading,
    noDataLabel = '',
  } = props;
  const { scrollable = false, hideFooter = false, tableLayout = 'auto' } = tableSetting ?? {};
  return (
    <Wrapper>
      <TableContainer scrollable={scrollable} tableLayout={tableLayout}>
        <StyledTable tableLayout={tableLayout}>
          <TableHead {...{ columns, handleSorting, sortField, sortOrder }} />
          <TableBody {...{ columns, tableData, dataKey }} />
        </StyledTable>
      </TableContainer>
      {tableData.length === 0 && (
        <NoData>
          {noDataLabel && noDataLabel !== ''
            ? noDataLabel
            : (t('common.noDataToShow') as ReactNode)}
        </NoData>
      )}
      {range.length > 0 && !hideFooter && (
        <TableFooter
          range={range}
          slice={tableData}
          setPage={setCurrentPage}
          page={currentPage}
          total={totalItems}
          start={(currentPage - 1) * rowsPerPage + 1}
          end={tableData.length !== rowsPerPage ? totalItems : tableData.length * currentPage}
        />
      )}
      {isLoading && (
        <TableLoading>
          <ELoader />
        </TableLoading>
      )}
    </Wrapper>
  );
};

export default React.memo(Table);

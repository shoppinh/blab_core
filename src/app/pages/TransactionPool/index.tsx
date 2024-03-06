import { EButton, ETable } from 'app/components';
import { ColumnProps } from 'app/components/ETable/ETableHead';
import { MainLayout } from 'app/layouts';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getTransactionPool } from 'store/selectors/transaction';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';
import { TransactionItem } from 'types/Transaction';
import { ROWS_PER_PAGE } from 'utils/constants';
import { useTable } from 'utils/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { useTransactionSlice } from 'store/slices/transaction';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  height: 100%;
  padding: ${pxToRem(20)}rem;
`;

const SectionTitle = styled.div`
  font: 400 ${pxToRem(18)}rem / ${pxToRem(24)}rem ${(p) => p.theme.fontFamily};
  margin: ${pxToRem(20)}rem 0;
`;

const TransactionListTable = styled(ETable)``;

const MineButton = styled(EButton)`
  font: 400 ${pxToRem(16)}rem / ${pxToRem(24)}rem ${(p) => p.theme.fontFamily};
  color: ${(p) => p.theme.text};
  background-color: ${(p) => p.theme.background};
  border: 1px solid ${(p) => p.theme.text};
  padding: ${pxToRem(5)}rem ${pxToRem(15)}rem;

  &:hover {
    background-color: ${(p) => p.theme.text};
    color: ${(p) => p.theme.background};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: ${pxToRem(20)}rem 0;
  align-items: center;
`;

const TransactionPool = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions: transactionActions } = useTransactionSlice();
  const columns: ColumnProps[] = useMemo(() => {
    return [
      {
        label: t('table.txHash'),
        accessor: 'txHash',
        render: (item: TransactionItem) => item.txHash,
      },
      {
        label: t('table.from'),
        accessor: 'from',
        render: (item: TransactionItem) => item.from,
      },
      {
        label: t('table.to'),
        accessor: 'to',
        render: (item: TransactionItem) => item.to,
        style: {
          wordBreak: 'break-all',
        },
      },
      {
        label: t('table.date'),
        accessor: 'date',
        render: (item: TransactionItem) => item.date,
      },
      {
        label: t('table.value'),
        accessor: 'value',
        render: (item: TransactionItem) => item.value,
      },
    ];
  }, [t]);
  // Get transaction pool from store
  const transactionPool = useSelector(getTransactionPool);

  // Mapping data to render
  const renderedData: TransactionItem[] = useMemo(() => {
    return Array.isArray(transactionPool) && transactionPool.length > 0
      ? transactionPool.map((transaction) => {
          return {
            txHash: transaction.txHash,
            from: transaction.from,
            to: transaction.to,
            date: transaction.date,
            value: transaction.value,
          };
        })
      : [];
  }, [transactionPool]);
  const { paginationRange, setCurrentPage, currentPage } = useTable(
    transactionPool?.length ?? 0,
    columns,
    ROWS_PER_PAGE,
    ''
  );

  // Handle mine button click
  const handleMine = useCallback(() => {}, []);

  // Fetch transaction pool
  useEffect(() => {
    if (!transactionPool) {
      dispatch(transactionActions.doFetchTransactionPool());
    }
  }, [dispatch, transactionActions, transactionPool]);
  return (
    <MainLayout title={t('transactionPool.title')} headerTitle={t('transactionPool.title')}>
      <Container>
        <SectionTitle>Transactions</SectionTitle>
        <TransactionListTable
          columns={columns}
          tableData={renderedData}
          paginationRange={paginationRange}
          handleSorting={() => {}}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={transactionPool?.length || 0}
          rowsPerPage={ROWS_PER_PAGE}
          isLoading={false}
          tableSetting={{
            tableLayout: 'fixed',
          }}
        />
        <ButtonWrapper>
          <MineButton>{t('transactionPool.mine')}</MineButton>
        </ButtonWrapper>
      </Container>
    </MainLayout>
  );
};

export default TransactionPool;

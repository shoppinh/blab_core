import { EBackdropLoading, EButton, ETable } from 'app/components';
import { ColumnProps } from 'app/components/ETable/ETableHead';
import { MainLayout } from 'app/layouts';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getTransactionLoading, getTransactionPool } from 'store/selectors/transaction';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';
import { TransactionItem } from 'types/Transaction';
import { ROWS_PER_PAGE } from 'utils/constants';
import { useTable } from 'utils/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { useTransactionSlice } from 'store/slices/transaction';
import { blockActions, useBlockSlice } from 'store/slices/block';
import { getKeyPair } from 'store/selectors/wallet';
import { toast } from 'react-toastify';
import { getBlockError, getBlockLoading } from 'store/selectors/block';
import { paginate } from 'utils/helpers';

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
  const { actions: blockActions } = useBlockSlice();
  const [isFormSent, setIsFormSent] = useState(false);
  const blockLoading = useSelector(getBlockLoading);
  const transactionLoading = useSelector(getTransactionLoading);
  const blockError = useSelector(getBlockError);
  const columns: ColumnProps[] = useMemo(() => {
    return [
      {
        label: t('table.txHash'),
        accessor: 'txHash',
        render: (item: TransactionItem) => item.hash,
        style: {
          wordBreak: 'break-all',
        },
      },
      {
        label: t('table.from'),
        accessor: 'from',
        render: (item: TransactionItem) => item.from,
        style: {
          wordBreak: 'break-all',
        },
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
        render: (item: TransactionItem) => new Date(item.timestamp).toLocaleString(),
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

  const { paginationRange, setCurrentPage, currentPage } = useTable(
    transactionPool?.length ?? 0,
    columns,
    ROWS_PER_PAGE,
    ''
  );
  const renderedData: TransactionItem[] = useMemo(() => {
    return paginate(transactionPool ?? [], currentPage, ROWS_PER_PAGE);
  }, [currentPage, transactionPool]);
  const keyPair = useSelector(getKeyPair);

  // Handle mine button click
  const handleMine = useCallback(() => {
    if (keyPair?.address) {
      setIsFormSent(true);
      dispatch(blockActions.doMineBlock({ minerAddress: keyPair.address }));
    }
  }, [blockActions, dispatch, keyPair?.address]);

  // Fetch transaction pool
  useEffect(() => {
    dispatch(transactionActions.doFetchTransactionPool());
  }, []);

  useEffect(() => {
    if (isFormSent && !blockLoading && blockError) {
      toast.error(blockError.message ?? 'Error');
      setIsFormSent(false);
    } else if (isFormSent && !blockLoading && !blockError) {
      toast.success('Mine block successfully');
      setIsFormSent(false);
    }
  }, [isFormSent, blockLoading, blockError]);
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
          isLoading={transactionLoading ?? false}
          tableSetting={{
            tableLayout: 'fixed',
          }}
        />
        <ButtonWrapper>
          <MineButton onClick={handleMine}>{t('transactionPool.mine')}</MineButton>
        </ButtonWrapper>
        <EBackdropLoading isShow={blockLoading ?? false} />
      </Container>
    </MainLayout>
  );
};

export default TransactionPool;

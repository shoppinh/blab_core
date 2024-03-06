import { ETable } from 'app/components';
import { ColumnProps } from 'app/components/ETable/ETableHead';
import { MainLayout } from 'app/layouts';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getBlock } from 'store/selectors/block';
import { getTransactionPool } from 'store/selectors/transaction';
import { useBlockSlice } from 'store/slices/block';
import { useTransactionSlice } from 'store/slices/transaction';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';
import { TransactionItem } from 'types/Transaction';
import { ROWS_PER_PAGE, queryString } from 'utils/constants';
import { useQuery, useTable } from 'utils/hooks';

const Container = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  height: 100%;
  padding: ${pxToRem(40)}rem;
  gap: ${pxToRem(20)}rem;
`;

const TransactionDetailSection = styled.div`
  flex: 2;
`;

const BlockDetailSection = styled.div`
  flex: 1;
`;

const BlockDetailInfo = styled.div`
  margin: ${pxToRem(10)}rem 0;
`;

const SectionTitle = styled.div`
  font: 400 ${pxToRem(18)}rem / ${pxToRem(24)}rem ${(p) => p.theme.fontFamily};
  margin: ${pxToRem(10)}rem 0;
`;

const TransactionListTable = styled(ETable)``;

const BlockDetail = () => {
  const { t } = useTranslation();
  const blockNumber = useQuery().get(queryString.blockNumber);
  const dispatch = useDispatch();
  const { actions: blockActions } = useBlockSlice();
  const { actions: transactionActions } = useTransactionSlice();
  const transactionPool = useSelector(getTransactionPool);
  const blockDetail = useSelector(getBlock);

  useEffect(() => {
    if (blockNumber) {
      dispatch(
        blockActions.doFetchBlock({
          blockNumber: parseInt(blockNumber),
        })
      );
    }
  }, [blockActions, blockNumber, dispatch]);

  useEffect(() => {
    dispatch(transactionActions.doFetchTransactionPool());
  }, [dispatch, transactionActions]);
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
        label: t('table.data'),
        accessor: 'data',
        render: (item: TransactionItem) => new Date(item.timestamp).toLocaleString(),
      },
      {
        label: t('table.value'),
        accessor: 'value',
        render: (item: TransactionItem) => item.value,
      },
    ];
  }, [t]);
  const TOTAL_ITEMS = 20;
  const renderedData: TransactionItem[] = useMemo(() => {
    return Array.isArray(transactionPool) && transactionPool.length > 0
      ? transactionPool?.map((transaction) => {
          return {
            hash: transaction.hash,
            from: transaction.from,
            to: transaction.to,
            timestamp: transaction.timestamp,
            value: transaction.value,
            signature: transaction.signature,
            data: transaction.data,
          };
        })
      : [];
  }, [transactionPool]);
  const { paginationRange, setCurrentPage, currentPage } = useTable(
    TOTAL_ITEMS ?? 0,
    columns,
    ROWS_PER_PAGE,
    ''
  );
  return (
    <MainLayout title={t('blockDetail.title')} headerTitle={t('blockDetail.title')}>
      <Container>
        <BlockDetailSection>
          <SectionTitle>{`BLAB block: ${blockDetail?.blockNumber}`}</SectionTitle>
          <BlockDetailInfo>{`Hash: ${blockDetail?.hash}`}</BlockDetailInfo>
          <BlockDetailInfo>{`Last Hash: ${blockDetail?.lastHash ?? ''}`}</BlockDetailInfo>
          <BlockDetailInfo>{`Distance: ${blockDetail?.distance ?? ''}`}</BlockDetailInfo>
          <BlockDetailInfo>{`Transactions: ${blockDetail?.transactions?.length}`}</BlockDetailInfo>
          <BlockDetailInfo>{`Nonce: ${blockDetail?.nonce}`}</BlockDetailInfo>
        </BlockDetailSection>
        <TransactionDetailSection>
          <SectionTitle>Transactions</SectionTitle>
          <TransactionListTable
            columns={columns}
            tableData={renderedData}
            paginationRange={paginationRange}
            handleSorting={() => {}}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalItems={TOTAL_ITEMS || 0}
            rowsPerPage={ROWS_PER_PAGE}
            isLoading={false}
            tableSetting={{
              tableLayout: 'fixed',
            }}
          />
        </TransactionDetailSection>
      </Container>
    </MainLayout>
  );
};

export default BlockDetail;

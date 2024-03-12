import { ETable } from 'app/components';
import { ColumnProps } from 'app/components/ETable/ETableHead';
import { MainLayout } from 'app/layouts';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getBlock } from 'store/selectors/block';
import { useBlockSlice } from 'store/slices/block';
import { useTransactionSlice } from 'store/slices/transaction';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';
import { TransactionItem } from 'types/Transaction';
import { ROWS_PER_PAGE, queryString } from 'utils/constants';
import { paginate } from 'utils/helpers';
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
        label: t('table.date'),
        accessor: 'data',
        render: (item: TransactionItem) => new Date(item.timestamp * 1000).toLocaleString(),
      },
      {
        label: t('table.value'),
        accessor: 'value',
        render: (item: TransactionItem) => item.value,
      },
    ];
  }, [t]);

  const { paginationRange, setCurrentPage, currentPage } = useTable(
    blockDetail?.transactions?.length ?? 0,
    columns,
    ROWS_PER_PAGE,
    ''
  );
  const renderedData = useMemo(() => {
    return paginate(blockDetail?.transactions ?? [], currentPage, ROWS_PER_PAGE);
  }, [blockDetail?.transactions, currentPage]);
  return (
    <MainLayout title={t('blockDetail.title')} headerTitle={t('blockDetail.title')}>
      <Container>
        <BlockDetailSection>
          <SectionTitle>{`BLAB block: ${blockDetail?.blockNumber}`}</SectionTitle>
          <BlockDetailInfo>{`Hash: ${blockDetail?.hash}`}</BlockDetailInfo>
          <BlockDetailInfo>{`Last Hash: ${blockDetail?.parentHash ?? ''}`}</BlockDetailInfo>
          <BlockDetailInfo>{`Distance: ${new Date(blockDetail?.timestamp ? blockDetail.timestamp * 1000 : 0).toLocaleString() ?? ''}`}</BlockDetailInfo>
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
            totalItems={blockDetail?.transactions?.length ?? 0}
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

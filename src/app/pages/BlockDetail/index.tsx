import { ETable } from 'app/components';
import { ColumnProps } from 'app/components/ETable/ETableHead';
import { MainLayout } from 'app/layouts';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';
import { TransactionItem } from 'types/Block';
import { ROWS_PER_PAGE } from 'utils/constants';
import { useTable } from 'utils/hooks';

const Container = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  height: 100%;
  padding: ${pxToRem(40)}rem;
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
  const TOTAL_ITEMS = 20;
  const renderedData: TransactionItem[] = [
    {
      txHash: '0x1234567890',
      from: '0x1234567890',
      to: '0x1234567890',
      value: 123,
      date: '2021-12-12',
    },
    {
      txHash: '0x1234567890',
      from: '0x1234567890',
      to: '0x1234567890',
      value: 123,
      date: '2021-12-12',
    },
    {
      txHash: '0x1234567890',
      from: '0x1234567890',
      to: '0x1234567890',
      value: 123,
      date: '2021-12-12',
    },
    {
      txHash: '0x1234567890',
      from: '0x1234567890',
      to: '0x1234567890',
      value: 123,
      date: '2021-12-12',
    },
    {
      txHash: '0x1234567890',
      from: '0x1234567890',
      to: '0x1234567890',
      value: 123,
      date: '2021-12-12',
    },
  ];
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
          <SectionTitle>BLAB block: 123</SectionTitle>
          <BlockDetailInfo>Hash: 0x1234567890</BlockDetailInfo>
          <BlockDetailInfo>Last Hash: 0x1234567890</BlockDetailInfo>
          <BlockDetailInfo>Distance: 3d 20h</BlockDetailInfo>
          <BlockDetailInfo>Transactions: 13</BlockDetailInfo>
          <BlockDetailInfo>Nonce: 40</BlockDetailInfo>
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

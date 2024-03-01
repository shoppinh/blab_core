import { ETable } from 'app/components';
import { ColumnProps } from 'app/components/ETable/ETableHead';
import { MainLayout } from 'app/layouts';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';
import { BlockListItem } from 'types/Block';
import { ROWS_PER_PAGE, queryString } from 'utils/constants';
import { useTable } from 'utils/hooks';
import { SiteMap } from 'utils/sitemap';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  height: 100%;
  padding: ${pxToRem(20)}rem;
`;
const BlockListSection = styled.div``;
const BlockChainSection = styled.div`
  width: 100%;
  margin: ${pxToRem(20)}rem 0;
`;
const BlockListTable = styled(ETable)``;
const BlockChainInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const BlockChainInfoText = styled.p`
  font: 700 ${pxToRem(16)}rem / ${pxToRem(24)}rem ${(p) => p.theme.fontFamily};
  display: block;
`;

const BlockChainDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${pxToRem(20)}rem;
  margin: ${pxToRem(10)}rem 0;
`;

const BlockChainDisplayItem = styled.div`
  width: ${pxToRem(60)}rem;
  height: ${pxToRem(60)}rem;
  border-radius: ${pxToRem(10)}rem;
  border: 1px solid ${(p) => p.theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const TOTAL_ITEMS = 20;

const BlockList = () => {
  const { t } = useTranslation();

  const columns: ColumnProps[] = useMemo(() => {
    return [
      {
        label: t('table.blockNumber'),
        accessor: 'blockNumber',
        render: (item: BlockListItem) => item.blockNumber,
      },
      {
        label: t('table.hash'),
        accessor: 'hash',
        render: (item: BlockListItem) => item.hash,
      },
      {
        label: t('table.miner'),
        accessor: 'miner',
        render: (item: BlockListItem) => item.miner,
        style: {
          wordBreak: 'break-all',
        },
      },
      {
        label: t('table.mined'),
        accessor: 'mined',
        render: (item: BlockListItem) => item.mined,
      },
      {
        label: t('table.txCount'),
        accessor: 'txCount',
        render: (item: BlockListItem) => item.txCount,
      },
      {
        label: t('table.total'),
        accessor: 'total',
        render: (item: BlockListItem) => item.total,
      },
      {
        label: t('table.sent'),
        accessor: 'sent',
        render: (item: BlockListItem) => item.sent,
      },
    ];
  }, [t]);
  const renderedData: BlockListItem[] = useMemo(() => {
    return [
      {
        blockNumber: 1,
        hash: '0x1234567890',
        miner: '0x1234567890',
        mined: '2021-01-01',
        txCount: 1,
        total: 100,
        sent: 'blab',
      },
      {
        blockNumber: 2,
        hash: '0x1234567890',
        miner: '0x1234567890',
        mined: '2021-01-01',
        txCount: 1,
        total: 100,
        sent: 'blab',
      },
      {
        blockNumber: 3,
        hash: '0x1234567890',
        miner: '0x1234567890',
        mined: '2021-01-01',
        txCount: 1,
        total: 100,
        sent: 'blab',
      },
    ];
  }, []);
  const { paginationRange, setCurrentPage, currentPage } = useTable(
    TOTAL_ITEMS ?? 0,
    columns,
    ROWS_PER_PAGE,
    ''
  );
  const navigate = useNavigate();
  const handleOnClickBlockDetail = useCallback(
    (blockNumber: number) => {
      navigate({
        pathname: SiteMap.blockDetail.link,
        search: `?${queryString.blockNumber}=${blockNumber}`,
      });
    },
    [navigate]
  );
  return (
    <MainLayout title={t('home.title')} headerTitle={t('home.title')}>
      <Container>
        <BlockChainSection>
          <BlockChainInfo>
            <BlockChainInfoText>Latest Block</BlockChainInfoText>
            <BlockChainInfoText>Difficulty: 3</BlockChainInfoText>
          </BlockChainInfo>
          <BlockChainDisplay>
            {renderedData.map((block) => (
              <BlockChainDisplayItem
                key={block.hash}
                onClick={() => handleOnClickBlockDetail(block.blockNumber)}
              >
                {block.blockNumber}
              </BlockChainDisplayItem>
            ))}
          </BlockChainDisplay>
        </BlockChainSection>
        <BlockListSection>
          <BlockListTable
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
        </BlockListSection>
      </Container>
    </MainLayout>
  );
};

export default BlockList;

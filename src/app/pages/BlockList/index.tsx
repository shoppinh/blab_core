import { ETable } from 'app/components';
import { ColumnProps } from 'app/components/ETable/ETableHead';
import { MainLayout } from 'app/layouts';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBlockLoading, getBlocks } from 'store/selectors/block';
import { useBlockSlice } from 'store/slices/block';
import { pxToRem } from 'styles/theme/utils';
import { styled } from 'twin.macro';
import { BlockListItem, BlockListRenderedItem } from 'types/Block';
import { ROWS_PER_PAGE, queryString } from 'utils/constants';
import { paginate } from 'utils/helpers';
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

const BlockList = () => {
  const { t } = useTranslation();
  const { actions: blockActions } = useBlockSlice();
  const blocks = useSelector(getBlocks);
  const dispatch = useDispatch();
  const blockLoading = useSelector(getBlockLoading);
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
        style: {
          wordBreak: 'break-all',
        },
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
        render: (item: BlockListItem) => new Date(item.timestamp * 1000).toLocaleString(),
      },
      {
        label: t('table.txCount'),
        accessor: 'txCount',
        render: (item: BlockListItem) => item.transactions.length,
      },
      {
        label: t('table.totalSent'),
        accessor: 'totalSent',
        render: (item: BlockListItem) => item.transactions.reduce((acc, tx) => acc + tx.value, 0),
      },
    ];
  }, [t]);

  const { paginationRange, setCurrentPage, currentPage } = useTable(
    blocks?.length ?? 0,
    columns,
    ROWS_PER_PAGE,
    ''
  );
  const renderedData: BlockListRenderedItem[] = useMemo(() => {
    return paginate(blocks ?? [], currentPage, ROWS_PER_PAGE);
  }, [blocks, currentPage]);
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

  useEffect(() => {
    dispatch(blockActions.doFetchBlocks());
  }, []);
  return (
    <MainLayout title={t('home.title')} headerTitle={t('home.title')}>
      <Container>
        <BlockChainSection>
          <BlockChainInfo>
            <BlockChainInfoText>Latest Block</BlockChainInfoText>
            <BlockChainInfoText>{`Difficulty: ${renderedData[renderedData.length - 1]?.difficulty ?? 0}`}</BlockChainInfoText>
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
            totalItems={blocks?.length || 0}
            rowsPerPage={ROWS_PER_PAGE}
            isLoading={blockLoading ?? false}
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

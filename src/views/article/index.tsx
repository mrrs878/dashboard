import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';
import { ColumnProps } from 'antd/es/table';
import { connect } from 'react-redux';
import getColumnSearchProps from '../../components/MTableSearch';
import { AppState } from '../../store';
import { getTableFilters } from '../../components/MTableFilters';
import { ROUTES_MAP } from '../../router';
import ARTICLE_MODULE from '../../modules/article';

const mapState2Props = (state: AppState) => ({
  articles: state.common.articles,
});

interface PropsI extends RouteComponentProps {
  articles: Array<ArticleI>
}

function getDictListColumns(articles: Array<ArticleI>): Array<ColumnProps<ArticleI>> {
  return [
    {
      title: '名称',
      dataIndex: 'title',
      ellipsis: true,
      ...getColumnSearchProps('title'),
    },
    {
      title: '类别',
      dataIndex: 'category_view',
      ellipsis: true,
      onFilter: (value, record) => value === String(record.category_view),
      ...getColumnSearchProps('category_view'),
    },
    {
      title: '阅读量',
      dataIndex: 'visitors',
      ellipsis: true,
      sorter: (a, b) => a.visitors - b.visitors,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '留言量',
      dataIndex: 'comments',
      ellipsis: true,
      sorter: (a, b) => a.comments - b.comments,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '状态',
      dataIndex: 'status',
      onFilter: (value, record) => value === record.status,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      ellipsis: true,
      render(text: string, record) {
        return <span>{ new Date(record.create_time).toLocaleString() }</span>;
      },
      sorter: (a, b) => a.create_time - b.create_time,
      sortDirections: ['descend', 'ascend'],
    },
  ];
}

const Articles: React.FC<PropsI> = (props: PropsI) => {
  const [article, setArticle] = useState<Array<ArticleI>>([]);
  const [dictListColumns, setDictListColumns] = useState<Array<ColumnProps<ArticleI>>>([]);
  const [articleCount, setArticleCount] = useState(0);
  const [loadMoreF, setLoadMoreF] = useState(false);

  useEffect(() => {
    ARTICLE_MODULE.getArticle();
  }, []);

  useEffect(() => {
    setArticle(props.articles);
    setArticleCount(props.articles.length);
    setDictListColumns(getDictListColumns(props.articles));
  }, [props.articles]);

  function onCreateGoodsClick() {
    props.history.push(`${ROUTES_MAP.article}/-1`);
  }

  async function onLoadMore() {
    try {
      setLoadMoreF(true);
      setLoadMoreF(false);
    } catch (e) {
      console.log(e);
    }
    setLoadMoreF(true);
  }

  function onArticleListRow(record: ArticleI) {
    return {
      onClick: () => {
        props.history.push(`${ROUTES_MAP.article}/${record.id}`);
      },
    };
  }

  return (
    <div className="container">
      <Table
        columns={dictListColumns}
        rowKey={(record) => String(record.id)}
        onRow={onArticleListRow}
        dataSource={article}
        pagination={{ defaultPageSize: 20 }}
        scroll={{ y: '75vh' }}
      />
      <Button type="primary" style={{ width: 100 }} onClick={onCreateGoodsClick}>创建文章</Button>
      {
        articleCount > article.length
        && <Button style={{ marginLeft: 10, width: 100 }} loading={loadMoreF} onClick={onLoadMore}>加载更多</Button>
      }
    </div>
  );
};

export default connect(mapState2Props)(withRouter(Articles));

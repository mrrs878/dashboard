import { Button, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import React, { ReactText, RefObject, useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { FilterDropdownProps } from 'antd/es/table/interface';

interface SearchInputPropsI {
  selectedKeys?: Array<React.Key>;
  setSelectedKeys?: (selectedKeys: string[]) => void;
  confirm?: () => void | undefined;
  clearFilters?: () => void;
}

export default function getColumnSearchProps(dataIndex: string) {
  let inputRef: RefObject<Input | undefined>;
  let searchText: ReactText | undefined;
  let searchedColumn: string;
  const SearchInput = (props: SearchInputPropsI) => {
    inputRef = useRef<Input>();

    function handleSearch(selectedKeys: React.Key[] | undefined, confirm: (() => void) | undefined, index: string) {
      if (confirm) confirm();
      searchText = selectedKeys && selectedKeys[0];
      searchedColumn = index;
    }

    function handleReset(clearFilters: (() => void) | undefined) {
      if (clearFilters) clearFilters();
      searchText = '';
    }

    return (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`搜索 ${dataIndex}`}
          value={props.selectedKeys && props.selectedKeys[0]}
          onPressEnter={() => handleSearch(props.selectedKeys, props.confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(props.selectedKeys, props.confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
        <Button onClick={() => handleReset(props.clearFilters)} size="small" style={{ width: 90 }}>
          重置
        </Button>
      </div>
    );
  };

  return {
    filterDropdown({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) {
      return <SearchInput confirm={confirm} setSelectedKeys={setSelectedKeys} selectedKeys={selectedKeys} clearFilters={clearFilters} />;
    },
    filterIcon(filtered: boolean) {
      return <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />;
    },
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => inputRef.current?.select());
      }
    },
    render(text: string) {
      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[String(searchText)]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      );
    },
  };
}

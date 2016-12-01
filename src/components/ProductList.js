import React, { PropTypes } from 'react';
import { Table, Popconfirm, Button } from 'antd';

const ProductList = ({ onEdit,onDelete, products }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      render(text, record) {
        return (
          <div>
            <Popconfirm title="edit?" onConfirm={onEdit.bind(this, record.id)}>
              <Button>编辑</Button>
            </Popconfirm>

            <Popconfirm title="Delete?" onConfirm={onDelete.bind(this, record.id)}>
              <Button>删除</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  console.log("products",products);
  return (
    <Table
      dataSource={products}
      columns={columns}
    />
  );
};

ProductList.proptypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductList;
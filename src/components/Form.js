import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Pagination, Button, Modal, Form, Input, Radio  } from 'antd';


// 采用 stateless 的写法


const FormItem = Form.Item;
const FormList = ({
    total, current, loading, dataSource,modalVisible,currentItem,modalVisibleOne,
    onPageChange,
    onDeleteItem,
    onEditItem,
    onCancel,
    onUpdate,
    onAdd,
    form: {
      getFieldDecorator,
      resetFields,
      validateFields,
      getFieldsValue,
      setFieldsValue,
    },
}) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      };
      if(currentItem){
        const data = { ...getFieldsValue(),id:currentItem.id};
        onUpdate(data);
        console.log('onUpdate',data);
      }else{
        onAdd(getFieldsValue());
        console.log('onAdd',getFieldsValue());
      }
    });
  }
  function handleEdit(record) {
    setFieldsValue(record);
    onEditItem(record);
  }
  function handleOnAdd() {
    resetFields();
    onEditItem();
  }
  const columns = [{
    title: '表单KEY',
    dataIndex: 'entityKey',
    key: 'entityKey',
  },
  {
    title: '表单显示名',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <a href={'/#/field?entityId='+record.id}>{text}</a>,
  }, {
    title: '说明',
    dataIndex: 'description',
    key: 'description',
  }, {
    title: '创建人',
    dataIndex: 'gmtCreate',
    key: 'gmtCreate',
  },{
    title: '修改人',
    dataIndex: 'gmtModified',
    key: 'gmtModified',
  },{
    title: '创建时间',
    dataIndex: 'gmtCreateStr',
    key: 'gmtCreateStr',
  },{
    title: '修改时间',
    dataIndex: 'gmtModifiedStr',
    key: 'gmtModifiedStr',
  },{
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <div>
        <a onClick={()=>handleEdit(record)}>编辑</a>
        &nbsp;
        <Popconfirm title="确定要删除吗？" onConfirm={()=> onDeleteItem(record.id)}>
          <a>删除</a>
        </Popconfirm>
      </div>
    ),
  }];

    // 定义分页对象
  const pagination = {
    total,
    current,
    pageSize: 10,
    onChange: ()=>{},
  };
  

  return (
    <div>
      <Button type="primary" onClick={()=>handleOnAdd()}>新增</Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id}
        pagination={false}
      />
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={10}
        onChange={onPageChange}
      />
      <Modal
        visible={modalVisible}
        title="编辑"
        okText="确定"
        onCancel={onCancel}
        onOk={()=>handleOk()}
      >
        <Form vertical>
          <FormItem label="表单KEY">
              {getFieldDecorator('entityKey', {
                rules: [{ required: true, message: '表单KEY!' }],
              })(
                <Input />
              )}
          </FormItem>
          <FormItem label="表名">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入表名!' }],
              })(
                <Input />
              )}
          </FormItem>
          <FormItem label="说明">
              {getFieldDecorator('description', {
                rules: [{ required: true, message: '请输入说明!' }],
              })(
                <Input type="textarea" />
              )}
          </FormItem>
          
        </Form>
      </Modal>
    </div>
  );

}



FormList.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
};
export default Form.create()(FormList);


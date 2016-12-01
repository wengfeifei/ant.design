import React, { PropTypes } from 'react';
import { Table, message, Breadcrumb, Popconfirm, Pagination, Button, Modal, Form, Input, Radio, Select,  } from 'antd';


// 采用 stateless 的写法


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const FieldList = ({
    total, fieldTypeOptions, current, loading, dataSource,modalVisible,currentItem,modalVisibleOne,fieldType,
    onPageChange,
    onDeleteItem,
    onEditItem,
    onCancel,
    onUpdate,
    onChange,
    onAdd,
    form: {
      getFieldDecorator,
      validateFields,
      getFieldsValue,
      setFieldsValue,
      resetFields,
    },
}) => {
  function handleOk(record) {
    validateFields((errors) => {
      if (errors) {
        return;
      };
      if(currentItem){
        const data = { ...getFieldsValue(), id: currentItem.id};
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
    console.log('record',record);
  }
  function handleOnAdd() {
    resetFields();
    onEditItem();
  }
  const columns = [{
    title: '字段KEY',
    dataIndex: 'columnName',
    key: 'columnName',
  },{
    title: '字段列名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '字段类型',
    dataIndex: 'fieldTypeInfo.dataStyle',
    key: 'fieldTypeInfo.dataStyle',
  }, {
    title: '说明',
    dataIndex: 'description',
    key: 'description',
  }, {
    title: '是否必填',
    dataIndex: 'isRequired',
    key: 'isRequired',
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
      <Breadcrumb separator=">">
        <Breadcrumb.Item href="/#/form">表单</Breadcrumb.Item>
        <Breadcrumb.Item>字段</Breadcrumb.Item>
      </Breadcrumb>
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
            <FormItem label="字段KEY">
              {getFieldDecorator('columnName', {
                rules: [{ required: true, message: '请输入字段KEY!' }],
              })(
                <Input />
              )}
          </FormItem>
          <FormItem label="字段列名">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入字段列名!' }],
              })(
                <Input />
              )}
          </FormItem>
          <FormItem label="说明">
              {getFieldDecorator('description', {
                
              })(
                <Input />
              )}
          </FormItem>
          <FormItem label="是否必填">
              {getFieldDecorator('isRequired', {
                rules: [{ required: true, message: '请输入说明!' }],
              })(
                <RadioGroup>
                  <Radio key="y" value="y">是</Radio> <Radio key="n" value="n">否</Radio>
                </RadioGroup>
              )}
          </FormItem>
          <FormItem label="字段类型">
              {getFieldDecorator('fieldType', {
                rules: [{ type:'number', required: true, message: '请选择类型!' }],
              })(
                <Select>
                  {fieldTypeOptions.map(type => <Select.Option key={type.id} value={type.id}>{type.dataStyle}</Select.Option>)}
                </Select>
              )}
          </FormItem>
          
        </Form>
      </Modal>
    </div>
  );

}



FieldList.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
};
export default Form.create()(FieldList);


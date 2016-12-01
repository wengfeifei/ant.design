import React, { PropTypes } from 'react';
import { Table, message, Popconfirm, Pagination, Button, Modal, Form, Input, Radio, Select, DatePicker} from 'antd';
import moment from 'moment';


// 采用 stateless 的写法


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const DataList = ({
    total, fieldTypeOptions, current, loading, dataSource,modalVisible,currentItem,resultTwo,formList,
    fieldType,column,bu,ou,employee,regularEmployee,currency,date,enumType,result,selectedOption,selectedOptionTwo,
    onPageChange,
    onDeleteItem,
    onEditItem,
    onCancel,
    onUpdate,
    onChange,
    onSearch,
    onSearchTwo,
    onSelect,
    onSelectTwo,
    selectForm,
    form: {
      getFieldDecorator,
      validateFields,
      getFieldsValue,
      setFieldsValue,
      resetFields
    },
}) => {
  function handleCancel() {
    onCancel();
    onSelect([]);//清空人员选中值
    onSelectTwo([]);
  }
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      onSelect([]);//清空人员选中值
      onSelectTwo([]);
      if(currentItem){//更新
        let formData = getFieldsValue();
        let data = { ...formData, id: currentItem.id};
        console.log('onUpdate',data);
        onUpdate(data);
      }else{//新增
        console.log('onAdd',getFieldsValue());
        onAdd(getFieldsValue());
      }
    });
  }
  function handleEdit(record) {
    let data = {};
    for(let i=0;i<column.length;i++){
      //如果是时间日期，设置默认值前先转换成moment格式
      if(column[i].type == 'Date'){
        data[column[i].dataKey] = moment(record[column[i].dataKey]);
      }else if(column[i].type == 'date_picker'){
        //如果是时间日期区间，设置默认值前先转换成moment格式
        if(record[column[i].dataKey]){
          data[column[i].dataKey] = [moment(record[column[i].dataKey][0], 'YYYY-MM-DD'), moment(record[column[i].dataKey][1], 'YYYY-MM-DD')];
        }
      }else{
        data[column[i].dataKey] = record[column[i].dataKey];
      }
    };
    console.log('record',record);
    console.log('data',data);
    setFieldsValue(data);
    onEditItem(record);
  }
  function handleOnAdd() {
    //清空表单
    /*ouValue = null;
    ou = null;
    bu = null;*/
    resetFields();
    onEditItem();
  }
  function formListOne(Option) {
    let formListHtml = []
    if(formList){
      for(let i in formList){
        formListHtml.push(<Option value={i}>{formList[i]}</Option>);
      }
    }    
    return formListHtml;
  }
  function columns(){
    //循环组装表头
    let columns = [];
    for(let i=0;i<column.length;i++){
      columns.push({title:column[i].name,dataIndex:column[i].dataKey,key:column[i].dataKey});
    };
    columns.push({title:'操作',key:'operation',render:(text, record)=> (
      <div>
        <a onClick={()=>handleEdit(record)}>编辑</a>
        &nbsp;
        <Popconfirm title="确定要删除吗？" onConfirm={()=> onDeleteItem(record.id)}>
          <a>删除</a>
        </Popconfirm>
      </div>
    )});
    return columns;
  }
  function FormItemHtml(FormItem) {
    let FormItemHtml = [];
    for(let i=0;i<column.length;i++){
      function labelName(){
        return column[i].name;
      };
      //自定义校验Long
      function checkLong(rule, value, callback) {
        const reg = /^[0-9]*$/;
        if(value && !reg.test(value)){
          callback('请输入Long类型');
        }else{
          callback();
        }
      };
      //自定义校验phone
      function checkPhone(rule, value, callback) {
        const reg = /^[0-9]*$/;
        if(value && !reg.test(value)){
          callback('请输入phone类型');
        }else{
          callback();
        }
      };
      //自定义校验card_no
      function checkCard(rule, value, callback) {
        const reg = /^[0-9]*$/;
        if(value && !reg.test(value)){
          callback('请输入数字');
        }else{
          callback();
        }
      };
      //自定义校验Integer
      function checkInteger(rule, value, callback) {
        const reg = /^[0-9]*$/;
        if(value && !reg.test(value)){
          callback('请输入Integer类型');
        }else{
          callback();
        }
      };
      //字段类型为Long
      if(column[i].type == 'Long'){
        //定义校验方法
        let rules = [];
        if(column[i].isRequired == 'y'){
          rules.push({ required: true, message: '请输入'+column[i].name+'!' });
        };
        if(column[i].minValue){
          rules.push({min: column[i].minValue, message: '不少于'+column[i].minValue+'!'});
        };
        if(column[i].maxValue){
          rules.push({max: column[i].maxValue, message: '不多于'+column[i].maxValue+'!'});
        };
        rules.push({ validator: checkLong });
        FormItemHtml.push(<FormItem label={labelName()}>
              {getFieldDecorator(column[i].dataKey, {
                rules: rules,

              })(
                <Input />
              )}
          </FormItem>)
      };
      //字段类型为phone
      if(column[i].type == 'phone'){
        //定义校验方法
        let rules = [];
        if(column[i].isRequired == 'y'){
          rules.push({ required: true, message: '请输入'+column[i].name+'!' });
        };
        if(column[i].minValue){
          rules.push({min: column[i].minValue, message: '不少于'+column[i].minValue+'!'});
        };
        if(column[i].maxValue){
          rules.push({max: column[i].maxValue, message: '不多于'+column[i].maxValue+'!'});
        };
        rules.push({ validator: checkPhone });
        FormItemHtml.push(<FormItem label={labelName()}>
              {getFieldDecorator(column[i].dataKey, {
                rules: rules,
              })(
                <Input />
              )}
          </FormItem>)
      };
      //字段类型为Bool
      if(column[i].type == 'Bool'){
        //定义校验方法
        let rules = [];
        if(column[i].isRequired == 'y'){
          rules.push({ required: true, message: '请输入'+column[i].name+'!' });
        };
        FormItemHtml.push(<FormItem label={labelName()}>
              {getFieldDecorator(column[i].dataKey, {
                rules: rules,
              })(
                <RadioGroup>
                  <Radio key="y" value="y">是</Radio> <Radio key="n" value="n">否</Radio>
                </RadioGroup>
              )}
          </FormItem>)
      };
      //字段类型为BU
      if(column[i].type == 'BU'){
        //定义校验方法
        let rules = [];
        if(column[i].isRequired == 'y'){
          rules.push({ required: true, message: '请选择!' });
        };
        FormItemHtml.push(<FormItem label={labelName()}>
              {getFieldDecorator(column[i].dataKey, {
                rules: rules
              })(
                <Select>
                  {bu.map(type => <Select.Option key={type.buCode} value={type.buCode}>{type.buName}</Select.Option>)}
                </Select>
              )}
          </FormItem>)
      };
      //字段类型为OU
      if(column[i].type == 'OU'){
        //定义校验方法
        let rules = [];
        if(column[i].isRequired == 'y'){
          rules.push({ type: 'array', required: true, message: '请选择!' });
        };
        FormItemHtml.push(<FormItem label={labelName()}>
              {getFieldDecorator(column[i].dataKey, {
                rules: rules
              })(
                <OuComponent bu={bu} ou={ou} />
              )}
          </FormItem>)
      };
      //字段类型为人员控件
      if(column[i].type == 'separated_and_regular_employee'){
        let resultOption = [];
        let defaultOption = [];
        let options = [];
        let defaultEmployee = [];
        function handChange(value){
          let selected = value;
          let selectedOne = [];
          let selectedTwo =[];
          if(selectedOption.length == 0){
            //没有选中值只有默认值
            for(let i=0;i<value.length;i++){
              if(defaultEmployee.length != 0){
                for(let j=0;j<defaultEmployee.length;j++){
                  if(value[i] == defaultEmployee[j].id){
                    selectedOne.push(<Select.Option key={value[i]} value={value[i]}>{defaultEmployee[j].name}</Select.Option>);
                  }
                }
              }
              if(result.length != 0){
                for(let j=0;j<result.length;j++){
                  if(value[i] == result[j].emplId){
                    selectedTwo.push(<Select.Option key={value[i]} value={value[i]}>{result[j].name}</Select.Option>)
                  }
                }
              }
            };
            onSelect(selectedOne.concat(selectedTwo));
          }else{
            //有选中值
            for(let i=0;i<value.length;i++){
              if(result.length != 0){
                for(let j=0;j<result.length;j++){
                  if(value[i] == result[j].emplId){
                    selectedTwo.push(<Select.Option key={value[i]} value={value[i]}>{result[j].name}</Select.Option>)
                  }
                }
              }
            }
            for(let i=0;i<selectedOption.length;i++){
              for(let j=0;j<selectedTwo.length;j++){
                if(selectedOption[i].key == selectedTwo[j].key){
                  selectedTwo = selectedTwo.filter(data => data.key != selectedOption[i].key);
                }
              }
            }
            onSelect(selectedOption.concat(selectedTwo));
          }
        };
        if(currentItem){
          defaultEmployee = currentItem[column[i].dataKey+'_emp'];
        }else{
          defaultEmployee = null;
        }
        if(result){
          resultOption = result.map(data => 
            <Select.Option key={data.emplId} value={data.emplId}>{data.name}</Select.Option>
          );
        }
        if(defaultEmployee){
          defaultOption = defaultEmployee.map(data =>
            <Select.Option key={data.id} value={data.id}>{data.name}</Select.Option>
          );
        }
        if(selectedOption.length != 0){
          //options = resultOption.concat(selectedOption);
          for(let i=0;i<selectedOption.length;i++){
            for(let j=0;j<resultOption.length;j++){
              if(selectedOption[i].key == resultOption[j].key){
                resultOption = resultOption.filter(data => data.key != selectedOption[i].key);
              }
            }
          };
          options = resultOption.concat(selectedOption);
        }else{
          options = resultOption.concat(defaultOption);
        }
        //定义校验方法
        let rules = [];
        if(column[i].isRequired == 'y'){
          rules.push({ type: 'array', required: true, message: '请选择!' });
        };
        FormItemHtml.push(<FormItem label={labelName()}>
              {getFieldDecorator(column[i].dataKey, {
                rules: rules
              })(
                <Select tags onSearch={onSearch} onChange={handChange}>
                  {options}
                </Select>
              )}
          </FormItem>)
      };
    
      //字段类型为人员控件
      if(column[i].type == 'regular_employee'){
        let resultOption = [];
        let defaultOption = [];
        let options = [];
        let defaultEmployee = [];
        function handChangeTwo(value){
          let selected = value;
          let selectedOne = [];
          let selectedTwo =[];
          if(selectedOptionTwo.length == 0){
            //没有选中值只有默认值
            for(let i=0;i<value.length;i++){
              if(defaultEmployee.length != 0){
                for(let j=0;j<defaultEmployee.length;j++){
                  if(value[i] == defaultEmployee[j].id){
                    selectedOne.push(<Select.Option key={value[i]} value={value[i]}>{defaultEmployee[j].name}</Select.Option>);
                  }
                }
              }
              if(resultTwo.length != 0){
                for(let j=0;j<resultTwo.length;j++){
                  if(value[i] == resultTwo[j].emplId){
                    selectedTwo.push(<Select.Option key={value[i]} value={value[i]}>{resultTwo[j].name}</Select.Option>)
                  }
                }
              }
            };
            onSelectTwo(selectedOne.concat(selectedTwo));
          }else{
            //有选中值
            for(let i=0;i<value.length;i++){
              if(resultTwo.length != 0){
                for(let j=0;j<resultTwo.length;j++){
                  if(value[i] == resultTwo[j].emplId){
                    selectedTwo.push(<Select.Option key={value[i]} value={value[i]}>{resultTwo[j].name}</Select.Option>)
                  }
                }
              }
            }
            for(let i=0;i<selectedOptionTwo.length;i++){
              for(let j=0;j<selectedTwo.length;j++){
                if(selectedOptionTwo[i].key == selectedTwo[j].key){
                  selectedTwo = selectedTwo.filter(data => data.key != selectedOptionTwo[i].key);
                }
              }
            }
            onSelectTwo(selectedOptionTwo.concat(selectedTwo));
          }
        };
        if(currentItem){
          defaultEmployee = currentItem[column[i].dataKey+'_emp'];
        }else{
          defaultEmployee = null;
        }
        if(resultTwo){
          resultOption = resultTwo.map(data => 
            <Select.Option key={data.emplId} value={data.emplId}>{data.name}</Select.Option>
          );
        }
        if(defaultEmployee){
          defaultOption = defaultEmployee.map(data =>
            <Select.Option key={data.id} value={data.id}>{data.name}</Select.Option>
          );
        }
        if(selectedOptionTwo.length != 0){
          for(let i=0;i<selectedOptionTwo.length;i++){
            for(let j=0;j<resultOption.length;j++){
              if(selectedOptionTwo[i].key == resultOption[j].key){
                resultOption = resultOption.filter(data => data.key != selectedOptionTwo[i].key);
              }
            }
          };
          options = resultOption.concat(selectedOptionTwo);
        }else{
          options = resultOption.concat(defaultOption);
        }
        //定义校验方法
        let rules = [];
        if(column[i].isRequired == 'y'){
          rules.push({ type: 'array', required: true, message: '请选择!' });
        };
        FormItemHtml.push(<FormItem label={labelName()}>
              {getFieldDecorator(column[i].dataKey, {
                rules: rules
              })(
                <Select tags onSearch={onSearchTwo} onChange={handChangeTwo}>
                  {options}
                </Select>
              )}
          </FormItem>)
      };
      //字段类型为银行卡号
      if(column[i].type == 'card_no'){
        //定义校验方法
        let rules = [];
        if(column[i].isRequired == 'y'){
          rules.push({ required: true, message: '请输入'+column[i].name+'!' });
        };
        if(column[i].minValue){
          rules.push({min: column[i].minValue, message: '不少于'+column[i].minValue+'!'});
        };
        if(column[i].maxValue){
          rules.push({max: column[i].maxValue, message: '不多于'+column[i].maxValue+'!'});
        };
        rules.push({ validator: checkCard });
        FormItemHtml.push(<FormItem label={labelName()}>
              {getFieldDecorator(column[i].dataKey, {
                rules: rules,

              })(
                <Input />
              )}
          </FormItem>)
      };
      //字段类型为币种
      if(column[i].type == 'currency'){
        //定义校验方法
        let rules = [];
        if(column[i].isRequired == 'y'){
          rules.push({ required: true, message: '请选择!' });
        };
        FormItemHtml.push(<FormItem label={labelName()}>
              {getFieldDecorator(column[i].dataKey, {
                rules: rules
              })(
                <Select>
                  {currency.map(type => <Select.Option key={type.currencyType} value={type.currencyType}>{type.currencyName}</Select.Option>)}
                </Select>
              )}
          </FormItem>)
      };
      //字段类型为邮箱
      if(column[i].type == 'email'){
        //定义校验方法
        let rules = [];
        rules.push({type: 'email', message: '请输入email!'});
        if(column[i].isRequired == 'y'){
          rules.push({ required: true, message: '请输入'+column[i].name+'!' });
        };
        FormItemHtml.push(<FormItem label={labelName()}>
              {getFieldDecorator(column[i].dataKey, {
                rules: rules
              })(
                <Input />
              )}
          </FormItem>)
      };
      //字段类型为日期
      if(column[i].type == 'Date'){
        //定义校验方法
        let rules = [];
        if(column[i].isRequired == 'y'){
          rules.push({ required: true, message: '请输入'+column[i].name+'!' });
        };
        let dataValue = null;
        if(currentItem){
          dataValue = currentItem[column[i].dataKey];
        }
        FormItemHtml.push(<FormItem label={labelName()}>
              {getFieldDecorator(column[i].dataKey, {
                rules: rules,
                initialValue: dataValue
              })(
                <DatePicker />
              )}
          </FormItem>)
      };
      //字段类型为日期区间
      if(column[i].type == 'date_picker'){
        //定义校验方法
        let rules = [];
        rules.push({ type: 'array', message: 'Please select time!' });
        if(column[i].isRequired == 'y'){
          rules.push({ required: true, message: '请输入'+column[i].name+'!' });
        }
        FormItemHtml.push(<FormItem label={labelName()}>
              {getFieldDecorator(column[i].dataKey, {
                rules: rules
              })(
                <RangePicker format='YYYY-MM-DD'/>
              )}
          </FormItem>)
      };
      //字段类型为Integer
      if(column[i].type == 'Integer'){
        //定义校验方法
        let rules = [];
        if(column[i].isRequired == 'y'){
          rules.push({ required: true, message: '请输入'+column[i].name+'!' });
        };
        if(column[i].minValue){
          rules.push({min: column[i].minValue, message: '不少于'+column[i].minValue+'!'});
        };
        if(column[i].maxValue){
          rules.push({max: column[i].maxValue, message: '不多于'+column[i].maxValue+'!'});
        };
        rules.push({ validator: checkInteger });
        FormItemHtml.push(<FormItem label={labelName()}>
              {getFieldDecorator(column[i].dataKey, {
                rules: rules,

              })(
                <Input />
              )}
          </FormItem>)
      };
      //字段类型为String
      if(column[i].type == 'String'){
        //定义校验方法
        let rules = [];
        if(column[i].isRequired == 'y'){
          rules.push({ required: true, message: '请输入'+column[i].name+'!' });
        };
        if(column[i].minValue){
          rules.push({min: column[i].minValue, message: '不少于'+column[i].minValue+'!'});
        };
        if(column[i].maxValue){
          rules.push({max: column[i].maxValue, message: '不多于'+column[i].maxValue+'!'});
        };
        FormItemHtml.push(<FormItem label={labelName()}>
              {getFieldDecorator(column[i].dataKey, {
                rules: rules
              })(
                <Input />
              )}
          </FormItem>)
      };
      //字段类型为enum
      if(column[i].type == 'enum_type'){
        //定义校验方法
        const dataKey = column[i].dataKey;
        let rules = [];
        if(column[i].isRequired == 'y'){
          rules.push({ required: true, message: '请输入'+column[i].name+'!' });
        };
        FormItemHtml.push(<FormItem label={labelName()}>
              {getFieldDecorator(column[i].dataKey, {
                rules: rules
              })(
                <Select>
                  {enumType[dataKey].map(type => <Select.Option key={type.enumType} value={type.enumType}>{type.enumName}</Select.Option>)}
                </Select>
              )}
          </FormItem>)
      };
    };
    return FormItemHtml
  }
  // 定义分页对象
  const pagination = {
    total,
    current,
    pageSize: 10,
    onChange: ()=>{},
  };
  

  return (
    <div>
      <div>
        <span>请选择表单：</span>
        <Select style={{ width: 250 }} onChange={selectForm}>
          {formListOne(Option)}
        </Select>
      </div>
      <Button type="primary" onClick={()=>handleOnAdd()}>新增</Button>
      <Table
        columns={columns()}
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
        onCancel={()=>handleCancel()}
        onOk={()=>handleOk()}
      >
      <Form vertical>
        {FormItemHtml(FormItem)}
      </Form>
      </Modal>
    </div>
  );
}
DataList.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
};

//自定义OU组件
const OuComponent = React.createClass({
  //初始化
  getInitialState() {
    let defaultBU = null;
    let defaultOU = null;
    let OUSelect = null;
    let BUSelect = null;
    let ou = this.props.ou;
    let bu = this.props.bu;
    if(this.props.value){
      defaultBU = this.props.value[0];
      defaultOU = this.props.value[1];
      ou.map(data => {
        if(data.value == defaultBU){
          OUSelect = data.contents.map(type => <Select.Option key={type.value} value={type.value}>{type.text}</Select.Option>);
        }
      })
    }
    BUSelect = bu.map(type => <Select.Option key={type.buCode} value={type.buCode}>{type.buName}</Select.Option>);
    return {
      defaultBU : defaultBU,
      defaultOU : defaultOU,
      OUSelect : OUSelect,
      BUSelect : BUSelect,
      ou : ou,
      bu : bu,
    };
  },
  //更新
  componentWillReceiveProps(nextProps) {
    let defaultBU = null;
    let defaultOU = null;
    let OUSelect = null;
    let ou = this.props.ou;
    let bu = this.props.bu;
    if(nextProps.value){
      defaultBU = nextProps.value[0];
      defaultOU = nextProps.value[1];
      ou.map(data => {
        if(data.value == defaultBU){
          OUSelect = data.contents.map(type => <Select.Option key={type.value} value={type.value}>{type.text}</Select.Option>);
        }
      });
    }
    this.setState({
      defaultBU : defaultBU,
      defaultOU : defaultOU,
      OUSelect : OUSelect,
    });
  },
  onChangeBU(value) {
    this.state.ou.map(data => {
      if(data.value == value){
        const OUSelect = data.contents.map(type => <Select.Option key={type.value} value={type.value}>{type.text}</Select.Option>);
        this.setState({
          OUSelect : OUSelect,
          defaultBU : value,
          defaultOU : OUSelect[0].key
        });
        const onChange = this.props.onChange;
        if(onChange){
          onChange([value,OUSelect[0].key]);
        }
      }
    });
  },
  onChangeOU(value) {
    this.setState({
      defaultOU : value
    });
    const onChange = this.props.onChange;
    if(onChange){
      onChange([this.state.defaultBU,value]);
    }
  },
  render() {
    return (
      <div>
        <Select placeholder='请选择' value={this.state.defaultBU} style={{ width: 90,margin:5}} onChange={this.onChangeBU}>
          {this.state.BUSelect}
        </Select>
        <Select placeholder='请选择' value={this.state.defaultOU} style={{ width: 380 }} onChange={this.onChangeOU}>
          {this.state.OUSelect}
        </Select>
      </div>
    );
  },
});



export default Form.create()(DataList);


import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';

// Users 的 Presentational Component
// 暂时都没实现
import DataList from '../components/Data';
//import AddForm from '../components/AddForm';
import reqwest from 'reqwest';


// 引入对应的样式
// 可以暂时新建一个空的
import styles from './Data.less';

function Data({ location, dispatch, data }) {

  const {
    loading, list, total, current, name, fieldTypeOptions, column,bu,ou,employee,regularEmployee,currency,date,enumType,ouOptions,
    ouValue,currentBU,currentOU,result,resultTwo,selectedOption,selectedOptionTwo,currentItem, modalVisible, modalType,
    getFieldDecorator,formList
    } = data;
  const dataListProps={
  		dataSource: list,
  		modalVisible,
  		column,
  		fieldTypeOptions,
  		currentItem,
  		currentBU,
  		currentOU,
        bu,
        ou,
        employee,
        ouOptions,
        ouValue,
        regularEmployee,
        result,
        resultTwo,
        selectedOption,
        selectedOptionTwo,
        currency,
        date,
        enumType,
        total,
        loading,
        current,
        formList,
        onDeleteItem(id) {
	        dispatch({
	        	type: 'data/delete',
	        	payload: id,
	        });
	    },
	    onEditItem(item) {
		    dispatch({
		        type: 'data/showModal',
		        payload: {
		            currentItem: item,
		        },
		    });
	    },
	    onCancel() {
	    	dispatch({
		        type: 'data/hideModal',
		    });
	    },
		onUpdate(item) {
		    dispatch({
		        type: 'data/update',
		        payload: {
		        	modalType: 'update',
		        	columnName: item.columnName,
		        	name: item.name,
		        	id:  item.id,
		        	fieldType: item.fieldType,
		        	description: item.description,
		        	isRequired: item.isRequired,
		        },
		    });
		},
		onChange(value) {
			console.log(value);
		},
		onSearch(value) {
			dispatch({
		        type: 'data/onSearch',
		        payload: value,
		    });
		},
		onSearchTwo(value) {
			dispatch({
		        type: 'data/onSearchTwo',
		        payload: value,
		    });
		},
		onSelect(item) {
			dispatch({
				type: 'data/selectSuccess',
				payload: item,
			});
		},
		onSelectTwo(item) {
			dispatch({
				type: 'data/selectSuccessTwo',
				payload: item,
			});
		},
		selectForm(item) {
			dispatch({
				type: 'data/query',
				payload: {
					formId: item,
				},
			});
		}
    };

  return (
    <div>
    	<DataList {...dataListProps} />
    </div>

  );
}


Data.propTypes = {
  form: PropTypes.object,
};
// 指定订阅数据，这里关联了 data
function mapStateToProps({ data }) {
  return {data};
}

// 建立数据关联关系
export default connect(mapStateToProps)(Data);
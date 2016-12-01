import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';

// Users 的 Presentational Component
// 暂时都没实现
import FieldList from '../components/Field';
//import AddForm from '../components/AddForm';
import reqwest from 'reqwest';


// 引入对应的样式
// 可以暂时新建一个空的
import styles from './Field.less';

function Field({ location, dispatch, field }) {

  const {
    loading, list, total, current, entityId, name, fieldTypeOptions, 
    currentItem, modalVisible, modalVisibleOne, modalType,getFieldDecorator
    } = field;
  const fieldListProps={
  		modalVisible: modalVisible,
  		modalVisibleOne: modalVisibleOne,
  		fieldTypeOptions: fieldTypeOptions,
  		currentItem: currentItem,
        dataSource: list,
        entityId,
        total,
        loading,
        current,
        onDeleteItem(id) {
	        dispatch({
	        	type: 'field/delete',
	        	payload: id,
	        });
	    },
	    onEditItem(item) {
		    dispatch({
		        type: 'field/queryType',
		        payload: {
		            currentItem: item,
		        },
		    });
	    },
	    onCancel() {
	    	dispatch({
		        type: 'field/hideModal',
		    });
	    },
		onUpdate(item) {
		    dispatch({
		        type: 'field/update',
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
		onAdd(item) {
        	dispatch({
	        	type: 'field/create',
	        	payload: {
		            columnName: item.columnName,
	                name: item.name,
	                entityId:  entityId,
	                fieldType: item.fieldType,
	                description: item.description,
	                isRequired: item.isRequired,
		        },
	        });
        },
        onPageChange(item) {
        	dispatch({
        		type: query,
        		payload: {
        			entityId,
        			currentPage: item,
        		}
        	});
        }
    };

  return (
    <div>
    	<FieldList {...fieldListProps} />
    </div>

  );
}


Field.propTypes = {
  form: PropTypes.object,
};
// 指定订阅数据，这里关联了 form
function mapStateToProps({ field }) {
  return {field};
}

// 建立数据关联关系
export default connect(mapStateToProps)(Field);
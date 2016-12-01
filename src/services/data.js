import request from '../utils/request';
import qs from 'qs';
import reqwest from 'reqwest';


export function queryFormList(params) {
  return request({
    url:'queryFormList',
    method: 'get',
    data: params,
    type: 'jsonp',
  });
}

export function queryColumn(params) {
  return request({
    url:'queryColumn',
    method: 'get',
    data: params,
    type: 'jsonp',
  });
}

export function queryOther(params) {
  let url = '';
  let typeId = '';
  if(params == 'BU'){
    url = 'getBUUrl';
  }
  if(params == 'separated_and_regular_employee'){
    url = 'getseparated_and_regular_employeeUrl';
  }
  if(params == 'regular_employee'){
    url = 'getregular_employeeUrl';
  }
  if(params == 'OU'){
    url = 'getOUUrl';
  }
  if(params == 'currency'){
    url = 'getcurrencyUrl';
  }
  if(params.type == 'enum_type'){
    url = 'getenum_typeUrl';
    typeId = params.typeId
  }
  return request({
    url: url,
    method: 'get',
    data: typeId,
    type: 'jsonp',
  });
}

export function query(params) {
  return request({
    url:'query',
    method: 'get',
    data: params,
    type: 'jsonp',
  });
}

export async function create(params) {
  return request({
    url:'create', 
    method: 'post',
    data: params,
    type: 'jsonp',
  });
}

export async function remove(params) {
  return request({
    url:'remove', 
    method: 'get',
    data: params,
    type: 'jsonp',
  });
}

export async function update(params) {
  return request({
    url:'update', 
    method: 'post',
    data: params,
    type: 'jsonp',
  });
}

export async function search(params) {
  return request({//正式员工
    url:'search', 
    method: 'post',
    data: params,
    type: 'jsonp',
  });
}

export async function searchTwo(params) {
  return request({//正式和离职员工
    url:'searchTwo', 
    method: 'post',
    data: params,
    type: 'jsonp',
  });
}

import request from '../utils/request';
import qs from 'qs';
import reqwest from 'reqwest';

export function query(params) {
  return request({
    url:'http://localhost:8080/chenxi/entity/search.jsonp',
    method: 'get',
    data: params,
    type: 'jsonp',
  });
}

export async function create(params) {
  return request({
    url:'http://localhost:8080/chenxi/entity/new.jsonp', 
    method: 'post',
    data: params,
    type: 'jsonp',
  });
}

export async function remove(params) {
  return request({
    url:'http://localhost:8080/chenxi/entity/delete.jsonp', 
    method: 'get',
    data: params,
    type: 'jsonp',
  });
}

export async function update(params) {
  return request({
    url:'http://localhost:8080/chenxi/entity/update.jsonp', 
    method: 'post',
    data: params,
    type: 'jsonp',
  });
}

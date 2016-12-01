// import fetch from 'dva/fetch';
import reqwest from 'reqwest';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  console.log('checkStatus',response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
// export default function request(url, options) {
//   console.log(url);
//   return fetch(url, options)
//     .then(checkStatus)
//     .then(parseJSON)
//     .then((data) => ({ data }))
//     .catch((err) => ({ err }));
// }

export default function request(options) {
    console.log('request',options);
    return new Promise(resolve => {
      if(options.url == 'queryColumn'){
        var data =  [
          {
            "modifierName": "霍丁(霍丁)",
            "minValueStr": "0",
            "maxValueStr": "2000",
            "creatorName": "霍丁(霍丁)",
            "name": "字段一：long",
            "id": 11580,
            "type": "Long",
            "maxValue": 5,
            "minValue": 0,
            "isDeleted": "n",
            "gmtModified": 1451960801000,
            "formId": 11163,
            "dataKey": "key1",
            "gmtModifiedStr": "2016-01-05 10:26:41",
            "gmtCreateStr": "2016-01-05 10:26:41",
            "creator": "33933",
            "fieldKey": "abc",
            "isRequired": "y",
            "fieldOrder": 0,
            "gmtCreate": 1451960801000,
            "modifier": "33933"
          },
          {
            "modifierName": "霍丁(霍丁)",
            "creatorName": "霍丁(霍丁)",
            "name": "字段二：手机",
            "id": 11581,
            "type": "phone",
            "isDeleted": "n",
            "gmtModified": 1451960864000,
            "formId": 11163,
            "dataKey": "key2",
            "gmtModifiedStr": "2016-01-05 10:27:44",
            "gmtCreateStr": "2016-01-05 10:27:44",
            "creator": "33933",
            "fieldKey": "abc-a",
            "isRequired": "n",
            "fieldOrder": 1,
            "gmtCreate": 1451960864000,
            "modifier": "33933"
          },
          {
            "modifierName": "霍丁(霍丁)",
            "creatorName": "霍丁(霍丁)",
            "name": "字段三：bool",
            "id": 11582,
            "type": "Bool",
            "isDeleted": "n",
            "gmtModified": 1451960892000,
            "formId": 11163,
            "dataKey": "key3",
            "gmtModifiedStr": "2016-01-05 10:28:12",
            "gmtCreateStr": "2016-01-05 10:28:12",
            "creator": "33933",
            "fieldKey": "abc-b",
            "isRequired": "y",
            "fieldOrder": 2,
            "gmtCreate": 1451960892000,
            "modifier": "33933"
          },
          {
            "modifierName": "霍丁(霍丁)",
            "creatorName": "霍丁(霍丁)",
            "name": "字段四：BU",
            "id": 11583,
            "type": "BU",
            "isDeleted": "n",
            "gmtModified": 1451960919000,
            "formId": 11163,
            "dataKey": "key4",
            "gmtModifiedStr": "2016-01-05 10:28:39",
            "gmtCreateStr": "2016-01-05 10:28:39",
            "creator": "33933",
            "fieldKey": "abc-c",
            "isRequired": "n",
            "fieldOrder": 3,
            "gmtCreate": 1451960919000,
            "modifier": "33933"
          },
          {
            "modifierName": "霍丁(霍丁)",
            "creatorName": "霍丁(霍丁)",
            "name": "字段五：员工",
            "id": 11584,
            "type": "separated_and_regular_employee",
            "isDeleted": "n",
            "gmtModified": 1451960949000,
            "formId": 11163,
            "dataKey": "key5",
            "gmtModifiedStr": "2016-01-05 10:29:09",
            "gmtCreateStr": "2016-01-05 10:29:09",
            "creator": "33933",
            "fieldKey": "abc-d",
            "isRequired": "y",
            "fieldOrder": 4,
            "gmtCreate": 1451960949000,
            "modifier": "33933"
          },
          {
            "modifierName": "霍丁(霍丁)",
            "creatorName": "霍丁(霍丁)",
            "name": "字段六：员工二",
            "id": 11585,
            "type": "regular_employee",
            "isDeleted": "n",
            "gmtModified": 1451960977000,
            "formId": 11163,
            "dataKey": "key6",
            "gmtModifiedStr": "2016-01-05 10:29:37",
            "gmtCreateStr": "2016-01-05 10:29:37",
            "creator": "33933",
            "fieldKey": "abc-f",
            "isRequired": "n",
            "fieldOrder": 5,
            "gmtCreate": 1451960977000,
            "modifier": "33933"
          },
          {
            "modifierName": "霍丁(霍丁)",
            "creatorName": "霍丁(霍丁)",
            "name": "字段七：银行卡号",
            "id": 11586,
            "type": "card_no",
            "isDeleted": "n",
            "gmtModified": 1451961005000,
            "formId": 11163,
            "dataKey": "key7",
            "gmtModifiedStr": "2016-01-05 10:30:05",
            "gmtCreateStr": "2016-01-05 10:30:05",
            "creator": "33933",
            "fieldKey": "abc-g",
            "isRequired": "n",
            "fieldOrder": 6,
            "gmtCreate": 1451961005000,
            "modifier": "33933"
          },
          {
            "modifierName": "霍丁(霍丁)",
            "creatorName": "霍丁(霍丁)",
            "name": "字段八：OU",
            "id": 11587,
            "type": "OU",
            "isDeleted": "n",
            "gmtModified": 1451961038000,
            "formId": 11163,
            "dataKey": "key8",
            "gmtModifiedStr": "2016-01-05 10:30:38",
            "gmtCreateStr": "2016-01-05 10:30:38",
            "creator": "33933",
            "fieldKey": "abc-h",
            "isRequired": "y",
            "fieldOrder": 7,
            "gmtCreate": 1451961038000,
            "modifier": "33933"
          },
          {
            "modifierName": "霍丁(霍丁)",
            "creatorName": "霍丁(霍丁)",
            "name": "字段九：币种",
            "id": 11588,
            "type": "currency",
            "isDeleted": "n",
            "gmtModified": 1451961068000,
            "formId": 11163,
            "dataKey": "key9",
            "gmtModifiedStr": "2016-01-05 10:31:08",
            "gmtCreateStr": "2016-01-05 10:31:08",
            "creator": "33933",
            "fieldKey": "abc-j",
            "isRequired": "n",
            "fieldOrder": 8,
            "gmtCreate": 1451961068000,
            "modifier": "33933"
          },
          {
            "modifierName": "霍丁(霍丁)",
            "creatorName": "霍丁(霍丁)",
            "name": "字段十：邮箱",
            "id": 11589,
            "type": "email",
            "isDeleted": "n",
            "gmtModified": 1451961092000,
            "formId": 11163,
            "dataKey": "key10",
            "gmtModifiedStr": "2016-01-05 10:31:32",
            "gmtCreateStr": "2016-01-05 10:31:32",
            "creator": "33933",
            "fieldKey": "abc-k",
            "isRequired": "n",
            "fieldOrder": 9,
            "gmtCreate": 1451961092000,
            "modifier": "33933"
          },
          {
            "modifierName": "霍丁(霍丁)",
            "creatorName": "霍丁(霍丁)",
            "name": "字段十一：日期",
            "id": 11590,
            "type": "Date",
            "isDeleted": "n",
            "gmtModified": 1451961114000,
            "formId": 11163,
            "dataKey": "key11",
            "gmtModifiedStr": "2016-01-05 10:31:54",
            "gmtCreateStr": "2016-01-05 10:31:54",
            "creator": "33933",
            "fieldKey": "abc-l",
            "isRequired": "n",
            "fieldOrder": 10,
            "gmtCreate": 1451961114000,
            "modifier": "33933"
          },
          {
            "modifierName": "霍丁(霍丁)",
            "creatorName": "霍丁(霍丁)",
            "name": "字段十三：日期二",
            "id": 11592,
            "type": "date_picker",
            "isDeleted": "n",
            "gmtModified": 1451961202000,
            "formId": 11163,
            "dataKey": "key13",
            "gmtModifiedStr": "2016-01-05 10:33:22",
            "gmtCreateStr": "2016-01-05 10:33:22",
            "creator": "33933",
            "fieldKey": "abc-x",
            "isRequired": "n",
            "fieldOrder": 12,
            "gmtCreate": 1451961202000,
            "modifier": "33933"
          },
          {
            "modifierName": "霍丁(霍丁)",
            "minValueStr": "0",
            "maxValueStr": "5000",
            "creatorName": "霍丁(霍丁)",
            "name": "字段十四：Int",
            "id": 11593,
            "type": "Integer",
            "maxValue": 5000,
            "minValue": 0,
            "isDeleted": "n",
            "gmtModified": 1451961248000,
            "formId": 11163,
            "dataKey": "key14",
            "gmtModifiedStr": "2016-01-05 10:34:08",
            "gmtCreateStr": "2016-01-05 10:34:08",
            "creator": "33933",
            "fieldKey": "abc-v",
            "isRequired": "n",
            "fieldOrder": 13,
            "gmtCreate": 1451961248000,
            "modifier": "33933"
          },
          {
            "modifierName": "霍丁(霍丁)",
            "minValueStr": "0",
            "maxValueStr": "5000",
            "creatorName": "霍丁(霍丁)",
            "name": "字段十五：lon",
            "id": 11594,
            "type": "Long",
            "maxValue": 5,
            "minValue": 0,
            "isDeleted": "n",
            "gmtModified": 1451961352000,
            "formId": 11163,
            "dataKey": "key15",
            "gmtModifiedStr": "2016-01-05 10:35:52",
            "gmtCreateStr": "2016-01-05 10:34:55",
            "creator": "33933",
            "fieldKey": "abc-n",
            "isRequired": "n",
            "fieldOrder": 14,
            "gmtCreate": 1451961295000,
            "modifier": "33933"
          },
          {
            "modifierName": "霍丁(霍丁)",
            "minValueStr": "0",
            "maxValueStr": "2000",
            "creatorName": "霍丁(霍丁)",
            "name": "字段三十一：st",
            "id": 11610,
            "type": "String",
            "maxValue": 2000,
            "minValue": 0,
            "isDeleted": "n",
            "gmtModified": 1451961850000,
            "formId": 11163,
            "dataKey": "key31",
            "gmtModifiedStr": "2016-01-05 10:44:10",
            "gmtCreateStr": "2016-01-05 10:44:10",
            "creator": "33933",
            "fieldKey": "abcf",
            "isRequired": "n",
            "fieldOrder": 30,
            "gmtCreate": 1451961850000,
            "modifier": "33933"
          },
          {
            "typeVal": "选择题",
            "modifierName": "霍丁(霍丁)",
            "creatorName": "霍丁(霍丁)",
            "name": "字段四十：新增的",
            "id": 11626,
            "type": "enum_type",
            "isDeleted": "n",
            "gmtModified": 1451963739000,
            "formId": 11163,
            "dataKey": "key40",
            "gmtModifiedStr": "2016-01-05 11:15:39",
            "gmtCreateStr": "2016-01-05 11:12:31",
            "typeId": 63,
            "creator": "33933",
            "fieldKey": "qwe",
            "isRequired": "n",
            "fieldOrder": 39,
            "gmtCreate": 1451963551000,
            "modifier": "33933"
          }
        ];
        //摸拟服务请求
        resolve(data);
      }
      if(options.url == 'query'){
        var data = [
            {
                "formId": 11163,
                "key40": "99",
                "key4": "AD",
                "key5_Str": [
                  "马云",
                  "谢世煌"
                ],
                "key3": "y",
                "key6": [
                  "I0001"
                ],
                "key5": [
                  "I0001"
                ],
                "key5_emp": [
                    {   
                        'id': 'I0001',
                        'name': '马云'
                    }
                ],
                "key2": "13012345678",
                "key1": "123",
                "key11": "2016-01-05",
                "key8": [
                  "AD",
                  "A50"
                ],
                "key7": "000000000000000000",
                "key9": "HKD",
                "key9_Str": "人民币",
                "key6_Str": "马云",
                "enumStrkey40": "A",
                "id": 12005,
                "key13": [
                  "2016-01-01",
                  "2016-01-02"
                ],
                "key4_Str": "集团国内",
                "key8_Str": [
                  "集团海外",
                  "阿里巴巴中國控股有限公司"
                ],
                "enumkey40": {
                  "98": "A",
                  "99": "B",
                  "102": "sad",
                  "101": "D",
                  "100": "C"
                },
                "dataOrder": 0,
                "key6_emp": [
                    {   
                        'id': 'I0001',
                        'name': '马云'
                    }
                ],
            },
            {
                "formId": 11163,
                "key40": "99",
                "key4": "AD",
                "key5_Str": "马云",
                "key3": "y",
                "key6": [
                  "I0001"
                ],
                "key5": [
                  "I0001",
                  "I0002"
                ],
                "key5_emp": [
                    {   
                        'id': 'I0001',
                        'name': '谢世煌'
                    },
                    {   
                        'id': 'I0002',
                        'name': '刘影辉'
                    }
                ],
                "key2": "13012345678",
                "key1": "123",
                "key11": "2016-01-05",
                "key8": [
                  "AI",
                  "A02"
                ],
                "key7": "000000000000000000",
                "key9": "HKD",
                "key9_Str": "人民币",
                "key6_Str": "马云",
                "enumStrkey40": "A",
                "id": 12006,
                "key13": [
                  "2016-01-05",
                  "2016-01-06"
                ],
                "key4_Str": "集团国内",
                "key8_Str": [
                  "集团海外",
                  "阿里巴巴中國控股有限公司"
                ],
                "enumkey40": {
                  "98": "A",
                  "99": "B",
                  "102": "sad",
                  "101": "D",
                  "100": "C"
                },
                "dataOrder": 0,
                "key6_emp": {
                  "I0001": "马云"
                },
            },
            {
                "formId": 11163,
                "key40": "99",
                "key4": "AD",
                "key5_Str": "马云",
                "key3": "y",
                "key6": [
                  "I0001"
                ],
                "key5": [
                  "I0001",
                  "I0002"
                ],
                "key5_emp": [
                    {   
                        'id': 'I0001',
                        'name': '张三'
                    },
                    {   
                        'id': 'I0002',
                        'name': '李四'
                    }
                ],
                "key2": "13012345678",
                "key1": "123",
                "key11": "2016-01-05",
                "key8": [
                  "BD",
                  "B52"
                ],
                "key7": "000000000000000000",
                "key9": "HKD",
                "key9_Str": "人民币",
                "key6_Str": "马云",
                "enumStrkey40": "A",
                "id": 12007,
                "key13": [
                  "2016-01-05",
                  "2016-01-08"
                ],
                "key4_Str": "集团国内",
                "key8_Str": [
                  "集团海外",
                  "阿里巴巴中國控股有限公司"
                ],
                "enumkey40": {
                  "98": "A",
                  "99": "B",
                  "102": "sad",
                  "101": "D",
                  "100": "C"
                },
                "dataOrder": 0,
                "key6_emp": {
                  "I0001": "马云"
                },
            }
        ];
        resolve(data);
      }
      if(options.url == 'getBUUrl'){
        var data = [
            {
                "buCode": "AD",
                "buName": "集团国内"
            },
            {
                "buCode": "AI",
                "buName": "集团海外"
            },
            {
                "buCode": "BD",
                "buName": "B2B国内"
            }
        ];
        resolve(data);
      }
      if(options.url == 'getOUUrl'){
        var data = [
            {
              "text": "集团国内",
              "value": "AD",
              "contents": [
                {
                  "text": "阿里巴巴（中国）有限公司",
                  "value": "A50"
                },
                {
                  "text": "上海传富网络科技有限公司",
                  "value": "A51"
                },
                {
                  "text": "浙江淘宝科技有限公司",
                  "value": "A52"
                }
              ]
            },
            {
              "text": "集团海外",
              "value": "AI",
              "contents": [
                {
                  "text": "Alibaba Group Holding Limited",
                  "value": "A01"
                },
                {
                  "text": "Alibaba Group Holding Limited_Up to 2013 Mar",
                  "value": "A01_Up to 2013 Mar"
                },
                {
                  "text": "阿里巴巴中國控股有限公司",
                  "value": "A02"
                }
              ]
            },
            {
              "text": "B2B国内",
              "value": "BD",
              "contents": [
                {
                  "text": "阿里巴巴(中国)网络技术有限公司",
                  "value": "B50"
                },
                {
                  "text": "杭州阿里巴巴广告有限公司",
                  "value": "B51"
                },
                {
                  "text": "阿里巴巴网络科技(上海)有限公司",
                  "value": "B52"
                }
              ]
            }
        ];
        resolve(data);
      }
      if(options.url == 'getseparated_and_regular_employeeUrl'){
        var data = [
            {

            }
        ];
        resolve(data);
      }
      if(options.url == 'getregular_employeeUrl'){
        var data = [
            {

            }
        ];
        resolve(data);
      }
      if(options.url == 'queryFormList'){
        var data = {
            "11187": "测试字段删除",
            "11164": "验证bool必填hyh",
            "11163": "字段增加到40",
            "11186": "asdashhh"
        };
        resolve(data);
      }
      if(options.url == 'getcurrencyUrl'){
        var data = [
            {
                'currencyType': 'CNY',
                'currencyName': '人民币'
            },
            {
                'currencyType': 'USD',
                'currencyName': '美元'
            },{
                'currencyType': 'HKD',
                'currencyName': '港元'
            },{
                'currencyType': 'SGD',
                'currencyName': '新加坡元'
            },{
                'currencyType': 'EUR',
                'currencyName': '欧元'
            }
        ];
        resolve(data);
      }
      if(options.url == 'getenum_typeUrl'){
        var data = {
            "key40": [
                {
                    'enumType': '98',
                    'enumName': 'A'
                },{
                    'enumType': '99',
                    'enumName': 'B'
                },{
                    'enumType': '102',
                    'enumName': 'sad'
                },{
                    'enumType': '101',
                    'enumName': 'D'
                },{
                    'enumType': '100',
                    'enumName': 'C'
                }
            ],
            "key39": [
                {
                    'enumType': '98',
                    'enumName': 'A'
                },{
                    'enumType': '99',
                    'enumName': 'B'
                },{
                    'enumType': '102',
                    'enumName': 'sad'
                },{
                    'enumType': '101',
                    'enumName': 'D'
                },{
                    'enumType': '100',
                    'enumName': 'C'
                }
            ],
        };
        resolve(data);
      }
      if(options.url == 'search' || options.url == 'searchTwo'){
        if(options.data == 1){
            var data = [
                  {
                    "name": "姚冰科",
                    "deptDesc": "管理部",
                    "avatar": "\/\/work.alibaba-inc.com\/photo\/TH0036.24x24.jpg",
                    "emplId": "1",
                    "orderNum": "0"
                  },{
                    "name": "罗斌",
                    "deptDesc": "管理部",
                    "avatar": "\/\/work.alibaba-inc.com\/photo\/TH0036.24x24.jpg",
                    "emplId": "2",
                    "orderNum": "0"
                  },{
                    "name": "陈春霞",
                    "deptDesc": "管理部",
                    "avatar": "\/\/work.alibaba-inc.com\/photo\/TH0036.24x24.jpg",
                    "emplId": "3",
                    "orderNum": "0"
                  },{
                    "name": "刘影辉",
                    "deptDesc": "管理部",
                    "avatar": "\/\/work.alibaba-inc.com\/photo\/TH0036.24x24.jpg",
                    "emplId": "4",
                    "orderNum": "0"
                  }
            ];
        }else{
            var data = [
              {
                "name": "楼文胜",
                "deptDesc": "管理部",
                "avatar": "\/\/work.alibaba-inc.com\/photo\/TH0036.24x24.jpg",
                "emplId": "6",
                "orderNum": "0"
              },
              {
                "name": "程钦",
                "deptDesc": "国际事业部-海外供应商发展部",
                "avatar": "\/\/work.alibaba-inc.com\/photo\/TH0036.24x24.jpg",
                "emplId": "70",
                "orderNum": "0"
              },
              {
                "name": "王颖",
                "deptDesc": "人力资源部-业务HR-大电商",
                "avatar": "\/\/work.alibaba-inc.com\/photo\/TH0036.24x24.jpg",
                "emplId": "83",
                "nickNameCn": "纯臻",
                "orderNum": "0"
              },
              {
                "name": "倪亮",
                "deptDesc": "企业发展部",
                "avatar": "\/\/work.alibaba-inc.com\/photo\/TH0036.24x24.jpg",
                "emplId": "91",
                "orderNum": "0"
              },
              {
                "name": "黄樱WONG,YING",
                "deptDesc": "人力资源部-投资并购HR管理",
                "avatar": "\/\/work.alibaba-inc.com\/photo\/TH0036.24x24.jpg",
                "emplId": "99",
                "nickNameCn": "黄樱",
                "orderNum": "0"
              },
              {
                "name": "苗莉聪",
                "deptDesc": "人力资源部-业务HR-大电商",
                "avatar": "\/\/work.alibaba-inc.com\/photo\/TH0036.24x24.jpg",
                "emplId": "107",
                "nickNameCn": "非絮",
                "orderNum": "0"
              },
              {
                "name": "夏金波",
                "deptDesc": "蚂蚁金服-客户资金部-业务发展",
                "avatar": "\/\/work.alibaba-inc.com\/photo\/TH0036.24x24.jpg",
                "emplId": "147",
                "nickNameCn": "志伟",
                "orderNum": "0"
              },
              {
                "name": "蔡景现",
                "deptDesc": "阿里云事业群-飞天八部-专家组",
                "avatar": "\/\/work.alibaba-inc.com\/photo\/TH0036.24x24.jpg",
                "emplId": "165",
                "nickNameCn": "多隆",
                "orderNum": "0"
              }
            ];
        }
        
        resolve(data);
      }

      //请求服务器端数据
      reqwest(options)
      .then(data => {
        console.log("请求数据：",data);
        if(data.success){
          resolve(data);
        }else{
          resolve([])
        }
      }).catch(function(err){
        console.log("请求数据err：",err);
        resolve(err)
      });
    });
}

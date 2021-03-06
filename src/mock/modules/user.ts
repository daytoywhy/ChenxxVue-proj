import Mock from 'mockjs'
import { getUrlValue } from '@/utils/url'
import { template } from 'xe-utils'
const roleData = Mock.mock({
  data: [
    {
      id: 1,
      roleName: 'PM',
      type: 1,
      desc: '项目经理',
      status: 1,
      datetime: '@datetime'
    },
    {
      id: 2,
      roleName: 'PO',
      type: 1,
      desc:
        '产品经理（Product Owner）,负责某个产品/服务，明确其愿景，持续进行产品设计和版本规划，并提供原型',
      status: 1,
      datetime: '@datetime'
    },
    {
      id: 3,
      roleName: 'BA',
      type: 1,
      desc:
        '业务分析师（Business Analysis）,协助专题负责人、产品经理进行需求分析和管理工作，细化和拆分需求，完善验收标准，维护产品待办清单',
      status: 1,
      datetime: '@datetime'
    },
    {
      id: 4,
      roleName: 'UI',
      type: 1,
      desc: '美工',
      status: 1,
      datetime: '@datetime'
    },
    {
      id: 5,
      roleName: '自助查询人员',
      type: 0,
      desc: '非数据关联类角色，拥有自助查询页面的权限',
      status: 0,
      datetime: '@datetime'
    },
    {
      id: 6,
      roleName: 'tester',
      type: 1,
      desc: '测试人员',
      status: 1,
      datetime: '@datetime'
    },
    {
      id: 7,
      roleName: 'developer',
      type: 1,
      desc:
        '开发（Developer）,参与需求讨论、梳理、迭代评审回顾等关键活动，编码实现需求，进行完成后功能的showcase',
      status: 1,
      datetime: '@datetime'
    },
    {
      id: 8,
      roleName: 'IM',
      type: 1,
      desc:
        '迭代经理（Iteration Manager）组织和领导某个小团队以精益敏捷方式高效运作，建立业务和IT之间的沟通渠道，安排迭代计划，管控交付进度、风险，协商解决交付过程中的各种阻碍',
      status: 1,
      datetime: '@datetime'
    },
    {
      id: 9,
      roleName: 'TL',
      type: 1,
      desc:
        '技术经理（Technical Lead）引导和决策产品/服务乃至更大系统的技术架构、信息架构及部署架构，推动架构的持续演进，选型和引入新技术、新工具',
      status: 1,
      datetime: '@datetime'
    }
  ]
})
const userData = Mock.mock({
  'data|1000': [
    {
      'id|+1': 1,
      username: '@cname',
      'account|100000-999999': 100000,
      info: '@county(true)',
      datetime: '@datetime',
      'roleIds|2': [() => Mock.Random.integer(1, 6)]
    }
  ]
})

const mockList = userData.data
const roleList = roleData.data
const getUserList = {
  url: '/user/getUserList',
  type: 'get',
  template: (config: any) => {
    const username = getUrlValue(config.url, 'username')
    const pageNum = parseInt(getUrlValue(config.url, 'pageNum'))
    const pageSize = parseInt(getUrlValue(config.url, 'pageSize'))

    let totalList = []
    let userList = []
    totalList = mockList.filter(
      (item: any) => item.username.toUpperCase().includes(username.toUpperCase())
    )
    if (pageNum && pageSize) {
      userList = totalList.filter(
        (item: object, index: number) =>
          index < pageSize * pageNum && index >= pageSize * (pageNum - 1)
      )

    } else {
      userList = totalList
    }
    return {
      code: 200,
      msg: 'success',
      data: { list: userList, ...{ total: totalList.length } }
    }
  }
}

const getRoleList = {
  url: '/role/getRoleList',
  method: 'get',
  template: (config: any) => {
    const roleName = getUrlValue(config.url, 'roleName')
    const pageNum = parseInt(getUrlValue(config.url, 'pageNum'))
    const pageSize = parseInt(getUrlValue(config.url, 'pageSize'))
    let totalList = []
    let rolesList = []
    totalList = roleList.filter(
      (item: any) => item.roleName.toUpperCase().includes(roleName.toUpperCase())
    )
    if (pageNum && pageSize) {
      rolesList = totalList.filter(
        (item: any, index: number) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1)
      )
    } else {
      rolesList = totalList
    }
    return {
      code: 200,
      msg: 'success',
      data: {
        list: rolesList,
        ...{ total: totalList.length }
      }
    }
  }
}

export default [getUserList, getRoleList]
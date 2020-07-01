// 权限目录
export function getMenuData() {
  return [
    {
      id: 'jm',
      // icon: 'business',
      label: '界面编辑',
      permissions: ['界面编辑'],
      // prettier-ignore
      children: [
        { id: 'jm-jm1', label: '界面1', route: '/todo?id=1', permissions: ['界面编辑-界面编辑1'] },
        { id: 'jmj2', label: '界面2', route: '/todo?id=2' },
        { id: 'jmj3', label: '界面3', route: '/todo?id=3' }
      ]
    },
    {
      id: 'qx',
      // icon: 'business',
      label: '权限管理',
      permissions: ['权限管理', '界面编辑'],
      // prettier-ignore
      children: [
        { id: 'qx-yh', label: '界面1', route: '/todo?id=1', permissions: ['权限管理-用户管理'] },
        { id: 'qx-cd', label: '界面2', route: '/todo?id=2', permissions: ['权限管理-菜单管理'] },
        { id: 'qx-qt', label: '界面3', route: '/todo?id=3', permissions: ['权限管理-其他'] }
      ]
    },
    {
      id: 'qx',
      // icon: 'business',
      label: '测试权限',
      permissions: ['权限管理']
    },
    {
      id: 'qx',
      // icon: 'business',
      label: '返回首页',
      permissions: ['权限管理', '界面编辑'],
      // prettier-ignore
      children: [
        { id: 'index', label: '返回首页', route: 'home' }
      ]
    }
  ]
}

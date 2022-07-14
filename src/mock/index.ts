import Mock from 'mockjs'

Mock.setup({
  timeout: 300
})

const requireComponent = import.meta.globEager('./modules/*.ts');
const keys = Object.keys(requireComponent)
for (let path of keys) {
  // 裁剪字符串方式得到路径中的文件名（无扩展名）
  let name = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.ts'));
  // 对原对象执行添加新的属性并删除旧属性达到处理效果
  requireComponent[name] = requireComponent[path].default;
  delete requireComponent[path];
  for (const [index] of requireComponent[name].entries()) {
    const el = requireComponent[name][index]
    Mock.mock(
      RegExp(`${import.meta.env.VITE_APP_BASIC_API}${el.url}.*`),
      el.method,
      el.template
    )
  }
}
export default Mock


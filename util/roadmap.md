# 如何一步一步实现

* [md] 解决样式问题: 既然扩展了.tc-line的类名, 就应该对它进行样式扩充, 完成`half-WYSIWYG`中"回车后内容渲染出来样式"的部分
* [core] 点击进入编辑状态
* [core] 鼠标划选和之后的操作: backspace, enter等...
* [md] 辅助开发工具: click-paste
* [md] 辅助开发工具: 同步的markdown预览

* [detail] 输入框内容随内容的增加而增高 不出现滚动条
* [detail] editLine时拷贝class, 填充内容

选择编辑框, textarea 和 contentEditable 各有优劣

* textarea 内容比较好控制, selection range的诸多操作都很简单  但是需要实时计算高度. 
* contentEditable 内容无法用react来控制, 高度是自动的

## 高度计算
css准备: 让两者个样式完全一致, 同时注意`word-break: break-all;`来断开超长的字符串(胡乱输入的内容, 或者url)

不能在`onChange`的处理函数中, 因为setState更新内容之后会有一定的时间间隔才能渲染到页面中, 在处理函数中取`.size-gen`元素的高度会有一个animationFrame的延迟. 应该在`componentDidUpdate`组件更新之后, 同时加一个content是否一致的判断优化.

## 粘贴内容

onPaste然后取出其中的内容, 需要做`\n`判断, 有换行就立刻生成多个line

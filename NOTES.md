# 记录

1、为什么要用 formId: 如果一个页面有两个表单, 如果不加以区分的话, 某些功能报错, 比如 validateAndScroll

2、errors、rules、validator 必须是 { [key: string]: string }, 不能用 D 做 key, 因为 D 是用户的数据结构, 但这里的 key 用的是 field 的路径

3、就算 useEffect 依赖项 (非状态变量) 改变并且组件更新也不会执行 useEffect, 而且非状态变量不能做到状态持久化第一个方案之所以非状态变量可以做到状态持久化是因为保存到了 context 中, 也是保存在状态里了。
例子如下
```tsx
  let value = 1
  useEffect(() => {
    console.log(value)
  }, [value])

  const [, set] = useState(1)
```

4、useCallback 的依赖项可以是 useRef, 因为只要组件发起更新并且 ref 发生改变, 这个函数还是会重新缓存

5、useCallback 的依赖项可以不用写 set, 但考虑到这里的 set 几乎都为二次封装, 所以还是把 set 加到依赖里, 防止未来出现变故

6、recoil atom 的 dangerouslyAllowMutability 属性设置为 true
1、直接修改对象属性, 不更新组件
2、return 出一个新对象（必须是新对象, 老对象绝对不行）, 更新组件

注: 只是组件是否会订阅更新的区别, 状态的值都会更新

7、BUG!!! 似乎发现一个 recoil 的 bug, 当 dangerouslyAllowMutability 为 true, set 时直接修改原对象属性值, 不同 RecoilRoot 的 state 会共享值


方案
1、在 Field 组件内部进行字段级别的更新, 只在 set 本字段的时候才会更新本 Field 组件, 用路径进行更新的阻断
2、value 时注册 useForceUpdate, 在 set 时执行 update 事件, 这样只有在订阅了 value 时才会更新组件
3、状态: values、errors
4、validateValues、rules、doms 都是在 onChange 时才获取的, 所以直接保存在对象里, 不存状态
5、React 组件如果只是修改一个普通的变量那么是可以修改的, 但是这个变量被渲染到页面上, 那么页面不会变化, 但值其实还是变了, 当组件更新时, 才会体现真正的值, 但如果那样的话, 这个变量也将变成初始值。
6、doms 可以直接获取第一个错误字段
7、用字段决定是否 set



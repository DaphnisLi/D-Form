---
group:
  path: /other
  title: 其他
  order: 4
title: antdForm
order: 1
---

### useWatch

主要作用
- 定义 useState, 保存字段值, 并提供组件更新能力
- 注册字段变化监听函数
- 当字段值发生变化时, 执行监听函数, 并更新组件

```tsx | pure
function useWatch(
  ...args: [NamePath | ((values: Store) => any), FormInstance | WatchOptions<FormInstance>]
) {
  const [dependencies, _form = {}] = args;
  const options = isFormInstance(_form) ? { form: _form } : _form;
  const form = options.form;

  // 当前字段的值
  const [value, setValue] = useState<any>();

  const valueStr = useMemo(() => stringify(value), [value]);
  const valueStrRef = useRef(valueStr);
  valueStrRef.current = valueStr;

  const fieldContext = useContext(FieldContext);
  const formInstance = (form as InternalFormInstance) || fieldContext;
  const isValidForm = formInstance && formInstance._init;

  if (process.env.NODE_ENV !== 'production') {
    warning(
      args.length === 2 ? (form ? isValidForm : true) : isValidForm,
      'useWatch requires a form instance since it can not auto detect from context.',
    );
  }

  const namePath = getNamePath(dependencies);
  const namePathRef = useRef(namePath);
  namePathRef.current = namePath;

  useWatchWarning(namePath);

  useEffect(
    () => {
      if (!isValidForm) {
        return;
      }

      const { getFieldsValue, getInternalHooks } = formInstance;
      const { registerWatch } = getInternalHooks(HOOK_MARK);

      // 通过 dependencies 获取字段值
      const getWatchValue = (values: any, allValues: any) => {
        const watchValue = options.preserve ? allValues : values;
        return typeof dependencies === 'function'
          ? dependencies(watchValue)
          : getValue(watchValue, namePathRef.current);
      };

      // 注册监听函数
      const cancelRegister = registerWatch((values, allValues) => {
        const newValue = getWatchValue(values, allValues);
        const nextValueStr = stringify(newValue);

        // 字段值发生变化时, 更新当前字段的值, 并触发 useWatch 所在组件的更新
        if (valueStrRef.current !== nextValueStr) {
          valueStrRef.current = nextValueStr;
          setValue(newValue);
        }
      });

      const initialValue = getWatchValue(getFieldsValue(), getFieldsValue(true));

      if (value !== initialValue) {
        setValue(initialValue);
      }

      return cancelRegister;
    },


    [isValidForm],
  );

  // 返回新的 value
  return value;
}

export default useWatch;
```

### FormStore

主要作用
- 保存表单值, 及一些操作函数
- 保存与各个字段相绑定的 useWatch 监听函数
- 当执行 setFieldsValue、setFieldValue、resetFields 等 API 时, 遍历执行已经保存的 useWatch 监听函数

```tsx | pure
export class FormStore {

  // 注册监听函数到 watchList
  private registerWatch: InternalHooks['registerWatch'] = callback => {
    this.watchList.push(callback);

    return () => {
      this.watchList = this.watchList.filter(fn => fn !== callback);
    };
  };

  // 执行监听函数
  // 执行时机: setFieldsValue、setFieldValue、resetFields 等修改表单值的 API
  private notifyWatch = (namePath: InternalNamePath[] = []) => {
    // No need to cost perf when nothing need to watch
    if (this.watchList.length) {
      const values = this.getFieldsValue();
      const allValues = this.getFieldsValue(true);

      this.watchList.forEach(callback => {
        callback(values, allValues, namePath);
      });
    }
  };

}
```

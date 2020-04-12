# react-antd

## 第 2 章

### typescript 究竟是什么

- JavaScript that scales
- 静态类型风格的类型系统
- 从 es6 到 es10 甚至是 esnext 的语法支持
- 兼容各种浏览器，各种系统，各种服务器，完全开源

### 为什么要用 typescript

- 程序更容易理解
  - 问题：函数或者方法输入输出的参数类型，外部条件等
  - 动态语言的约束：需要手动调试等过程
- 效率更高
  - 在不通的代码块和定义中进行跳转
  - 代码自动补全
  - 丰富的接口提示
- 更少的错误
  - 编译期间能够发现大部分错误
  - 杜绝一些比较常见错误
- 非常好的包容性
  - 完全兼容 JavaScript
  - 第三方库可以单独编写类型文件
  - 流行的项目都支持 typescript
- 一点小缺点
  - 增加了一些学习成本
  - 短期内增加了一些开发成本

### Interface 接口

- 对 对象的形状 (shape) 进行描述
- 对类 (class) 进行抽象
- Duck Typing (鸭子类型)
  - 如果它像鸭子那样的叫、走路，那就可以看作是鸭子
  - 接口更关注对象如何被使用，而不是对象的类型是什么

### class 类

- 类 (Class)：定义了一切事物的抽象特点
- 对象 (Object)：类的实例
- 面向对象 (OOP) 三大特性：封装、继承、多态

### Generics

```js
function echo<T>(arg: T): T {
  return arg;
}
const result = echo(true);
function swap<T, U>(tuple: [T: U]): [U: T] {
  return [tuple[1], tuple[0]];
}
const result2= swap(['str', 123])
```

- 泛型的约束
  - 有这么一个需求：
  - 传入的参数必须得有 length 这个属性

```js
interface IWithLength {
  length: number
}
function echowithLenght<T extends IWithLength>(arg: T): T {
  console.log(arg.length)
  return arg
}
```

- 泛型类和接口

```js
class Queue<T> {
  private data = [];

  push(item: T) {
    return this.data.push(item);
  }

  pop(): T {
    return this.data.shift();
  }
}

const queue = new Queue<number>();
queue.push(1);
// queue.push('str');
console.log(queue.pop().toFixed());
// --------
interface KeyPair<T, U> {
  key: T;
  value: U;
}
let key1: KeyPair<number, string> = {key: 1, value: "str"}
```

- _泛型修饰函数_

```js
interface IPlus<T> {
  (a: T, b: T): T;
}

function plus(a: number, b: number): number {
  return a + b;
}

function connect(a: string, b: string): string {
  return a + b;
}

const a: IPlus<number> = plus;
const b: IPlus<String> = connect;
```

## 第 4 章

### 创建自己组件库的色彩体系

- 系统色板- 基础色板 + 中性色板
- 产品色板 - 品牌色 + 功能色板

### 组件库样式变量分类

- 基础色彩系统
- 字体系统
- 表单
- 按钮
- 边框和阴影
- 可选配置开关

## Button 组件

```scss
.btn {
  position: relative;
  display: inline-block;
  font-weight: $btn-font-weight;
  line-height: $btn-line-height;
  color: $body-color;
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
  background-image: none;
  border: $btn-border-width solid transparent;
  @include button-size($btn-padding-y, $btn-padding-x, $btn-font-size, $border-radius);
  box-shadow: $btn-box-shadow;
  cursor: pointer;
  transition: $btn-transition;
  &.disabled,
  &[disabled] {
    cursor: not-allowed;
    opacity: $btn-disabled-opacity;
    box-shadow: none;
    > * {
      pointer-events: none;
    }
  }
}
```

- 支持原生 DOM 属性
  - 拿到所有原生 button 属性 `React.ButtonHTMLAttributes<HTMLElement>`
  - 如果合并两个类型的属性呢？ `Intersection Types` 交叉类型，用 `&` 表示
  - 联合类型 `|`，仅能返回 `a` 或 `b` 其中一个
- `Partial<T & U>` 所有属性都变为可选属性

```jsx
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
```

## 第 5 章

```jsx
// 最简单的测试
test('first react test case', () => {
  const wrapper = render(<Button>OK</Button>);
  const element = wrapper.queryByText('OK');
  expect(element).toBeTruthy();
});
```

## 第 6 章

- 如果多处都要用某个类型，那就来个类型别名吧.

```ts
type SelectCallback = (selectedIndex: number) => void;
```

- **解决 “爷父子孙” 嵌套组件状态、属性、回调传递和共享**

```jsx
interface IMenuContent {
  index: number;
  onSelect?: SelectCallback;
}

export const MenuContext = createContext < IMenuContent > { index: 0 };

const Menu: React.FC<MenuProps> = (props) => {
  const passedContext: IMenuContent = {
    index: currentIndex ? currentIndex : 0,
    onSelect: handleClick,
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>{children}</MenuContext.Provider>
    </ul>
  );
};

// ---- 曾孙组件 ----
import { MenuContext } from './menu';

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const context = useContext(MenuContext);
};
```

- `React.Children.map` 和 `React.cloneElement` 的应用
  - 可以解决必填子组件 `index` 的问题

```jsx
const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, { index });
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component');
      }
    });
  };
```

- CSS 选择器 `:scope` 匹配当前元素所在容器
- 精髓

```jsx
const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className }) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index): false;
  const [menuOpen, setOpen] = useState(isOpened);
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  }

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}

  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true)},
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false)}
  } : {}

  const renderChildren = () => {
    const subMenuClasses = classNames('menu-submenu', {
      'menu-opened': menuOpen
    })
    const childComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        });
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component');
      }
    });
    return <ul className={subMenuClasses}>{childComponent}</ul>;
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>{title}</div>
      {renderChildren()}
    </li>
  );
};
```

## 第 7 章

- SCSS精髓

```scss
// -------- _mixin.scss
$theme-colors:
(
  "primary":    $primary,
  "secondary":  $secondary,
  "success":    $success,
  "info":       $info,
  "warning":    $warning,
  "danger":     $danger,
  "light":      $light,
  "dark":       $dark
);

@each $key, $val in $theme-colors {
  .icon-#{$key} {
    color: $val;
  }
}
```

### 封装自己的动画组件

1. 使用mixin封装css

```scss
@mixin zoom-animation(
  $direction: 'top',
  $scaleStart: scaleY(0),
  $scaleEnd: scaleY(1),
  $origin: center top,
) {
  .zoom-in-#{$direction}-enter {
    opacity: 0;
    transform: $scaleStart;
  }
  .zoom-in-#{$direction}-enter-active {
    opacity: 1;
    transform: $scaleEnd;
    transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms, opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;
    transform-origin: $origin
  }
  .zoom-in-#{$direction}-exit {
    opacity: 1;
  }
  .zoom-in-#{$direction}-exit-active {
    opacity: 0;
    transform: $scaleStart;
    transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms, opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;
    transform-origin: $origin;
  }
}

@mixin border-right-radius($raduis) {
  border-top-right-radius: $raduis;
  border-bottom-right-radius: $raduis;
}

@mixin border-left-radius($raduis) {
  border-top-left-radius: $raduis;
  border-bottom-left-radius: $raduis;
}


// -------- _animation.scss
@include zoom-animation('top', scaleY(0), scaleY(1), center top);
@include zoom-animation('left', scale(0.45, 0.45), scale(1, 1), top left);
@include zoom-animation('right', scale(0.45, 0.45), scale(1, 1), top right);
@include zoom-animation('top', scaleY(0), scaleY(1), center bottom);

```

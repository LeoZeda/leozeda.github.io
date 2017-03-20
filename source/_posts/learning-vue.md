---
title: Vue学习笔记
date: 2017-01-03 23:53:19
categories: [Vue]
tags: [Vue, 教程]
---
## 介绍
　　Vue.js是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，并且非常容易学习，非常容易与其它库或已有项目整合。另一方面，Vue完全有能力驱动采用单文件组件和Vue生态系统支持的库开发的复杂单页应用。
　　Vue.js 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。
　　组件思想：将界面元素抽象为一个独立可复用的小组件，父组件包含若干个子组件，用这些组件构建大型的应用，因此任何一个应用界面都可以抽象为组件树。
![组件思想](/images/components.png)
　　每个Vue实例在被创建之前都要经过一系列的初始化过程，例如，实例需要配置数据观测、编译模版、挂载实例到DOM、数据变化时更新DOM等，在实例的生命周期的不同阶段会调用不同的回调函数，用户可以在这些回调函数中定义自己的程序处理逻辑。
　　生命周期图示：
![生命周期](/images/lifecycle.png)
## 安装
**直接下载**
直接下载并在html中用script应用，Vue会被注册为一个全局变量。
[开发版本](http://vuejs.org/js/vue.js) 包含了完整的警告和调试模式
[生成版本](http://vuejs.org/js/vue.min.js) 删除警告

**NPM**
通过npm安装最新稳定版本
`$ npm install vue `

**命令行工具**
vue.js提供官方的命令行工具，可以快速搭建大型单页应用。该工具提供开箱即用的构建工具配置，带来现代化的前端开发流程。只需几分钟即可创建并启动一个带热重载、保存时静态检查以及可用于生产环境的构建配置的项目。
```
# 全局安装 vue-cli
$ npm install -g vue-cli
# 创建一个基于 webpack 模板的新项目
$ vue init webpack my-project
# 安装依赖，走你
$ cd my-project
$ npm install
$ npm run dev

# 其他命令
# 可以查看官方提供的模版， 如webpack-simple、bowserify、week等
$ vue list
```
有前端基础的推荐使用命令行工具，它能够方便初学者快速构建各种框架工程，免去自己去查找资料的麻烦

## 简单使用
### 插值
数据绑定最常见的形式就是使用 “Mustache” 语法（双大括号）的文本插值：
`<span>Message: { {msg}}</span>`

### 计算属性
计算属性是基于它的依赖缓存。计算属性只有在它的相关依赖发生改变时才会重新取值。这就意味着只要 message 没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。
```
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
})
```

### 指令
#### 绑定属性
一些指令能接受一个“参数”，在指令后以冒号指明。例如， v-bind 指令被用来响应地更新 HTML 属性：
```
<!-- 完整语法 -->
<a v-bind:href="url"></a>
<!-- 缩写 -->
<a :href="url"></a>
```

**Class与Style绑定**
数据绑定一个常见需求是操作元素的 class 列表和它的内联样式。因为它们都是属性 ，我们可以用v-bind 处理它们：只需要计算出表达式最终的字符串。不过，字符串拼接麻烦又易错。因此，在 v-bind 用于 class 和 style 时， Vue.js 专门增强了它。表达式的结果类型除了字符串之外，还可以是对象或数组。
```
<div v-bind:class="{ active: isActive }"></div>

//直接绑定数据里的一个对象
<div v-bind:class="classObject"></div>
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}

//可以把一个数组传给 v-bind:class
<div v-bind:class="[activeClass, errorClass]">

//用在组件上
//当你在一个定制的组件上用到 class 属性的时候，这些类将被添加到根元素上面，这个元素上已经存在的类不会被覆盖
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
<my-component class="baz boo"></my-component>
//HTML 最终将被渲染成为:
<p class="foo bar baz boo">Hi</p>
```
v-bind:style 的对象语法十分直观——看着非常像 CSS ，其实它是一个 JavaScript 对象。
```
//CSS 属性名可以用驼峰式（camelCase）或短横分隔命名（kebab-case）：
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

//直接绑定到一个样式对象通常更好，让模板更清晰
<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}

//v-bind:style 的数组语法可以将多个样式对象应用到一个元素上
<div v-bind:style="[baseStyles, overridingStyles]">

//当 v-bind:style 使用需要特定前缀的 CSS 属性时，如 transform ，Vue.js 会自动侦测并添加相应的前缀
```

#### 条件渲染
单个语句
`<h1 v-if="ok">Yes</h1>`
多条语句时，我们可以把一个 `<template>` 元素当做包装元素，并在上面使用 v-if，最终的渲染结果不会包含它。

```
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```
if-else

```
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else>C</div>
```
另一个根据条件展示元素的选项是 v-show 指令。不同的是有 v-show 的元素会始终渲染并保持在 DOM 中。v-show 是简单的切换元素的 CSS 属性 display 。注意 v-show 不支持 `<template>` 语法。
`<h1 v-show="ok">Hello!</h1>`

> v-if 有更高的切换消耗而 v-show 有更高的初始渲染消耗。因此，如果需要频繁切换使用 v-show 较好，如果在运行时条件不大可能改变则使用 v-if 较好。

#### 列表渲染
v-for 指令根据一组数组的选项列表进行渲染。 v-for 指令需要以 item in items 形式的特殊语法， items 是源数据数组并且 item 是数组元素迭代的别名。
```
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider"></li>
  </template>
</ul>
```
可以用 v-for 通过一个对象的属性来迭代
```
<ul id="repeat-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
或
<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }} : {{ value }}
</div>
```
v-for 也可以取整数。在这种情况下，它将重复多次模板:
```
<div>
  <span v-for="n in 10">{{ n }}</span>
</div>
```
你也可以用 of 替代 in 作为分隔符，因为它是最接近 JavaScript 迭代器的语法：
`<div v-for="item of items"></div>`
组件中使用v-for：
```
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index">
</my-component>
```

#### 监听事件
v-on 指令，它用于监听 DOM 事件：
```
<!-- 完整语法 -->
<a v-on:click="doSomething"></a>
<!-- 缩写 -->
<a @click="doSomething"></a>
```
监听事件可以用修饰符指定应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：
`<form v-on:submit.prevent="onSubmit"></form>`
**其他修饰符：**
```
.stop
.prevent
.capture
.self
.once
<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
<!-- 修饰符可以串联  -->
<a v-on:click.stop.prevent="doThat"></a>
<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>
<!-- 添加事件侦听器时使用事件捕获模式 -->
<div v-on:click.capture="doThis">...</div>
<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
<div v-on:click.self="doThat">...</div>
```
**按键修饰符**
```
.enter
.tab
.delete (捕获 “删除” 和 “退格” 键)
.esc
.space
.up
.down
.left
.right
<!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
<input v-on:keyup.13="submit">
<!-- 同上 -->
<input v-on:keyup.enter="submit">
```
可以用如下修饰符开启鼠标或键盘事件监听，使在按键按下时发生响应:
```
.ctrl
.alt
.shift
.meta
<!-- Alt + C -->
<input @keyup.alt.67="clear">
<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

### 双向数据绑定
v-model 指令在表单控件元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。
**文本**
```
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```
**单选**
```
<input type="radio" id="one" value="One" v-model="picked">
<label for="one">One</label>
<br>
<input type="radio" id="two" value="Two" v-model="picked">
<label for="two">Two</label>
<br>
<span>Picked: {{ picked }}</span>
```
**选择列表**
```
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
```
**修饰符**
```
<!-- 在 "change" 而不是 "input" 事件中更新 -->
<input v-model.lazy="msg" >

//如果想自动将用户的输入值转为 Number 类型（如果原值的转换结果为 NaN 则返回原值）
<input v-model.number="age" type="number">

//自动过滤用户输入的首尾空格
<input v-model.trim="msg">
```

## 总结
　　官网基础教程讲解比较详细，从介绍->安装->实际例子都比较容易懂，不知道是否因为该库是华人开发的原因文档也由华人编写？
　　通过这次的学习可以发现Vue吸取了AngularJS(双向数据绑定、模版、指令)和React（组件、父子组件单向数据流、虚拟DOM）的思想，并融合成一种更适合开发者开发的框架。另外，该框架提供了大量方便开发的方法，如修饰符、过滤器等，免去了查找库或插件的麻烦(如React需要安装各种工具)，可以说Vue是从开发者角度去考虑的框架，开发者使用起来变得更加顺心。正因如此，我也开始对Vue产生兴趣了。

## 参考
[Vue官网教程](https://cn.vuejs.org/v2/guide/)


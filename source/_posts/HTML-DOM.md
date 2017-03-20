---
title: HTML DOM
date: 2016-12-28 22:15:45
categories: [API]
tags: [API, DOM]
---
## 简介
#### 什么是DOM？
DOM是W3C(万维网联盟)的标准，它定义了访问HTML和xml文档的标准：
> DOM(文档对象模型)是中立于平台和语言 接口，它允许程序和脚步动态访问和更新 文档的内容、结构和样式。

HTML DOM 提供了访问和操作HTML文档的接口和方法，或者说，HTML DOM 是关于如何获取、修改、添加或删除HTML元素的标准。

#### DOM节点
根据 W3C 的 HTML DOM 标准，HTML 文档中的所有内容都是节点：
+ 整个文档是一个文档节点
+ 每个 HTML 元素是元素节点
+ HTML 元素内的文本是文本节点
+ 每个 HTML 属性是属性节点
+ 注释是注释节点

HTML DOM 将 HTML 文档视作树结构。这种结构被称为节点树：

![image](/images/dom_tree.jpg)

## 常用方法
#### getElementById
getElementById() 方法返回带有指定 ID 的元素：
`document.getElementById("intro");`
#### getElementsByTagName
getElementsByTagName() 返回带有指定标签名的所有元素,下面的例子返回包含文档中所有 <p> 元素的列表：
`document.getElementsByTagName("p");`
#### getElementsByClassName
如果您希望查找带有相同类名的所有 HTML 元素，请使用这个方法：
`document.getElementsByClassName("intro");`
**注释**：getElementsByClassName() 在 Internet Explorer 5,6,7,8 中无效。如果要获取2个以上classname，可传入多个classname，每个用空格相隔。
#### querySelector
通过css选择器来查找元素，注意选择器要符合CSS选择器的规则。querySelector返回第一个匹配的元素，如果没有匹配的元素，则返回null。
`document.querySelector(".test")`
**兼容性问题**：querySelector在ie8以下的浏览器不支持
#### querySelectorAll
querySelectorAll的不同之处在于它返回的是所有匹配的元素，而且可以匹配多个选择符，返回的是一个非即时的NodeList。
`document.querySelectorAll("#test,.test")`
**兼容性问题**：querySelectorAll在ie8以下的浏览器不支持
#### createElement
createElement通过传入指定的一个标签名来创建一个元素，如果传入的标签名是一个未知的，则会创建一个自定义的标签，注意：IE8以下浏览器不支持自定义标签:
`var para=document.createElement("p");`
使用createElement要注意：通过createElement创建的元素并不属于html文档，它只是创建出来，并未添加到html文档中，要调用appendChild或insertBefore等方法将其添加到HTML文档树中。
#### createTextNode
创建文本节点:
`var node=document.createTextNode("This is new.");`
createTextNode接收一个参数，这个参数就是文本节点中的文本，和createElement一样，创建后的文本节点也只是独立的一个节点，同样需要appendChild将其添加到HTML文档树中。
#### cloneChild
cloneNode是用来返回调用方法的节点的一个副本，它接收一个bool参数，用来表示是否复制子元素，使用如下:
```
var parent = document.getElementById("parentElement");
var parent2 = parent.cloneNode(true);// 传入true
parent2.id = "parent2";
```
#### appendChild
追加到已有的元素上(末尾):
```
var para = document.createElement("p");
var element = document.getElementById("div1");
element.appendChild(para);
```
#### insertBefore
在某个元素前插入新元素
```
var para = document.createElement("p");
var element = document.getElementById("div1");
var child = document.getElementById("p1");
element.insertBefore(para,child);
```
parentNode.insertBefore(newNode,refNode)
parentNode表示新节点被添加后的父节点
newNode表示要添加的节点
refNode表示参照节点，新节点会添加到这个节点之前
#### removeChild
删除已有的 HTML 元素
```
var parent = document.getElementById("div1");
var child = document.getElementById("p1");
parent.removeChild(child);
```
找到您需要删除的子元素，然后使用 parentNode 属性来查找其父元素：
```
var child = document.getElementById("p1");
child.parentNode.removeChild(child);
```
#### replaceChild
替换 HTML 元素
```
var para = document.createElement("p");
var element = document.getElementById("div1");
var child = document.getElementById("p1");
parent.replaceChild(para,child);
```
parent.replaceNode(newChild,oldChild);
newChild是替换的节点，可以是新的节点，也可以是页面上的节点，如果是页面上的节点，则其将被转移到新的位置
oldChild是被替换的节点
#### setAttribute
setAttribute根据名称和值修改元素的特性:
`element.setAttribute(name, value);`
其中name是特性名，value是特性值。如果元素不包含该特性，则会创建该特性并赋值。
如果元素本身包含指定的特性名为属性，则可以直接访问属性进行赋值，比如下面两条代码是等价的：
```
element.setAttribute("id","test");
element.id = "test";
```
#### getAttribute
getAttribute返回指定的特性名相应的特性值，如果不存在，则返回null或空字符串:
`var value = element.getAttribute("id");`
#### getBoundingClientRect
getBoundingClientRect用来返回元素的大小以及相对于浏览器可视窗口的位置:
`var clientRect = element.getBoundingClientRect();`
clientRect是一个DOMRect对象，包含left，top，right，bottom，它是相对于可视窗口的距离，滚动位置发生改变时，它们的值是会发生变化的。具体参考[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

## 属性
#### innerHTML
innerHTML 属性可用于获取或改变任意 HTML 元素，包括 <html> 和 <body>：
```
var txt=document.getElementById("intro").innerHTML;
document.write(txt);
```
#### nodeName
nodeName 属性规定节点的名称:
+ nodeName 是只读的
+ 元素节点的 nodeName 与标签名相同
+ 属性节点的 nodeName 与属性名相同
+ 文本节点的 nodeName 始终是 #text
+ 文档节点的 nodeName 始终是 #document

**注释**：nodeName 始终包含 HTML 元素的大写字母标签名。

#### nodeValue
nodeValue 属性规定节点的值。
+ 元素节点的 nodeValue 是 undefined 或 null
+ 文本节点的 nodeValue 是文本本身
+ 属性节点的 nodeValue 是属性值

#### nodeType
nodeType 属性返回节点的类型。nodeType 是只读的, 比较重要的节点类型有：

| 元素类型 | nodeType |
|:---|:---:|
|元素|1|
|属性|2|
|文本|3|
|注释|8|
|文档|9|

#### style
通过 HTML DOM，您能够访问或修改 HTML 元素的样式对象:
`document.getElementById("p2").style.color="blue";`

## DOM 导航
**HTML DOM 节点列表**
getElementsByTagName() 方法返回节点列表。节点列表是一个节点数组，可以通过下标号访问这些节点。如需访问第二个 <p>，您可以这么写：
```
var x = document.getElementsByTagName("p");
y = x[1];
```

**HTML DOM 节点列表长度**
length 属性定义节点列表中节点的数量:
```
x = document.getElementsByTagName("p");
for (i=0;i<x.length;i++)
{
    document.write(x[i].innerHTML);
    document.write("<br />");
}
```

**导航节点关系**
您能够使用三个节点属性：parentNode、firstChild 以及 lastChild ，在文档结构中进行导航

**childNodes**
获取子节点：
```
var txt = document.getElementById("intro").childNodes[0].nodeValue;
document.write(txt);
```
## 节点关系型API
在html文档中的每个节点之间的关系都可以看成是家谱关系，包含父子关系，兄弟关系等等，下面我们依次来看看每一种关系。
#### 父关系型api
parentNode：每个节点都有一个parentNode属性，它表示元素的父节点。Element的父节点可能是Element，Document或DocumentFragment。
parentElement：返回元素的父元素节点，与parentNode的区别在于，其父节点必须是一个Element，如果不是，则返回null
#### 兄弟关系型api
previousSibling：节点的前一个节点，如果该节点是第一个节点，则为null。注意有可能拿到的节点是文本节点或注释节点，与预期的不符，要进行处理一下。
previousElementSibling：返回前一个元素节点，前一个节点必须是Element，注意IE9以下浏览器不支持。
nextSibling：节点的后一个节点，如果该节点是最后一个节点，则为null。注意有可能拿到的节点是文本节点，与预期的不符，要进行处理一下。
nextElementSibling：返回后一个元素节点，后一个节点必须是Element，注意IE9以下浏览器不支持。
#### 子关系型api
childNodes：返回一个即时的NodeList，表示元素的子节点列表，子节点可能会包含文本节点，注释节点等。
children：一个即时的HTMLCollection，子节点都是Element，IE9以下浏览器不支持。
firstNode：第一个子节点
lastNode：最后一个子节点
hasChildNodes方法：可以用来判断是否包含子节点。

## 参考
[Javascript操作DOM常用API总结](http://web.jobbole.com/84364/)  
[W3C HTML DOM](http://www.w3school.com.cn/htmldom/)  
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

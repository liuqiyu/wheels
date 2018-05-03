# lazygirl

曾看到一篇实现`lazyman`的文章，等等，what's `lazyman`。先看看要实现什么：

```js
// 实现一个lazyman

LazyMan('Iceman');  // 输出Iceman

LazyMan('Iceman').say('hello');  // 输出Iceman hello

LazyMan('Iceman').wait(10).say('hello');  
// 输出Iceman
// 等待10秒
// hello

LazyMan('Iceman').wait(10).say('hello').firstWait(5);
// 先等待5秒
// 输出Iceman
// 等待10秒
// hello

```

以上便是`lazyman`的核心需求。

所以我们看完这个需求来完成一个可爱的`lazygirl`吧！需求同上。

> lazygirl.js

```js
function LazyGirl(name) {
  return new _lazygirl(name);
}

class _lazygirl {
  constructor(name) {
    // 定义队列
    this.tasks = [];
    
    let task = (name => () => {
      console.log('我是' + name);
      
      this.next();
    })(name);
    
    this.tasks.push(task);
    
    setTimeout(() => {
      this.next();
    }, 0);
  }
  
  next() {
    let task = this.tasks.shift();
    
    task && task();
  }
  
  say(value) {
    let task = (value => () => {
      console.log('说' + value);
      this.next();
    })(value);
    this.tasks.push(task);
    return this;
  }
  
  wait(time) {
    let task = (time => () => {
      setTimeout(() => {
        console.log('等待了' + time + '秒！')
        this.next();
      }, time * 1000);
    })(time);
    
    this.tasks.push(task);
    
    return this;
  }
  
  firstWait(time) {
    let task = (time => () => {
      setTimeout(() => {
        console.log('首先等待了' + time + '秒！')
        this.next();
      }, time * 1000);
    })(time);
    
    this.tasks.unshift(task);
    
    return this;
  }
}
```


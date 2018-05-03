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
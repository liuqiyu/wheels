/**
 * index
 * create by lqy 2018/4/17
 */

(function(){
  var excelFile = document.querySelector('.excel-file');
  
  excelFile.onchange = function(e) {
    var files = e.target.files;
    var fileReader = new FileReader();
    fileReader.onload = function(ev) {
      try {
        var data = ev.target.result,
          workbook = XLSX.read(data, {
            type: 'binary'
          }), // 以二进制流方式读取得到整份excel表格对象
          persons = []; // 存储获取到的数据
      } catch (e) {
        console.log('文件类型不正确');
        return;
      }
      // 表格的表格范围，可用于判断表头是否数量是否正确
      var fromTo = '';
      // 遍历每张表读取
      for (var sheet in workbook.Sheets) {
        if (workbook.Sheets.hasOwnProperty(sheet)) {
          fromTo = workbook.Sheets[sheet]['!ref'];
          console.log(fromTo);
          persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
          // break; // 如果只取第一张表，就取消注释这行
        }
      }
      showList(persons);
      // console.log(persons);
    };
    
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
  };
})();

function showList(persons) {
  var htmlStr = '';
  for (var i = 0; i < persons.length; i ++) {
    htmlStr += '<li><span>' + persons[i]['姓名'] + '</span></li>';
  }
  
  var ul = document.getElementById('ul');
  ul.innerHTML = htmlStr;
  
  var li = document.querySelectorAll('li')
  // 所有的li去除active类
  var start = document.querySelector('.start');
  var end = document.querySelector('.end');
  
  start.classList.remove('hide');
 
  var interval;
  // 开始事件绑定
  start.onclick = function() {
    start.classList.add('hide');
    end.classList.remove('hide');
    interval = setInterval(function() {
      // 随机数
      var num = Math.floor(Math.random() * li.length);
      action(li, num);
    }, 50);
  };
  
  // 结束事件绑定
  end.onclick = function() {
    start.classList.remove('hide');
    end.classList.add('hide');
    setTimeout(function() {
      clearInterval(interval);
    }, 500);
  };
};

// 随机转动
function action(li, num) {
  for (var i = 0; i < li.length; i ++) {
    li[i].classList.remove('active');
  }
  li[num].classList.add('active')
}
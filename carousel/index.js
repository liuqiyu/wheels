/**
 * index
 * create by lqy 2018/4/18
 */

(function() {
  var carouselWrapper = document.querySelector('.carousel-wrapper');
  var carouselContainer = document.querySelector('.carousel-container');
  var carouselItem = document.querySelectorAll('.carousel-item');
  var length = carouselItem.length;
  
  var w = carouselWrapper.clientWidth;
  var h = carouselWrapper.clientHeight;
  
  carouselContainer.style.width = (length * w) + 'px';
  
  
  var i = 1;
  setInterval(function() {
    console.log(i);
   
    if (i < length) {
      carouselContainer.style.left = -(i*w) + 'px';
      console.log(-(i*w))
      i++;
    } else {
      carouselContainer.style.left = 0
      i = 1
    }
  }, 1000);
})();
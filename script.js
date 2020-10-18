let items = document.querySelectorAll('.item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function(){
    this.classList.remove('active', direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add('next', direction);
  items[currentItem].addEventListener('animationend', function(){
    this.classList.remove('next',direction);
    this.classList.add('active');
    isEnabled = true;
  });
}

function nextItem(n) {
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right')
}

function previousItem(n) {
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
}


document.querySelector('.control.right').addEventListener('click', function(){
  if (isEnabled) {
    nextItem(currentItem);
  }
});

document.querySelector('.control.left').addEventListener('click', function(){
  if (isEnabled) {
    previousItem(currentItem);
  }
});



const swipeDetect = (element) => {
  let surface = element;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 50; // минимальная длина свайпа
  let restraint = 200; // максимальный угол (высота) свайпа
  let allowedTime = 1000; // максимальное время свайпа

  /*
   Свайп мышкой
  */
  surface.addEventListener('mousedown', function(event) {
    startX = event.pageX;
    startY = event.pageY;
    startTime = new Date().getTime();
    event.preventDefault(); // отменить возможные последующие действия по умолчанию
    //console.log(`mousedown: startTime ${startTime}`);
  });

  surface.addEventListener('mouseup', function(event) {
    distX = event.pageX - startX;
    distY = event.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    //console.log(`mouseup: elapsedTime ${elapsedTime}`);

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        console.log(isEnabled);
        if (distX > 0) {
          if(isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if(isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }
    event.preventDefault(); // отменить возможные последующие действия по умолчанию
  });

  /*
    Свайп тачем
  */
  surface.addEventListener('touchstart', function(event) {
    // обработка нажатий на "стрелки"
    if (event.target.classList.contains('arrow') || event.target.classList.contains('control')) {
      if(event.target.classList.contains('left')) {
        if(isEnabled) {
          previousItem(currentItem);
        }
      } else if(event.target.classList.contains('right')) {
        if(isEnabled) {
          nextItem(currentItem);
        }
      }
    }

    // а это уже для свайпа
    let touchObj = event.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    event.preventDefault(); // отменить возможные последующие действия по умолчанию
    //console.log(`mousedown: startTime ${startTime}`);
  });

  surface.addEventListener('touchmove', function(event) {
    event.preventDefault(); // отменить возможные последующие действия по умолчанию
  });

  surface.addEventListener('touchend', function(event) {
    let touchObj = event.changedTouches[0] ;
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    //console.log(`mouseup: elapsedTime ${elapsedTime}`);

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          if(isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if(isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }
    event.preventDefault(); // отменить возможные последующие действия по умолчанию
  });
}

let el = document.querySelector('.carousel');
swipeDetect(el);
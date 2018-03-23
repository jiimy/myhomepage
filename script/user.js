$(document).ready(function() {
  //스크롤도 했을때 추가하기 + 부드럽게 사라지게 추가하기 + 몇초뒤 사라지게 하기
  //하루에 한번만 보게하기 - 추가할것
  $(document).on('click','.alert',function(){
    $('.alert').fadeOut(500);
  });
  $(document).on('click','.alert2',function(){
    $('.alert2').fadeOut(500);
  })
  $(window).scroll(function() {
    if ($(document).scrollTop() > 10) {
      $('.alert').fadeOut(500);
      $('.alert2').fadeOut(500);
    }
  });
  setTimeout(function(){
    $('.alert').fadeOut(500);
    $('.alert2').fadeOut(500);
  },4000);

  $(window).resize(function(){
    var $size = $('body').width();
    if($size <= 1380){
      console.log('1380이하'+$size);
      $('.alert2').stop().animate({
        opacity :'1'
      },200);
    }
    else{
      console.log('1380이상'+$size);
      $('.alert2').stop().animate({
        opacity :'0'
      },200);
    }
  });

  //맨아래에 있을땐 위로라기, 맨 위에 있을댄 아래로가기
  var scroll = $(window).scrollTop();
  var docuHeight = $(document).height() / 2;
  var height = $(document).height();
  var $a = $('gnb ul li a');

  //실시간으로 높이값 알아와서 바꾸기
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var docuHeight = $(document).height() / 2;
    var height = $(document).height();
    if (scroll > docuHeight) {
      $('.p').text('높이의 반절 이하');
      $('.top').addClass('downside');
      $(this).removeClass('rotate-off');
      $(this).addClass('rotate-on');
    }
    if (scroll < docuHeight) {
      $('.p').text('높이의 반절 이상');
      $('.top').removeClass('downside');
      $(this).removeClass('rotate-on');
      $(this).addClass('rotate-off');
    }
    //실시간으로 차트
    // var graph = $('.graph ul li').index
    if (scroll < 480) {
      $('.graph ul li').animate({
        width: '0px'
      }, 300).clearQueue();
    }
    if (scroll > 480 && scroll < 1000) {
			//max 200
      $('.graph ul li:first-child').animate({
        width: '160px'
      }, 300).clearQueue();
      $('.graph ul li:nth-child(2)').animate({
        width: '100px'
      }, 300).clearQueue();
      $('.graph ul li:nth-child(3)').animate({
        width: '140px'
      }, 300).clearQueue();
      $('.graph ul li:nth-child(4)').animate({
        width: '140px'
      }, 300).clearQueue();
      $('.graph ul li:nth-child(5)').animate({
        width: '120px'
      }, 300).clearQueue();
    }
    if (scroll > 1000) {
      $('.graph ul li').animate({
        width: '0px'
      }, 300).clearQueue();
    }
    // console.log(scroll);
  });


  // $('.top').on('click', function() {
  $(document).on('click','.top',function(){
    console.log('a');
    //아래에 있을때
    if ($(document).scrollTop() > docuHeight) {
      $('html, body').animate({
        scrollTop: 0
      }, 800);
      // $(this).addClass('rotate-on');
    }
    //위에있을때
    if ($(document).scrollTop() < docuHeight) {
      $('html, body').animate({
        scrollTop: height
      }, 800);
      // alert('위');
    }
  });

  //gnb클릭시 메뉴이동
  // $('.gnb ul li').click(function(e) {
  $(document).on('click','.gnb ul li',function(e){
    e.preventDefault();
    var idx = $(this).index();
    var check = $('body>section').eq(idx).index();
    var secidx = $('body>section').eq(idx).offset().top;
    // console.log('a의 인덱스값 : '+idx);
    $('body>section').removeClass('active').eq(idx).addClass('active');
    // console.log('body>section의 높이값 : '+secidx);
    $('html, body').animate({
      scrollTop: secidx
    }, 700);
    // console.log(check);
    if (check == '2') {
      console.log('2');
    }
  });
});

$(function() {
  //메인에서 마우스 클릭시 화면 이동
  // $('.mouse').on('click', function() {
  $(document).on('click','.mouse',function(){
    // $(document).scrollTop(980);
    // window.scrollTop(980,400);
    var offsetstr = $('#about').offset();
    $('html, body').animate({
      scrollTop: offsetstr.top
    }, 700);
  });


  //자세히 보기 팝업 부분
  $('.button').on('click', function(e) {
    e.preventDefault();
    $('.overlay').css({
      'visibility': 'visible',
      'opacity': '1'
    });
  });
  $('.close').on('click', function(e) {
    e.preventDefault();
    $('.overlay').css({
      'visibility': 'hidden',
      'opacity': '0'
    });
  });

  //자세히 보기 탭 이벤트
  $('.content>ul>li').click(function(e) {
    e.preventDefault();
    var idx = $(this).index();
    $('.content>ul>li').removeClass('active').eq(idx).addClass('active');
    $('.tab').removeClass('active').eq(idx).addClass('active');
  });

  //sub에서 lnb버튼 이벤트

  //sub에서 lnb 이벤트


  //intro의 텍스트 이펜트
  var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap"><br>' + this.txt + '<br></span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function() {
      that.tick();
    }, delta);
  };

  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };
});

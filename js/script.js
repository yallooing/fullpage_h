$(document).ready(function(){
    //full page slider
    //mousewheel : 크롬, 익스플로러, 사파리, 오페라
    //DOMMouseScroll : 파이어폭스

    var elm = ".box";  //클래스명을 지목할 문자형 데이터
    $(elm).each(function(index){  //index = 0,1,2,3,4,5,6
        //개별적으로 각 섹션마다 마우스 휠 이벤트를 적용시키기 위함
        $(this).on("mousewheel DOMMouseScroll", function(e){
            e.preventDefault();  //휠 이벤트에 의해서 초기화되는 것을 막는다.
            console.log(e);  //이벤트 발생에 의한 모든 것을 가져옴

            var delta = 0;  //마우스 휠을 돌리지 않은 상태를 초기값으로 설정
            console.log(event.wheelDelta);
            //크롬 브라우저 기준으로 마우스 휠을 내렸을 때 -120 <-> 휠을 올렸을 때 120
            //오페라 브라우저에서는 마우스 휠을 내렸을 때 120 <-> 휠을 올렸을 때 -120
            console.log(e.detail);
            //파이어 폭스 기준으로 휠의 움직임을 받게 되는 값 / 휠을 내렸을 때 3 <-> 휠을 올렸을 때 -3


            if(event.wheelDelta){
                //크롬, 익스플로러, 사파리, 오페라 값을 받아왔다면
                delta = event.wheelDelta / 120;
                //(크롬 기준)휠을 내렸을 때 -120 / 120 = -1  // 휠을 올렸을 때 120 / 120 = 1
                //(오페라 기준)휠을 내렸을 때 120 / 120 = 1  // 휠을 올렸을 때 -120 / 120 = -1
                if(window.opera){  //오페라 브라우저의 경우는 크롬에서 나온 결과 delta 값을 일치시키기 위함
                    delta = -delta;
                }

            }else if(e.detail){
                //파이어 폭스에서 값을 받아왔다면
                delta = -e.detail / 3;  //(파이어폭스 기준) 휠을 내렸을 때 -(3/3) = -1  // 휠을 올렸을 때 -(-3/3) = 1
            }

            var moveTo = $(window).scrollLeft();  //각 섹션별 브라우저로부터 이격된 좌측 X 축의 값을 파악하여 저장
            var elmIndex = $(elm).eq(index);  //각 섹션별로 순차적으로 접근
            console.log(elmIndex);  //이벤트가 발생한 곳을 지칭
            if(delta < 0){
                //휠을 내린상태
                try{  //시도해라
                    //마우스 휠을 내리는 시점에서 다음 섹션이 존재한다면
                    if($(elmIndex).next() != undefined){
                        moveTo = $(elmIndex).next().offset().left;
                        console.log(moveTo);

                        $(".box").removeClass("active");
                        $(elmIndex).next().addClass("active");
                        var $cur_index = $(".box.active").index();
                        console.log($cur_index);
                        $("header li").removeClass("active");
                        $("header li").eq($cur_index).addClass("active");


                        $("header").removeClass("show");
                    }
                    
                }catch(e){  //시도하는 과정에서 문제점(에러)이 발생한 곳은 이곳에서 잡는다.
                    console.log("예외처리");
                }
            }else{
                //휠을 올린상태
                try{  //시도해라
                    //마우스 휠을 올리는 시점에서 이전 섹션이 존재한다면
                    if($(elmIndex).prev() != undefined){
                        moveTo = $(elmIndex).prev().offset().left;
                        console.log(moveTo);

                        $(".box").removeClass("active");
                        $(elmIndex).prev().addClass("active");
                        var $cur_index = $(".box.active").index();
                        console.log($cur_index);
                        $("header li").removeClass("active");
                        $("header li").eq($cur_index).addClass("active");


                        $("header").addClass("show");
                    }
                }catch(e){  //시도하는 과정에서 문제점(에러)이 발생한 곳은 이곳에서 잡는다.
                    console.log("예외처리");
                }
            }
            $("html, body").stop().animate({scrollLeft : moveTo + "px"}, 800);
        });
    });

    /*
    [예외처리]
    try{
        시도하는 실행문
    }catch(e)){

    }
    : 먼저 시도를 하게하고 처리가 더 이상 안되는 예외파트를 catch라는 스코프 내부에서 잡아서 종료
    */

    //상단 메뉴 클릭시 해당하는 페이지로 찾아간다.
    $("header li").click(function(){
        var $index = $(this).index();
        $("header li").removeClass("active");
        $(this).addClass("active");
        $("main .box").removeClass("active");
        $("main .box").eq($index).addClass("active");
        $("html, body").stop().animate({scrollLeft : $("main section").eq($index).offset().left}, 1000);
        return false;
    });

    //키보드 이벤트를 통해서 제어
    var key_num = 0;
    $(document).on("keydown", function(event){
        //console.log(event);
        console.log(event.keyCode);
        console.log(typeof event.keyCode);
        key_num = event.keyCode;

        var $target = $(".box.active").index();
        if(key_num == 39 || key_num == 34){  //"우측 방향키(39)" 또는 "Page Down(34)" 키보드를 눌렀을 때
            try{
                $("html, body").stop().animate({scrollLeft : $(".box").eq($target + 1).offset().left}, 800, function(){
                    $(".box").removeClass("active");
                    $(".box").eq($target + 1).addClass("active"); 
                    $("header li").removeClass("active");
                    $("header li").eq($target + 1).addClass("active");
                });
            }catch(event){

            }
        }else if(key_num == 37 || key_num == 33){  //"좌측 방향키(37)" 또는 "Page Up(33)" 키보드를 눌렀을 때
            try{
                $("html, body").stop().animate({scrollLeft : $(".box").eq($target - 1).offset().left}, 800, function(){
                    $(".box").removeClass("active");
                    $(".box").eq($target - 1).addClass("active"); 
                    $("header li").removeClass("active");
                    $("header li").eq($target - 1).addClass("active");
                });
            }catch(event){

            }
        }else if(key_num == 36){  //"Home(36)" 키보드를 눌렀을 때, 맨 처음으로 이동
            try{
                $("html, body").stop().animate({scrollLeft : $(".box").first().offset().left}, 800, function(){
                    $(".box").removeClass("active");
                    $(".box").first().addClass("active");
                    $("header li").removeClass("active");
                    $("header li").first().addClass("active");
                });
            }catch(event){

            }
        }else if(key_num == 35){  //"End(35)" 키보드를 눌렀을 때, 맨 마지막으로 이동
            try{
                $("html, body").stop().animate({scrollLeft : $(".box").last().offset().left}, 800, function(){
                    $(".box").removeClass("active");
                    $(".box").last().addClass("active");
                    $("header li").removeClass("active");
                    $("header li").last().addClass("active");
                });
            }catch(event){

            }
        }
    });

    //모바일 환경에서는 터치 기반 - touchstart(최초로 화면을 누른 시점에서 발생하는 이벤트), touchend(드래그 이후의 손가락을 화면에서 떼는 시점에서 발생하는 이벤트)

    var $t_start; //최초로 터치한 Y 축의 위치값
    var $t_end; 
    var $t_move;


    function prev(evt){
        console.log(evt);
        try{
            var $target = $(".box.active").index();  //터치가 종료된 시점에서 현재 보여지는 화면의 인덱스번호를 추출
            if($target != 0){  //현재 위치가 마지막 인덱스번호를 가져오지 않았다면
                $("html, body").stop().animate({scrollLeft : $(".box").eq($target - 1).offset().left}, 500, function(){
                    $(".box").removeClass("active");
                    $(".box").eq($target - 1).addClass("active");
                    $("header li").removeClass("active");
                    $("header li").eq($target - 1).addClass("active");
                });
            }
        }catch(evt){

        }
    }

    var $sec_02 = $(".box").eq(1).offset().left;
    console.log($sec_02);

    function next(evt){
        console.log(evt);
        try{
            var $target = $(".box.active").index();  //터치가 종료된 시점에서 현재 보여지는 화면의 인덱스번호를 추출
            if($target != $(".box").length - 1){  //현재 위치가 마지막 인덱스번호를 가져오지 않았다면
                $("html, body").stop().animate({scrollLeft : $(".box").eq($target + 1).offset().left}, 500, function(){
                    $(".box").removeClass("active");
                    $(".box").eq($target + 1).addClass("active");
                    $("header li").removeClass("active");
                    $("header li").eq($target + 1).addClass("active");
                });
            }
        }catch(evt){

        }
    }

    function touchmove(e){
        console.log(e);
        $t_move = $t_start - $t_end;
        if($t_move > 0){   //터치의 이동방향이 왼쪽 방향
            //우측 내용이 화면으로 들어와야함
            next(e);
        }else if($t_move < 0){  //터치의 이동방향이 오른쪽 방향
            //좌측 내용이 화면으로 들어와야함
            prev(e);
        }
    }

    $(".box").on("touchstart", function(event){
        console.log("터치 시작", event);
        console.log(event.changedTouches[0].pageX);
        $t_start = event.changedTouches[0].pageX;
    });

    $(".box").on("touchend", function(event){
        console.log("터치 종료", event);
        console.log(event.changedTouches[0].pageX);
        $t_end = event.changedTouches[0].pageX;

        touchmove(event);
    });




});
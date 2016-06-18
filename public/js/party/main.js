/**
 * Created by truemenhale on 16/6/13.
 */
var _data = {};
var h = $(window).height();
var selectorsObj = [];
var answers = [];
var order = 0;
var score = 0;
var MaxTimer;
var MidTimer;
var MinTimer;
var timers = [];
var Max = 0;
var Mid = 0;
var Min = 0;
var time = "";
var disable = 0;
function draw(arr,m){
    for(var i=0,len = arr.length; i<len; i++){
        arr[i].y += 1;
        if(arr[i].y > (h+30)){
                arr[i].y = arr[i+arr.length-1].y - 100;
                if(arr[i].obj.css('display') == 'none'){
                    arr[i].obj.css('display','block');
                }
                arr.push(arr[i]);
                arr.splice(i,1);
                i--;
        }else {
            arr[i].obj.css('top',arr[i].y);
        }
    }
    if(order != m){
        setTimeout(function(){
            draw(arr);
        },1000/60);
    }else {
        return false;
    }
}
function answerObj(y,obj){
    this.y = y;
    this.obj = obj;
}

$(function(){
    var GamePage = $('#GamePage');
    $.mobile.loading('show');
    $.mobile.loading('hide');
    $.mobile.changePage('#LeadPage');
    $('.beginBtn').on('tap',function(){
        $.mobile.changePage('#SelectPage',{
            'transition':'flow'
        })
    });
    $('.selector').find('li').on('tap',function(){
        var level = parseInt($(this).attr('level'));
        $.mobile.loading('show');
        $.post("https://redrock.cqupt.edu.cn/game/getquestionforparty",{'level':level},function(data){

            if(data.status == 200) {
                _data = data.data;
                MaxTimer = setInterval(function () {
                    Max++;
                }, 1000);
                timers.push(MaxTimer);
                MidTimer = setInterval(function () {
                    Mid++;
                    if (Mid >= 10) {
                        Mid = 0;
                    }
                }, 100);
                timers.push(MidTimer);
                MinTimer = setInterval(function () {
                    Min++;
                    if (Min >= 10) {
                        Min = 0;
                    }
                }, 10);
                timers.push(MinTimer);
                if (level == 1) {
                    $('.le').addClass('level0Title');
                    $('.le').attr('src', 'images/party/level' + (level - 1) + ".png");
                    $('.questionHolder').html(_data.question);
                    var answerSpan = $('.answer');
                    var a = _data.answer.toString();
                    var b = _data.select.toString();
                    answers = a.split(",");
                    for (var i = 0, len = answers.length; i < len; i++) {
                        var temp = "<span>" + answers[i] + "</span>";
                        answerSpan.eq(i).html(temp);
                    }
                    var flow = b.split(",");
                    flow.sort(function () {
                        return 0.5 - Math.random()
                    });
                    flow.sort(function () {
                        return 0.5 - Math.random()
                    });
                    flow.sort(function () {
                        return 0.5 - Math.random()
                    });
                    flow.sort(function () {
                        return 0.5 - Math.random()
                    });
                    flow.sort(function () {
                        return 0.5 - Math.random()
                    });
                    var l = "5%";
                    for (var i = 0, len = flow.length; i < len; i++) {
                        var d = "<div class='sAnswer' id='" + "answer" + i + "'>" + flow[i] + "</div>";
                        GamePage.append(d);
                        var obj = $("#answer" + i);
                        if (flow[i].length < 7) {
                            if (l == "5%") {
                                l = "55%"
                            } else {
                                l = "5%"
                            }
                        } else {
                            l = "20%"
                        }
                        obj.css({"top": -100 * (i + 1), "left": l});
                        obj.on('tap', function () {
                            $(this).css('display', 'none');
                            var html_ = $(this).html();
                            answerSpan.eq(order).html(html_);
                            if (html_ == answers[order]) {
                                score += 100;
                                answerSpan.eq(order).addClass("right");
                                console.log(score);
                            }
                            order++;
                            if (order == 5) {
                                for (var i = 0, len = timers.length; i < len; i++) {
                                    clearInterval(timers[i]);
                                }
                                for (var i = 0, len = selectorsObj.length; i < len; i++) {
                                    selectorsObj[i].obj.remove();
                                }
                                $('.answer').css('color', '#fe200f');
                                $('.right').css('color', '#6ffe0f');
                                time = Max + "." + Mid + Min;
                            }
                        });
                        var x = new answerObj(-100 * (i + 1), obj);
                        selectorsObj.push(x);
                    }
                    setTimeout(function () {
                        draw(selectorsObj,answers.length);
                    }, 50);
                    $.mobile.loading('hide');
                    $.mobile.changePage('#GamePage', {
                        'transition': 'slide'
                    });
                } else {
                    $('.le').addClass('levelTitle');
                    $('.le').attr('src', 'images/party/level' + (level - 1) + ".png");
                    var question = "";
                    answers = _data.answer;
                    for (var i = 0; i < _data.question.length; i++) {
                        question += "<p class='qList'>" + (i + 1) + "." + _data.question[i] + "</p>";
                    }
                    $('.questionHolder').html(question);
                    var answerSpan = $('.answer');
                    var qList = $('.qList');
                    for (var i = 0; i < 2; i++) {
                        qList.eq(i).css('display', 'inline-block');
                    }
                    for (var i = 0; i < answers.length; i++) {
                        var temp = "<span>" + answers[i] + "</span>";
                        answerSpan.eq(i).html(temp);
                    }
                    var b = _data.select.toString();
                    var flow = b.split(",");
                    flow.sort(function () {
                        return 0.5 - Math.random()
                    });
                    flow.sort(function () {
                        return 0.5 - Math.random()
                    });
                    flow.sort(function () {
                        return 0.5 - Math.random()
                    });
                    flow.sort(function () {
                        return 0.5 - Math.random()
                    });
                    flow.sort(function () {
                        return 0.5 - Math.random()
                    });
                    var l = "5%";
                    for (var i = 0, len = flow.length; i < len; i++) {
                        var d = "<div class='sAnswer' id='" + "answer" + i + "'>" + flow[i] + "</div>";
                        GamePage.append(d);
                        var obj = $("#answer" + i);
                        if (flow[i].length < 7) {
                            if (l == "5%") {
                                l = "55%"
                            } else {
                                l = "5%"
                            }
                        } else {
                            l = "20%"
                        }
                        obj.css({"top": -100 * (i + 1), "left": l});
                        obj.on('tap', function () {
                            if(disable){
                                return false;
                            }
                            $(this).css('display', 'none');
                            var html_ = $(this).html();
                            answerSpan.eq(order).html(html_);
                            if (html_ == answers[order]) {
                                score += 100;
                                answerSpan.eq(order).addClass("right");
                                console.log(score);
                            }
                            order++;
                            if (order == answers.length) {
                                for (var i = 0, len = timers.length; i < len; i++) {
                                    clearInterval(timers[i]);
                                }
                                for (var i = 0, len = selectorsObj.length; i < len; i++) {
                                    selectorsObj[i].obj.remove();
                                }
                                $('.answer').css('color', '#fe200f');
                                $('.right').css('color', '#6ffe0f');
                                time = Max + "." + Mid + Min;
                                return false;
                            }
                            if(order%2 == 0){
                                disable = 1;
                                $('.answer').css('color', '#fe200f');
                                $('.right').css('color', '#6ffe0f');
                                setTimeout(function(){
                                    $('.answer').css('color', '#000');
                                    for(var i = order - 2; i< order ; i++){
                                        qList.eq(i).css('display','none');
                                        qList.eq(i+2).css('display','inline-block');
                                    }
                                    disable = 0;
                                },1000);
                            }
                        });
                        var x = new answerObj(-100 * (i + 1), obj);
                        selectorsObj.push(x);
                    }
                    setTimeout(function () {
                        draw(selectorsObj);
                    }, 50);
                    $.mobile.loading('hide');
                    $.mobile.changePage('#GamePage', {
                        'transition': 'slide'
                    });
                }
            }else {
                alert(data.info);
            }

        });
    });
});
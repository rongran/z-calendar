/**
 * Created by zjz on 2014/8/28.
 */

var ZCalendar = function (id) {
    this.id = id;
    var now = new Date();
    this.drawCalendar(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

ZCalendar.prototype = {
    fillArray: function(year, month) {
        var firstDay = new Date(year, month - 1, 1).getDay(),  //求出当月第一天星期几
            dates = new Date(year, month, 0).getDate(); //上个月第0天即当月最后一天，最后一天就是总天数
        arr = new Array(42); //用来装载日期的数组，日期以 xxxx-xx-xx的形式表示

        for(var i = 0, j = firstDay; i < dates; i++, j++) {
            arr[j] = year + '-' + month + '-' + (i + 1);
        }
        return arr;
    },

    drawCalendar: function(year, month, date) {
        //var _calendar = document.getElementById(this.id);
        //if(_calendar) _calendar.parentNode.removeChild(_calendar);

        var body = document.getElementsByTagName('body')[0],
            a = document.createElement('a'), //日历a元素 用于克隆
            //calendar = document.createElement('div'), //日历的容器元素
            calendar = document.getElementById(this.id);
            tt = document.createElement('tt'); //<tt> 标签呈现类似打字机或者等宽的文本效果。
        //calendar.setAttribute('id', 'z_calendar');
        calendar.innerHTML = '';

        var thead = document.createElement('span');    //日历的头部或者页眉
        //body.insertBefore(calendar, null); //日历插入DOM树

        var fragment = document.createDocumentFragment(); //减少DOM刷新页面的次数

        var arr = this.fillArray(year, month),
            tts = [], //用于保存tt元素的引用
            ths = this; //用于保存ZCalendar对象的实例的引用

        //循环生成4个时间按钮
        for(var i = 0; i < 4; i++) {
            var clone = tt.cloneNode(true); //比重新createElement快
            clone.onclick = (function(index) {
                return function() {
                    //在闭包里绑定事件
                    ths.redrawCalendar(year, month, date, index);
                }
            })(i);

            tts[i] = clone; //保存引用
            if(i == 2) {
                thead.appendChild(document.createTextNode(
                        year + ' - ' + month + ' - ' + date));
            }
            thead.appendChild(clone);
        }

        tts[0].innerHTML = '&lt;&lt;';
        tts[1].innerHTML = '&lt;';
        tts[2].innerHTML = '&gt;';
        tts[3].innerHTML = '&gt;&gt;'
        tts[0].className = tts[3].className = 'month-btn';
        tts[1].className = tts[2].className = 'year-btn';
        fragment.appendChild(thead);

        //日历第二行内容星期
        var weeks = '日一二三四五六'.split('');
        for(var i = 0; i < 7; i++) {
            var th = a.cloneNode();
            th.innerHTML = weeks[i];
            th.className = 'week';
            fragment.appendChild(th);
        }

        //输出日历每一天
        for(i = 0; i < 42; i++) {
            var td = a.cloneNode();
            if(arr[i] === undefined) {
                fragment.appendChild(td);
            } else {
                var html = arr[i].split('-')[2];
                var now = new Date();
                td.innerHTML = html;
                td.className = 'day';
                td.href = 'javascript:void(0)'; //为IE6准备
                if(date && html === date && (month === now.getMonth() + 1) && year === now.getFullYear()) {
                    td.className = td.className + ' current';
                }
                if(i % 7 === 0 || i % 7 === 6) {
                    td.className = td.className  + ' weekend';
                }
                /*
                td.onclick = (function(i) {
                    return function() {
                        alert(i);
                    }
                })(arr[i]);
                */
                fragment.appendChild(td);
            }
        }

        calendar.appendChild(fragment);
    },

    redrawCalendar: function(year, month, date, index) {
        switch(index) {
            case 0:
                year--;
                break;
            case 1:
                month--;
                (month < 1) && (year--, month = 12);
                break;
            case 2:
                month++;
                (month > 12) && (year++, month = 1);
                break;
            case 3:
                year++;
                break;
        }
        this.drawCalendar(year, month, date);
    }
}

/**
 * Created by Adrian on 2016/11/14.
 */

/*2016/11/16 编辑至line:171
*/
(function($){
    var calendar= {
    data:"",
    year:0,//当前的年份
    month:0,//当前的月份
    firstDay:0,//当月的1号;
    firstW:0,//这个月的第一天是星期几,星期日为0
    days:0,//当前月的天数
    start:"",//批量库存开始时间
    end:"",//批量库存结束时间
    volumeData:"{}",//批量库存数据
    init:function(ele,obj){
        const calendarContent = "<div class='calendarContent'></div>";
        $(ele).empty().append(calendarContent);
        const tableContent = `
            <div class="tableContent">
                <table cesspadding="0" cellspacing="0" border="0">
                    <thead>
                    <tr>
                        <th class="week">星期日</th>
                        <th>星期一</th>
                        <th>星期二</th>
                        <th>星期三</th>
                        <th>星期四</th>
                        <th>星期五</th>
                        <th class="week">星期六</th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>`;
        $(".calendarContent").append(tableContent);
        var day = new Date();
        this.calendarHTML(day.getFullYear(),day.getMonth()+1);
    },
    calendarHTML:function(y,m){
        this.firsrDay = new Date(y, m - 1); //当月的1号;
        this.year = y;//当前的年份
        this.month = m;//当前的月份
        this.firstW = this.firsrDay.getDay(); //这个月的第一天是星期几
        this.days = (new Date(Date.parse(new Date(y, m, 1)) - 86400000)).getDate();//当前月的天数
        var l = Math.ceil((this.days + this.firstW) / 7); //所需行数
        var selectYear = this.firsrDay.getFullYear();
        //创建日历头部;
        const calendarTitle = `<div class="calendarTitle">
            <span class="positionOne previous"><</span>
             <div class="selectContent"><!--日期选择开始-->
                    <select class="selectYear">
                        <option>${selectYear}</option>
                        <option>${selectYear+1}</option>
                        <option>${selectYear+2}</option>
                        <option>${selectYear+3}</option>
                        <option>${selectYear+4}</option>
                        <option>${selectYear+5}</option>
                        <option>${selectYear+6}</option>
                        <option>${selectYear+7}</option>
                        <option>${selectYear+8}</option>
                    </select>
                    <span>年</span>
                    <select class="selectMonth">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                    </select>
                    <span>月</span>
                </div><!--日期选择结束-->
                <span class="positionTwo next">></span>
            </div>`;
        if($(".calendarTitle") && $(".calendarTitle").length>0){
            $(".calendarTitle").remove();
        }
        $(calendarTitle).prependTo($(".calendarContent"));
        $(".selectMonth option").eq(m-1).attr("selected",true);
        //创建日历主体
        var tr,tbody;
        for(var i=1; i<=l; i++){
            var td = "";
            for(var j=1; j<=7; j++){
                td += "<td></td>"
            }
            tr += "<tr>"+td+"</tr>";
        }
        $(".tableContent tbody").empty().append(tr);
        //渲染日历
        for(var k=1; k<=this.days; k++){
            $(".tableContent table").find("td").eq(this.firstW+k-1).text(k);
        }
        //设置过期时间
        var today = new Date().getDate();//获取今天是几号?
        var currentYear = new Date().getFullYear();
        var currentMouth = new Date().getMonth()+1;//获取当前的月份,需要加1才是当前月;
        if(y<currentYear){
            $(".tableContent table td").addClass("past");
        }else if(y<=currentYear && m<currentMouth){
            $(".tableContent table td").addClass("past");
        }else if((y==currentYear) && (m==currentMouth)){
            index = parseInt(today)+parseInt(this.firstW);
            $(".tableContent table td:lt("+index+")").addClass("past");
        }
        //为日历头部按钮等绑定事件
        var _this = this;
        $(".previous").click(function(){
            _this.prev();
        });
        $(".next").click(function(){
            _this.next();
        });
        $(".selectMonth").change(function(){
            var year = $(".selectYear").val();
            var month = $(this).val();
            _this.calendarHTML(year,month);
        });
        $(".selectYear").change(function(){
            var year = $(this).val();
            var month = $(".selectMonth").val();
            _this.calendarHTML(year,month);
        })
    },
    //前一个月
    prev:function(){
        var year = $(".selectYear").val();
        var month = $(".selectMonth").val();
        if(month == 1){
            month = 12;
            year -= 1;
        }else{
            month -= 1;
        }
        this.calendarHTML(year,month);
    },
    //后一个月
    next:function(){
        var year = parseInt($(".selectYear").val());
        var month = parseInt($(".selectMonth").val());
        if(month == 12){
            month = 1;
            year += 1;
        }else{
            month += 1;
        }
        this.calendarHTML(year,month);
    }
    };

    //拓展事件到jq元素
    $.fn.extend({
        creatCalendar:function(obj){
            return calendar.init(this,obj);
        }
    });
})(jQuery);
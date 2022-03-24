function ShowTime() {
  var NowDate = new Date();

  var y = NowDate.getFullYear();
  var M = NowDate.getMonth() + 1;
  var d = NowDate.getDate();
  var w = NowDate.getDay();

  var h = NowDate.getHours();
  var m = NowDate.getMinutes();
  var s = NowDate.getSeconds();

  var weekday = new Array(7);
  weekday[0] = "星期日";
  weekday[1] = "星期一";
  weekday[2] = "星期二";
  weekday[3] = "星期三";
  weekday[4] = "星期四";
  weekday[5] = "星期五";
  weekday[6] = "星期六";

  document.getElementById("time").innerHTML = formatTime(h, m, s);
  document.getElementById("date").innerHTML =
    "西元" + y + "年" + M + "月" + d + "日 " + weekday[w];
  setTimeout("ShowTime()", 1000);
}

function formatTime(hours, minutes, seconds) {
  var ampm = hours >= 12 ? "下午" : "上午";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  var strTime = ampm + " " + hours + ":" + minutes + ":" + seconds;
  return strTime;
}

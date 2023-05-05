
/*****************************************************************************
日期资料
*****************************************************************************/

var lunarInfo = new Array(
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
    0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
    0x14b63);

var solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
var Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");

var Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
var Animals = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪");
var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
var nStr1 = new Array('一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
var nStr2 = new Array('初', '十', '廿', '卅', '□');
var monthName = new Array("正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月");

/*****************************************************************************
日期计算
*****************************************************************************/

//====================================== 返回农历 y年的总天数
function lYearDays(y) {
    var i, sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
    return (sum + leapDays(y));
}

//====================================== 返回农历 y年闰月的天数
function leapDays(y) {
    if (leapMonth(y)) return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
    else return (0);
}

//====================================== 返回农历 y年闰哪个月 1-12 , 没闰返回 0
function leapMonth(y) {

    ///<summary>
    ///返回农历 y年闰哪个月 1-12 , 没闰返回 0
    ///</summary>


    return (lunarInfo[y - 1900] & 0xf);
}

//====================================== 返回农历 y年m月的总天数
function monthDays(y, m) {
    return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
}


//====================================== 算出农历, 传入日期控件, 返回农历日期控件
//                                       该控件属性有 .year .month .day .isLeap
function Lunar(objDate) {

    var i, leap = 0, temp = 0;
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;

    for (i = 1900; i < 2050 && offset > 0; i++) { temp = lYearDays(i); offset -= temp; }

    if (offset < 0) { offset += temp; i--; }

    this.year = i;

    leap = leapMonth(i); //闰哪个月
    this.isLeap = false;

    for (i = 1; i < 13 && offset > 0; i++) {
        //闰月
        if (leap > 0 && i == (leap + 1) && this.isLeap == false)
        { --i; this.isLeap = true; temp = leapDays(this.year); }
        else
        { temp = monthDays(this.year, i); }

        //解除闰月
        if (this.isLeap == true && i == (leap + 1)) this.isLeap = false;

        offset -= temp;
    }

    if (offset == 0 && leap > 0 && i == leap + 1)
        if (this.isLeap)
        { this.isLeap = false; }
        else
        { this.isLeap = true; --i; }

    if (offset < 0) { offset += temp; --i; }

    this.month = i;
    this.day = offset + 1;
}

//==============================返回公历 y年某m+1月的天数
function solarDays(y, m) {
    if (m == 1)
        return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
    else
        return (solarMonth[m]);
}
//============================== 传入 offset 返回干支, 0=甲子
function cyclical(num) {
    return (Gan[num % 10] + Zhi[num % 12]);
}

//============================== 阴历属性
function calElement(sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap, cYear, cMonth, cDay, term) {

    this.isToday = false;
    //瓣句
    this.sYear = sYear;   //公元年4位数字
    this.sMonth = sMonth;  //公元月数字
    this.sDay = sDay;    //公元日数字
    this.week = week;    //星期, 1个中文
    //农历
    this.lYear = lYear;   //公元年4位数字
    this.lMonth = lMonth;  //农历月数字
    this.lDay = lDay;    //农历日数字
    this.isLeap = isLeap;  //是否为农历闰月?
    //八字
    this.cYear = cYear;   //年柱, 2个中文
    this.cMonth = cMonth;  //月柱, 2个中文
    this.cDay = cDay;    //日柱, 2个中文

    this.color = '';

    this.lunarFestival = ''; //农历节日
    this.solarFestival = ''; //公历节日
    this.solarTerms = term; //节气
}

//===== 某年的第n个节气为几日(从0小寒起算)
function sTerm(y, n) {
    var offDate = new Date((31556925974.7 * (y - 1900) + sTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
    return (offDate.getUTCDate());
}

//============================== 返回阴历控件 (y年,m+1月)
/*
功能说明: 返回整个月的日期资料控件

使用方式: OBJ = new calendar(年,零起算月);

OBJ.length      返回当月最大日
OBJ.firstWeek   返回当月一日星期

由 OBJ[日期].属性名称 即可取得各项值

OBJ[日期].isToday  返回是否为今日 true 或 false

其他 OBJ[日期] 属性参见 calElement() 中的注解
*/

function calendar(y, m) {
    var Today = new Date();
    var tY = Today.getFullYear();
    var tM = Today.getMonth();
    var tD = Today.getDate();
    var sDObj, lDObj, lY, lM, lD = 1, lL, lX = 0, tmp1, tmp2, tmp3, lM2, lY2, lD2, xs, fs, cs;
    var cY, cM, cD; //年柱,月柱,日柱
    var lDPOS = new Array(3);
    var n = 0;
    var firstLM = 0;
    sDObj = new Date(y, m, 1, 0, 0, 0, 0);    //当月一日日期
    this.length = solarDays(y, m);       //公历当月天数
    this.firstWeek = sDObj.getDay();    //公历当月1日星期几
    ////////年柱 1900年立春后为庚子年(60进制36)
    if (m < 2) cY = cyclical(y - 1900 + 36 - 1);
    else cY = cyclical(y - 1900 + 36);
    var term2 = sTerm(y, 2); //立春日期
    ////////月柱 1900年1月小寒以前为 丙子月(60进制12)
    var firstNode = sTerm(y, m * 2) //返回当月「节」为几日开始
    cM = cyclical((y - 1900) * 12 + m + 12);
    lM2 = (y - 1900) * 12 + m + 12;
    //当月一日与 1900/1/1 相差天数
    //1900/1/1与 1970/1/1 相差25567日, 1900/1/1 日柱为甲戌日(60进制10)
    var dayCyclical = Date.UTC(y, m, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    for (var i = 0; i < this.length; i++) {
        if (lD > lX) {
            sDObj = new Date(y, m, i + 1);    //当月一日日期
            lDObj = new Lunar(sDObj);     //农历
            lY = lDObj.year;              //农历年
            lM = lDObj.month;             //农历月
            lD = lDObj.day;               //农历日
            lL = lDObj.isLeap;            //农历是否闰月
            lX = lL ? leapDays(lY) : monthDays(lY, lM); //农历当月最后一天
            if (n == 0) firstLM = lM;
            lDPOS[n++] = i - lD + 1;
        }
        //依节气调整二月分的年柱, 以立春为界
        if (m == 1 && (i + 1) == term2) {
            cY = cyclical(y - 1900 + 36);
            lY2 = (y - 1900 + 36);
        }
        //依节气月柱, 以「节」为界
        if ((i + 1) == firstNode) {
            cM = cyclical((y - 1900) * 12 + m + 13);
            lM2 = (y - 1900) * 12 + m + 13;
        }
        //日柱
        cD = cyclical(dayCyclical + i);
        lD2 = (dayCyclical + i);
        //月柱 1900年1月小寒以前为 丙子月(60进制12)
        var firstNode = getTerm(y, ((m + 1) * 2 - 1));//返回当月「节」为几日开始
        var secondNode = getTerm(y, ((m + 1) * 2));//返回当月「节」为几日开始
        //传入的日期的节气与否
        var term = '';
        if (firstNode === i + 1) {
            term = solarTerm[(m + 1) * 2 - 2];
        }
        if (secondNode === i + 1) {
            term = solarTerm[(m + 1) * 2 - 1];
        }
        this[i] = new calElement(y, m + 1, i + 1, nStr1[(i + this.firstWeek) % 7], lY, lM, lD++, lL, cY, cM, cD, term);
        if ((lD2) % 10 == 0 || (lD2) % 10 == 5) { xs = '东北'; }
        else if ((lD2) % 10 == 1 || (lD2) % 10 == 6) { xs = '西北'; }
        else if ((lD2) % 10 == 2 || (lD2) % 10 == 7) { xs = '西南'; }
        else if ((lD2) % 10 == 3 || (lD2) % 10 == 8) { xs = '正南'; }
        else if ((lD2) % 10 == 4 || (lD2) % 10 == 9) { xs = '东南'; }
        if ((lD2) % 10 == 0 || (lD2) % 10 == 1) { fs = '东南'; }
        else if ((lD2) % 10 == 2 || (lD2) % 10 == 3) { fs = '正东'; }
        else if ((lD2) % 10 == 4) { fs = '正北'; }
        else if ((lD2) % 10 == 5) { fs = '正南'; }
        else if ((lD2) % 10 == 6 || (lD2) % 10 == 7) { fs = '西南'; }
        else if ((lD2) % 10 == 8) { fs = '西北'; }
        else if ((lD2) % 10 == 9) { fs = '正西'; }
        if ((lD2) % 10 == 0 || (lD2) % 10 == 1) { cs = '东北'; }
        else if ((lD2) % 10 == 2 || (lD2) % 10 == 3) { cs = '西南'; }
        else if ((lD2) % 10 == 4 || (lD2) % 10 == 5) { cs = '正北'; }
        else if ((lD2) % 10 == 6 || (lD2) % 10 == 7) { cs = '正东'; }
        else if ((lD2) % 10 == 8 || (lD2) % 10 == 9) { cs = '正南'; }
    }
    //节气
    // tmp1 = sTerm(y, m * 2) - 1;
    // tmp2 = sTerm(y, m * 2 + 1) - 1;
    // tmp1 = solarTermChange(y + "-" + (m + 1) + "-" + (tmp1 + 1), tmp1);
    // tmp2 = solarTermChange(y + "-" + (m + 1) + "-" + (tmp2 + 1), tmp2);
    // this[tmp1].solarTerms = solarTerm[m * 2];
    // this[tmp2].solarTerms = solarTerm[m * 2 + 1];
    // if (m == 3) this[tmp1].color = 'red'; //清明颜色
}
/**
      * 1900-2100各年的24节气日期速查表
      * @Array Of Property 
      * @return 0x string For splice
      */
var sTermInfo = ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
    '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
    'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
    '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
    '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
    '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
    '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
    '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
    '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
    '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
    '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
    '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
    '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
    '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
    '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
    '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
    '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
    '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
    '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
    '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
    '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
    '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
    '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
    '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
    '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
    '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
    '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
    '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
    '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
    '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
    '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
    '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
    '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
    '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
    '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
    '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'];
/**
      * 传入公历(!)y年获得该年第n个节气的公历日期
      * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起 
      * @return day Number
      * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
      */
function getTerm(y, n) {
    //TermTable[(y - 1900) * 24 + n];
    if (y < 1900 || y > 2100) {
        return -1;
    }
    if (n < 1 || n > 24) {
        return -1;
    }
    var _table = sTermInfo[y - 1900];
    var _info = [
        parseInt('0x' + _table.substr(0, 5)).toString(),
        parseInt('0x' + _table.substr(5, 5)).toString(),
        parseInt('0x' + _table.substr(10, 5)).toString(),
        parseInt('0x' + _table.substr(15, 5)).toString(),
        parseInt('0x' + _table.substr(20, 5)).toString(),
        parseInt('0x' + _table.substr(25, 5)).toString()
    ];
    var _calday = [
        _info[0].substr(0, 1),
        _info[0].substr(1, 2),
        _info[0].substr(3, 1),
        _info[0].substr(4, 2),

        _info[1].substr(0, 1),
        _info[1].substr(1, 2),
        _info[1].substr(3, 1),
        _info[1].substr(4, 2),

        _info[2].substr(0, 1),
        _info[2].substr(1, 2),
        _info[2].substr(3, 1),
        _info[2].substr(4, 2),

        _info[3].substr(0, 1),
        _info[3].substr(1, 2),
        _info[3].substr(3, 1),
        _info[3].substr(4, 2),

        _info[4].substr(0, 1),
        _info[4].substr(1, 2),
        _info[4].substr(3, 1),
        _info[4].substr(4, 2),

        _info[5].substr(0, 1),
        _info[5].substr(1, 2),
        _info[5].substr(3, 1),
        _info[5].substr(4, 2),
    ];
    return parseInt(_calday[n - 1]);
}
//====================== 中文日期
function cDay(d) {
    var s;

    switch (d) {
        case 10:
            s = '初十'; break;
        case 20:
            s = '二十'; break;
            break;
        case 30:
            s = '三十'; break;
            break;
        default:
            s = nStr2[Math.floor(d / 10)];
            s += nStr1[d % 10];
    }
    return (s);
}
//===================返回属相
function getPet(birthyear, lichunOffset) {
    var start = 1900, value = "";
    x = (birthyear - start) % 12;
    // if (x !== 0 && lichunOffset < 0) {
    //     x -= 1;
    // }
    value = Animals[x];
    return value;
}
//节气日期的调整
function solarTermChange(detailday, tem) {
    var TermChangeDayArray = {
        "2012-5-21": "20", "2012-12-6": "7", "2013-2-3": "4", "2013-7-23": "22",
        "2013-12-21": "22", "2014-3-5": "6", "2015-1-5": "6", "2017-7-23": "22",
        "2017-12-21": "22", "2018-2-18": "19", "2018-3-20": "21", "2019-2-5": "4",
        "2019-6-22": "21", "2020-7-7": "6", "2020-8-23": "22", "2020-12-6": "7"
    };

    var result;
    try {
        if (typeof TermChangeDayArray[detailday] != 'undefined') {
            result = parseInt(TermChangeDayArray[detailday], 10) - 1;
        }
        else {
            result = tem;
        }
    }
    catch (e) {
        result = tem;
    }
    return result;
}


/**
 * Yovae.com
 */
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
//base64编码
function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;

    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}
//base64解码
function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        /* c1 */
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1)
            break;

        /* c2 */
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1)
            break;

        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

        /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1)
            break;

        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

        /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}
//utf-8转utf16
function utf16to8(str) {
    var out, i, len, c;

    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}
//utf-16转utf-8
function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                out += str.charAt(i - 1);
                break;
            case 12: case 13:
                // 110x xxxx   10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }

    return out;
}
var JQYearDate = {
    "2010": [4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355],
    "2011": [4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 326, 340, 355],
    "2012": [5, 20, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355],
    "2013": [4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355],
    "2014": [4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355],
    "2015": [5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355],
    "2016": [5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355],
    "2017": [4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355],
    "2018": [4, 19, 34, 49, 63, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355],
    "2019": [4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355],
    "2020": [5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 341, 355],
    "2021": [4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354],
    "2022": [4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355],
    "2023": [4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355],
    "2024": [5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355],
    "2025": [4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354],
    "2026": [4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355],
    "2027": [4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355],
    "2028": [5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355],
    "2029": [4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354],
    "2030": [4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355]
};
function GetSolarDateFromLunar(yearparam, monthparam, dayparam) {
    var isleappara = false;
    if (monthparam == "13") {
        isleappara = true;
        monthparam = leapMonth(parseInt(yearparam, 10));
    }
    return GetSolarFromLunar(yearparam, monthparam, dayparam, isleappara);
}
function GetSolarFromLunar(year, month, day, isLeap) {

    ///<summary>通过农历年月日，是否闰月得到阳历日期</summary>
    ///<return type="string" />

    ///思路 先计算农历距离1.1日的天数差

    year = parseInt(year, 10);
    month = parseInt(month, 10);
    day = parseInt(day, 10);

    var haveLeapmonth = leapMonth(year);
    var DayCounts = 0;
    var Diffrence = 0;
    for (var i = 1; i < month; i++) {
        DayCounts += monthDays(year, i);
    }
    if (haveLeapmonth > 0) {
        if (month > haveLeapmonth) {
            DayCounts += leapDays(year);
        }
        else {
            if (month == haveLeapmonth && isLeap) {
                DayCounts += monthDays(year, month);
            }
        }
    }
    DayCounts += day;

    var solarTolunar = new calendar(year, 0);
    var solarFirstDay = solarTolunar[0];

    var PreYearDayCount = 0;
    try {
        for (var j = 1; j < solarFirstDay.lMonth; j++) {
            PreYearDayCount += monthDays(solarFirstDay.lYear, j);
        }
    }
    catch (e) {
        alert(e.message);
    }
    if (solarFirstDay.isLeap) {
        PreYearDayCount += monthDays(solarFirstDay.lYear, solarFirstDay.lMonth);
    }
    PreYearDayCount += solarFirstDay.lDay;

    if (solarFirstDay.lYear < year) {
        var PreYearTotal = lYearDays(solarFirstDay.lYear);

        PreYearDayCount += leapDays(solarFirstDay.lYear);
        Diffrence = PreYearTotal - PreYearDayCount + DayCounts;
    }
    else {
        Diffrence = DayCounts - PreYearDayCount;
    }
    return DateCalculate(new Date(year, 0, 1), Diffrence, "d");
}
/*时间计算
 calculateDate:计算的时间基数 时间类型
 number:计算的参数  整形
 type  :类型 枚举类型
 返回时间类型
 */
function DateCalculate(calculateDate, number, type) {
    var calculateResult;
    switch (type) {
        case "s":
            calculateResult = new Date(Date.parse(calculateDate) + (1000 * parseInt(number)));
            break;
        case "m":
            calculateResult = new Date(Date.parse(calculateDate) + (60000 * parseInt(number)));
            break;
        case "h":
            calculateResult = new Date(Date.parse(calculateDate) + (3600000 * parseInt(number)));
            break;
        case "d":
            calculateResult = new Date(Date.parse(calculateDate) + (86400000 * parseInt(number)));
            break;
        case "w":
            calculateResult = new Date(Date.parse(calculateDate) + ((86400000 * 7) * parseInt(number)));
            break;
        case "M":
            calculateResult = new Date(calculateDate.getFullYear(), (calculateDate.getMonth()) + parseInt(number), calculateDate.getDate(),
                calculateDate.getHours(), calculateDate.getMinutes(), calculateDate.getSeconds());
            break;
        case "y":
            calculateResult = new Date(calculateDate.getFullYear() + parseInt(number), (calculateDate.getMonth()), calculateDate.getDate(),
                calculateDate.getHours(), calculateDate.getMinutes(), calculateDate.getSeconds());
            break;
    }
    return calculateResult;
}

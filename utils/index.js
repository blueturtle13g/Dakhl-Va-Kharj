import {
    ABAN,
    AZAR,
    BAHMAN,
    DEY,
    ESFAND,
    FARVARDIN,
    KHORDAD,
    MEHR,
    MONTHS,
    MORDAD,
    ORDIBEHESHT,
    SHAHRIVAR,
    TIR
} from "../actions/types";

export const getMost = (items, forDays)=>{
    let incomes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let expenses= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    if(items.length > 0 && forDays){
        items.forEach(item=>{
            switch (item.day){
                case 1:
                    item.is_income ? incomes[0] += item.cost : expenses[0] += item.cost;
                    break;
                case 2:
                    item.is_income ? incomes[1] += item.cost : expenses[1] += item.cost;
                    break;
                case 3:
                    item.is_income ? incomes[2] += item.cost : expenses[2] += item.cost;
                    break;
                case 4:
                    item.is_income ? incomes[3] += item.cost : expenses[3] += item.cost;
                    break;
                case 5:
                    item.is_income ? incomes[4] += item.cost : expenses[4] += item.cost;
                    break;
                case 6:
                    item.is_income ? incomes[5] += item.cost : expenses[5] += item.cost;
                    break;
                case 7:
                    item.is_income ? incomes[6] += item.cost : expenses[6] += item.cost;
                    break;
                case 8:
                    item.is_income ? incomes[7] += item.cost : expenses[7] += item.cost;
                    break;
                case 9:
                    item.is_income ? incomes[8] += item.cost : expenses[8] += item.cost;
                    break;
                case 10:
                    item.is_income ? incomes[9] += item.cost : expenses[9] += item.cost;
                    break;
                case 11:
                    item.is_income ? incomes[10] += item.cost : expenses[10] += item.cost;
                    break;
                case 12:
                    item.is_income ? incomes[11] += item.cost : expenses[11] += item.cost;
                    break;
                case 13:
                    item.is_income ? incomes[12] += item.cost : expenses[12] += item.cost;
                    break;
                case 14:
                    item.is_income ? incomes[13] += item.cost : expenses[13] += item.cost;
                    break;
                case 15:
                    item.is_income ? incomes[14] += item.cost : expenses[14] += item.cost;
                    break;
                case 16:
                    item.is_income ? incomes[15] += item.cost : expenses[15] += item.cost;
                    break;
                case 17:
                    item.is_income ? incomes[16] += item.cost : expenses[16] += item.cost;
                    break;
                case 18:
                    item.is_income ? incomes[17] += item.cost : expenses[17] += item.cost;
                    break;
                case 19:
                    item.is_income ? incomes[18] += item.cost : expenses[18] += item.cost;
                    break;
                case 20:
                    item.is_income ? incomes[19] += item.cost : expenses[19] += item.cost;
                    break;
                case 21:
                    item.is_income ? incomes[20] += item.cost : expenses[20] += item.cost;
                    break;
                case 22:
                    item.is_income ? incomes[21] += item.cost : expenses[21] += item.cost;
                    break;
                case 23:
                    item.is_income ? incomes[22] += item.cost : expenses[22] += item.cost;
                    break;
                case 24:
                    item.is_income ? incomes[23] += item.cost : expenses[23] += item.cost;
                    break;
                case 25:
                    item.is_income ? incomes[24] += item.cost : expenses[24] += item.cost;
                    break;
                case 26:
                    item.is_income ? incomes[25] += item.cost : expenses[25] += item.cost;
                    break;
                case 27:
                    item.is_income ? incomes[26] += item.cost : expenses[26] += item.cost;
                    break;
                case 28:
                    item.is_income ? incomes[27] += item.cost : expenses[27] += item.cost;
                    break;
                case 29:
                    item.is_income ? incomes[28] += item.cost : expenses[28] += item.cost;
                    break;
                case 30:
                    item.is_income ? incomes[29] += item.cost : expenses[29] += item.cost;
                    break;
                case 31:
                    item.is_income ? incomes[30] += item.cost : expenses[30] += item.cost;
                    break;
            }
        });
    }
    if(items.length > 0 && !forDays){
        items.forEach(item=>{
            switch (item.month){
                case FARVARDIN:
                    item.is_income ? incomes[0] += item.cost : expenses[0] += item.cost;
                    break;
                case ORDIBEHESHT:
                    item.is_income ? incomes[1] += item.cost : expenses[1] += item.cost;
                    break;
                case KHORDAD:
                    item.is_income ? incomes[2] += item.cost : expenses[2] += item.cost;
                    break;
                case TIR:
                    item.is_income ? incomes[3] += item.cost : expenses[3] += item.cost;
                    break;
                case MORDAD:
                    item.is_income ? incomes[4] += item.cost : expenses[4] += item.cost;
                    break;
                case SHAHRIVAR:
                    item.is_income ? incomes[5] += item.cost : expenses[5] += item.cost;
                    break;
                case MEHR:
                    item.is_income ? incomes[6] += item.cost : expenses[6] += item.cost;
                    break;
                case ABAN:
                    item.is_income ? incomes[7] += item.cost : expenses[7] += item.cost;
                    break;
                case AZAR:
                    item.is_income ? incomes[8] += item.cost : expenses[8] += item.cost;
                    break;
                case DEY:
                    item.is_income ? incomes[9] += item.cost : expenses[9] += item.cost;
                    break;
                case BAHMAN:
                    item.is_income ? incomes[10] += item.cost : expenses[10] += item.cost;
                    break;
                case ESFAND:
                    item.is_income ? incomes[11] += item.cost : expenses[11] += item.cost;
                    break;
            }
        });
    }

    let most_income = Math.max.apply(Math, incomes);
    let most_expense = Math.max.apply(Math, expenses);
    if(!!most_income && !!most_expense) {
        if(forDays){
            return [
                incomes.indexOf(most_income)+1,
                expenses.indexOf(most_expense)+1
            ];
        }
        return [
            MONTHS[
                incomes.indexOf(most_income)
            ],
            MONTHS[
                expenses.indexOf(most_expense)
            ]
        ];
    }

    if(!!most_income && !most_expense) {
        if(forDays) {
            return [
                incomes.indexOf(most_income) + 1,
                "-"
            ];
        }
        return [
            MONTHS[
                incomes.indexOf(most_income)
            ],
            "-"
        ];
    }

    if(!!most_expense && !most_income){
        if(forDays) {
            return [
                "-",
                expenses.indexOf(most_expense) + 1
            ];
        }
        return [
            "-",
            MONTHS[
                expenses.indexOf(most_expense)
            ]
        ];
    }

    return [
        "-",
        "-"
    ];
};

export const toPersian = number=>{
    const arabicNumbers = ['۰', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const chars = number.toString().split('');
    for (let i = 0; i < chars.length; i++) {
        if (/\d/.test(chars[i])) {
            chars[i] = arabicNumbers[chars[i]];
        }
    }
    return chars.join('');
};

export const twelveToOne = items=>{
    return [
        ...items[0],
        ...items[1],
        ...items[2],
        ...items[3],
        ...items[4],
        ...items[5],
        ...items[6],
        ...items[7],
        ...items[8],
        ...items[9],
        ...items[10],
        ...items[11],
    ]
};

export const genHtml =(year,items)=>{

    const printTh = ()=>{
        return(`
          <tr>
            ${printThStart()}   روز</th> 
            ${printThStart()} قیمت</th> 
            ${printThStart()}   توضیحات</th> 
            ${printThStart()}   عنوان</th> 
            ${printThStart()}   ردیف</th> 
          </tr>
        `)
    };
    const printTd = item=>{
        return(`
              <tr>
                ${printTdStart()} ${toPersian(item.day)}</td>
                ${printTdStart(item.is_income ? "#2fc988" : "#cd574c")}
                    ${toPersian(item.cost.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))}
                </td>
                ${printTdStart()} ${item.description}</td>
                ${printTdStart()} ${item.title}</td>
                ${printTdStart()} ${toPersian(item.id)}</td>
              </tr>
            `);
    };
    const printMonthText = text=>{
        return(`
            <h2 style="text-align: right;">
                <strong>:${text}</strong>
            </h2>
        `)
    };
    const printTdStart = (color)=>`<td style="padding: 3px; border: 1px solid black; text-align: center; background-color: ${color}">`;
    const printThStart = ()=>`<th style="padding: 3px; border: 1px solid black; color: #2b2b2b">`;
    const printTableStart = ()=>`<table style=
        "border: 1px solid black; width:100%; border-collapse: collapse; border-radius: 10px;"
        >${printTh()}`;

    let tables = [];
    MONTHS.forEach(month=>{
        tables.push(`${printMonthText(month)} ${printTableStart()}`)
    });

    for(let i=0; i< 12; i++){
        items[i].forEach(item=>tables[i] += printTd(item));
    }

    let mosts = [];
    let summerizes = [];

    for(let i=0; i< 12; i++){
        mosts[i] = getMost(items[i], true);
    }

    for(let i=0; i< 12; i++){
        summerizes[i] = summerizeItems(items[i]);
    }

    const YEAR_MOST = getMost(twelveToOne(items), false);
    const YEAR_SUMMERIZE = summerizeItems(twelveToOne(items));

    const printMost = (income, expense, for_days)=>{
        return(`
            <p style="text-align: right;">
                ${for_days ? "پر درآمد ترین روز:" : "پر درآمد ترین ماه:"}
                <strong>${toPersian(income)}</strong>
            </p>
            <p style="text-align: right;">
                ${for_days ? "پر هزینه ترین روز:" : "پر هزینه ترین ماه:"}
                <strong>${toPersian(toPersian(expense))}</strong>
            </p>
        `)
    };
    const printSummerize = (income, expense)=>{
        return(`
            <p style="text-align: right;">
                درآمد کل
                :
                <strong>${toPersian(income.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))}</strong>
            </p>
            <p style="text-align: right;">
                هزینه کل
                :
                <strong>${toPersian(expense.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))}</strong>
            </p>
            <p style="text-align: right;">
                دخل و خرج
                :
                <strong>${toPersian((income - expense).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))}</strong>
            </p>
        `)
    };
    const printMonth = (i, month)=>{
        return `
            ${tables[i].includes("<td") ? tables[i] + "</table>" : printMonthText(month)}
            ${printMost(mosts[i][0], mosts[i][1], true)}
            ${printSummerize(summerizes[i][0], summerizes[i][1])}
        `;
    };
    const printMonths =()=>{
        let months = "";
        MONTHS.forEach(month=>{
            months += printMonth(MONTHS.indexOf(month), month)
        });
        return months;
    };

    return `
        <p style=
            "
            text-align: center; 
            font-size: 45px;
            font-weight: bold
            "
        >
            <strong>${toPersian(year)}</strong>
        </p>
        ${printMonths()}
        <hr/>
        ${printMost(YEAR_MOST[0], YEAR_MOST[1])}
        ${printSummerize(YEAR_SUMMERIZE[0], YEAR_SUMMERIZE[1])}
   `;
};

export const summerizeItems = items=>{
    let incomes = 0;
    let expenses = 0;
    if(items.length > 0){
        items.forEach(item=>{
            if (item.is_income) incomes += item.cost;
            else expenses += item.cost;
        });
    }
    return [incomes, expenses];
};

export const getShamsi = ()=>{
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getYear();
    year = 1900 + year;
    if (year == 0) {
        year = 2000;
    }
    if (year < 100) {
        year += 1900;
    }
    y = 1;
    for (i = 0; i < 3000; i += 4) {
        if (year == i) {
            y = 2;
        }
    }
    for (i = 1; i < 3000; i += 4) {
        if (year == i) {
            y = 3;
        }
    }
    if (y == 1) {
        year -= ((month < 3) || ((month == 3) && (day < 21))) ? 622 : 621;
        switch (month) {
            case 1:
                (day < 21) ? (month = 10, day += 10) : (month = 11, day -= 20);
                break;
            case 2:
                (day < 20) ? (month = 11, day += 11) : (month = 12, day -= 19);
                break;
            case 3:
                (day < 21) ? (month = 12, day += 9) : (month = 1, day -= 20);
                break;
            case 4:
                (day < 21) ? (month = 1, day += 11) : (month = 2, day -= 20);
                break;
            case 5:
            case 6:
                (day < 22) ? (month -= 3, day += 10) : (month -= 2, day -= 21);
                break;
            case 7:
            case 8:
            case 9:
                (day < 23) ? (month -= 3, day += 9) : (month -= 2, day -= 22);
                break;
            case 10:
                (day < 23) ? (month = 7, day += 8) : (month = 8, day -= 22);
                break;
            case 11:
            case 12:
                (day < 22) ? (month -= 3, day += 9) : (month -= 2, day -= 21);
                break;
            default:
                break;
        }
    }
    if (y == 2) {
        year -= ((month < 3) || ((month == 3) && (day < 20))) ? 622 : 621;
        switch (month) {
            case 1:
                (day < 21) ? (month = 10, day += 10) : (month = 11, day -= 20);
                break;
            case 2:
                (day < 20) ? (month = 11, day += 11) : (month = 12, day -= 19);
                break;
            case 3:
                (day < 20) ? (month = 12, day += 10) : (month = 1, day -= 19);
                break;
            case 4:
                (day < 20) ? (month = 1, day += 12) : (month = 2, day -= 19);
                break;
            case 5:
                (day < 21) ? (month = 2, day += 11) : (month = 3, day -= 20);
                break;
            case 6:
                (day < 21) ? (month = 3, day += 11) : (month = 4, day -= 20);
                break;
            case 7:
                (day < 22) ? (month = 4, day += 10) : (month = 5, day -= 21);
                break;
            case 8:
                (day < 22) ? (month = 5, day += 10) : (month = 6, day -= 21);
                break;
            case 9:
                (day < 22) ? (month = 6, day += 10) : (month = 7, day -= 21);
                break;
            case 10:
                (day < 22) ? (month = 7, day += 9) : (month = 8, day -= 21);
                break;
            case 11:
                (day < 21) ? (month = 8, day += 10) : (month = 9, day -= 20);
                break;
            case 12:
                (day < 21) ? (month = 9, day += 10) : (month = 10, day -= 20);
                break;
            default:
                break;
        }
    }
    if (y == 3) {
        year -= ((month < 3) || ((month == 3) && (day < 21))) ? 622 : 621;
        switch (month) {
            case 1:
                (day < 20) ? (month = 10, day += 11) : (month = 11, day -= 19);
                break;
            case 2:
                (day < 19) ? (month = 11, day += 12) : (month = 12, day -= 18);
                break;
            case 3:
                (day < 21) ? (month = 12, day += 10) : (month = 1, day -= 20);
                break;
            case 4:
                (day < 21) ? (month = 1, day += 11) : (month = 2, day -= 20);
                break;
            case 5:
            case 6:
                (day < 22) ? (month -= 3, day += 10) : (month -= 2, day -= 21);
                break;
            case 7:
            case 8:
            case 9:
                (day < 23) ? (month -= 3, day += 9) : (month -= 2, day -= 22);
                break;
            case 10:
                (day < 23) ? (month = 7, day += 8) : (month = 8, day -= 22);
                break;
            case 11:
            case 12:
                (day < 22) ? (month -= 3, day += 9) : (month -= 2, day -= 21);
                break;
            default:
                break;
        }
    }
    return [year, MONTHS[month - 1], day];
};
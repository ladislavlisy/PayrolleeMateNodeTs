/**
 * Created by ladislavlisy on 29/08/15.
 */
///<reference path='../../typings/datejs/datejs.d.ts'/>

export class MonthPeriod
{
    private code: number;

    constructor(code : number)
    {
        this.code = code;
    }

    Code() {
        return this.code;
    }

    Year() {
        return (this.code / 100) >> 0;
    }

    Month() {
        return (this.code % 100);
    }

    YearInt() {
        return (this.code / 100) >> 0;
    }

    MonthInt() {
        return (this.code % 100);
    }

    MonthOrder() {
        return Math.max(0, this.YearInt() - 2000) * 12 + this.MonthInt();
    }

    DaysInMonth() {
        return Date.getDaysInMonth(this.YearInt(), this.MonthInt()-1);
    }

    BeginOfMonth() {
        var periodDate = new Date(this.YearInt(), this.MonthInt()+1, 1, 0, 0, 0, 0);
        return periodDate;
    }

    EndOfMonth() {
        var periodDate = new Date(this.YearInt(), this.MonthInt()-1, this.DaysInMonth(), 0, 0, 0, 0);
        return periodDate;
    }

    DateOfMonth(dayOrdinal : number) {
        var periodDay = Math.min(Math.max(1, dayOrdinal), this.DaysInMonth());
        var periodDate = new Date(this.YearInt(), this.MonthInt()-1, periodDay, 0, 0, 0, 0);
        return periodDate;
    }

    WeekDayOfMonth(dayOrdinal : number) {
        var periodDate = this.DateOfMonth(dayOrdinal);
        return this.DayOfWeekMonToSun(periodDate);
    }

    DayOfWeekMonToSun(periodDate : Date) {
        var periodDateCwd = periodDate.getDay();
        // DayOfWeek Sunday = 0
        // Monday = 1, Tuesday = 2, Wednesday = 3, Thursday = 4, Friday = 5, Saturday = 6
        if (periodDateCwd == 0)
        {
            return 7;
        }
        else
        {
            return periodDateCwd;
        }
    }

    Description() {
        var firstPeriodDay = this.BeginOfMonth();
        return firstPeriodDay.toDateString(); //("MMMM yyyy");
    }

    compareToPeriod(other : MonthPeriod) {
        if (this.Code() == other.Code())
        {
            return 0;
        }
        else
        {
            return (this.Code() - other.Code());
        }
    }

    isEqualToPeriod(other : MonthPeriod) {
        return (this.compareToPeriod(other)==0);
    }

    isGreaterToPeriod(other : MonthPeriod) {
        return (this.compareToPeriod(other)>0);
    }

    isLessToPeriod(other : MonthPeriod) {
        return (this.compareToPeriod(other)<0);
    }

    toString() {
        return this.Code.toString();
    }
}

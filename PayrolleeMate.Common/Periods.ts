/**
 * Created by ladislavlisy on 18/09/15.
 */
///<reference path='../typings/datejs/datejs.d.ts'/>
///<reference path="../typings/lodash/lodash.d.ts" />

var _ = require('lodash');
var d = require('datejs');

//export module Periods {
export class MonthPeriod {
    static PRESENT = 0;

    public static DayOfWeekMonToSun(periodDateCwd:number) {
        // DayOfWeek Sunday = 0
        // Monday = 1, Tuesday = 2, Wednesday = 3, Thursday = 4, Friday = 5, Saturday = 6
        if (periodDateCwd == 0) {
            return 7;
        }
        else {
            return periodDateCwd;
        }
    }

    public static CreateFromYearAndMonth(year:number, month:number) {
        return new MonthPeriod(100 * year + month);
    }

    public static Empty() {
        return new MonthPeriod(MonthPeriod.PRESENT);
    }

    public static BeginOfYear(year:number) {
        return new MonthPeriod(100 * year + 1);
    }

    public static EndOfYear(year:number) {
        return new MonthPeriod(100 * year + 12);
    }

    private code:number;

    constructor(code:number) {
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

    CreateDate(day:number) {
        return Date.today()
            .set({ day: day, year: this.YearInt(), month: this.MonthInt()-1,
                hour: 0, minute: 0, second: 0, millisecond: 0 });
    }

    MonthOrder() {
        return Math.max(0, this.YearInt() - 2000) * 12 + this.MonthInt();
    }

    DaysInMonth() {
        return Date.getDaysInMonth(this.YearInt(), this.MonthInt() - 1);
    }

    BeginOfMonth() {
        var periodDate = this.CreateDate(1);
        return periodDate;
    }

    EndOfMonth() {
        var periodDate = this.CreateDate(this.DaysInMonth());
        return periodDate;
    }

    DateOfMonth(dayOrdinal:number) {
        var periodDay = Math.min(Math.max(1, dayOrdinal), this.DaysInMonth());
        var periodDate = this.CreateDate(periodDay);
        return periodDate;
    }

    WeekDayOfMonth(dayOrdinal:number) {
        var periodDate = this.DateOfMonth(dayOrdinal);

        var periodDateCwd = periodDate.getDay();

        return MonthPeriod.DayOfWeekMonToSun(periodDateCwd);
    }

    Description() {
        var firstPeriodDay = this.BeginOfMonth();
        return firstPeriodDay.toString("MMMM yyyy"); //("MMMM yyyy");
    }

    compareToPeriod(other:MonthPeriod) {
        if (this.Code() == other.Code()) {
            return 0;
        }
        else {
            return (this.Code() - other.Code());
        }
    }

    isEqualToPeriod(other:MonthPeriod) {
        return (this.compareToPeriod(other) == 0);
    }

    isGreaterToPeriod(other:MonthPeriod) {
        return (this.compareToPeriod(other) > 0);
    }

    isLessToPeriod(other:MonthPeriod) {
        return (this.compareToPeriod(other) < 0);
    }

    toString() {
        return this.Code.toString();
    }
}

export class SpanOfMonths {
    public static CreateFromYear(year:number) {
        return new SpanOfMonths(MonthPeriod.BeginOfYear(year), MonthPeriod.EndOfYear(year));
    }

    public static CreateFromMonth(period:MonthPeriod) {
        return new SpanOfMonths(period, period);
    }

    private periodFrom:MonthPeriod;

    private periodUpto:MonthPeriod;

    constructor(from:MonthPeriod, upto:MonthPeriod) {
        this.periodFrom = from;

        this.periodUpto = upto;
    }

    PeriodFrom() {
        return this.periodFrom;
    }

    PeriodUpto() {
        return this.periodUpto;
    }

    compareToInterval(other:SpanOfMonths) {
        if (this.periodFrom == other.periodFrom) {
            return (this.periodUpto.compareToPeriod(other.periodUpto));
        }
        else {
            return (this.periodFrom.compareToPeriod(other.periodFrom));
        }
    }

    isEqualToInterval(other:SpanOfMonths) {
        return (this.compareToInterval(other) == 0);
    }

    isGreaterToInterval(other:SpanOfMonths) {
        return (this.compareToInterval(other) > 0);
    }

    isLessToInterval(other:SpanOfMonths) {
        return (this.compareToInterval(other) < 0);
    }

    ClassName() {
        var className = this.periodFrom.toString();

        if (this.periodFrom != this.periodUpto) {
            className += `to${this.periodUpto.toString()}`;
        }
        return className;
    }

    toString() {
        return this.ClassName();
    }
}

export class SpanOfYears {
    public static CreateFromYear(year:number) {
        return new SpanOfYears(year, year);
    }

    public static CreateFromYearToYear(from:number, upto:number) {
        return new SpanOfYears(from, upto);
    }

    private yearFrom:number;

    private yearUpto:number;

    constructor(from:number, upto:number) {
        this.yearFrom = from;

        this.yearUpto = upto;
    }

    YearFrom() {
        return this.yearFrom;
    }

    YearUpto() {
        return this.yearUpto;
    }

    compareToInterval(other:SpanOfYears) {
        if (this.yearFrom == other.yearFrom) {
            return (this.yearUpto - other.yearUpto);
        }
        else {
            return (this.yearFrom - other.yearFrom);
        }
    }

    isEqualToInterval(other:SpanOfYears) {
        return (this.compareToInterval(other) == 0);
    }

    isGreaterToInterval(other:SpanOfYears) {
        return (this.compareToInterval(other) > 0);
    }

    isLessToInterval(other:SpanOfYears) {
        return (this.compareToInterval(other) < 0);
    }

    ClassName() {
        var className = this.yearFrom.toString();

        if (this.yearFrom != this.yearUpto) {
            className += `to${this.yearUpto.toString()}`;
        }
        return className;
    }

    toString() {
        return this.ClassName();
    }
}

//module PeeCommon {
export class SeqOfYears {
    public static END_YEAR_ARRAY:number = 2100;
    public static END_YEAR_INTER:number = 2099;

    static transformZeroYear(year:number):number {
        return (year == 0 ? SeqOfYears.END_YEAR_ARRAY : year);
    }

    private milestones:Array<number>;

    constructor(years:Array<number>) {
        this.milestones = _.sortBy(years, SeqOfYears.transformZeroYear);
    }

    YearsIntervalForPeriod(period:MonthPeriod):SpanOfYears {
        var forPeriodAccumulator = function (agr:SpanOfYears, x:number):SpanOfYears {
            var intYear = (x == 0) ? SeqOfYears.END_YEAR_ARRAY : x;
            var intFrom = (period.Year() >= intYear) ? intYear : agr.YearFrom();
            var intUpto = (period.Year() < intYear && agr.YearUpto() == 0) ? (intYear - 1) : agr.YearUpto();

            return new SpanOfYears(intFrom, intUpto);
        };
        var initsSpan:SpanOfYears = SpanOfYears.CreateFromYear(0);
        var validSpan:SpanOfYears = _.reduce(this.milestones, forPeriodAccumulator, initsSpan);
        return validSpan;
    }

    ToYearsIntervalList() {
        var nextListEnd = function(from: number, year: number): Array<SpanOfYears> {
            if (year == 0) {
                var upto = SeqOfYears.END_YEAR_INTER;

                return [new SpanOfYears(from, upto)];
            } else {
                var upto = Math.max(year - 1, from);

                return [new SpanOfYears(from, upto), new SpanOfYears(year, 0)];
            }
        };
        var makeListEnd = function(preparedList: Array<SpanOfYears>): Array<SpanOfYears> {
            var lastHistoryPart: SpanOfYears = _.last(preparedList);

            if (lastHistoryPart.YearUpto() == 0) {
                var firstHistoryPart: Array<SpanOfYears> =
                    _.filter(preparedList, (y: SpanOfYears) => {return y.YearUpto() != 0});
                var historyFrom: number = lastHistoryPart.YearFrom();
                var historyUpto: number = lastHistoryPart.YearFrom();

                return firstHistoryPart.concat([new SpanOfYears(historyFrom, historyUpto)]);
            }
            return preparedList;
        };
        var toListAccumulator = function(agr: Array<SpanOfYears>, x: number): Array<SpanOfYears> {
            if (agr.length == 0) {
                var nextEmptyPartList = [new SpanOfYears(x, 0)];

                return nextEmptyPartList;
            } else {
                var firstPart = _.filter(agr, (y:SpanOfYears) => {
                    return y.YearUpto() != 0
                });

                var lastPart = _.last(agr);

                var historyFrom = lastPart.YearFrom();

                var nextSpanPartList = nextListEnd(historyFrom, x);

                return firstPart.concat(nextSpanPartList);
            }
        };
        var history: Array<SpanOfYears> = _.reduce(this.milestones, toListAccumulator, []);

        return makeListEnd(history);
    }
}

//}
/**
 * Created by ladislavlisy on 18/09/15.
 */
///<reference path='../typings/datejs/datejs.d.ts'/>
///<reference path="../typings/lodash/lodash.d.ts" />

var _: _.LoDashStatic = require('lodash');
var d = require('datejs');

//export module Periods {
export class MonthPeriod {
    static PRESENT = 0;

    public static DayOfWeekMonToSun(periodDateCwd:number):number {
        // DayOfWeek Sunday = 0
        // Monday = 1, Tuesday = 2, Wednesday = 3, Thursday = 4, Friday = 5, Saturday = 6
        if (periodDateCwd == 0) {
            return 7;
        }
        else {
            return periodDateCwd;
        }
    }

    public static CreateFromYearAndMonth(year:number, month:number): MonthPeriod {
        return new MonthPeriod(100 * year + month);
    }

    public static Empty(): MonthPeriod {
        return new MonthPeriod(MonthPeriod.PRESENT);
    }

    public static BeginOfYear(year:number): MonthPeriod {
        return new MonthPeriod(100 * year + 1);
    }

    public static EndOfYear(year:number): MonthPeriod {
        return new MonthPeriod(100 * year + 12);
    }

    private code:number;

    constructor(code:number) {
        this.code = code;
    }

    Code(): number {
        return this.code;
    }

    Year(): number {
        return (this.code / 100) >> 0;
    }

    Month(): number {
        return (this.code % 100);
    }

    YearInt(): number {
        return (this.code / 100) >> 0;
    }

    MonthInt(): number {
        return (this.code % 100);
    }

    CreateDate(day:number):IDateJS {
        //var periodDate = Date.today();
        //periodDate.set({ day: day, year: this.YearInt(), month: this.MonthInt()-1,
        //    hour: 0, minute: 0, second: 0, millisecond: 0 });

        var periodDate = Date.parse(`${this.MonthInt()}/1/${this.YearInt()}`);
        return periodDate;
    }

    MonthOrder(): number {
        return Math.max(0, this.YearInt() - 2000) * 12 + this.MonthInt();
    }

    DaysInMonth(): number {
        return Date.getDaysInMonth(this.YearInt(), this.MonthInt() - 1);
    }

    BeginOfMonth():IDateJS {
        var periodDate = this.CreateDate(1);
        return periodDate;
    }

    EndOfMonth():IDateJS {
        var periodDate = this.CreateDate(this.DaysInMonth());
        return periodDate;
    }

    DateOfMonth(dayOrdinal:number):IDateJS {
        var periodDay = Math.min(Math.max(1, dayOrdinal), this.DaysInMonth());
        var periodDate = this.CreateDate(periodDay);
        return periodDate;
    }

    WeekDayOfMonth(dayOrdinal:number): number {
        var periodDate = this.DateOfMonth(dayOrdinal);

        var periodDateCwd = periodDate.getDay();

        return MonthPeriod.DayOfWeekMonToSun(periodDateCwd);
    }

    Description(): string {
        var firstPeriodDay = this.BeginOfMonth();
        return firstPeriodDay.toString("MMMM yyyy"); //("MMMM yyyy");
    }

    compareToPeriod(other:MonthPeriod): number {
        if (this.Code() == other.Code()) {
            return 0;
        }
        else {
            return (this.Code() - other.Code());
        }
    }

    isEqualToPeriod(other:MonthPeriod): boolean {
        return (this.compareToPeriod(other) == 0);
    }

    isGreaterToPeriod(other:MonthPeriod): boolean {
        return (this.compareToPeriod(other) > 0);
    }

    isLessToPeriod(other:MonthPeriod): boolean {
        return (this.compareToPeriod(other) < 0);
    }

    toString(): string {
        return this.Code.toString();
    }
}

export class SpanOfMonths {
    public static CreateFromYear(year:number):SpanOfMonths {
        return new SpanOfMonths(MonthPeriod.BeginOfYear(year), MonthPeriod.EndOfYear(year));
    }

    public static CreateFromMonth(period:MonthPeriod):SpanOfMonths {
        return new SpanOfMonths(period, period);
    }

    private periodFrom:MonthPeriod;

    private periodUpto:MonthPeriod;

    constructor(from:MonthPeriod, upto:MonthPeriod) {
        this.periodFrom = from;

        this.periodUpto = upto;
    }

    PeriodFrom(): MonthPeriod {
        return this.periodFrom;
    }

    PeriodUpto(): MonthPeriod {
        return this.periodUpto;
    }

    compareToInterval(other:SpanOfMonths):number {
        if (this.periodFrom.isEqualToPeriod(other.periodFrom)) {
            return (this.periodUpto.compareToPeriod(other.periodUpto));
        }
        else {
            return (this.periodFrom.compareToPeriod(other.periodFrom));
        }
    }

    isEqualToInterval(other:SpanOfMonths): boolean {
        return (this.compareToInterval(other) == 0);
    }

    isGreaterToInterval(other:SpanOfMonths): boolean {
        return (this.compareToInterval(other) > 0);
    }

    isLessToInterval(other:SpanOfMonths): boolean {
        return (this.compareToInterval(other) < 0);
    }

    className():string {
        var className = this.periodFrom.toString();

        if (!this.periodFrom.isEqualToPeriod(this.periodUpto)) {
            className += `to${this.periodUpto.toString()}`;
        }
        return className;
    }

    toString():string {
        return this.className();
    }
}

export class SpanOfYears {
    public static CreateFromYear(year:number):SpanOfYears {
        return new SpanOfYears(year, year);
    }

    public static CreateFromYearToYear(from:number, upto:number):SpanOfYears {
        return new SpanOfYears(from, upto);
    }

    public static Empty():SpanOfYears {
        return new SpanOfYears(0, 0);
    }

    private yearFrom:number;

    private yearUpto:number;

    constructor(from:number, upto:number) {
        this.yearFrom = from;

        this.yearUpto = upto;
    }

    YearFrom(): number {
        return this.yearFrom;
    }

    YearUpto(): number {
        return this.yearUpto;
    }

    compareToInterval(other:SpanOfYears): number {
        if (this.yearFrom == other.yearFrom) {
            return (this.yearUpto - other.yearUpto);
        }
        else {
            return (this.yearFrom - other.yearFrom);
        }
    }

    isEqualToInterval(other:SpanOfYears): boolean {
        return (this.compareToInterval(other) == 0);
    }

    isGreaterToInterval(other:SpanOfYears): boolean {
        return (this.compareToInterval(other) > 0);
    }

    isLessToInterval(other:SpanOfYears): boolean {
        return (this.compareToInterval(other) < 0);
    }

    className(): string {
        if (this.yearFrom != this.yearUpto) {
            return `${this.yearFrom}to${this.yearUpto}`;
        }
        else
        {
            return `${this.yearFrom}`;
        }
    }

    toString(): string {
        return this.className();
    }
}

//module PeeCommon {
export class SeqOfYears {
    public static END_YEAR_ARRAY:number = 2100;
    public static END_YEAR_INTER:number = 2099;

    static transformZeroToUpto(year:number):number {
        return (year == 0 ? SeqOfYears.END_YEAR_ARRAY : year);
    }

    static transformYearsToSpans(yearFrom: number, yearUpto: number): SpanOfYears {
        var tranUpto = SeqOfYears.transformZeroToUpto(yearUpto);
        var spanUpto = (tranUpto == yearFrom ? tranUpto : tranUpto - 1);
        return new SpanOfYears(yearFrom, spanUpto);
    }

    private milestones:Array<SpanOfYears>;

    constructor(years:Array<number>) {
        var sortedYears = _.sortBy(years, SeqOfYears.transformZeroToUpto);
        var beginsYears = _.dropRight(sortedYears, 1);
        var finishYears = _.drop(sortedYears, 1);
        var sortedZiped = _.zip(beginsYears, finishYears);
        this.milestones = _.map(sortedZiped, (x) => SeqOfYears.transformYearsToSpans(_.first(x), _.last(x)));
    }

    static selectForPeriod(span: SpanOfYears, period: MonthPeriod):boolean {
        return period.Year() >= span.YearFrom() && period.Year() <= span.YearUpto();
    }

    YearsIntervalForPeriod(period:MonthPeriod):SpanOfYears {
        var validSpan = _.filter(this.milestones, (x) => SeqOfYears.selectForPeriod(x, period));
        return _.first(validSpan) || SpanOfYears.Empty();
    }

    YearsIntervalList(): Array<SpanOfYears> {
        return _.toArray(this.milestones);
    }
}

//}
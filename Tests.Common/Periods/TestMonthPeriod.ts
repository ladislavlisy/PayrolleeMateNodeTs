/**
 * Created by ladislavlisy on 29/08/15.
 */
///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/should/should.d.ts'/>
///<reference path='../../typings/mocha/mocha.d.ts'/>

require('should');
var ns = require('../../lib/Payrollee.Common');

describe('TestMonthPeriod', () => {
    var testPeriodCodeJan = 201401;
    var testPeriodCodeFeb = 201402;
    var testPeriodCode501 = 201501;
    var testPeriodCode402 = 201402;

    it('Should_Compare_Different_Periods_AsEqual_When_2014_01', () => {
        var testPeriodOne = new ns.Periods.MonthPeriod(testPeriodCodeJan);

        var testPeriodTwo = new ns.Periods.MonthPeriod(testPeriodCodeJan);

        true.should.equal(testPeriodOne.isEqualToPeriod(testPeriodTwo));
    });

    it('Should_Compare_Different_Periods_AsEqual_When_2014_02', () => {
        var testPeriodOne = new ns.Periods.MonthPeriod(testPeriodCodeFeb);

        var testPeriodTwo = new ns.Periods.MonthPeriod(testPeriodCodeFeb);

        true.should.equal(testPeriodOne.isEqualToPeriod(testPeriodTwo));
    });

    it('Should_Compare_Different_Periods_SameYear_AsGreater', () => {
        var testPeriodOne = new ns.Periods.MonthPeriod(testPeriodCodeJan);

        var testPeriodTwo = new ns.Periods.MonthPeriod(testPeriodCodeFeb);

        false.should.equal(testPeriodTwo.isEqualToPeriod(testPeriodOne));

        true.should.equal(testPeriodTwo.isGreaterToPeriod(testPeriodOne));
    });

    it('Should_Compare_Different_Periods_SameYear_AsLess', () => {
        var testPeriodOne = new ns.Periods.MonthPeriod(testPeriodCodeJan);

        var testPeriodTwo = new ns.Periods.MonthPeriod(testPeriodCodeFeb);

        false.should.equal(testPeriodOne.isEqualToPeriod(testPeriodTwo));

        true.should.equal(testPeriodOne.isLessToPeriod(testPeriodTwo));
    });

    it('Should_Compare_Different_Periods_SameMonth_AsGreater', () => {
        var testPeriodOne = new ns.Periods.MonthPeriod(testPeriodCodeJan);

        var testPeriodTwo = new ns.Periods.MonthPeriod(testPeriodCode501);

        false.should.equal(testPeriodTwo.isEqualToPeriod(testPeriodOne));

        true.should.equal(testPeriodTwo.isGreaterToPeriod(testPeriodOne));
    });

    it('Should_Compare_Different_Periods_SameMonth_AsLess', () => {
        var testPeriodOne = new ns.Periods.MonthPeriod(testPeriodCodeJan);

        var testPeriodTwo = new ns.Periods.MonthPeriod(testPeriodCode501);

        false.should.equal(testPeriodOne.isEqualToPeriod(testPeriodTwo));

        true.should.equal(testPeriodOne.isLessToPeriod(testPeriodTwo));
    });

    it('Should_Compare_Different_Periods_DifferentYear_AsGreater', () => {
        var testPeriodOne = new ns.Periods.MonthPeriod(testPeriodCode402);

        var testPeriodTwo = new ns.Periods.MonthPeriod(testPeriodCode501);

        false.should.equal(testPeriodTwo.isEqualToPeriod(testPeriodOne));

        true.should.equal(testPeriodTwo.isGreaterToPeriod(testPeriodOne));
    });

    it('Should_Compare_Different_Periods_DifferentYear_AsLess', () => {
        var testPeriodOne = new ns.Periods.MonthPeriod(testPeriodCode402);

        var testPeriodTwo = new ns.Periods.MonthPeriod(testPeriodCode501);

        false.should.equal(testPeriodOne.isEqualToPeriod(testPeriodTwo));

        true.should.equal(testPeriodOne.isLessToPeriod(testPeriodTwo));
    });

    it('Should_Return_Periods_Year_And_Month_2014_01', () => {
        var testPeriodOne = new ns.Periods.MonthPeriod(testPeriodCodeJan);

        (2014).should.equal(testPeriodOne.Year());
        (1).should.equal(testPeriodOne.Month());

        (2014).should.equal(testPeriodOne.YearInt());
        (1).should.equal(testPeriodOne.MonthInt());
    });

    it('Should_Return_Periods_Year_And_Month_2014_02', () => {
        var testPeriodTwo = new ns.Periods.MonthPeriod(testPeriodCodeFeb);

        (2014).should.equal(testPeriodTwo.Year());
        (2).should.equal(testPeriodTwo.Month());

        (2014).should.equal(testPeriodTwo.YearInt());
        (2).should.equal(testPeriodTwo.MonthInt());
    });

    it('Should Return_Periods_Month_And_Year_Descriptions', () => {
        var test_period_jan = new ns.Periods.MonthPeriod(testPeriodCodeJan);
        var test_period_feb = new ns.Periods.MonthPeriod(testPeriodCodeFeb);
        var test_period_501 = new ns.Periods.MonthPeriod(testPeriodCode501);
        var test_period_402 = new ns.Periods.MonthPeriod(testPeriodCode402);

        ("January 2014").should.equal(test_period_jan.Description());
        ("February 2014").should.equal(test_period_feb.Description());
        ("January 2015").should.equal(test_period_501.Description());
        ("February 2014").should.equal(test_period_402.Description());
    });

});

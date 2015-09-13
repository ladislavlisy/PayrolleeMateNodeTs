/**
 * Created by ladislavlisy on 29/08/15.
 */
///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/mocha/mocha.d.ts'/>
///<reference path='../../typings/should/should.d.ts'/>

require("should");
import PayrolleeCommon = require('../../PayrolleeMate.Common/Periods/MonthPeriod');

describe('MonthPeriod', () => {
    var testPeriodCodeJan = 201401;
    var testPeriodCodeFeb = 201402;
    var testPeriodCode501 = 201501;
    var testPeriodCode402 = 201402;

    it('Should_Compare_Different_Periods_AsEqual_When_2014_01', () => {
        var testPeriodOne = new PayrolleeCommon.MonthPeriod (testPeriodCodeJan);

        var testPeriodTwo = new PayrolleeCommon.MonthPeriod (testPeriodCodeJan);

        true.should.equal(testPeriodOne.isEqualToPeriod(testPeriodTwo));
    });

    it('Should_Compare_Different_Periods_AsEqual_When_2014_02', () => {
        var testPeriodOne = new PayrolleeCommon.MonthPeriod (testPeriodCodeFeb);

        var testPeriodTwo = new PayrolleeCommon.MonthPeriod (testPeriodCodeFeb);

        true.should.equal(testPeriodOne.isEqualToPeriod(testPeriodTwo));
    });

    it('Should_Compare_Different_Periods_SameYear_AsGreater', () => {
        var testPeriodOne = new PayrolleeCommon.MonthPeriod (testPeriodCodeJan);

        var testPeriodTwo = new PayrolleeCommon.MonthPeriod (testPeriodCodeFeb);

        false.should.equal(testPeriodTwo.isEqualToPeriod(testPeriodOne));

        true.should.equal(testPeriodTwo.isGreaterToPeriod(testPeriodOne));
    });

    it('Should_Compare_Different_Periods_SameYear_AsLess', () => {
        var testPeriodOne = new PayrolleeCommon.MonthPeriod (testPeriodCodeJan);

        var testPeriodTwo = new PayrolleeCommon.MonthPeriod (testPeriodCodeFeb);

        false.should.equal(testPeriodOne.isEqualToPeriod(testPeriodTwo));

        true.should.equal(testPeriodOne.isLessToPeriod(testPeriodTwo));
    });

    it('Should_Compare_Different_Periods_SameMonth_AsGreater', () => {
        var testPeriodOne = new PayrolleeCommon.MonthPeriod (testPeriodCodeJan);

        var testPeriodTwo = new PayrolleeCommon.MonthPeriod (testPeriodCode501);

        false.should.equal(testPeriodTwo.isEqualToPeriod(testPeriodOne));

        true.should.equal(testPeriodTwo.isGreaterToPeriod(testPeriodOne));
    });

    it('Should_Compare_Different_Periods_SameMonth_AsLess', () => {
        var testPeriodOne = new PayrolleeCommon.MonthPeriod (testPeriodCodeJan);

        var testPeriodTwo = new PayrolleeCommon.MonthPeriod (testPeriodCode501);

        false.should.equal(testPeriodOne.isEqualToPeriod(testPeriodTwo));

        true.should.equal(testPeriodOne.isLessToPeriod(testPeriodTwo));
    });

    it('Should_Compare_Different_Periods_DifferentYear_AsGreater', () => {
        var testPeriodOne = new PayrolleeCommon.MonthPeriod (testPeriodCode402);

        var testPeriodTwo = new PayrolleeCommon.MonthPeriod (testPeriodCode501);

        false.should.equal(testPeriodTwo.isEqualToPeriod(testPeriodOne));

        true.should.equal(testPeriodTwo.isGreaterToPeriod(testPeriodOne));
    });

    it('Should_Compare_Different_Periods_DifferentYear_AsLess', () => {
        var testPeriodOne = new PayrolleeCommon.MonthPeriod (testPeriodCode402);

        var testPeriodTwo = new PayrolleeCommon.MonthPeriod (testPeriodCode501);

        false.should.equal(testPeriodOne.isEqualToPeriod(testPeriodTwo));

        true.should.equal(testPeriodOne.isLessToPeriod(testPeriodTwo));
    });

    it('Should_Return_Periods_Year_And_Month_2014_01', () => {
        var testPeriodOne = new PayrolleeCommon.MonthPeriod (testPeriodCodeJan);

        (2014).should.equal(testPeriodOne.Year());
        (1).should.equal(testPeriodOne.Month());

        (2014).should.equal(testPeriodOne.YearInt());
        (1).should.equal(testPeriodOne.MonthInt());
    });

    it('Should_Return_Periods_Year_And_Month_2014_02', () => {
        var testPeriodTwo = new PayrolleeCommon.MonthPeriod (testPeriodCodeFeb);

        (2014).should.equal(testPeriodTwo.Year());
        (2).should.equal(testPeriodTwo.Month());

        (2014).should.equal(testPeriodTwo.YearInt());
        (2).should.equal(testPeriodTwo.MonthInt());
    });

    it('should Return_Periods_Month_And_Year_Descriptions', () => {
        var test_period_jan = new PayrolleeCommon.MonthPeriod (test_period_code_Jan);
        var test_period_feb = new PayrolleeCommon.MonthPeriod (test_period_code_Feb);
        var test_period_501 = new PayrolleeCommon.MonthPeriod (test_period_code_501);
        var test_period_402 = new PayrolleeCommon.MonthPeriod (test_period_code_402);

        ("January 2014").should.equal(test_period_jan.description());
        ("February 2014").should.equal(test_period_feb.description());
        ("January 2015").should.equal(test_period_501.description());
        ("February 2014").should.equal(test_period_402.description());
    });

});
/**
 * Created by ladislavlisy on 29/08/15.
 */
///<reference path='../../typings/mocha/mocha.d.ts'/>
///<reference path='../../typings/should/should.d.ts'/>

require('should');
var _ = require('lodash');
var ns = require('../../lib/Payrollee.Common');

describe('SpanOfYears', () => {

    it('Should_Return_IntervalName_2013', () => {
        var testInterval = new ns.Periods.SpanOfYears(2013, 2013);
        var testName: String = testInterval.ClassName();
        true.should.equal("2013" == testName);
    });

    it('Should_Return_IntervalName_2011to2013', () => {
        var testInterval = new ns.Periods.SpanOfYears(2011, 2013);
        var testName: String = testInterval.ClassName();
        true.should.equal("2011to2013" == testName);
    });

    it('Should_Return_IntervalArray_2011_2015', () => {
        var testChangeYears: Array<number> = Array<number>(2011, 2012, 2014, 2016, 2017, 0);
        var testYearArray = new ns.Periods.SeqOfYears(testChangeYears);
        var expsIntervalArray = [
            new ns.Periods.SpanOfYears(2011, 2011),
            new ns.Periods.SpanOfYears(2012, 2013),
            new ns.Periods.SpanOfYears(2014, 2015),
            new ns.Periods.SpanOfYears(2016, 2016),
            new ns.Periods.SpanOfYears(2017, 2099)];
        var testIntervalArray = testYearArray.ToYearsIntervalList();
        var expsIntervalStrings = _.map(expsIntervalArray, (x) => x.toString());
        var testIntervalStrings = _.map(testIntervalArray, (x) => x.toString());
        var diffIntervalArray = _.difference(expsIntervalStrings, testIntervalStrings);
        true.should.equal(_.isEmpty(diffIntervalArray));
    });

    it('Should_Return_Interval_2011_For_Period_2011', () => {
        var testChangeYears: Array<number> = Array<number>(2011, 2012, 2014, 2016, 2017, 0);
        var testYearArray = new ns.Periods.SeqOfYears(testChangeYears);
        var testPeriod = ns.Periods.MonthPeriod.CreateFromYearAndMonth(2011, 1);
        var expsInterval = new ns.Periods.SpanOfYears(2011, 2011);
        var testInterval = testYearArray.YearsIntervalForPeriod(testPeriod);
        true.should.equal(expsInterval.isEqualToInterval(testInterval));
    });

    it('Should_Return_Interval_2016_For_Period_2016', () => {
        var testChangeYears: Array<number> = Array<number>(2011, 2012, 2014, 2016, 2017, 0);
        var testYearArray = new ns.Periods.SeqOfYears(testChangeYears);
        var testPeriod = ns.Periods.MonthPeriod.CreateFromYearAndMonth(2016, 1);
        var expsInterval = new ns.Periods.SpanOfYears(2016, 2016);
        var testInterval = testYearArray.YearsIntervalForPeriod(testPeriod);
        true.should.equal(expsInterval.isEqualToInterval(testInterval));
    });

    it('Should_Return_Interval_2012to2013_For_Period_2013', () => {
        var testChangeYears: Array<number> = Array<number>(2011, 2012, 2014, 2016, 2017, 0);
        var testYearArray = new ns.Periods.SeqOfYears(testChangeYears);
        var testPeriod = ns.Periods.MonthPeriod.CreateFromYearAndMonth(2013, 1);
        var expsInterval = new ns.Periods.SpanOfYears(2012, 2013);
        var testInterval = testYearArray.YearsIntervalForPeriod(testPeriod);
        true.should.equal(expsInterval.isEqualToInterval(testInterval));
    });

    it('Should_Return_Interval_2017to2099_For_Period_2018', () => {
        var testChangeYears: Array<number> = Array<number>(2011, 2012, 2014, 2016, 2017, 0);
        var testYearArray = new ns.Periods.SeqOfYears(testChangeYears);
        var testPeriod = ns.Periods.MonthPeriod.CreateFromYearAndMonth(2018, 1);
        var expsInterval = new ns.Periods.SpanOfYears(2017, 2099);
        var testInterval = testYearArray.YearsIntervalForPeriod(testPeriod);
        true.should.equal(expsInterval.isEqualToInterval(testInterval));
    });

});
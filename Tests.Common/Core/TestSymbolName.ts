/**
 * Created by ladislavlisy on 31.10.15.
 */
///<reference path='../../typings/node/node.d.ts'/>
///<reference path='../../typings/should/should.d.ts'/>
///<reference path='../../typings/mocha/mocha.d.ts'/>

require('should');
var ns = require('../../lib/Payrollee.Common');

describe('TestSymbolName', () => {
    var testSymbolCode1001 = 1001;
    var testSymbolCode2001 = 2001;
    var testSymbolCode3001 = 3001;
    var testSymbolCode4001 = 4001;
    var testSymbolCode5001 = 5001;

    it('Should_Compare_Different_Symbols_AsEqual', () => {
        var testSymbolOne = new ns.Core.SymbolName(testSymbolCode1001, "Begining Symbol");

        var testSymbolTwo = new ns.Core.SymbolName(testSymbolCode1001, "Terminal Symbol");

        true.should.equal(testSymbolOne.isEqualToSymbol(testSymbolTwo));
    });

    it('Should_Compare_Different_Symbols_AsGreater', () => {
        var testSymbolOne = new ns.Core.SymbolName(testSymbolCode1001, "Begining Symbol");

        var testSymbolTwo = new ns.Core.SymbolName(testSymbolCode5001, "Terminal Symbol");

        false.should.equal(testSymbolTwo.isEqualToSymbol(testSymbolOne));

        true.should.equal(testSymbolTwo.isGreaterToSymbol(testSymbolOne));
    });

    it('Should_Compare_Different_Symbols_AsLess', () => {
        var testSymbolOne = new ns.Core.SymbolName(testSymbolCode1001, "Begining Symbol");

        var testSymbolTwo = new ns.Core.SymbolName(testSymbolCode5001, "Terminal Symbol");

        false.should.equal(testSymbolOne.isEqualToSymbol(testSymbolTwo));

        true.should.equal(testSymbolOne.isLessToSymbol(testSymbolTwo));
    });
});

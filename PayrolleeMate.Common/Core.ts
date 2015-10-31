/**
 * Created by ladislavlisy on 28.10.15.
 */
export class SymbolName {

    private code:number;

    private name:string;

    constructor(code:number, name:string) {
        this.code = code;
        this.name = name;
    }

    Code(): number {
        return this.code;
    }

    Name(): string {
        return this.name;
    }

    Description(): string {
        return `${this.name}::${this.code}`;
    }

    compareToSymbol(other:SymbolName): number {
        if (this.Code() == other.Code()) {
            return 0;
        }
        else {
            return (this.Code() - other.Code());
        }
    }

    isEqualToSymbol(other:SymbolName): boolean {
        return (this.compareToSymbol(other) == 0);
    }

    isGreaterToSymbol(other:SymbolName): boolean {
        return (this.compareToSymbol(other) > 0);
    }

    isLessToSymbol(other:SymbolName): boolean {
        return (this.compareToSymbol(other) < 0);
    }

    toString(): string {
        return this.Code.toString();
    }
}

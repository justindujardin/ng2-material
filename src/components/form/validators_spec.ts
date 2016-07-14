import {Control} from "@angular/common";
import {MdPatternValidator, MdNumberRequiredValidator} from "../../index";

export function main() {

  describe("Validators", () => {
    describe("MdPatternValidator", () => {
      it("should not error when pattern is found", () => {
        let v = MdPatternValidator.inline('[a-z]+');
        expect(v(new Control("abcd"))).toEqual(null);
      });

      it("should error when pattern is not found", () => {
        let v = MdPatternValidator.inline('[a-z]+');
        expect(v(new Control("1234"))).toEqual({mdPattern: true});
      });
      it("should error when pattern is not found", () => {
        let v = MdPatternValidator.inline('[a-z]+');
        expect(v(new Control("1234"))).toEqual({mdPattern: true});
      });
    });
    describe("MdNumberRequiredValidator", () => {
      let v = MdNumberRequiredValidator.inline();
      it("should not error when number is found", () => {
        expect(v(new Control(2))).toEqual(null);
      });
      it("should error when number is a string", () => {
        expect(v(new Control("1234"))).toEqual({mdNumberRequired: true});
      });
      it("should error when given NaN", () => {
        expect(v(new Control(NaN))).toEqual({mdNumberRequired: true});
      });
      it("should error when given nonsense values", () => {
        expect(v(new Control(null))).toEqual({mdNumberRequired: true});
        expect(v(new Control(undefined))).toEqual({mdNumberRequired: true});
        expect(v(new Control('sunset'))).toEqual({mdNumberRequired: true});
      });
    });
  });
}

import {FormControl} from "@angular/forms";
import {MdPatternValidator, MdNumberRequiredValidator} from "../../index";

export function main() {

  describe("Validators", () => {
    describe("MdPatternValidator", () => {
      it("should not error when pattern is found", () => {
        let v = MdPatternValidator.inline('[a-z]+');
        expect(v(new FormControl("abcd"))).toEqual(null);
      });

      it("should error when pattern is not found", () => {
        let v = MdPatternValidator.inline('[a-z]+');
        expect(v(new FormControl("1234"))).toEqual({mdPattern: true});
      });
      it("should error when pattern is not found", () => {
        let v = MdPatternValidator.inline('[a-z]+');
        expect(v(new FormControl("1234"))).toEqual({mdPattern: true});
      });
    });
    describe("MdNumberRequiredValidator", () => {
      let v = MdNumberRequiredValidator.inline();
      it("should not error when number is found", () => {
        expect(v(new FormControl(2))).toEqual(null);
      });
      it("should error when number is a string", () => {
        expect(v(new FormControl("1234"))).toEqual({mdNumberRequired: true});
      });
      it("should error when given NaN", () => {
        expect(v(new FormControl(NaN))).toEqual({mdNumberRequired: true});
      });
      it("should error when given nonsense values", () => {
        expect(v(new FormControl(null))).toEqual({mdNumberRequired: true});
        expect(v(new FormControl(undefined))).toEqual({mdNumberRequired: true});
        expect(v(new FormControl('sunset'))).toEqual({mdNumberRequired: true});
      });
    });
  });
}

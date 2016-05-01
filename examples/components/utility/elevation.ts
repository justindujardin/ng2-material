import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

@Component({
  selector: 'utility-elevation',
  templateUrl: 'examples/components/utility/elevation.html',
  styleUrls: ['examples/components/utility/elevation.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class ElevationClass {
  public elevationClasses: Array<string> = ["md-elevation-z1","md-elevation-z2","md-elevation-z3","md-elevation-z4","md-elevation-z5",
    "md-elevation-z6","md-elevation-z7","md-elevation-z8","md-elevation-z9","md-elevation-z10","md-elevation-z11",
    "md-elevation-z12","md-elevation-z13","md-elevation-z14","md-elevation-z15","md-elevation-z16","md-elevation-z17",
    "md-elevation-z18","md-elevation-z19","md-elevation-z20","md-elevation-z21","md-elevation-z22","md-elevation-z23","md-elevation-z24",]
}

import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES,MdDialog} from 'ng2-material/all';
import {ElementRef} from "angular2/core";
import {Input} from "angular2/core";
import {DOM} from "angular2/src/platform/dom/dom_adapter";
import {MdDialogConfig} from "ng2-material/components/dialog/dialog_config";
import {MdDialogBasic} from "ng2-material/components/dialog/dialog_basic";
import {MdDialogRef} from "ng2-material/components/dialog/dialog_ref";


function hasMedia(size: string) {
  // TODO: Implement as $mdMedia
  return true;
}

@Component({selector: 'dialog-basic-usage'})
@View({
  templateUrl: 'examples/components/dialog/basic_usage.html',
  styleUrls: ['examples/components/dialog/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class DialogBasicUsage {

  status = '  ';
  customFullscreen = hasMedia('xs') || hasMedia('sm');

  constructor(public dialog: MdDialog, public element: ElementRef) {

  }

  showAlert(ev) {
    let config = new MdDialogConfig()
      .parent(DOM.query('#popupContainer'))
      .textContent('You can specify some description text in here')
      .title('This is an alert title')
      .ok('Got it!')
      .targetEvent(ev);
    this.dialog.open(MdDialogBasic, this.element, config);
    //// Appending dialog to document.body to cover sidenav in docs app
    //// Modal dialogs should fully cover application
    //// to prevent interaction outside of dialog
    //this.dialog.show(
    //  this.dialog.alert()
    //    .parent(angular.element(document.querySelector('#popupContainer')))
    //    .clickOutsideToClose(true)
    //    .title('This is an alert title')
    //    .textContent('You can specify some description text in here.')
    //    .ariaLabel('Alert Dialog Demo')
    //    .ok('Got it!')
    //    .targetEvent(ev)
    //);
  };

  showConfirm(ev) {
    let config = new MdDialogConfig()
      .textContent('All of the banks have agreed to forgive you your debts.')
      .clickOutsideToClose(false)
      .title('Would you like to delete your debt?')
      .ariaLabel('Lucky day')
      .ok('Please do it!')
      .cancel('Sounds like a scam')
      .targetEvent(ev);
    this.dialog
      .open(MdDialogBasic, this.element, config)
      .then((ref: MdDialogRef) => {
        ref.whenClosed.then((result) => {
          if (result) {
            this.status = 'You decided to get rid of your debt.';
          }
          else {
            this.status = 'You decided to keep your debt.';
          }
        })
      });
  };

  showAdvanced(ev) {
    //var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && this.customFullscreen;
    //
    //this.dialog.show({
    //    controller: DialogController,
    //    templateUrl: 'dialog1.tmpl.html',
    //    parent: angular.element(document.body),
    //    targetEvent: ev,
    //    clickOutsideToClose: true,
    //    fullscreen: useFullScreen
    //  })
    //  .then((answer) => {
    //    $scope.status = 'You said the information was "' + answer + '".';
    //  }, () =>{
    //    $scope.status = 'You cancelled the dialog.';
    //  });
    //
    //
    //$scope.$watch(() =>{
    //  return $mdMedia('xs') || $mdMedia('sm');
    //}, (wantsFullScreen) => {
    //  this.customFullscreen = (wantsFullScreen === true);
    //});

  };

  showTabDialog(ev) {
    //this.dialog.show({
    //    controller: DialogController,
    //    templateUrl: 'tabDialog.tmpl.html',
    //    parent: angular.element(document.body),
    //    targetEvent: ev,
    //    clickOutsideToClose: true
    //  })
    //  .then((answer) => {
    //    this.status = 'You said the information was "' + answer + '".';
    //  }, () =>{
    //    this.status = 'You cancelled the dialog.';
    //  });
  };
}

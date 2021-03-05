import { LightningElement, wire, api, track } from "lwc";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import Project__c_Object from '@salesforce/schema/Project__c';
export default class Firstassign extends NavigationMixin (LightningElement) {

  @track isModalOpen = false;
//selectedvalues;
//selectvalues;
//selvalues;
//svalues;

  showModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }
  get modalClass() {
    return `slds-modal ${this.isModalOpen ? "slds-fade-in-open" : ""}`;
  }
  get modalBackdropClass() {
    return `slds-backdrop ${this.isModalOpen ? "slds-backdrop_open" : ""}`;
  }
  redirect = true;
  resetpage = false;
  saveClickfunc(event) {
      const wer = new ShowToastEvent({
          title: 'Success',
          message: 'Project Record Created Successfully',
          variant: 'success'
      });
      this.dispatchEvent(wer);
      if(this.redirect == true){
          let creditnoteId = event.detail.id;
          this[NavigationMixin.Navigate]({
              type: 'standard__recordPage',
              attributes: {
                  recordId:creditnoteId,
                  objectApiName:'Project__c',
                  actionName:'view'
              }
          })
      }
      if(this.resetpage== true){
          this.handleReset();
      }
  }

  handleError(event){
      const hea = new ShowToastEvent({
          title: 'Error Occurred',
          message: event.detail.detail,
          variant: 'error',
          mode:'dismissable'
      });
      this.dispatchEvent(hea);
  }

  saveAndNewfunc() {
      this.redirect = false;
      this.template.querySelector('lightning-record-edit-form').submit(this.fields);
      this.resetpage = true;
  }
  
  handleReset() {
     const xxx = this.template.querySelectorAll(
         'lightning-input-field','lightning-file-upload'
     );
     if (xxx) {
         xxx.forEach(field => {
             field.reset();
         });
     }
  }
  
  Cancelfunc(event){
      var ur = window.location.href; 
      var val = ur.substr(0,url.lastIndexOf('/') + 1);
      window.history.back();
      return false;
  }
}


sap.ui.define(
  [
      "sap/ui/core/mvc/Controller"
  ],
  function(Controller) {
    "use strict";

    return Controller.extend("com.app.library.controller.IssueBooks", {
      onInit: function() {
      },
      
       onIssueBookPress:function(oEvent) {
          var oTable = this.getView().byId("idUserLoans");
          var aSelectedIndices = oTable.getSelectedIndices();
          
          if (aSelectedIndices.length === 0) {
             sap.m.MessageToast.show("Please select a row to issue a book.");
             return;
        }
      }
    
        //  aSelectedIndices.forEach(function(iIndex) {
        //     var oItem = oTable.getItems()[iIndex];
        //    oItem.addStyleClass("lightRedBackground"); 
        
    })
  });
       
  
   
 

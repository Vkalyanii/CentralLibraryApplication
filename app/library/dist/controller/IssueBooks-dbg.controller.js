sap.ui.define(
  [
    "./BaseController",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
  ],
  function(Controller,ODataModel,JSONModel,MessageToast) {
    "use strict";

    return Controller.extend("com.app.library.controller.IssueBooks", {
      onInit: function() {
      },
      
       onIssueBookPress: async function (oEvent) {
        console.log(this.byId("idUserLoans").getSelectedItem().getBindingContext().getObject())
        // var oSelectedItem = oEvent.getSource().getParent();
        // console.log(oSelectedItem)
        // console.log(oEvent.getSource().getBindingContext().getObject())
        // console.log(oEvent.getParameters())
        // var oSelectedUser = oSelectedItem.getBindingContext().getObject();
        if(this.byId("idUserLoans").getSelectedItems().length>1){
            MessageToast.show("Please Select only one Book");
            return
        }
        var oSelectedBook=this.byId("idIssueBooks").getSelectedItem().getBindingContext().getObject()
        console.log(oSelectedBook)

        const userModel = new sap.ui.model.json.JSONModel({
            bookId_ID : oSelectedBook.book.ID,
            userId_ID: oSelectedBook.user.ID,
            issueDate: new Date(),
            dueDate:new Date()
        });
        this.getView().setModel(userModel, "userModel");

        const oPayload = this.getView().getModel("userModel").getProperty("/"),
            oModel = this.getView().getModel("modelv2");

        try {
            await this.createData(oModel, oPayload, "/BookLoans");
            sap.m.MessageBox.success("Book is Succesfully Issued");
            //this.getView().byId("idIssueBooks").getBinding("items").refresh();
            //this.oCreateBooksDialog.close();
        } catch (error) {
            //this.oCreateBooksDialog.close();
            sap.m.MessageBox.error("Some technical Issue");
        }
    },
    })
  });
       
  
   
 

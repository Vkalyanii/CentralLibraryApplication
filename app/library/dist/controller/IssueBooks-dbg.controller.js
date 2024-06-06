sap.ui.define(
  [
    "./BaseController",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
  ],
  function (Controller, ODataModel, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("com.app.library.controller.IssueBooks", {
      onInit: function () {
       
        var oTable = this.byId("idIssueBooks");
        var oColumn1 = oTable.getColumns()[6]; 
        oColumn1.setVisible(false);
      },

      onIssueBookPress: async function (oEvent) {
        console.log(
          this.byId("idIssueBooks")
            .getSelectedItem()
            .getBindingContext()
            .getObject()
        );
        // var oSelectedItem = oEvent.getSource().getParent();
        // console.log(oSelectedItem)
        // console.log(oEvent.getSource().getBindingContext().getObject())
        // console.log(oEvent.getParameters())
        // var oSelectedUser = oSelectedItem.getBindingContext().getObject();
        if (this.byId("idIssueBooks").getSelectedItems().length > 1) {
          MessageToast.show("Please Select only one Book");
          return;
        }
        var oSelectedBook = this.byId("idIssueBooks")
          .getSelectedItem()
          .getBindingContext()
          .getObject(),
          oAval=oSelectedBook.book.Avl_Quantity-1
        
        console.log(oSelectedBook);
        var now = new Date();
        if (now.getMonth() == 11) {
          var current = new Date(now.getFullYear() + 1, 0, 1);
        } else {
          var current = new Date(now.getFullYear(), now.getMonth() + 1);
          console.log(current);
        }
        const userModel = new sap.ui.model.json.JSONModel({
          book_ID: oSelectedBook.book.ID,
          user_ID_ID: oSelectedBook.user_ID.ID,
          issue_Date: now,
          due_Date: current,
          notify: `Hey! Your Reserved Book  title "
            ${oSelectedBook.book.Title}
            " is issued`,
            book:{
              Avl_Quantity:oAval
            }

        });
        this.getView().setModel(userModel, "userModel");

        const oPayload = this.getView().getModel("userModel").getProperty("/"),
          oModel = this.getView().getModel("modelv2");

        try {
          await this.createData(oModel, oPayload, "/BookLoan");
          sap.m.MessageBox.success("Book is Succesfully Issued");
          this.byId("idIssueBooks")
            .getSelectedItem()
            .getBindingContext()
            .delete("$auto");
            oModel.update("/Book(" + oSelectedBook.book.ID + ")", oPayload.book, {
              success: function() {
                  // this.getView().byId("idBooksTable").getBinding("items").refresh();
                  //this.oEditBooksDialog.close();
              },
              error: function(oError) {
                  //this.oEditBooksDialog.close();
                  sap.m.MessageBox.error("Failed to update book: " + oError.message);
              }.bind(this)
          });

          //this.getView().byId("idIssueBooks").getBinding("items").refresh();
          //this.oCreateBooksDialog.close();
          var oIssuebooksTable = this.byId("idIssueBooks");
          var oSelectedItem = oIssuebooksTable.getSelectedItem();
          oIssuebooksTable.removeItem(oSelectedItem);
        } catch (error) {
          //this.oCreateBooksDialog.close();
          sap.m.MessageBox.error("Some technical Issue");
        }
      },
    });
  }
);

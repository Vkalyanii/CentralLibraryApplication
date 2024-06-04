sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/Token",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel, MessageBox, Token,ODataModel,MessageToast) {
        "use strict";
 
        return Controller.extend("com.app.library.controller.ActiveLoans", {
           onInit:function(){
            // var oModel = new ODataModel("/v2/BooksSRV/");
            //        this.getView().setModel(oModel);
           
            },
            setHeaderContext: function () {
                var oView = this.getView();
                oView.byId("idUserLoans").setBindingContext(
                    oView.byId("_IDGenTable1").getBinding("items").getHeaderContext());
            },
            onButtonCloseLoanPress:async function () {
                //console.log(this.byId("idUserLoans").getSelectedItem().getBindingContext().getObject())
                var obj = this.byId("idUserLoans").getSelectedItem().getBindingContext().getObject(),
                oId=obj.book.ID,
                oAvaiable = obj.book.Avl_Quantity+1;
                var aSelectedItems = this.byId("idUserLoans").getSelectedItems();
                console.log()
                const userModel = new sap.ui.model.json.JSONModel({
                   
                    book:{
                        Avl_Quantity:oAvaiable
                    }
 
                });
                this.getView().setModel(userModel, "userModel");
 
                const oPayload = this.getView().getModel("userModel").getProperty("/"),
                    oModel = this.getView().getModel("modelv2");
                    try{
                    oModel.update("/Book(" + oId + ")", oPayload.book, {
                        success: function() {
                            this.getView().byId("idBooksTable").getBinding("items").refresh();//
                            //this.oEditBooksDialog.close();
                        },
                        error: function(oError) {
                            //this.oEditBooksDialog.close();
                            sap.m.MessageBox.error("Failed to update book: " + oError.message);
                        }.bind(this)
                    });
                }catch (error) {
                    //this.oCreateBooksDialog.close();
                    sap.m.MessageBox.error("Some technical Issue");
                }

                var aSelectedItems = this.byId("idUserLoans").getSelectedItems();
                if (aSelectedItems.length > 0) {
                    var aISBNs = [];
                    aSelectedItems.forEach(function (oSelectedItem) {
                        var sISBN = oSelectedItem.getBindingContext().getObject().book.ISBN;
                        aISBNs.push(sISBN);
                        oSelectedItem.getBindingContext().delete("$auto");
                    });
 
                    Promise.all(aISBNs.map(function (sISBN) {
                        return new Promise(function (resolve, reject) {
                            resolve(sISBN + " Successfully Loan is Closed");
                        });
                    })).then(function (aMessages) {
                        aMessages.forEach(function (sMessage) {
                            MessageToast.show(sMessage);
                        });
                    }).catch(function (oError) {
                        MessageToast.show("Deletion Error: " + oError);
                    });
 
                    this.getView().byId("idBookTable").removeSelections(true);
                    //this.getView().byId("idBookTable").getBinding("items").refresh();
                } else {
                    MessageToast.show("Please Select Rows to Delete");
                };
               location.reload()
            }
        });
    });
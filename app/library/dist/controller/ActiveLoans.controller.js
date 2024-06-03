sap.ui.define(["./BaseController","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/json/JSONModel","sap/m/MessageBox","sap/m/Token","sap/ui/model/odata/v2/ODataModel","sap/m/MessageToast"],function(e,t,o,n,s,i,a,r){"use strict";return e.extend("com.app.library.controller.ActiveLoans",{onInit:function(){},setHeaderContext:function(){var e=this.getView();e.byId("idUserLoans").setBindingContext(e.byId("_IDGenTable1").getBinding("items").getHeaderContext())},onButtonCloseLoanPress:async function(){var e=this.byId("idUserLoans").getSelectedItems();if(e.length>0){var t=[];e.forEach(function(e){var o=e.getBindingContext().getObject().book.ISBN;t.push(o);e.getBindingContext().delete("$auto")});Promise.all(t.map(function(e){return new Promise(function(t,o){t(e+" Successfully Loan is Closed")})})).then(function(e){e.forEach(function(e){r.show(e)})}).catch(function(e){r.show("Deletion Error: "+e)});this.getView().byId("idBookTable").removeSelections(true)}else{r.show("Please Select Rows to Delete")}location.reload()}})});
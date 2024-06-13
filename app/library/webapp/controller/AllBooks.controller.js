sap.ui.define(
    [
      
        "./BaseController",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageBox",
        "sap/m/Token",
        "sap/m/MessageToast"
    ],
    function(Controller,Filter,FilterOperator,JSONModel,MessageBox,Token,MessageToast) {
      "use strict";
  
      return Controller.extend("com.app.library.controller.AllBooks", {
        onInit: function() {

          const oRouter = this.getOwnerComponent().getRouter();
        oRouter.attachRoutePatternMatched(this.onUserDetailsLoad, this); 

          const oView1 = this.getView();
          const oMulti1 = oView1.byId("idtitleFilterValue");
          const oMulti2 = oView1.byId("idAuthorFilterValue");
          const oMulti3 = oView1.byId("idGenreFilterValue");
          const oMulti4 = oView1.byId("idISBNFilterValue");
  
          let validate = function (arg) {
            if (true) {
              var text = arg.text;
              return new Token({ key: text, text: text });
            }
          };
          oMulti1.addValidator(validate);
          oMulti2.addValidator(validate);
          oMulti3.addValidator(validate);
          oMulti4.addValidator(validate);
       
  
  
        },
        onUserDetailsLoad: function (oEvent) {
          const { id } = oEvent.getParameter("arguments");
          this.ID = id;
          const sRouterName = oEvent.getParameter("name");
          const oObjectPage = this.getView().byId("idAllBooks");
  
          oObjectPage.bindElement(`/User(${id})`);
        },

        onGoPress: function () {
          /**
           * Create all the filters
           * Use Multi Input in Filters so that we can push multiple filters at a time
           * Add the Functionality for Clear Filter
           */
          const oView = this.getView(),
  
            oTitleFilter = oView.byId("idtitleFilterValue"),
            sTitle = oTitleFilter.getTokens(),
  
            oAuthorFilter = oView.byId("idAuthorFilterValue"),
            sAuthor = oAuthorFilter.getTokens(),
  
            oISBNFilter = oView.byId("idISBNFilterValue"),
            sISBN = oISBNFilter.getTokens(),
  
            oGenreFilter = oView.byId("idGenreFilterValue"),
            sGenre = oGenreFilter.getTokens(),
  
            oTable = oView.byId("idAllBooksTable"),
            aFilters = [];
  
          sTitle.filter((ele) => {
            ele ? aFilters.push(new Filter("Title", FilterOperator.EQ, ele.getKey())) : "";
          });
  
          sAuthor.filter((ele) => {
            ele ? aFilters.push(new Filter("Author", FilterOperator.EQ, ele.getKey())) : "";
          });
  
          sISBN.filter((ele) => {
            ele ? aFilters.push(new Filter("ISBN", FilterOperator.EQ, ele.getKey())) : "";
          });
  
          sGenre.filter((ele) => {
            ele ? aFilters.push(new Filter("Genre", FilterOperator.EQ, ele.getKey())) : "";
          });
  
          oTable.getBinding("items").filter(aFilters);
        },
  
        onClearFilterPress: function () {
          const view = this.getView(),
            clearTitle = view.byId("idtitleFilterValue"),
            sTitle = clearTitle.removeAllTokens(),
            clearauthor = view.byId("idAuthorFilterValue"),
            sAuthor = clearauthor.removeAllTokens(),
            cleargenre = view.byId("idGenreFilterValue"),
            sISBN = cleargenre.removeAllTokens(),
            clearISBN = view.byId("idISBNFilterValue"),
            sGenre = clearISBN.removeAllTokens()
  
        },
        onReserve:async function (oEvent) {
          console.log(typeof(this.getView().byId("idte").getText()))
          //console.log(this.byId("idAllBooksTable").getSelectedItem().getBindingContext().getObject())
          var oSelectedItem = oEvent.getSource().getParent();
          //console.log(oSelectedItem)
          
          // console.log(oEvent.getSource().getBindingContext().getObject())
          //console.log(oEvent.getParameters())
          var oSelectedUser = oSelectedItem.getBindingContext();
         console.log(oEvent.getSource().getParent().getBindingContext().getObject())
          console.log(oSelectedUser)
          var user_id = this.ID;

          
          //console.log(user_id);
          if(this.byId("idAllBooksTable").getSelectedItems().length>1){
              MessageToast.show("Please Select only one Book");
              return
          }
          var oSelectedBook=this.byId("idAllBooksTable").getSelectedItem().getBindingContext().getObject()
          console.log(oSelectedBook.Avl_Quantity)
                if(oSelectedBook.Avl_Quantity===0){
                    MessageToast.show("Book not available")
                    return
                }
          var oQuantity=oSelectedBook.Avl_Quantity-1;
                console.log(oQuantity)

          const userModel = new sap.ui.model.json.JSONModel({
            user_ID_ID: user_id,
            book_ID: oSelectedBook.ID,
            
            reservation_date: new Date(),
            book:{
              Avl_Quantity:oQuantity
            }
          });
          this.getView().setModel(userModel, "userModel");

          const oPayload = this.getView().getModel("userModel").getProperty("/"),
              oModel = this.getView().getModel("modelv2");

          try {
              await this.createData(oModel, oPayload, "/Reservation");
              sap.m.MessageBox.success("Book is Reserved");
              //this.getView().byId("idIssueBooks").getBinding("items").refresh();
              //this.oCreateBooksDialog.close();
            //   oModel.update("/Book(" + oSelectedBook.ID + ")", oPayload.book, {
            //     success: function() {
            //         this.getView().byId("idAllBooksTable").getBinding("items").refresh();
            //         //this.oEditBooksDialog.close();
            //     }.bind(this),
            //     error: function(oError) {
            //         //this.oEditBooksDialog.close();
            //         sap.m.MessageBox.error("Failed to update book: " + oError.message);
            //     }.bind(this)
            // });
          } catch (error) {
              //this.oCreateBooksDialog.close();
              sap.m.MessageBox.error("Some technical Issue");
          }
      },
     
      });
    }
  );
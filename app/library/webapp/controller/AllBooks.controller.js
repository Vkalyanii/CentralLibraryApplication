sap.ui.define(
    [
      
        "./BaseController",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageBox",
        "sap/m/Token",
    ],
    function(Controller,Filter,FilterOperator,JSONModel,MessageBox,Token) {
      "use strict";
  
      return Controller.extend("com.app.library.controller.AllBooks", {
        onInit: function() {

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
     
      });
    }
  );
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
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Filter, FilterOperator, JSONModel, MessageBox, Token,MessageToast) {
    "use strict";

    return Controller.extend("com.app.library.controller.Admin", {
      onInit: function () {

        this.oQuantity = null;
                this.oAq = null;

        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.attachRoutePatternMatched(this.onUserDetailsLoad,this);

        //     var oTable=this.byId("idBookTable");
        //     var oBinding =oTable.getBinding("items");
        //     oBinding.attachChange(this._updateRowCount.bind(this));
        //     this._updateRowCount();
        // },
        // _updateRowCount:function(){
        //     var oTable = this.byId("idBookTable");
        //     var oBinding=oTable.getBinding("items");
        //     var iRowCount =oBinding.getLength();
        //     var oInput =this.byId("idTotalBooks");
        //     oInput.setValue(iRowCount);
        //     console.log(oInput.getValue())
        const oLocalModel = new JSONModel({
          ISBN: "",
          Title: "",
          Author: "",
          Genre: "",
          No_of_books: 0,
          Description: "",
          Avl_Quantity:0
        });
        this.getView().setModel(oLocalModel, "localModel");
        this.getOwnerComponent().getRouter().attachRoutePatternMatched(this.onBookListLoad, this);

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
      setHeaderContext: function () {
        var oView = this.getView();
        oView.byId("Bookstitle").setBindingContext(oView.byId("_IDGenTable1").getBinding("items").getHeaderContext());
      },

      //     var oTable = this.getView().byId("idBookTable"); // Replace "yourTableId" with the ID of your table
      //     var oBinding = oTable.getBinding("items");
      //     oBinding.attachEvent("updateFinished", this.onTableUpdateFinished, this);

      //   },
      //   setHeaderContext : function () {
      //       var oView = this.getView();
      //       oView.byId("Bookstitle").setBindingContext(
      //           oView.byId("_IDGenTable1").getBinding("items").getHeaderContext());
      //   },
      // onTableUpdateFinished: function(oEvent) {
      //     var oTable = oEvent.getSource().getParent(); // Get the table
      //     var oBinding = oEvent.getSource(); // Get the binding
      //     var iRowCount = oBinding.getLength(); // Get the number of rows

      //     console.log("Number of rows: " + iRowCount);
      // },
      onBookListLoad: function () {
        this.getView().byId("idBookTable").getBinding("items").refresh();
      },
    
    onUserDetailsLoad:function(oEvent){
        const{id}=oEvent.getParameter("arguments");
        this.ID=id;
        //const sRouterName=oEvent.getParameter("name");
        const oObjectPage=this.getView().byId("idBooks");

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

          oTable = oView.byId("idBookTable"),
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

      onCreateBtnPress: async function () {
        if (!this.oCreateEmployeeDialog) {
          this.oCreateEmployeeDialog = await this.loadFragment(
            "CreateBookDialog"
          );
        }
        this.oCreateEmployeeDialog.open();
      },

      onCloseDialog: function () {
        if (this.oCreateEmployeeDialog.isOpen()) {
          this.oCreateEmployeeDialog.close();
        }
      },

      oncancelbtnbook: function () {
        if (this.oCreateEmployeeDialog.isOpen()) {
          this.oCreateEmployeeDialog.close();
        }
      },

      onCreateBook: async function () {
        debugger;
        var oPayload = this.getView().getModel("localModel").getProperty("/"),

        oModel = this.getView().getModel("modelv2");
        oPayload.Avl_Quantity=oPayload.No_of_books;
        this.getView().getModel("localModel").setData(oPayload);
        if (!(oPayload.ISBN && oPayload.Author&& oPayload.Genre && oPayload.Description&& oPayload.No_of_books && oPayload.Title)) {
            MessageToast.show("Enter all details");
            return
        }
          // oModel = this.getView().getModel("modelv2");
        console.log(typeof (oPayload.No_of_books));
        try {
          const oTitleExist = await this.checkTitle(oModel, oPayload.Title, oPayload.ISBN)
          if (oTitleExist) {
              MessageToast.show("Book already exsist")
              return
          }
          await this.createData(oModel, oPayload, "/Book");
          this.getView().byId("idBookTable").getBinding("items").refresh();
          this.oCreateEmployeeDialog.close();
        } catch (error) {
          this.oCreateEmployeeDialog.close();
          MessageBox.error("Some technical Issue");
        }
        location.reload();
      },

      onDeleteBtnPress: async function () {
        var aSelectedItems = this.byId("idBookTable").getSelectedItems();
        if (aSelectedItems.length > 0) {
          var aISBNs = [];
          aSelectedItems.forEach(function (oSelectedItem) {
            var sISBN = oSelectedItem.getBindingContext().getObject().isbn;
            aISBNs.push(sISBN);
            oSelectedItem.getBindingContext().delete("$auto");
          });

          Promise.all(
            aISBNs.map(function (sISBN) {
              return new Promise(function (resolve, reject) {
                resolve(sISBN + " Successfully Deleted");
              });
            })
          )
            .then(function (aMessages) {
              aMessages.forEach(function (sMessage) {
                MessageToast.show(sMessage);
              });
            })
            .catch(function (oError) {
              MessageToast.show("Deletion Error: " + oError);
            });

          this.getView().byId("idBookTable").removeSelections(true);
          this.getView().byId("idBookTable").getBinding("items").refresh();
        } else {
          MessageToast.show("Please Select Rows to Delete");
        }
        location.reload();
      },

      // onUpdateBtnPress: function () {
      //   var oBookTable = this.byId("idBookTable");
      //   var oSelectedBook = oBookTable.getSelectedItem();

      //   if (oSelectedBook) {
      //     // Get the selected book's details
      //     var oSelectedBookContext = oSelectedBook.getBindingContext();
      //     var sISBN = oSelectedBookContext.getProperty("isbn");
      //     var sTitle = oSelectedBookContext.getProperty("title");
      //     var sAuthor = oSelectedBookContext.getProperty("author");
      //     // Assuming you have other properties like title, author, etc.

      //     // Open an edit dialog
      //     this.openEditDialog(sISBN, sTitle, sAuthor); // Pass book details to the dialog
      //   } else {
      //     MessageToast.show("Please Select a Book to Edit");
      //   }
      // },

      onUpdateBtnPress: async function () {
        var oSelected = this.byId("idBookTable").getSelectedItems();
        if (oSelected.length === 0) {
          MessageToast.show("Please Select atleast one Book to Edit");
          return
      }
      
      if (oSelected.length > 1) {
          MessageToast.show("Please Select only one Book to Edit");
          return
      }
        if (oSelected) {
          var oID = oSelected[0].getBindingContext().getProperty("ID");
          var oISBN = oSelected[0].getBindingContext().getProperty("ISBN");
          var oAuthorname = oSelected[0].getBindingContext().getProperty("Author");
          var otitle = oSelected[0].getBindingContext().getProperty("Title");
          var oGenree = oSelected[0].getBindingContext().getProperty("Genre");
          this.oQuantity = oSelected[0].getBindingContext().getProperty("No_of_books");
          var oDescriptionn = oSelected[0].getBindingContext().getProperty("Description");
      this.oAq= oSelected[0].getBindingContext().getProperty("Avl_Quantity");
          // var oAq=oSelected.getBindingContext().getProperty("Avl_Quantity");
          //           if(oAq===oQuantity){
          //               oAq=oQuantity
          //           }
          //           else if(oAq<oQuantity){
          //               let count=oQuantity-oAq
          //               oAq=+count
          //           }
          //           else{
          //               let count=oAq-oQuantity
          //               oAq=-count
          //           }


          var newBookModel = new sap.ui.model.json.JSONModel({
            ID:oID,
            ISBN: oISBN,
            Author: oAuthorname,
            Title: otitle,
            Genre: oGenree,
            No_of_books: this.oQuantity,
            Description: oDescriptionn,
            Avl_Quantity:this.oAq

          });

          this.getView().setModel(newBookModel, "newBookModel");

          if (!this.oEditBooksDialog) {
            this.oEditBooksDialog = await this.loadFragment("EditBook"); // Load your fragment asynchronously
          }

          this.oEditBooksDialog.open();
          var oPayload = this.getView().getModel("newBookModel").getData();
          console.log(oPayload)
        }
      },

      onSave: function () {
        var oQ = parseInt(this.getView().byId("idNo_of_booksVal").getValue());
                var oAq = parseInt(this.getView().byId("idAvailabilityVal").getValue());
                if (this.oQuantity < oQ) {
                    oQ = oQ - this.oQuantity
                    oAq = oAq + oQ
                }
                else if (this.oQuantity > oQ) {
                    oQ = this.oQuantity - oQ
                    oAq = oAq - oQ
                }
                else {
                    oAq = oAq
                }
                console.log(oQ)
        var oPayload = this.getView().getModel("newBookModel").getData();
        oPayload.Avl_Quantity = oAq
        this.getView().getModel("newBookModel").setData(oPayload);
        var oDataModel = this.getOwnerComponent().getModel("modelv2");// Assuming this is your OData V2 model
        console.log(oDataModel.getMetadata().getName());

        try {
          // Assuming your update method is provided by your OData V2 model
          oDataModel.update("/Book(" + oPayload.ID  + ")", oPayload, {
            success: function () {
              this.getView().byId("idBookTable").getBinding("items").refresh();
              this.oEditBooksDialog.close();
            }.bind(this),
            error: function (oError) {
              this.oEditBooksDialog.close();
              sap.m.MessageBox.error("Failed to update book: " + oError.message);
              
            }.bind(this)
          });
        } catch (error) {
          this.oEditBooksDialog.close();
          sap.m.MessageBox.error("Some technical Issue");
        }


        var oDataModel = new sap.ui.model.odata.v2.ODataModel({
          serviceUrl: "https://port4004-workspaces-ws-dv77z.us10.trial.applicationstudio.cloud.sap/v2/BookSRV",
          defaultBindingMode: sap.ui.model.BindingMode.TwoWay,
          // Configure message parser
          messageParser: sap.ui.model.odata.ODataMessageParser
        })
      },


      onClose: function () {
        if (this.oEditBooksDialog.isOpen()) {
          this.oEditBooksDialog.close();
        }
      },


      onActiveLoans: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteActiveLoans")
      },
      onIssueBooks: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteIssueBooks")
      },
      onClickUsers: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteAllUsers")
      },
      checkTitle: async function (oModel, stitle, sISBN) {
        return new Promise((resolve, reject) => {
            oModel.read("/Book", {
                filters: [
                    new Filter("Title", FilterOperator.EQ, stitle),
                    new Filter("ISBN", FilterOperator.EQ, sISBN)

                ],
                success: function (oData) {
                    resolve(oData.results.length > 0);
                },
                error: function () {
                    reject(
                        "An error occurred while checking username existence."
                    );
                }
            })
        })
    },


    });
  });


sap.ui.define(
  [
    "./BaseController",
    "sap/m/MessageToast",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    Controller,
    MessageToast,
    ODataModel,
    Filter,
    FilterOperator,
    JSONModel
  ) {
    "use strict";

    return Controller.extend("com.app.library.controller.Home", {
      onInit: function () {
        var oModel = new ODataModel("/v2/BookSRV/");
        this.getView().setModel(oModel);
        const oLocalModel = new JSONModel({
          username: "",
          password: "",
          email: "",
          FullName: "",
          Address: "",
          Phone: "",
          userType:"user"
        });
        this.getView().setModel(oLocalModel, "localModel");
      },
      onBtnClick: function () {
        var oView = this.getView();

        var sUsername = oView.byId("user").getValue(); //get input value data in oUser variable
        var sPassword = oView.byId("pwd").getValue(); //get input value data in oPwd variable

        if (!sUsername || !sPassword) {
          MessageToast.show("please enter username and password.");
          return;
        }

        var oModel = this.getView().getModel();
        oModel.read("/User", {
          filters: [
            new Filter("username", FilterOperator.EQ, sUsername),
            new Filter("password", FilterOperator.EQ, sPassword),
          ],
          success: function (oData) {
            if (oData.results.length > 0) {
              var userId = oData.results[0].ID;
              var usertype = oData.results[0].userType;
              MessageToast.show("Login Successful");
              if (usertype === "user") {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteUser", { id: userId });
              } else {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteAdmin", { id: userId });
              }
            } else {
              MessageToast.show("Invalid username or password.");
            }
          }.bind(this),
          error: function () {
            MessageToast.show("An error occured during login.");
          },
        });
      },
      onloginBtnClick: async function () {
        if (!this.oLoginDialog) {
          this.oLoginDialog = await this.loadFragment("LoginDialog");
        }

        this.oLoginDialog.open();
      },
      oncancelbtn: function () {
        if (this.oLoginDialog.isOpen()) {
          this.oLoginDialog.close();
        }
      },

      onCloseDialog: function () {
        if (this.oLoginDialog && this.oLoginDialog.isOpen()) {
          this.oLoginDialog.close();
        }
      },

      signupBtnClick: async function () {

        const oPayload = this.getView().getModel("localModel").getProperty("/"),
          oModel = this.getView().getModel("modelv2");
        try {
          await this.createData(oModel, oPayload, "/User");
          // this.getView().byId("idBooksTable").getBinding("items").refresh();
          this.oSignupDialog.close();
          MessageToast.show("SignUp Successful");
        } catch (error) {
          this.oSignupDialog.close();
         sap.m.MessageBox.error("Some technical Issue");
        }
      },
      onClickSignUp: async function () {
        if (!this.oSignupDialog) {
          this.oSignupDialog = await this.loadFragment("SignUpDialogue")
        }
        this.oSignupDialog.open();
      },
      onsignupcancelbtn: function () {
        if (this.oSignupDialog.isOpen()) {
          this.oSignupDialog.close()
        }
      },

    });
  }
);

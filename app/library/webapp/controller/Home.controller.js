sap.ui.define(
  [
    "./BaseController",
    "sap/m/MessageToast",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
	
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
    JSONModel,
    Fragment,
  
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
     

          if (oPayload.username && oPayload.password) {
        }
        else {
            sap.m.MessageBox.error("Please enter valid details");
            return
        }
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        var phoneRegex=/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
        if(!(emailRegex.test(oPayload.email)&&phoneRegex.test(oPayload.Phone))){
            MessageToast.show("please enter valid email and password")
            return
        }
        try {
            var oTitleExist = await this.checkUserName(oModel, oPayload.username, oPayload.password)
            var OemailCheck=await this.checkEmail(oModel,oPayload.email)
            var oPhoneCheck=await this.checkPhone(oModel,oPayload.Phone)
        // try {
        //     //const oTitleExist = await this.checkUserName(oModel, oPayload.username, oPayload.password)
            if (oTitleExist) {
                MessageToast.show("User already exsist")
                return
              }
              if(OemailCheck){
                  MessageToast.show("Email already exsist for another user please enter vaild email ")
                  return
              }
              if(oPhoneCheck){
                  MessageToast.show("PhoneNumber already exsist for another user please enter valid Phonenumber")
                  return
              }

          await this.createData(oModel, oPayload, "/User");
          // this.getView().byId("idBooksTable").getBinding("items").refresh();
          this.oSignupDialog.close();
          MessageToast.show("SignUp Successful");
        } catch (error) {
          this.oSignupDialog.close();
         sap.m.MessageBox.error("Some technical Issue");
    
        }
      },
  
  checkUserName: async function (oModel, sUsername, sPassword) {
      return new Promise((resolve, reject) => {
          oModel.read("/User", {
              filters: [
                  new Filter("username", FilterOperator.EQ, sUsername),
                  new Filter("password", FilterOperator.EQ, sPassword)

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
  checkEmail: async function (oModel, semail) {
    return new Promise((resolve, reject) => {
        oModel.read("/User", {
            filters: [
                new Filter("email", FilterOperator.EQ, semail),
                //new Filter("password", FilterOperator.EQ, sPassword)

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
checkPhone: async function (oModel, sPhone) {
  return new Promise((resolve, reject) => {
      oModel.read("/User", {
          filters: [
              new Filter("Phone", FilterOperator.EQ, sPhone),
              //new Filter("password", FilterOperator.EQ, sPassword)

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
      onClickSignUp: async function() {
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
      onhandleCompanyQuickViewPress : async function () {
        if (!this.notificationDialog1) {
            this.notificationDialog1 = await this.loadFragment("HomePageCompanyDetails")
        }
        this.notificationDialog1.open();
      },
       onAdminDetailscancelbtn: function () {
        this.notificationDialog1.open();
        this.notificationDialog1.close();
        
      },
      AvailableBooksBtn: async function () {
        if (!this.libraryinfo) {
            this.libraryinfo = await this.loadFragment("libraryinfo")
        }
        this.libraryinfo.open();
    },
    onlibraryclosedialog: function () {
        if(this.libraryinfo.isOpen()){
        this.libraryinfo.close()
        }
    },

        // const oObjectPage = this.getView().byId("idloginDialog");

        // oObjectPage.bindElement(`/User(${this.ID})`);
    
      // onNavigate: function (oEvent) {
      //   var oNavOrigin = oEvent.getParameter("navOrigin");
      //   if (oNavOrigin) {
      //     MessageToast.show("Link '" + oNavOrigin.getText() + "' was clicked");
      //   } else {
      //     MessageToast.show("Back button was clicked");
      //   }
    }
    )

  

    });
;

sap.ui.define([
    
    "./BaseController",
    "sap/ui/core/mvc/Controller"
   
  
  ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
 
        return Controller.extend("com.app.library.controller.User", {
            onInit: function() {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.attachRoutePatternMatched(this.onUserDetailsLoad, this);

               
            },
            onUserDetailsLoad: function(oEvent ){
                const {id} = oEvent.getParameter("arguments");
                this.ID = id;
                 const sRouterName = oEvent.getParameter("name");
                const oObjectPage = this.getView().byId("ObjectPageLayout");
   
                oObjectPage.bindElement(`/User(${id})`);
            },
            onAllBooksPress:function(oEvent){
                console.log(oEvent.getSource().getParent().getBindingContext().getObject());
                var user_id = oEvent.getSource().getParent().getBindingContext().getObject().ID;
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteAllBooks",{
                    id :user_id
           
                })
            },
            onNotificationPress: async function () {
                if (!this.notificationDialog) {
                    this.notificationDialog = await this.loadFragment("Notify")
                }
                this.notificationDialog.open();
            },
            onCloseDialog: function () {
                if (this.notificationDialog.isOpen()) {
                    this.notificationDialog.close()
                }
            },
        
           
           
        });
    });
 

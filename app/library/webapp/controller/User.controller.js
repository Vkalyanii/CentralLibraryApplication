sap.ui.define([
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
            onAllBooksPress:function(){
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteAllBooks")
            },
        
        
           
           
        });
    });
 

sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
 
        return Controller.extend("com.app.library.controller.AllUsers", {
            onInit: function() {
                
                const oRouter = this.getOwnerComponent().getRouter();
            },
            //     oRouter.attachRoutePatternMatched(this.onUserDetailsLoad, this); 
            
            // onUserDetailsLoad: function(oEvent ){
            //     const {id} = oEvent.getParameter("arguments");
            //     this.ID = id;
            //      const sRouterName = oEvent.getParameter("name");
            //     const oObjectPage = this.getView().byId("idObjectPageLayout");
    
            //     oObjectPage.bindElement(`/User(${id})`);
            // },
            onSelectParticularUser: function (oEvent) {
                const { ID } = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteParticularUser", {
                    id: ID
                  
                })
            },
        });
    });
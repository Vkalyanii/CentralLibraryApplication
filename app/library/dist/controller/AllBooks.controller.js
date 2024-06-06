sap.ui.define(["./BaseController","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/json/JSONModel","sap/m/MessageBox","sap/m/Token","sap/m/MessageToast"],function(e,t,o,i,s,l,n){"use strict";return e.extend("com.app.library.controller.AllBooks",{onInit:function(){const e=this.getOwnerComponent().getRouter();e.attachRoutePatternMatched(this.onUserDetailsLoad,this);const t=this.getView();const o=t.byId("idtitleFilterValue");const i=t.byId("idAuthorFilterValue");const s=t.byId("idGenreFilterValue");const n=t.byId("idISBNFilterValue");let r=function(e){if(true){var t=e.text;return new l({key:t,text:t})}};o.addValidator(r);i.addValidator(r);s.addValidator(r);n.addValidator(r)},onUserDetailsLoad:function(e){const{id:t}=e.getParameter("arguments");this.ID=t;const o=e.getParameter("name");const i=this.getView().byId("idAllBooks");i.bindElement(`/User(${t})`)},onGoPress:function(){const e=this.getView(),i=e.byId("idtitleFilterValue"),s=i.getTokens(),l=e.byId("idAuthorFilterValue"),n=l.getTokens(),r=e.byId("idISBNFilterValue"),a=r.getTokens(),d=e.byId("idGenreFilterValue"),g=d.getTokens(),u=e.byId("idAllBooksTable"),c=[];s.filter(e=>{e?c.push(new t("Title",o.EQ,e.getKey())):""});n.filter(e=>{e?c.push(new t("Author",o.EQ,e.getKey())):""});a.filter(e=>{e?c.push(new t("ISBN",o.EQ,e.getKey())):""});g.filter(e=>{e?c.push(new t("Genre",o.EQ,e.getKey())):""});u.getBinding("items").filter(c)},onClearFilterPress:function(){const e=this.getView(),t=e.byId("idtitleFilterValue"),o=t.removeAllTokens(),i=e.byId("idAuthorFilterValue"),s=i.removeAllTokens(),l=e.byId("idGenreFilterValue"),n=l.removeAllTokens(),r=e.byId("idISBNFilterValue"),a=r.removeAllTokens()},onReserve:async function(e){console.log(typeof this.getView().byId("idte").getText());var t=e.getSource().getParent();var o=t.getBindingContext();console.log(e.getSource().getParent().getBindingContext().getObject());console.log(o);var i=this.ID;if(this.byId("idAllBooksTable").getSelectedItems().length>1){n.show("Please Select only one Book");return}var s=this.byId("idAllBooksTable").getSelectedItem().getBindingContext().getObject();var l=s.Avl_Quantity-1;console.log(l);const r=new sap.ui.model.json.JSONModel({user_ID_ID:i,book_ID:s.ID,reservation_date:new Date,book:{Avl_Quantity:l}});this.getView().setModel(r,"userModel");const a=this.getView().getModel("userModel").getProperty("/"),d=this.getView().getModel("modelv2");try{await this.createData(d,a,"/Reservation");sap.m.MessageBox.success("Book is Reserved")}catch(e){sap.m.MessageBox.error("Some technical Issue")}}})});
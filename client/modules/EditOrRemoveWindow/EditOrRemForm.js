define(['jquery','text!./EditOrRemForm.html','core/request','kendo'],
function($, template,request){
'use strict';


function EditOrRemForm(initObj){
		initObj = initObj || {};
		console.log("hello from window editing or remove");
		var that = this;
		this._dfd = $.Deferred();
		
		var wndEdt = this.$ = $(template);
      console.log(wndEdt);
       this.$.kendoWindow({
              modal: true, //for affect
              title: "Edit List",
			  width: "505px",
			  height: "100px",
			  actions: ["Close"],
               resizable: false,
              visible: false
            }).data("kendoWindow");
	
			/**
			//for rename the name of the list
			this.$.find("#addtask").on('submit', function(ev){
			var name = ev.target[0].value;
			var promise = request.addNewTask(name);
			promise.then(function(){that._dfd.resolve()}, function(){that._dfd.reject()});
			return false;
		});
		
		for remove the name of the list
		//	this.$.find("#addtask").on('submit', function(ev){
		//	var name = ev.target[0].value;
			var promise = request.addNewTask(name);
			promise.then(function(){that._dfd.resolve()}, function(){that._dfd.reject()});
			return false;
		});
		**/
}

EditOrRemForm.prototype.closeWin = function (){
		if (this.$){
		this.$.kendoWindow("close");
		console.log("CLOSE WIN  edit or remove");
		
		} else {
			console.log("no element to CLOSE WIN  edit or remove");
		}
	}
	
EditOrRemForm.prototype.openWin = function (nameOfList){
		if (this.$){
		 this.$.data("kendoWindow").center();
		 this.$.data("kendoWindow").open();
		console.log("Open WIN edit or remove");
		
		} else {
			console.log("no element to Open WIN  edit or remove");
		}
	}
	
		
EditOrRemForm.prototype.resetDeferred = function(){
		this._dfd = new $.Deferred();
	}

EditOrRemForm.prototype.getPromise = function(){
		return this._dfd.promise();
	}
	
	
EditOrRemForm.prototype.destroy = function(){
		this.$.off('submit');
		this.$.remove();
	}
	
EditOrRemForm.prototype.appendTo = function (elem){
		if (this.$){
			this.$.appendTo($(elem))	
		} else {
			console.log("no element to add");
		}
	}


return EditOrRemForm;

});
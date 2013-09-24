"undefined"===typeof window.console&&(window.console={log:function(){},debug:function(){}});"undefined"===typeof window.localStorage&&(window.localStorage=function(){});var Demandbase=window.Demandbase||{};Demandbase.utils=window.Demandbase.utils||{};
Demandbase.utils={name:"Demandbase Utilities",_version:"1.0",logging:!0,djq:null,getQueryParam:function(a){for(var b={},c=window.location.search.substring(1).split("&"),d=0;d<c.length;d++){var e=c[d].split("=");b[e[0]]=e[1]}return b[a]},flattenData:function(a){for(var b in a)if("object"==typeof a[b]&&null!==a[b]){for(var c in a[b])a[b+"_"+c]=a[b][c];delete a[b]}return a},putLS:function(a){for(var b in a)localStorage.setItem(b,a[b]),this._log("Set localStorage field: "+b+" : "+a[b])},getLS:function(a){if(localStorage.getItem(a))return localStorage.getItem(a);
this._log("Requested field: "+a+" was not found in localStorage.");return null},authorize:function(a){var b=jQuery.noConflict()||Demandbase.jQuery;b?b.ajax({url:"http://api.demandbase.com/api/v2/ip.json",data:{key:a},dataType:"jsonp",timeout:2E3,success:function(b,d,e){Demandbase.utils._log("Validating key: "+a+".... Confirmed authorized key")},error:function(b,d,e){Demandbase.utils._log("Validating key: "+a+".... is NOT a valid key")}}):Demandbase.utils._log("Could not authorize key...jQuery is missing.")},
_log:function(a){"undefined"===typeof window.console||!this.logging&&"true"!==this.getQueryParam("db_logging")||window.console.log("Demandbase: "+a)},runConnectors:function(a){}};Demandbase.utils.runConnectors=function(a){};Demandbase=window.Demandbase||{};Demandbase.utils=window.Demandbase.utils||{};Demandbase.Connectors=window.Demandbase.Connectors||{};
Demandbase.IP={name:"Demandbase IP API Wrapper",_version:1,CompanyProfile:{},_key:"YOUR_KEY_HERE",_useTestIp:!1,_testIpAddress:"3.0.0.1",_debug:!0,_parser:function(a){if(!a)return"";try{var b=Demandbase.utils;this.CompanyProfile=a=b.flattenData(a);b.runConnectors(a)}catch(c){Demandbase.debug&&alert("DB IP Connector Error: "+c)}},_load:function(){var a=document.createElement("script");a.async=!0;a.id="db_ip_api";a.src=("https:"==document.location.protocol?"https://":"http://")+"api.demandbase.com/api/v2/ip.json?key="+
this._key+"&referrer="+document.referrer+"&page="+document.location.href+"&page_title="+document.title+"&callback=Demandbase.IP._parser&query";this._useTestIp&&(""==this._testIpAddress&&(this._testIpAddress=Demandbase._getQueryParam("db_ip"),Demandbase.utils._log("Query IP API...overriding query parameter from URL: "+this._testIpAddress)),""!==this._testIpAddress&&(a.src=a.src+"="+this._testIpAddress,Demandbase.utils._log("Query IP API...overriding query Demandbase.IP: "+this._testIpAddress)));document.getElementsByTagName("head")[0].appendChild(a);
Demandbase.utils._log("Added IP API tag.")}};Demandbase.IP._load();Demandbase=window.Demandbase||{};Demandbase.Connectors=window.Demandbase.Connectors||{};
Demandbase.Connectors.Google_Analytics={name:"Demandbase Google Analytics Connector",key:"",fields:["audience","industry","revenue_range","employee_range","company_name"],version:"4.1",dbDataSet:null,track:function(a){try{var b=Demandbase.Connectors.Google_Analytics;b.dbDataSet=a;for(var c in b.fields){var d=b.fields[c],e=a[b.fields[c]]||"(Non-company Visitor)";b._var(parseInt(c)+1,d,e,1);Demandbase.utils._log(parseInt(c)+1+" "+d+" : "+e)}if(a){var f=a.audience||"(Non-company Visitor)",g=a.audience_segment||
"(Non-company Visitor)",d=a.company_name||"(Non-company Visitor)";b._cEvent(f,g,d)}b._event()}catch(h){Demandbase.utils._log("Integration Error: "+h)}},load:function(){try{window._gaq||(window._gaq=[]),Demandbase.IP.CompanyProfile||alert("Demandbase.IP.CompanyProfile: "+Demandbase.IP.CompanyProfile),this.track(Demandbase.IP.CompanyProfile),_gaq.push(["_addDevId","NE7T9"]),Demandbase.utils._log("Loaded Script "+db.src)}catch(a){Demandbase.utils._log("Script Error: "+a)}},_p:function(a,b,c,d,e,f){window._gaq.push([a,
b,c,d,e,f])},_var:function(a,b,c,d){this._p("_setCustomVar",a,b,c,d)},_event:function(){this._p("_trackEvent","Demandbase","API Resolution","IP API",0,1)},_cEvent:function(a,b,c){this._p("_trackEvent",a,b,c,0,1);Demandbase.utils._log("Custom Event Tracked: "+a+" : "+b+" : "+c)}};Demandbase.Connectors.Google_Analytics.load();

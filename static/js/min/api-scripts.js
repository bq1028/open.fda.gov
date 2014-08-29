function createAnchorsFromHeadings(){return $("h2, h3, h4, h5, h6").each(function(e,a){var t,n,r;return t=$(a),r=t.attr("id"),n='<i class="fa fa-link"></i>',r?t.append($("<a />").addClass("header-link").attr("href","#"+r).html(n)):void 0})}function createNavigationSidebarFromHeadings(){var e="",a=null;$("#reference :header").not(".noindex").each(function(){var t=$(this),n=this.tagName,r=n.substr(1,1),i=t.text(),o="#"+t.attr("id"),s="";if(null===a)s="";else if(r>a)s="<ul>";else if(a>r)for(var u=a-r,c=0;u>c;c++)s+="</ul></li>";else a===r&&(s="</li>");s+="<li><a href='"+o+"'>"+i+"</a>",e+=s,a=r}),$("#reference-nav-ul").prepend(e)}if(!library)var library={};library.json={replacer:function(e,a,t,n,r){var i="<span class=json-key>",o="<span class=json-value>",s="<span class=json-string>",u=a||"";return t&&(u=u+i+t.replace(/[": ]/g,"")+"</span>: "),n&&(u=u+('"'==n[0]?s:o)+n+"</span>"),u+(r||"")},prettyPrint:function(e){var a=/^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/gm;return JSON.stringify(e,null,3).replace(/&/g,"&amp;").replace(/\\"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(a,library.json.replacer)}},$(document).ready(function(){if(createNavigationSidebarFromHeadings(),createAnchorsFromHeadings(),$("textarea").autosize(),$(".reference-nav").affix({offset:{top:function(){return this.top=$(".reference-nav").offset().top-12}}}),$("#api-status-updated").length>0){var e,a,t=$("#api-status-updated").find("#endpoint").html(),n=$("#api-status-updated").find("#count").html();$.getJSON(t+"count="+n).success(function(t){if(t.results){var n=t.results[t.results.length-1].time.replace(/(\d{4})(\d{2})(\d{2})/,"$1-$2-$3");e="Updated "+t.meta.last_updated,a="Data current through "+n,$("#api-status-updated").find("#date-updated").text("API OK | "+e+" | "),$("#api-status-updated").find("#date-latest").text(a)}else{var r="This API is down right now.";$("#api-status-updated").find("#date-updated").text(r)}}).error(function(){var e="This API is down right now.";$("#api-status-updated").find("#date-updated").text(e)})}$(".api-explorer button.go").click(function(){var e=$(this).parents(".api-explorer-form").find(".api-explorer-query").val(),a=$(this).parents("div.api-explorer").find(".return");$(this),$(a).find(".response pre").html("Loading request..."),$.getJSON(e,function(e){$(a).find(".response pre").html(library.json.prettyPrint(e)),$(a).parent().find(".response-close").remove(),$(a).find(".response pre").after('<button class="btn pull-left response-close">Close</button>'),$(a).height()>200&&$(a).find(".response pre").before('<button class="btn pull-left response-close">Close</button>'),$(".response-close").click(function(){$(this).parent().find("pre").html('Click "Run query" to see its results.'),$(this).parent().find(".response-close").remove()})}).fail(function(){$(a).find(".response pre").html("The API response was an error. Bummer. Check the syntax and give it another try.")})}),$(".api-explorer-query").keypress(function(e){var a=e.keyCode?e.keyCode:e.which,t=$(this).parents("div.api-explorer").find("button.go");32===a?e.preventDefault():13===a&&(e.preventDefault(),$(t).trigger("click"))})});
define(["google","models/app.model"],function(google){var coords=App.get("geocoords"),geocoords=App.get("geocoords"),deals=Backbone.Model.extend({defaults:{offset:0,paginate_total:1,orderby:"",deal_optout_user:"",deal_include_cat:"940,942,941,943,944,945,949,946,43,947,58,948",lat:App.attributes.geocoords.latitude,lon:App.attributes.geocoords.longitude,region:"toronto",source:"deals",search_for:"",circumference:5},renderListingResponse:function(){console.log(DailyDeals.attributes);var icon,iconSize;$.mobile.showPageLoadingMsg(),$.ajax({url:"/json_api",data:DailyDeals.attributes,type:"get",dataType:"jsonp",jsonpCallback:"bazaar_Rest",success:function(data){$.mobile.hidePageLoadingMsg(),data.deals!==null?($("#showmoreBtn").css("display","block"),$.each(data.deals,function(key,value){console.log(value);var template=_.template('<li><a href="/#dailydeals/post/<%=id%>"><img src="/wp-content/themes/bazaar/images.php?src=<%=thumbnail%>&h=55&w=80" /><h3><%=title%></h3><p>Approximately <%=distance%> mi near you</p><p><%=address%></p></a></li>');icon="",iconSize=[20,20],App.addMarker(parseFloat(value.lat),parseFloat(value.lon),value.title,icon,iconSize);var distance=parseFloat(value.distance);$("#dailyDealsListings").append(template({id:value.ID,thumbnail:value.thumbnail,title:value.title,author_name:value.author_name,address:value.address,distance:distance.toFixed(2),value:value.price}))}),$("#dailyDealsListings").listview("refresh")):$("#showmoreBtn").css("display","none")},error:function(data){console.log("there was an error")}})}});return window.DailyDeals=new deals,DailyDeals})
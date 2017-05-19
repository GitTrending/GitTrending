if(typeof gr.sponsor!=='undefined')gr.log('gr.sponsor ya está definido');gr.sponsor={base_url:SPONSOR_BASE_URL,popup:{cookie_name:'launcher_popup',url:(typeof pu_url!='undefined')?pu_url:'',launch:function(){if(gr.auth.me.premium=="1")return false;if(gr.sponsor.popup.url==='')return false;if(!gr.cookie(gr.sponsor.popup.cookie_name))
{var url=gr.sponsor.popup.url;if(typeof clientId!=="undefined"&&clientId){url+='&track_sub_id4='+clientId}
pu(url);if(typeof appf!=="undefined")language=(appf==='')?"_english":appf;if(typeof ga!=="undefined")ga('send','event','busquedas','show-popup',language,{'dimension15':'true'});var exdate=new Date();exdate.setHours(exdate.getHours()+12);document.cookie=gr.sponsor.popup.cookie_name+"="+"1"+(";expires="+exdate.toUTCString())+(";domain="+document.domain)+";path=/";}}},coupon:{cookie_name:'sponsor_coupon',coupon_url:(typeof(SPONSOR_BASE_URL)!="undefined"&&typeof(LANGUAGE)!="undefined")?SPONSOR_BASE_URL+'coupons/popup?lang='+LANGUAGE+'&k='+new Date().toISOString().substr(0,10):'http://ads.freepik.com/coupons/popup?lang=&k='+new Date().toISOString().substr(0,10),launch:function(){if(gr.auth.me.premium=="1"||typeof(disallow_coupon)!="undefined")return false;var pages=12;var cookie_days=2;if((Math.floor(Math.random()*pages)+1)<=1)
{counted=1;if(gr.cookie(gr.sponsor.coupon.cookie_name))counted=parseInt(gr.cookie(gr.sponsor.coupon.cookie_name))+1;if(!gr.cookie(gr.sponsor.coupon.cookie_name)||counted<2)
{$.get(gr.sponsor.coupon.coupon_url,function(data)
{$('#footer').after(data);if(typeof ga!=="undefined")ga('send','event','coupon','view','');var fecha_hoy=new Date();fecha_hoy.setDate(fecha_hoy.getDate()+cookie_days);var expires="; expires="+fecha_hoy.toGMTString();document.cookie=gr.sponsor.coupon.cookie_name+"="+counted+expires+"; path=/";});}}}},get:function(params)
{if(typeof params=='undefined')params={};if(typeof params.container=='undefined')return false;gr.request.get(gr.sponsor.base_url+'banner/ajax_search',params);}};function gr_sponsor_callback(data)
{if(data.container=='undefined')
{console.log('ERROR: no container defined');return;}
console.log(data);if(typeof data.js_files!='undefined')
{for(i=0;i<data.js_files.length;i++)
{var e=document.createElement('script');e.type='text/javascript';e.src=data.js_files[i];var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(e,s);}}
if($(data.container).length===0)
{console.log('ERROR: no container exists');return;}
$(data.container).html(data.html);if(typeof data.google_analytics_id!='undefined')
{(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create',data.google_analytics_id,'auto');ga('send','pageview');}
if((typeof data.statcounter_id!='undefined')||(typeof data.statcounter_sc!='undefined'))
{sc_project=data.statcounter_id;sc_invisible=1;sc_security=data.statcounter_sc;sc_https=1;var sc=document.createElement('script');sc.type='text/javascript';sc.async=true;sc.src=('https:'==document.location.protocol?'https://secure':'http://www')+'.statcounter.com/counter/counter.js';var ssc=document.getElementsByTagName('script')[0];ssc.parentNode.insertBefore(sc,ssc);}
callbackFn=window[data.post_callback];if(typeof callbackFn==='function')callbackFn(data);}
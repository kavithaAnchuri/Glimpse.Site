function getBuildStatus(){$.ajax({url:"/home/buildstatus",dataType:"json",success:function(e,t){$("#build-info, #build-arrow").css("display","block");if(t==="success"){buildStatus=e.status.toLowerCase()==="success"?!0:!1;$("#build-tower").addClass(e.status.toLowerCase());buildStatus?$("#build-status").empty().html("was successful"):$("#build-status").empty().html("failed");$("#build-id").empty().html("<a href='"+e.link+"'>"+e.id+"</a>");$("#build-date").empty().html(e.date+" at "+e.time)}else $("#build-info").hidden()}})}function getBlogPosts(){$.getJSON("/home/glimpseblogposts",function(e){$.each(e,function(e,t){console.log(t);$("#blog-section .column"+(e+1)+" .innerColumn").empty().append("<h2>"+t.title+"</h2>").append("<p>"+t.summary+"</p>")})}).fail(function(){$("#blog-section .twoColumn").remove();$("#blog-section h1").after('<div class="blog-fail">Oops, it looks like we have some gremlins in the system and we can\'t contact the blog at the moment. Sorry about that.</div>')})}function getTweets(){$.getJSON("/home/glimpsetweets",function(e){var t=3,n=0;$.each(e.results,function(e,r){n++;ct=r.text;o=r.created_at;var i=o.replace(/(\+\S+) (.*)/,"$2 $1"),s=(new Date(Date.parse(i))).toLocaleDateString(),o=(new Date(Date.parse(i))).toLocaleTimeString();ct=ct.replace(/http:\/\/\S+/g,'<a href="$&" target="_blank">$&</a>');$("#tweets").append('<div class="tweet"><a href="https://twitter.com/'+r.from_user+'">'+r.from_user+"</a>: "+ct+" <br /><small>("+s+" @ "+o+")</small></div>");if(n===t)return!1})}).fail(function(){$("#tweets").html('It looks like the fail whale has hit us. Head over to twitter and get in touch, we\'re <a href="https://twitter.com/nikmd23">@nikmd23</a> and <a href="https://twitter.com/anthony_vdh">@anthony_vdh</a>')})}function loadInlineVideo(){$(".inner-monitor").empty().append(inlineVideoHTML)}var console,buildStatus,inlineVideoHTML='<iframe id="video" src="http://channel9.msdn.com/Shows/Web+Camps+TV/The-Glimpse-Team-on-Channel-9/player?w=443&h=285" frameBorder="0" scrolling="no" ></iframe>';$().ready(function(){$(".hover-point").tipsy();$(".video-link").click(function(e){e.preventDefault();loadInlineVideo()});$("a.download, #demo>section>a.button").click(function(e){e.preventDefault();if($("#install").css("display")==="none"){console.log("clicked");$(window).scrollTo(0,1500)}$("#install").stop().slideToggle()});getBuildStatus();getTweets();getBlogPosts()});
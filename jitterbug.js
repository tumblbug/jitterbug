Jitterbug = {

  html: document.getElementsByTagName('html')[0], 

  guideState: "hide",

  showGuide: function(){
               this.html.className += " JB-show-columns JB-show-gutters JB-show-baseline";
               this.guideState = "show";
             },
  removeGuide: function(){
                 this.html = document.getElementsByTagName("html")[0];
                 this.html.className = this.html.className.replace(/JB-show-columns/, "")
                                                .replace(/JB-show-gutters/, "")
                                                .replace(/JB-show-baseline/, "");
                 this.guideState = "hide";
               },
  toggleGuide: function(){
                if (this.guideState == "hide") {
                  this.showGuide();
                } else {
                  this.removeGuide();
                }
               }
};


(function(){
  /**
   * Align unpredictable height element on the baseline
   *
   * params {DOM element} img, video ...
   */
  var appendScript = function(url) {
    var head = document.getElementsByTagName('head')[0];
    var theScript = document.createElement('script');
    theScript.type = 'text/javascript';
    theScript.src = url;
    head.appendChild(theScript);
  }

  /**
   * Align unpredictable height element on the baseline
   *
   * params {DOM element} img, video ...
   */

  var sitOnBaseline = function(element){
    $(element).parent()
              .css({
                "padding-bottom": _calculateDifference(element, 32)
              }); 
  };

  var _calculateDifference = function(element, baseline_height) {
    var contentHeight = (element.tagName == "img") ? $(element).parent().height() : $(element).parent().outerHeight(),
        ceiled        = baseline_height * Math.ceil(contentHeight/baseline_height);

    return ceiled - contentHeight;
  };


  $(function(){
    appendScript("https://w.soundcloud.com/player/api.js");
    appendScript("https://www.youtube.com/iframe_api");

    $(".responsive-image-container img").on({
      "load": function(){
        sitOnBaseline(this);
      }
    }); 

    $("iframe[src*='soundcloud.com']").each(function(){
      var element = this;
      SC.Widget(this).bind(SC.Widget.Events.READY, function(){
        sitOnBaseline(element);
      });
    }); 

  });

})();


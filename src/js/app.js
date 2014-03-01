define(['lodash'], function(_) {
  var App = function() {
  };

  App.prototype.init = function() {
    var projectCards = document.getElementsByClassName('project-card');
    _.each(projectCards, function(card) {
      card.addEventListener('click', function() {
        var openElement = document.getElementsByClassName('open')[0];
        if(openElement)
          openElement.classList.remove('open');
        this.classList.add('open');
      });
    });
  }

  return App;

});

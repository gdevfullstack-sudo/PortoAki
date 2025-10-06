// Version simplifiée de AOS (Animate On Scroll)
(function(window, document) {
    'use strict';
  
    var AOS = function() {
      this.elements = [];
      this.initialized = false;
    };
  
    AOS.prototype.init = function(options) {
      var _this = this;
      this.options = Object.assign({
        offset: 120,
        delay: 0,
        duration: 400,
        easing: 'ease',
        once: false,
        mirror: false
      }, options);
  
      // Stocker tous les éléments AOS
      this.elements = [].slice.call(document.querySelectorAll('[data-aos]'));
      
      // Initialiser les positions de défilement
      this.calculatePositions();
      
      // Écouter les événements de défilement et de redimensionnement
      window.addEventListener('scroll', function() {
        return _this.scrollHandler();
      });
      window.addEventListener('resize', function() {
        return _this.calculatePositions();
      });
      
      // Déclencher une première vérification
      setTimeout(function() {
        _this.scrollHandler();
      }, 100);
      
      this.initialized = true;
    };
  
    AOS.prototype.calculatePositions = function() {
      this.elements.forEach(function(el, i) {
        var position = el.getBoundingClientRect();
        
        el.aos = {
          top: position.top + window.pageYOffset,
          left: position.left,
          offset: el.dataset.aosOffset || this.options.offset,
          delay: el.dataset.aosDelay || this.options.delay,
          duration: el.dataset.aosDuration || this.options.duration,
          easing: el.dataset.aosEasing || this.options.easing,
          once: el.dataset.aosOnce || this.options.once,
          mirror: el.dataset.aosMirror || this.options.mirror
        };
      }, this);
    };
  
    AOS.prototype.scrollHandler = function() {
      var _this = this;
      var scrollTop = window.pageYOffset;
      var windowHeight = window.innerHeight;
      
      this.elements.forEach(function(el, i) {
        var aos = el.aos;
        var offset = aos.offset;
        var position = scrollTop + windowHeight;
        
        if (position > aos.top + offset && !el.aosAnimated) {
          el.aosAnimated = true;
          
          // Appliquer l'animation
          el.style.transition = 'all ' + aos.duration + 'ms ' + aos.easing + ' ' + aos.delay + 'ms';
          el.style.opacity = 1;
          el.style.transform = 'translate(0)';
          
          if (aos.once) {
            _this.elements.splice(i, 1);
          }
        }
      });
    };
  
    window.AOS = new AOS();
  })(window, document);
// This is a Native JS slider Added to the App itself. It is used to expose the carousel functionallty 
// to the angular application through its API.
(function (scope) {
	var carouselComponent = function (sliderId,itemsClass) {
		this.sliderId = sliderId;
		this.itemsClass = itemsClass;
		this.carouselElement;
	}
	carouselComponent.prototype.init = function() {
		this.carouselElement = document.getElementById(this.sliderId);
		var list = document.getElementsByClassName(this.itemsClass);
	    var globalMargins = 14 ; //static
	    var widthSum = 0;
	    for(var i=0;i<list.length;i++){
	      widthSum += list[i].getBoundingClientRect().width + 14;
	    }
	    this.carouselElement.style.width = widthSum;
	    applyTranslateToElement(this.carouselElement,0);
	}
	carouselComponent.prototype.slideNext = function() {
		var currentTranslateValue = getCurrentTransformValue(this.carouselElement);
		var nextVal = currentTranslateValue - 10;
		if(possibleToSlide('next',nextVal)){
			applyTranslateToElement(this.carouselElement,nextVal);
		}


	}
	carouselComponent.prototype.slidePrev = function() {
		var currentTranslateValue = getCurrentTransformValue(this.carouselElement);
		var nextVal = currentTranslateValue + 10;
		if(possibleToSlide('prev',nextVal)){
			applyTranslateToElement(this.carouselElement,nextVal);
		}
	}
	carouselComponent.prototype.destroy = function() {
		// called with out init !!
		if(!this.carouselElement){return;}
		this.carouselElement.style.width = 'auto';
	    applyTranslateToElement(this.carouselElement,0);
	}

	function possibleToSlide(direction,nextVal) {
		if(direction === 'next' && (nextVal <= 0 && (nextVal >= -90))){
			return true;
		}
		if(direction === 'prev' && (nextVal <= 0)){
			return true;
		}
		return false;
	}

	function applyTranslateToElement(element,val) {
		element.style.webkitTransform = 'translateX(' + val + '%)';
		element.style.MozTransform = 'translateX(' + val + '%)';
		element.style.msTransform = 'translateX(' + val + '%)';
		element.style.OTransform = 'translateX(' + val + '%)';
		element.style.transform = 'translateX(' + val + '%)';
	}

	// Helpers
	function getCurrentTransformValue (element){
		var value = (element.style.webkitTransform ||
				element.style.MozTransform ||
				element.style.msTransform ||
				element.style.OTransform ||
				element.style.transform); // translateZ(-10px);

		return ~~ value.match(/[-]?(\d+)/)[0] // 10
	}
	scope.carouselComponent = carouselComponent;	
})(App)


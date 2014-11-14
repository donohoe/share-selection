(function(){

	var ShareSelection = {

		init: function () {
			var contentId = "articleBody"; /* Change this with the ID of your main content */
			var el = document.getElementById(contentId) || false;
			if (el) {
				var self = this;
				document.getElementById(contentId).addEventListener( 'mouseup', function(e) {
					self.insertStyles();
					self.makeSelection();
			        self.analytics("makeSelection", getSelection().message);
				}, false );
			}
		},

	    getSelection: function () {
	        var sel = document.getSelection();
	        return {
	            type: sel.anchorNode.nodeType,
	            message: document.createTextNode(sel.toString().trim()).textContent,
	            coords: sel.getRangeAt(0).getClientRects()[0]
	        };
	    },

	    setPosition: function (shareTools, coords) {
			var shareTools = shareTools || false;
			if (!shareTools) {
				return;
			}

			var scrollTop  = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;	
			var scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
	        var top   = coords.top  - shareTools.offsetHeight + scrollTop + coords.height;
	        var right = coords.left - shareTools.offsetWidth  + scrollLeft;

	        top   = (top   < 0) ? (top   * -1 ) : top - 6;
	        right = (right < 0) ? (right * -1 ) : right;

			shareTools.style.position = "absolute";
			shareTools.style.top   = top   + "px";
			shareTools.style.right = right + "px";
	    },

	    analytics: function (category, text) {
		/*	Omniture, other... */
	        if (typeof(_gaq) !== "undefined" && text !== "") {
	            _gaq.push(['_trackEvent', category, window.location.pathname, text]);
	        }
	    },

		clearSelectionTools: function () {
			var el = document.getElementById("selectionShareTools") || false;
			if (el) {
				el.parentNode.removeChild(el);
			}
		},

		getHandle: function () {
			var el = document.querySelector("li.twitter a[rel=me]");
			if (el) {
				var handle = el.href.split("twitter.com/")[1] || false;
				if (handle) {
					return "&via=" + handle;
				}
			}
			return "";
		},

		getHeadline: function () {
			var el = document.querySelector("meta[property='og:title']");
			if (el) {
				return encodeURIComponent('"' + (el.getAttribute("content") || "") + '"');
			}
			return "";
		},

		getButtonTweet: function (selection) {
			return [
				'<a class="selection-tweet hi-icon" href="https://twitter.com/intent/tweet?text=' + this.getText(selection.message, 180, true) + '&url=' + this.getLink('tweet') + this.getHandle() + '">',
					'<svg version="1.1" id="svg_tweet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet" enable-background="new 0 0 50 50" xml:space="preserve">',
					'	<path fill="#000000" d="M45.88,11.416c0.327-1.106-0.047-2.302-0.953-3.022c-0.514-0.411-1.136-0.618-1.767-0.618   c-0.498,0-0.996,0.13-1.443,0.397c-0.888,0.521-1.817,0.939-2.787,1.234c-1.854-1.418-4.153-2.207-6.516-2.207   c-5.416,0-9.903,4.04-10.61,9.264c-4.318-0.924-8.252-3.303-11.086-6.779c-0.54-0.666-1.35-1.046-2.196-1.046   c-0.071,0-0.146,0.005-0.222,0.01c-0.928,0.073-1.757,0.596-2.226,1.398c-0.952,1.631-1.453,3.491-1.453,5.386   c0,1.28,0.227,2.525,0.647,3.688c-0.452,0.514-0.714,1.18-0.714,1.884c0,2.808,1.06,5.39,2.826,7.33   c-0.109,0.484-0.092,0.996,0.067,1.486c0.611,1.914,1.729,3.561,3.175,4.818c-0.939,0.213-1.911,0.322-2.897,0.322   c-0.511,0-1.028-0.033-1.549-0.092c-0.11-0.014-0.22-0.021-0.332-0.021c-1.186,0-2.26,0.742-2.663,1.885   c-0.447,1.24,0.026,2.627,1.134,3.34c4.071,2.607,8.775,3.986,13.602,3.986c15.655,0,25.063-12.6,25.232-24.899   c1.274-1.085,2.394-2.334,3.344-3.728c0.359-0.474,0.572-1.063,0.572-1.708C47.065,12.775,46.597,11.933,45.88,11.416z    M40.292,17.801c0.018,0.337,0.025,0.677,0.025,1.018c0,10.404-7.919,22.4-22.4,22.4c-4.445,0-8.584-1.303-12.07-3.537   c0.613,0.068,1.243,0.111,1.878,0.111c3.689,0,7.083-1.26,9.779-3.373c-3.449-0.061-6.354-2.34-7.357-5.467   c0.481,0.092,0.975,0.143,1.478,0.143c0.72,0,1.416-0.098,2.075-0.277c-3.602-0.727-6.317-3.905-6.317-7.723   c0-0.034,0-0.065,0-0.098c1.062,0.588,2.277,0.942,3.567,0.982c-2.112-1.412-3.5-3.824-3.5-6.554c0-1.442,0.388-2.793,1.066-3.956   c3.88,4.763,9.683,7.896,16.227,8.224c-0.136-0.574-0.202-1.178-0.202-1.795c0-4.344,3.524-7.869,7.87-7.869   c2.266,0,4.313,0.956,5.749,2.483c1.791-0.351,3.478-1.006,4.999-1.909c-0.589,1.837-1.838,3.38-3.461,4.354   c1.591-0.188,3.106-0.611,4.52-1.24C43.165,15.305,41.832,16.691,40.292,17.801z"/>',
					'</svg>',	
				'</a>'
			].join("");

		},

		getButtonEmail: function (selection) {
			var headline = this.getHeadline();
			var subject = (headline.length > 1) ? "Regarding " + headline : "From our site...";
			if (headline.length > 1) {
				headline = ", " + headline + ",";
			}
			return [
				'<a class="selection-email hi-icon" href="mailto:?subject=' + subject + '&amp;body=From this article' + headline + ':%0A%0A' + this.getLink('email') + '%0A%0A' + this.getText(selection.message, 600) + '%0A">',
					'<svg version="1.1" id="svg_email" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="61.5px" viewBox="0 0 100 61.5" preserveAspectRatio="xMidYMid meet" enable-background="new 0 0 100 61.5" xml:space="preserve">',
						'<path fill="#010101" d="M96.723,0H3.279C1.229,0,0,1.23,0,3.28v54.918c0,2.049,1.229,3.278,3.279,3.278h93.444c2.049,0,',
						'3.277-1.229,3.277-3.278V3.28C100,1.23,98.771,0,96.723,0z M91.749,4.919L49.181,38.525L7.359,4.919H91.749z',
					 	'M93.443,56.558H6.557c-1.025,0-1.639-0.615-1.639-1.641V9.134l44.263,35.129l45.9-36.429v47.083',
						'C95.082,55.943,94.468,56.558,93.443,56.558z"/>',
					'</svg>',
				'</a>'
			].join("");
		},

		getText: function (text, limit, nl) {
			var limit = limit || 180;
			var nl = nl || false;
			if (nl) {
				text = text.split("\n").join(" ");
			}
			if (text.length > limit) {
				text = text.substring(0, limit);
				text = text.substr(0, Math.min(text.length, text.lastIndexOf(" "))) + "…";
			}
			return encodeURIComponent(text);
		},

		getLink: function (svc) {
			var svc = svc || false;
			var link = window.location.href.replace(/\?.*/,'');
			if (svc) {
				link += "?mbid=selection_" + svc;
			}
			return link;
		},

		insertStyles: function() {
			var id = "selectionShareStyle";
			var el = document.getElementById(id) || false;
			if (!el) {
				var style = document.createElement("STYLE");
				style.id = id;
				style.innerHTML = [
					// '::selection { 		background-color: #b2d2ff; color: #000; padding: 1px 0 1px 1px; } ',
					// '::-moz-selection { 	background-color: #b2d2ff; color: #000; padding: 1px 0 1px 1px; }',
					'#selectionShareTools {',
					'	height: 24px;',
					'	background-color: transparent;',
					'}',
					'#selectionShareTools a {',
					'	-webkit-box-sizing: content-box;',
					'	-moz-box-sizing: content-box;',
					'	display:  inline-block;',
					'	overflow: hidden;',
					'	background-color: #b2d2ff;',
					'	border: 1px solid #b2d2ff;',
					'	border-radius: 16px;',
					'	box-sizing: content-box;',
					'	width:  16px;',
					'	height: 16px;',
					'	margin: 0 3px 0 0;',
					'	padding: 3px;',
					'	line-height: 21px;',
					'	color: white;',
					'	font-size: 13px;',
					'	text-align: center;',
					'}',
					'#selectionShareTools a:hover {',
					'	border: 1px solid white;',
					'}',
					'#selectionShareTools a svg {',
					'	height: 16px;',
					'	width:  12px;',
					'}',
					'#selectionShareTools a:hover svg,',
					'#selectionShareTools a:hover svg path {',
					'	fill: #ffffff;',
					'}',
				].join('\n');
				document.body.appendChild(style);
			}
		},

	    makeSelection: function () {
	        this.clearSelectionTools();
			var selection = this.getSelection();
	        if (selection.type === 3 && selection.message.length > 16 ) {

				var html = "";
				var self = this;

				html += this.getButtonTweet(selection);
				html += this.getButtonEmail(selection);

				var shareTools = document.createElement("DIV");
				shareTools.id = "selectionShareTools";
				shareTools.className="hi-icon-effect-8";
				shareTools.innerHTML = html;
				document.body.appendChild(shareTools);

				shareTools.addEventListener( 'click', function(e){

					var el = e.srcElement || e.originalTarget;
					if (el.nodeName === "IMG") {
						el = el.parentElement;
					}

					if (el.nodeName === "A" && el.className == "selection-tweet") {
						var width  = 576,
					        height = 322;
					    var left   = (Math.max(document.documentElement.clientWidth,  window.innerWidth)  / 2) + (width/2),
					        top    = (Math.max(document.documentElement.clientHeight, window.innerHeight) / 2) + (height/2),
					        url    = el.href
					        opts   = 'status=1' +
					                 ',width='  + width  +
					                 ',height=' + height +
					                 ',top='    + top    +
					                 ',left='   + left;

						var tsp = window.open(url, 'twitter-selection-popup', opts);
						if (window.focus) {
							tsp.focus();
						}

						e.stopPropagation();
						e.preventDefault();
					}

					self.clearSelectionTools();
					self.analytics("makeSelection click", selection.message);

				}, false );

	            this.setPosition( shareTools, this.getSelection().coords);
	        }
	    }
	};

	ShareSelection.init();

})();

/**
 * @preserve
 * jquery.layout 1.4.4
 * $Date: 2014-11-29 08:00:00 (Sat, 29 November 2014) $
 * $Rev: 1.0404 $
 *
 * Copyright (c) 2014 Kevin Dalman (http://jquery-dev.com)
 * Based on work by Fabrizio Balliano (http://www.fabrizioballiano.net)
 *
 * Dual licensed under the GPL (http://www.gnu.org/licenses/gpl.html)
 * and MIT (http://www.opensource.org/licenses/mit-license.php) licenses.
 *
 * SEE: http://layout.jquery-dev.com/LICENSE.txt
 *
 * Changelog: http://layout.jquery-dev.com/changelog.cfm
 *
 * Docs: http://layout.jquery-dev.com/documentation.html
 * Tips: http://layout.jquery-dev.com/tips.html
 * Help: http://groups.google.com/group/jquery-ui-layout
 */

/* JavaDoc Info: http://code.google.com/closure/compiler/docs/js-for-compiler.html
 * {!Object}	non-nullable type (never NULL)
 * {?string}	nullable type (sometimes NULL) - default for {Object}
 * {number=}	optional parameter
 * {*}			ALL types
 */
/*	TODO for jQ 2.x 
 *	check $.fn.disableSelection - this is in jQuery UI 1.9.x
 */

// NOTE: For best readability, view with a fixed-width font and tabs equal to 4-chars

;(function ($) {

// alias Math methods - used a lot!
var	min		= Math.min
,	max		= Math.max
,	round	= Math.floor

,	isStr	=  function (v) { return $.type(v) === "string"; }

	/**
	 * @param {!Object}			Instance
	 * @param {Array.<string>}	a_fn
	 */
,	runPluginCallbacks = function (Instance, a_fn) {
		if ($.isArray(a_fn))
			for (var i=0, c=a_fn.length; i<c; 0 1 i++) { var fn="a_fn[i];" try if (isstr(fn)) 'name' of a function ($.isfunction(fn)) g(fn)( instance ); } catch (ex) {} g (f) return f; }; compiler hack ; * generic $.layout methods - used by all layouts version: "1.4.4" , revision: 1.0404 eg: ver 1.4.4="rev" major(n+).minor(nn)+patch(nn+) $.layout.browser replaces $.browser browser: set below *predefined* effects & defaults must list effect here or an fxsettings option (can be empty hash: {}) effects: pane open close animations slide: all: duration: "fast" 1000, easing: "easeoutbounce" north: direction: "up" south: "down" east: "right"} west: "left" drop: "slow" scale: these are not recommended, but can blind: clip: explode: fade: fold: puff: resize size: "swing" internal config data do change this! config: optionrootkeys: "effects,panes,north,south,west,east,center".split(",") allpanes: "north,south,west,east,center".split(",") borderpanes: "north,south,west,east".split(",") oppositeedge: "south" "north" "west" "east" offscreen offscreencss: left: "-99999px", right: "auto" hide useoffscreenclose="true" offscreenreset: "offscreenreset" key for css in multiple places hidden: visibility: "hidden" visible: "visible" layout element settings resizers: cssreq: position: "absolute" padding: margin: fontsize: "1px" textalign: to counter-act "center" alignment! overflow: prevent toggler-button from overflowing see $.layout.defaults.zindexes.resizer_normal cssdemo: demo applied if: options.pane.applydemostyles="true" background: "#ddd" border: "none" togglers: display: "block" cursor: "pointer" zindex: "#aaa" content: "relative" contain floated positioned elements "10px" cssdemopane: remove scrolling 'pane' when it has content-div panes: panes overridden 'per-pane settings' $.layout.defaults.zindexes.pane_normal "#fff" "1px solid #bbb" side: "top" sizetype: "height" dir: "horz" top: bottom: width: height: dynamic "bottom" "right" "width" "vert" center: callback namespace store reusable functions callbacks: getparentpaneelem: (el) pass either container $el="$(el)" || $el.data("parentlayout"); (layout) $cont="layout.container;" this is directly-nested inside outer-pane ($cont.data("layoutpane")) $cont; $pane="$cont.closest("."+" $.layout.defaults.panes.paneclass); was found, ($pane.data("layoutpane")) $pane; null; getparentpaneinstance: ? $pane.data("layoutpane") : getparentlayoutinstance: $pane.data("parentlayout") geteventobject: (evt) typeof evt="==" "object" && evt.stoppropagation parsepanename: (evt_or_pane) evt_or_pane ) always stop propagation events triggered layout! evt.stoppropagation(); (pane ! ^(west|east|north|south|center)$ .test(pane)) $.layout.msg('layout error invalid pane-name: "'+ +'"'); pane; layout-plugin registration more plugins added beyond default plugins: draggable: !!$.fn.draggable resizing core: !!$.effects animimations (specific tested initoptions) $.effects ($.effects.slide ($.effects.effect $.effects.effect.slide)) arrays plugin other *each layout* will passed 'instance' oncreate: [] runs just starting created right after options onload: and global init, before initpanes called onready: initialization *completes* ie, completes successfully ondestroy: destroyed onunload: page unloads afteropen: setasopen() afterclose: setasclosed() utility calculate the scrollbar width, as integer scrollbarwidth: () window.scrollbarwidth $.layout.getscrollbarsize('width'); scrollbarheight: window.scrollbarheight $.layout.getscrollbarsize('height'); getscrollbarsize: (dim) $c="$('<div" style="position: absolute; top: -10000px; left: -10000px; width: 100px; height: 100px; border: 0; overflow: scroll;">').appendTo("body")
		,	d	= { width: $c.outerWidth - $c[0].clientWidth, height: 100 - $c[0].clientHeight };
		$c.remove();
		window.scrollbarWidth	= d.width;
		window.scrollbarHeight	= d.height;
		return dim.match(/^(width|height)$/) ? d[dim] : d;
	}


,	disableTextSelection: function () {
		var $d	= $(document)
		,	s	= 'textSelectionDisabled'
		,	x	= 'textSelectionInitialized'
		;
		if ($.fn.disableSelection) {
			if (!$d.data(x)) // document hasn't been initialized yet
				$d.on('mouseup', $.layout.enableTextSelection ).data(x, true);
			if (!$d.data(s))
				$d.disableSelection().data(s, true);
		}
	}
,	enableTextSelection: function () {
		var $d	= $(document)
		,	s	= 'textSelectionDisabled';
		if ($.fn.enableSelection && $d.data(s))
			$d.enableSelection().data(s, false);
	}


	/**
	 * Returns hash container 'display' and 'visibility'
	 *
	 * @see	$.swap() - swaps CSS, runs callback, resets CSS
	 * @param  {!Object}		$E				jQuery element
	 * @param  {boolean=}	[force=false]	Run even if display != none
	 * @return {!Object}						Returns current style props, if applicable
	 */
,	showInvisibly: function ($E, force) {
		if ($E && $E.length && (force || $E.css("display") === "none")) { // only if not *already hidden*
			var s = $E[0].style
				// save ONLY the 'style' props because that is what we must restore
			,	CSS = { display: s.display || '', visibility: s.visibility || '' };
			// show element 'invisibly' so can be measured
			$E.css({ display: "block", visibility: "hidden" });
			return CSS;
		}
		return {};
	}

	/**
	 * Returns data for setting size of an element (container or a pane).
	 *
	 * @see  _create(), onWindowResize() for container, plus others for pane
	 * @return JSON  Returns a hash of all dimensions: top, bottom, left, right, outerWidth, innerHeight, etc
	 */
,	getElementDimensions: function ($E, inset) {
		var
		//	dimensions hash - start with current data IF passed
			d	= { css: {}, inset: {} }
		,	x	= d.css			// CSS hash
		,	i	= { bottom: 0 }	// TEMP insets (bottom = complier hack)
		,	N	= $.layout.cssNum
		,	R	= Math.round
		,	off = $E.offset()
		,	b, p, ei			// TEMP border, padding
		;
		d.offsetLeft = off.left;
		d.offsetTop  = off.top;

		if (!inset) inset = {}; // simplify logic below

		$.each("Left,Right,Top,Bottom".split(","), function (idx, e) { // e = edge
			b = x["border" + e] = $.layout.borderWidth($E, e);
			p = x["padding"+ e] = $.layout.cssNum($E, "padding"+e);
			ei = e.toLowerCase();
			d.inset[ei] = inset[ei] >= 0 ? inset[ei] : p; // any missing insetX value = paddingX
			i[ei] = d.inset[ei] + b; // total offset of content from outer side
		});

		x.width		= R($E.width());
		x.height	= R($E.height());
		x.top		= N($E,"top",true);
		x.bottom	= N($E,"bottom",true);
		x.left		= N($E,"left",true);
		x.right		= N($E,"right",true);

		d.outerWidth	= R($E.outerWidth());
		d.outerHeight	= R($E.outerHeight());
		// calc the TRUE inner-dimensions, even in quirks-mode!
		d.innerWidth	= max(0, d.outerWidth  - i.left - i.right);
		d.innerHeight	= max(0, d.outerHeight - i.top  - i.bottom);
		// layoutWidth/Height is used in calcs for manual resizing
		// layoutW/H only differs from innerW/H when in quirks-mode - then is like outerW/H
		d.layoutWidth	= R($E.innerWidth());
		d.layoutHeight	= R($E.innerHeight());

		//if ($E.prop('tagName') === 'BODY') { debugData( d, $E.prop('tagName') ); } // DEBUG

		//d.visible	= $E.is(":visible");// && x.width > 0 && x.height > 0;

		return d;
	}

,	getElementStyles: function ($E, list) {
		var
			CSS	= {}
		,	style	= $E[0].style
		,	props	= list.split(",")
		,	sides	= "Top,Bottom,Left,Right".split(",")
		,	attrs	= "Color,Style,Width".split(",")
		,	p, s, a, i, j, k
		;
		for (i=0; i < props.length; i++) {
			p = props[i];
			if (p.match(/(border|padding|margin)$/))
				for (j=0; j < 4; j++) {
					s = sides[j];
					if (p === "border")
						for (k=0; k < 3; k++) {
							a = attrs[k];
							CSS[p+s+a] = style[p+s+a];
						}
					else
						CSS[p+s] = style[p+s];
				}
			else
				CSS[p] = style[p];
		};
		return CSS
	}

	/**
	 * Return the innerWidth for the current browser/doctype
	 *
	 * @see  initPanes(), sizeMidPanes(), initHandles(), sizeHandles()
	 * @param  {Array.<object>}	$E  Must pass a jQuery object - first element is processed
	 * @param  {number=}			outerWidth (optional) Can pass a width, allowing calculations BEFORE element is resized
	 * @return {number}			Returns the innerWidth of the elem by subtracting padding and borders
	 */
,	cssWidth: function ($E, outerWidth) {
		// a 'calculated' outerHeight can be passed so borders and/or padding are removed if needed
		if (outerWidth <= 0) return 0; var lb="$.layout.browser" , bs="!lb.boxModel" ? "border-box" : lb.boxsizing $e.css("boxsizing") "content-box" b="$.layout.borderWidth" n="$.layout.cssNum" w="outerWidth" ; strip border and or padding from outerwidth to get css width if (bs !="=" "border-box") -="(b($E," "left") + b($e, "right")); "content-box") "paddingleft") n($e, "paddingright")); max(0,w); } ** * the innerheight for current browser doctype @see initpanes(), sizemidpanes(), inithandles(), sizehandles() @param {array.<object>}	$E  Must pass a jQuery object - first element is processed
	 * @param  {number=}			outerHeight  (optional) Can pass a width, allowing calculations BEFORE element is resized
	 * @return {number}			Returns the innerHeight of the elem by subtracting padding and borders
	 */
,	cssHeight: function ($E, outerHeight) {
		// a 'calculated' outerHeight can be passed so borders and/or padding are removed if needed
		if (outerHeight <= 0 0) return 0; var lb="$.layout.browser" , bs="!lb.boxModel" ? "border-box" : lb.boxsizing $e.css("boxsizing") "content-box" b="$.layout.borderWidth" n="$.layout.cssNum" h="outerHeight" ; strip border and or padding from outerheight to get css height if (bs !="=" "border-box") -="(b($E," "top") + b($e, "bottom")); "content-box") "paddingtop") n($e, "paddingbottom")); max(0,h); } ** * returns the 'current numeric value' for a property does not exist @see called by many methods @param {array.<object>}	$E					Must pass a jQuery object - first element is processed
	 * @param {string}			prop				The name of the CSS property, eg: top, width, etc.
	 * @param {boolean=}			[allowAuto=false]	true = return 'auto' if that is value; false = return 0
	 * @return {(string|number)}						Usually used to get an integer value for position (top, left) or size (height, width)
	 */
,	cssNum: function ($E, prop, allowAuto) {
		if (!$E.jquery) $E = $($E);
		var CSS = $.layout.showInvisibly($E)
		,	p	= $.css($E[0], prop, true)
		,	v	= allowAuto && p=="auto" ? p : Math.round(parseFloat(p) || 0);
		$E.css( CSS ); // RESET
		return v;
	}

,	borderWidth: function (el, side) {
		if (el.jquery) el = el[0];
		var b = "border"+ side.substr(0,1).toUpperCase() + side.substr(1); // left => Left
		return $.css(el, b+"Style", true) === "none" ? 0 : Math.round(parseFloat($.css(el, b+"Width", true)) || 0);
	}

	/**
	 * Mouse-tracking utility - FUTURE REFERENCE
	 *
	 * init: if (!window.mouse) {
	 *			window.mouse = { x: 0, y: 0 };
	 *			$(document).mousemove( $.layout.trackMouse );
	 *		}
	 *
	 * @param {Object}		evt
	 *
,	trackMouse: function (evt) {
		window.mouse = { x: evt.clientX, y: evt.clientY };
	}
	*/

	/**
	 * SUBROUTINE for preventPrematureSlideClose option
	 *
	 * @param {Object}		evt
	 * @param {Object=}		el
	 */
,	isMouseOverElem: function (evt, el) {
		var
			$E	= $(el || this)
		,	d	= $E.offset()
		,	T	= d.top
		,	L	= d.left
		,	R	= L + $E.outerWidth()
		,	B	= T + $E.outerHeight()
		,	x	= evt.pageX	// evt.clientX ?
		,	y	= evt.pageY	// evt.clientY ?
		;
		// if X & Y are < 0, probably means is over an open SELECT
		return ($.layout.browser.msie && x < 0 && y < 0) || ((x >= L && x <= r) && (y>= T && y <= b)); } ** * message logging utility @example $.layout.msg("my message"); log text message", true); alert $.layout.msg({ foo: "bar" }, "title"); hash-data, with custom title true, "title", { sort: false }); -or- false, display: true hash-data @param {(object|string)} info string or hash array {(boolean|string|object)="}" [popup="false]" means alert-box - can be skipped {(object|string)="}" [debugtitle ] for data {object="}" [debugopts] extra options debug output , msg: function (info, popup, debugtitle, debugopts) if ($.isplainobject(info) && window.debugdata) (typeof popup="==" "string") debugopts="debugTitle;" debugtitle="popup;" else "object") var t="debugTitle" || "log( <object> )"
			,	o = $.extend({ sort: false, returnHTML: false, display: false }, debugOpts);
			if (popup === true || o.display)
				debugData( info, t, o );
			else if (window.console)
				console.log(debugData( info, t, o ));
		}
		else if (popup)
			alert(info);
		else if (window.console)
			console.log(info);
		else {
			var id	= "#layoutLogger"
			,	$l = $(id);
			if (!$l.length)
				$l = createLog();
			$l.children("ul").append('<li style="padding: 4px 10px; margin: 0; border-top: 1px solid #CCC;">'+ info.replace(/\/g,"&gt;") +'</li>');
		}

		function createLog () {
			var pos = $.support.fixedPosition ? 'fixed' : 'absolute'
			,	$e = $('<div id="layoutLogger" style="position: '+ pos +'; top: 5px; z-index: 999999; max-width: 25%; overflow: hidden; border: 1px solid #000; border-radius: 5px; background: #FBFBFB; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">'
				+	'<div style="font-size: 13px; font-weight: bold; padding: 5px 10px; background: #F6F6F6; border-radius: 5px 5px 0 0; cursor: move;">'
				+	'<span style="float: right; padding-left: 7px; cursor: pointer;" title="Remove Console" onclick="$(this).closest(\'#layoutLogger\').remove()">X</span>Layout console.log</div>'
				+	'<ul style="font-size: 13px; font-weight: none; list-style: none; margin: 0; padding: 0 0 2px;"></ul>'
				+ '</div>'
				).appendTo("body");
			$e.css('left', $(window).width() - $e.outerWidth() - 5)
			if ($.ui.draggable) $e.draggable({ handle: ':first-child' });
			return $e;
		};
	}

};


/*
 *	$.layout.browser REPLACES removed $.browser, with extra data
 *	Parsing code here adapted from jQuery 1.8 $.browse
 */
(function(){
	var u = navigator.userAgent.toLowerCase()
	,	m = /(chrome)[ \/]([\w.]+)/.exec( u )
		||	/(webkit)[ \/]([\w.]+)/.exec( u )
		||	/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( u )
		||	/(msie) ([\w.]+)/.exec( u )
		||	u.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( u )
		||	[]
	,	b = m[1] || ""
	,	v = m[2] || 0
	,	ie = b === "msie"
	,	cm = document.compatMode
	,	$s = $.support
	,	bs = $s.boxSizing !== undefined ? $s.boxSizing : $s.boxSizingReliable
	,	bm = !ie || !cm || cm === "CSS1Compat" || $s.boxModel || false
	,	lb = $.layout.browser = {
			version:	v
		,	safari:		b === "webkit"	// webkit (NOT chrome) = safari
		,	webkit:		b === "chrome"	// chrome = webkit
		,	msie:		ie
		,	isIE6:		ie && v == 6
			// ONLY IE reverts to old box-model - Note that compatMode was deprecated as of IE8
		,	boxModel:	bm
		,	boxSizing:	!!(typeof bs === "function" ? bs() : bs)
		};
	;
	if (b) lb[b] = true; // set CURRENT browser
	/*	OLD versions of jQuery only set $.support.boxModel after page is loaded
	 *	so if this is IE, use support.boxModel to test for quirks-mode (ONLY IE changes boxModel) */
	if (!bm && !cm) $(function(){ lb.boxModel = $s.boxModel; });
})();


// DEFAULT OPTIONS
$.layout.defaults = {
/*
 *	LAYOUT & LAYOUT-CONTAINER OPTIONS
 *	- none of these options are applicable to individual panes
 */
	name:						""			// Not required, but useful for buttons and used for the state-cookie
,	containerClass:				"ui-layout-container" // layout-container element
,	inset:						null		// custom container-inset values (override padding)
,	scrollToBookmarkOnLoad:		true		// after creating a layout, scroll to bookmark in URL (.../page.htm#myBookmark)
,	resizeWithWindow:			true		// bind thisLayout.resizeAll() to the window.resize event
,	resizeWithWindowDelay:		200			// delay calling resizeAll because makes window resizing very jerky
,	resizeWithWindowMaxDelay:	0			// 0 = none - force resize every XX ms while window is being resized
,	maskPanesEarly:				false		// true = create pane-masks on resizer.mouseDown instead of waiting for resizer.dragstart
,	onresizeall_start:			null		// CALLBACK when resizeAll() STARTS	- NOT pane-specific
,	onresizeall_end:			null		// CALLBACK when resizeAll() ENDS	- NOT pane-specific
,	onload_start:				null		// CALLBACK when Layout inits - after options initialized, but before elements
,	onload_end:					null		// CALLBACK when Layout inits - after EVERYTHING has been initialized
,	onunload_start:				null		// CALLBACK when Layout is destroyed OR onWindowUnload
,	onunload_end:				null		// CALLBACK when Layout is destroyed OR onWindowUnload
,	initPanes:					true		// false = DO NOT initialize the panes onLoad - will init later
,	showErrorMessages:			true		// enables fatal error messages to warn developers of common errors
,	showDebugMessages:			false		// display console-and-alert debug msgs - IF this Layout version _has_ debugging code!
//	Changing this zIndex value will cause other zIndex values to automatically change
,	zIndex:						null		// the PANE zIndex - resizers and masks will be +1
//	DO NOT CHANGE the zIndex values below unless you clearly understand their relationships
,	zIndexes: {								// set _default_ z-index values here...
		pane_normal:			0			// normal z-index for panes
	,	content_mask:			1			// applied to overlays used to mask content INSIDE panes during resizing
	,	resizer_normal:			2			// normal z-index for resizer-bars
	,	pane_sliding:			100			// applied to *BOTH* the pane and its resizer when a pane is 'slid open'
	,	pane_animate:			1000		// applied to the pane when being animated - not applied to the resizer
	,	resizer_drag:			10000		// applied to the CLONED resizer-bar when being 'dragged'
	}
,	errors: {
		pane:					"pane"		// description of "layout pane element" - used only in error messages
	,	selector:				"selector"	// description of "jQuery-selector" - used only in error messages
	,	addButtonError:			"Error Adding Button\nInvalid "
	,	containerMissing:		"UI Layout Initialization Error\nThe specified layout-container does not exist."
	,	centerPaneMissing:		"UI Layout Initialization Error\nThe center-pane element does not exist.\nThe center-pane is a required element."
	,	noContainerHeight:		"UI Layout Initialization Warning\nThe layout-container \"CONTAINER\" has no height.\nTherefore the layout is 0-height and hence 'invisible'!"
	,	callbackError:			"UI Layout Callback Error\nThe EVENT callback is not a valid function."
	}
/*
 *	PANE DEFAULT SETTINGS
 *	- settings under the 'panes' key become the default settings for *all panes*
 *	- ALL pane-options can also be set specifically for each panes, which will override these 'default values'
 */
,	panes: { // default options for 'all panes' - will be overridden by 'per-pane settings'
		applyDemoStyles: 		false		// NOTE: renamed from applyDefaultStyles for clarity
	,	closable:				true		// pane can open & close
	,	resizable:				true		// when open, pane can be resized 
	,	slidable:				true		// when closed, pane can 'slide open' over other panes - closes on mouse-out
	,	initClosed:				false		// true = init pane as 'closed'
	,	initHidden: 			false 		// true = init pane as 'hidden' - no resizer-bar/spacing
	//	SELECTORS
	//,	paneSelector:			""			// MUST be pane-specific - jQuery selector for pane
	,	contentSelector:		".ui-layout-content" // INNER div/element to auto-size so only it scrolls, not the entire pane!
	,	contentIgnoreSelector:	".ui-layout-ignore"	// element(s) to 'ignore' when measuring 'content'
	,	findNestedContent:		false		// true = $P.find(contentSelector), false = $P.children(contentSelector)
	//	GENERIC ROOT-CLASSES - for auto-generated classNames
	,	paneClass:				"ui-layout-pane"	// Layout Pane
	,	resizerClass:			"ui-layout-resizer"	// Resizer Bar
	,	togglerClass:			"ui-layout-toggler"	// Toggler Button
	,	buttonClass:			"ui-layout-button"	// CUSTOM Buttons	- eg: '[ui-layout-button]-toggle/-open/-close/-pin'
	//	ELEMENT SIZE & SPACING
	//,	size:					100			// MUST be pane-specific -initial size of pane
	,	minSize:				0			// when manually resizing a pane
	,	maxSize:				0			// ditto, 0 = no limit
	,	spacing_open:			6			// space between pane and adjacent panes - when pane is 'open'
	,	spacing_closed:			6			// ditto - when pane is 'closed'
	,	togglerLength_open:		50			// Length = WIDTH of toggler button on north/south sides - HEIGHT on east/west sides
	,	togglerLength_closed: 	50			// 100% OR -1 means 'full height/width of resizer bar' - 0 means 'hidden'
	,	togglerAlign_open:		"center"	// top/left, bottom/right, center, OR...
	,	togglerAlign_closed:	"center"	// 1 => nn = offset from top/left, -1 => -nn == offset from bottom/right
	,	togglerContent_open:	""			// text or HTML to put INSIDE the toggler
	,	togglerContent_closed:	""			// ditto
	//	RESIZING OPTIONS
	,	resizerDblClickToggle:	true		// 
	,	autoResize:				true		// IF size is 'auto' or a percentage, then recalc 'pixel size' whenever the layout resizes
	,	autoReopen:				true		// IF a pane was auto-closed due to noRoom, reopen it when there is room? False = leave it closed
	,	resizerDragOpacity:		1			// option for ui.draggable
	//,	resizerCursor:			""			// MUST be pane-specific - cursor when over resizer-bar
	,	maskContents:			false		// true = add DIV-mask over-or-inside this pane so can 'drag' over IFRAMES
	,	maskObjects:			false		// true = add IFRAME-mask over-or-inside this pane to cover objects/applets - content-mask will overlay this mask
	,	maskZindex:				null		// will override zIndexes.content_mask if specified - not applicable to iframe-panes
	,	resizingGrid:			false		// grid size that the resizers will snap-to during resizing, eg: [20,20]
	,	livePaneResizing:		false		// true = LIVE Resizing as resizer is dragged
	,	liveContentResizing:	false		// true = re-measure header/footer heights as resizer is dragged
	,	liveResizingTolerance:	1			// how many px change before pane resizes, to control performance
	//	SLIDING OPTIONS
	,	sliderCursor:			"pointer"	// cursor when resizer-bar will trigger 'sliding'
	,	slideTrigger_open:		"click"		// click, dblclick, mouseenter
	,	slideTrigger_close:		"mouseleave"// click, mouseleave
	,	slideDelay_open:		300			// applies only for mouseenter event - 0 = instant open
	,	slideDelay_close:		300			// applies only for mouseleave event (300ms is the minimum!)
	,	hideTogglerOnSlide:		false		// when pane is slid-open, should the toggler show?
	,	preventQuickSlideClose:	$.layout.browser.webkit // Chrome triggers slideClosed as it is opening
	,	preventPrematureSlideClose: false	// handle incorrect mouseleave trigger, like when over a SELECT-list in IE
	//	PANE-SPECIFIC TIPS & MESSAGES
	,	tips: {
			Open:				"Open"		// eg: "Open Pane"
		,	Close:				"Close"
		,	Resize:				"Resize"
		,	Slide:				"Slide Open"
		,	Pin:				"Pin"
		,	Unpin:				"Un-Pin"
		,	noRoomToOpen:		"Not enough room to show this panel."	// alert if user tries to open a pane that cannot
		,	minSizeWarning:		"Panel has reached its minimum size"	// displays in browser statusbar
		,	maxSizeWarning:		"Panel has reached its maximum size"	// ditto
		}
	//	HOT-KEYS & MISC
	,	showOverflowOnHover:	false		// will bind allowOverflow() utility to pane.onMouseOver
	,	enableCursorHotkey:		true		// enabled 'cursor' hotkeys
	//,	customHotkey:			""			// MUST be pane-specific - EITHER a charCode OR a character
	,	customHotkeyModifier:	"SHIFT"		// either 'SHIFT', 'CTRL' or 'CTRL+SHIFT' - NOT 'ALT'
	//	PANE ANIMATION
	//	NOTE: fxSss_open, fxSss_close & fxSss_size options (eg: fxName_open) are auto-generated if not passed
	,	fxName:					"slide" 	// ('none' or blank), slide, drop, scale -- only relevant to 'open' & 'close', NOT 'size'
	,	fxSpeed:				null		// slow, normal, fast, 200, nnn - if passed, will OVERRIDE fxSettings.duration
	,	fxSettings:				{}			// can be passed, eg: { easing: "easeOutBounce", duration: 1500 }
	,	fxOpacityFix:			true		// tries to fix opacity in IE to restore anti-aliasing after animation
	,	animatePaneSizing:		false		// true = animate resizing after dragging resizer-bar OR sizePane() is called
	/*  NOTE: Action-specific FX options are auto-generated from the options above if not specifically set:
		fxName_open:			"slide"		// 'Open' pane animation
		fnName_close:			"slide"		// 'Close' pane animation
		fxName_size:			"slide"		// 'Size' pane animation - when animatePaneSizing = true
		fxSpeed_open:			null
		fxSpeed_close:			null
		fxSpeed_size:			null
		fxSettings_open:		{}
		fxSettings_close:		{}
		fxSettings_size:		{}
	*/
	//	CHILD/NESTED LAYOUTS
	,	children:				null		// Layout-options for nested/child layout - even {} is valid as options
	,	containerSelector:		''			// if child is NOT 'directly nested', a selector to find it/them (can have more than one child layout!)
	,	initChildren:			true		// true = child layout will be created as soon as _this_ layout completes initialization
	,	destroyChildren:		true		// true = destroy child-layout if this pane is destroyed
	,	resizeChildren:			true		// true = trigger child-layout.resizeAll() when this pane is resized
	//	EVENT TRIGGERING
	,	triggerEventsOnLoad:	false		// true = trigger onopen OR onclose callbacks when layout initializes
	,	triggerEventsDuringLiveResize: true	// true = trigger onresize callback REPEATEDLY if livePaneResizing==true
	//	PANE CALLBACKS
	,	onshow_start:			null		// CALLBACK when pane STARTS to Show	- BEFORE onopen/onhide_start
	,	onshow_end:				null		// CALLBACK when pane ENDS being Shown	- AFTER  onopen/onhide_end
	,	onhide_start:			null		// CALLBACK when pane STARTS to Close	- BEFORE onclose_start
	,	onhide_end:				null		// CALLBACK when pane ENDS being Closed	- AFTER  onclose_end
	,	onopen_start:			null		// CALLBACK when pane STARTS to Open
	,	onopen_end:				null		// CALLBACK when pane ENDS being Opened
	,	onclose_start:			null		// CALLBACK when pane STARTS to Close
	,	onclose_end:			null		// CALLBACK when pane ENDS being Closed
	,	onresize_start:			null		// CALLBACK when pane STARTS being Resized ***FOR ANY REASON***
	,	onresize_end:			null		// CALLBACK when pane ENDS being Resized ***FOR ANY REASON***
	,	onsizecontent_start:	null		// CALLBACK when sizing of content-element STARTS
	,	onsizecontent_end:		null		// CALLBACK when sizing of content-element ENDS
	,	onswap_start:			null		// CALLBACK when pane STARTS to Swap
	,	onswap_end:				null		// CALLBACK when pane ENDS being Swapped
	,	ondrag_start:			null		// CALLBACK when pane STARTS being ***MANUALLY*** Resized
	,	ondrag_end:				null		// CALLBACK when pane ENDS being ***MANUALLY*** Resized
	}
/*
 *	PANE-SPECIFIC SETTINGS
 *	- options listed below MUST be specified per-pane - they CANNOT be set under 'panes'
 *	- all options under the 'panes' key can also be set specifically for any pane
 *	- most options under the 'panes' key apply only to 'border-panes' - NOT the the center-pane
 */
,	north: {
		paneSelector:			".ui-layout-north"
	,	size:					"auto"		// eg: "auto", "30%", .30, 200
	,	resizerCursor:			"n-resize"	// custom = url(myCursor.cur)
	,	customHotkey:			""			// EITHER a charCode (43) OR a character ("o")
	}
,	south: {
		paneSelector:			".ui-layout-south"
	,	size:					"auto"
	,	resizerCursor:			"s-resize"
	,	customHotkey:			""
	}
,	east: {
		paneSelector:			".ui-layout-east"
	,	size:					200
	,	resizerCursor:			"e-resize"
	,	customHotkey:			""
	}
,	west: {
		paneSelector:			".ui-layout-west"
	,	size:					200
	,	resizerCursor:			"w-resize"
	,	customHotkey:			""
	}
,	center: {
		paneSelector:			".ui-layout-center"
	,	minWidth:				0
	,	minHeight:				0
	}
};

$.layout.optionsMap = {
	// layout/global options - NOT pane-options
	layout: ("name,instanceKey,stateManagement,effects,inset,zIndexes,errors,"
	+	"zIndex,scrollToBookmarkOnLoad,showErrorMessages,maskPanesEarly,"
	+	"outset,resizeWithWindow,resizeWithWindowDelay,resizeWithWindowMaxDelay,"
	+	"onresizeall,onresizeall_start,onresizeall_end,onload,onload_start,onload_end,onunload,onunload_start,onunload_end").split(",")
//	borderPanes: [ ALL options that are NOT specified as 'layout' ]
	// default.panes options that apply to the center-pane (most options apply _only_ to border-panes)
,	center: ("paneClass,contentSelector,contentIgnoreSelector,findNestedContent,applyDemoStyles,triggerEventsOnLoad,"
	+	"showOverflowOnHover,maskContents,maskObjects,liveContentResizing,"
	+	"containerSelector,children,initChildren,resizeChildren,destroyChildren,"
	+	"onresize,onresize_start,onresize_end,onsizecontent,onsizecontent_start,onsizecontent_end").split(",")
	// options that MUST be specifically set 'per-pane' - CANNOT set in the panes (defaults) key
,	noDefault: ("paneSelector,resizerCursor,customHotkey").split(",")
};

/**
 * Processes options passed in converts flat-format data into subkey (JSON) format
 * In flat-format, subkeys are _currently_ separated with 2 underscores, like north__optName
 * Plugins may also call this method so they can transform their own data
 *
 * @param  {!Object}	hash			Data/options passed by user - may be a single level or nested levels
 * @param  {boolean=}	[addKeys=false]	Should the primary layout.options keys be added if they do not exist?
 * @return {Object}						Returns hash of minWidth & minHeight
 */
$.layout.transformData = function (hash, addKeys) {
	var	json = addKeys ? { panes: {}, center: {} } : {} // init return object
	,	branch, optKey, keys, key, val, i, c;

	if (typeof hash !== "object") return json; // no options passed

	// convert all 'flat-keys' to 'sub-key' format
	for (optKey in hash) {
		branch	= json;
		val		= hash[ optKey ];
		keys	= optKey.split("__"); // eg: west__size or north__fxSettings__duration
		c		= keys.length - 1;
		// convert underscore-delimited to subkeys
		for (i=0; i <= 0 1 1001 c; i++) { key="keys[i];" if (i="==" c) last ($.isplainobject( val )) branch[key]="$.layout.transformData(" ); recurse else } (!branch[key]) create the subkey to sub-key for next loop - not done branch="branch[key];" return json; }; internal config data do change this! $.layout.backwardcompatibility="{" used by renameoldoptions() map: old option name: new name applydefaultstyles: "applydemostyles" child nested layouts , childoptions: "children" initchildlayout: "initchildren" destroychildlayout: "destroychildren" resizechildlayout: "resizechildren" resizenestedlayout: misc options resizewhiledragging: "livepaneresizing" resizecontentwhiledragging: "livecontentresizing" triggereventswhiledragging: "triggereventsduringliveresize" maskiframesonresize: "maskcontents" state management usestatecookie: "statemanagement.enabled" "cookie.autoload": "statemanagement.autoload" "cookie.autosave": "statemanagement.autosave" "cookie.keys": "statemanagement.statekeys" "cookie.name": "statemanagement.cookie.name" "cookie.domain": "statemanagement.cookie.domain" "cookie.path": "statemanagement.cookie.path" "cookie.expires": "statemanagement.cookie.expires" "cookie.secure": "statemanagement.cookie.secure" language noroomtoopentip: "tips.noroomtoopen" togglertip_open: "tips.close" open="Close" togglertip_closed: "tips.open" closed="Open" resizertip: "tips.resize" slidertip: "tips.slide" ** * @param {object} opts renameoptions: function (opts) var map="$.layout.backwardCompatibility.map" olddata, newdata, value ; (var itempath in map) olddata="getBranch(" olddata.key ]; (value !="=" undefined) newdata="getBranch(" map[itempath], true newdata.branch[ newdata.key ]="value;" delete olddata.branch[ {string} path {boolean="}" [create="false]" does exist getbranch (path, create) a="path.split(".")" split keys into array c="a.length" d="{" branch: opts, key: a[c] init at top & set (last item) i="0," k, undef; (; i<c; skip (data) k="a[i];" (d.branch[ child-key (create) d.branch="D.branch[" child-branch can't go any farther is undefined get d; renamealloptions: ren="$.layout.backwardCompatibility.renameOptions;" rename root (layout) ren( 'defaults' 'panes' (opts.defaults) (typeof opts.panes "object") $.extend(true, opts.panes, opts.defaults); opts.defaults; options.panes (opts.panes) inside *each pane key*, eg: options.west $.each($.layout.config.allpanes, (i, pane) (opts[pane]) opts[pane] }); opts; begin widget: $( selector ).layout( {options} $.fn.layout="function" local aliases global browser="$.layout.browser" _c="$.layout.config" utlity methods cssw="$.layout.cssWidth" cssh="$.layout.cssHeight" eldims="$.layout.getElementDimensions" styles="$.layout.getElementStyles" evtobj="$.layout.getEventObject" evtpane="$.layout.parsePaneName" populated initoptions() {}, $.layout.defaults) effects="options.effects" = $.layout.effects) layout-state object generate unique id use event.namespace so can unbind only events added 'this layout' id: "layout"+ $.now() code uses alias: sid initialized: false paneresizing: panessliding: {} container: list all referenced avoid compiler error msgs innerwidth: innerheight: outerwidth: outerheight: layoutwidth: layoutheight: north: childidx: south: east: west: center: parent child-layout pointers hasparentlayout="false" exists instance be externally children="{" null ########################### helper functions manages timers timer="{" data: set: (s, fn, ms) timer.clear(s); timer.data[s]="setTimeout(fn," ms); clear: (s) t="timer.data;" (t[s]) {cleartimeout(t[s]); t[s];} alert or console.log message enabled. {(string|!object)} msg (or debug-data) display [popup="false]" default, means 'alert', [debug="false]" widget debugging _log="function" (msg, popup, debug) o="options;" ((o.showerrormessages && !debug) || (debug o.showdebugmessages)) $.layout.msg( o.name +' '+ msg, (popup false) false; executes callback after trigger event, like resize, close evtname of layout callback, eg "onresize_start" {(string|boolean)="}" [pane this passed we pass 'pane object' [skipboundevents="false]" run bound elements callbacks _runcallbacks="function" (evtname, pane, skipboundevents) haspane="pane" isstr(pane) s="hasPane" ? state[pane] : options[pane] lname="options.name" names onopen and onopen_end separate are interchangeable options... lng="evtName" + (evtname.match( _ ) "" "_end") shrt="lng.match(/_end$/)" lng.substr(0, lng.length 4) fn="o[lng]" o[shrt] retval="NC" nc="No" args="[]" $p="hasPane" $ps[pane] (haspane !$p) specified, but exist! retval; ( !haspane $.type(pane)="==" "boolean" skipboundevents="pane;" allow param skipped first (fn) try convert (string) (isstr( (fn.match( cannot contain comma, must parameter just an external function? execute ($.isfunction( (args.length) argument parsed from 'list' pane-name, pane-element, pane-state, pane-options, layout-name $ps[pane], s, o, container suitable info instance, catch (ex) _log( options.errors.callbackerror.replace( event $.trim((pane "") +" "+ lng)), ($.type(ex)="==" "string" string.length) _log("exception: ex, additional directly (!skipboundevents each pane-elements $p.triggerhandler("layoutpane"+ lng, [ $p, ]); (shrt) shrt, container-element $n.triggerhandler("layout"+ always resizechildren onresize_end even during initialization ignore onsizecontent_end because causes child-layouts resize twice "onresize_end") bad: "onsizecontent_end" resizechildren(pane+"", true); hack -force string g (f) f; cure iframe issues ie other browsers _fixiframe="function" (pane) (browser.mozilla) return; firefox it auto-refreshes iframes onshow 'pane' iframe, (state[pane].tagname="==" "iframe") $p.css(_c.hidden).css(_c.visible); ditto $p.find('iframe').css(_c.hidden).css(_c.visible); accept (east, west, etc) {number="}" outersize (optional) width, allowing calculations before element resized @return {number} returns innerheight width el subtracting padding borders csssize="function" (pane, outersize) cssw; fn($ps[pane], outersize); hash minwidth minheight cssmindims="function" height css dir="_c[pane].dir" minwidth: cssw($p, 1000) minheight: cssh($p, (dir="==" "horz") d.minsize="d.minHeight;" "vert") todo: see these made more useful... *maybe* h caller outerwidth [autohide="false]" setouterwidth="function" (el, outerwidth, autohide) $e="el," w; (isstr(el)) west (!el.jquery) w="cssW($E," outerwidth); $e.css({ width: (w> 0) {
			if (autoHide && $E.data('autoHidden') && $E.innerHeight() > 0) {
				$E.show().data('autoHidden', false);
				if (!browser.mozilla) // FireFox refreshes iframes - IE does not
					// make hidden, then visible to 'refresh' display after animation
					$E.css(_c.hidden).css(_c.visible);
			}
		}
		else if (autoHide && !$E.data('autoHidden'))
			$E.hide().data('autoHidden', true);
	}

	/**
	 * @param {(string|!Object)}		el
	 * @param {number=}				outerHeight
	 * @param {boolean=}				[autoHide=false]
	 */
,	setOuterHeight = function (el, outerHeight, autoHide) {
		var $E = el, h;
		if (isStr(el)) $E = $Ps[el]; // west
		else if (!el.jquery) $E = $(el);
		h = cssH($E, outerHeight);
		$E.css({ height: h, visibility: "visible" }); // may have been 'hidden' by sizeContent
		if (h > 0 && $E.innerWidth() > 0) {
			if (autoHide && $E.data('autoHidden')) {
				$E.show().data('autoHidden', false);
				if (!browser.mozilla) // FireFox refreshes iframes - IE does not
					$E.css(_c.hidden).css(_c.visible);
			}
		}
		else if (autoHide && !$E.data('autoHidden'))
			$E.hide().data('autoHidden', true);
	}


	/**
	 * Converts any 'size' params to a pixel/integer size, if not already
	 * If 'auto' or a decimal/percentage is passed as 'size', a pixel-size is calculated
	 *
	/**
	 * @param  {string}				pane
	 * @param  {(string|number)=}	size
	 * @param  {string=}				[dir]
	 * @return {number}
	 */
,	_parseSize = function (pane, size, dir) {
		if (!dir) dir = _c[pane].dir;

		if (isStr(size) && size.match(/%/))
			size = (size === '100%') ? -1 : parseInt(size, 10) / 100; // convert % to decimal

		if (size === 0)
			return 0;
		else if (size >= 1)
			return parseInt(size, 10);

		var o = options, avail = 0;
		if (dir=="horz") // north or south or center.minHeight
			avail = sC.innerHeight - ($Ps.north ? o.north.spacing_open : 0) - ($Ps.south ? o.south.spacing_open : 0);
		else if (dir=="vert") // east or west or center.minWidth
			avail = sC.innerWidth - ($Ps.west ? o.west.spacing_open : 0) - ($Ps.east ? o.east.spacing_open : 0);

		if (size === -1) // -1 == 100%
			return avail;
		else if (size > 0) // percentage, eg: .25
			return round(avail * size);
		else if (pane=="center")
			return 0;
		else { // size < 0 || size=='auto' || size==Missing || size==Invalid
			// auto-size the pane
			var	dim	= (dir === "horz" ? "height" : "width")
			,	$P	= $Ps[pane]
			,	$C	= dim === 'height' ? $Cs[pane] : false
			,	vis	= $.layout.showInvisibly($P) // show pane invisibly if hidden
			,	szP	= $P.css(dim) // SAVE current pane size
			,	szC	= $C ? $C.css(dim) : 0 // SAVE current content size
			;
			$P.css(dim, "auto");
			if ($C) $C.css(dim, "auto");
			size = (dim === "height") ? $P.outerHeight() : $P.outerWidth(); // MEASURE
			$P.css(dim, szP).css(vis); // RESET size & visibility
			if ($C) $C.css(dim, szC);
			return size;
		}
	}

	/**
	 * Calculates current 'size' (outer-width or outer-height) of a border-pane - optionally with 'pane-spacing' added
	 *
	 * @param  {(string|!Object)}	pane
	 * @param  {boolean=}			[inclSpace=false]
	 * @return {number}				Returns EITHER Width for east/west panes OR Height for north/south panes
	 */
,	getPaneSize = function (pane, inclSpace) {
		var 
			$P	= $Ps[pane]
		,	o	= options[pane]
		,	s	= state[pane]
		,	oSp	= (inclSpace ? o.spacing_open : 0)
		,	cSp	= (inclSpace ? o.spacing_closed : 0)
		;
		if (!$P || s.isHidden)
			return 0;
		else if (s.isClosed || (s.isSliding && inclSpace))
			return cSp;
		else if (_c[pane].dir === "horz")
			return $P.outerHeight() + oSp;
		else // dir === "vert"
			return $P.outerWidth() + oSp;
	}

	/**
	 * Calculate min/max pane dimensions and limits for resizing
	 *
	 * @param  {string}		pane
	 * @param  {boolean=}	[slide=false]
	 */
,	setSizeLimits = function (pane, slide) {
		if (!isInitialized()) return;
		var 
			o				= options[pane]
		,	s				= state[pane]
		,	c				= _c[pane]
		,	dir				= c.dir
		,	type			= c.sizeType.toLowerCase()
		,	isSliding		= (slide != undefined ? slide : s.isSliding) // only open() passes 'slide' param
		,	$P				= $Ps[pane]
		,	paneSpacing		= o.spacing_open
		//	measure the pane on the *opposite side* from this pane
		,	altPane			= _c.oppositeEdge[pane]
		,	altS			= state[altPane]
		,	$altP			= $Ps[altPane]
		,	altPaneSize		= (!$altP || altS.isVisible===false || altS.isSliding ? 0 : (dir=="horz" ? $altP.outerHeight() : $altP.outerWidth()))
		,	altPaneSpacing	= ((!$altP || altS.isHidden ? 0 : options[altPane][ altS.isClosed !== false ? "spacing_closed" : "spacing_open" ]) || 0)
		//	limitSize prevents this pane from 'overlapping' opposite pane
		,	containerSize	= (dir=="horz" ? sC.innerHeight : sC.innerWidth)
		,	minCenterDims	= cssMinDims("center")
		,	minCenterSize	= dir=="horz" ? max(options.center.minHeight, minCenterDims.minHeight) : max(options.center.minWidth, minCenterDims.minWidth)
		//	if pane is 'sliding', then ignore center and alt-pane sizes - because 'overlays' them
		,	limitSize		= (containerSize - paneSpacing - (isSliding ? 0 : (_parseSize("center", minCenterSize, dir) + altPaneSize + altPaneSpacing)))
		,	minSize			= s.minSize = max( _parseSize(pane, o.minSize), cssMinDims(pane).minSize )
		,	maxSize			= s.maxSize = min( (o.maxSize ? _parseSize(pane, o.maxSize) : 100000), limitSize )
		,	r				= s.resizerPosition = {} // used to set resizing limits
		,	top				= sC.inset.top
		,	left			= sC.inset.left
		,	W				= sC.innerWidth
		,	H				= sC.innerHeight
		,	rW				= o.spacing_open // subtract resizer-width to get top/left position for south/east
		;
		switch (pane) {
			case "north":	r.min = top + minSize;
							r.max = top + maxSize;
							break;
			case "west":	r.min = left + minSize;
							r.max = left + maxSize;
							break;
			case "south":	r.min = top + H - maxSize - rW;
							r.max = top + H - minSize - rW;
							break;
			case "east":	r.min = left + W - maxSize - rW;
							r.max = left + W - minSize - rW;
							break;
		};
	}

	/**
	 * Returns data for setting the size/position of center pane. Also used to set Height for east/west panes
	 *
	 * @return JSON  Returns a hash of all dimensions: top, bottom, left, right, (outer) width and (outer) height
	 */
,	calcNewCenterPaneDims = function () {
		var d = {
			top:	getPaneSize("north", true) // true = include 'spacing' value for pane
		,	bottom:	getPaneSize("south", true)
		,	left:	getPaneSize("west", true)
		,	right:	getPaneSize("east", true)
		,	width:	0
		,	height:	0
		};

		// NOTE: sC = state.container
		// calc center-pane outer dimensions
		d.width		= sC.innerWidth - d.left - d.right;  // outerWidth
		d.height	= sC.innerHeight - d.bottom - d.top; // outerHeight
		// add the 'container border/padding' to get final positions relative to the container
		d.top		+= sC.inset.top;
		d.bottom	+= sC.inset.bottom;
		d.left		+= sC.inset.left;
		d.right		+= sC.inset.right;

		return d;
	}


	/**
	 * @param {!Object}		el
	 * @param {boolean=}		[allStates=false]
	 */
,	getHoverClasses = function (el, allStates) {
		var
			$El		= $(el)
		,	type	= $El.data("layoutRole")
		,	pane	= $El.data("layoutEdge")
		,	o		= options[pane]
		,	root	= o[type +"Class"]
		,	_pane	= "-"+ pane // eg: "-west"
		,	_open	= "-open"
		,	_closed	= "-closed"
		,	_slide	= "-sliding"
		,	_hover	= "-hover " // NOTE the trailing space
		,	_state	= $El.hasClass(root+_closed) ? _closed : _open
		,	_alt	= _state === _closed ? _open : _closed
		,	classes = (root+_hover) + (root+_pane+_hover) + (root+_state+_hover) + (root+_pane+_state+_hover)
		;
		if (allStates) // when 'removing' classes, also remove alternate-state classes
			classes += (root+_alt+_hover) + (root+_pane+_alt+_hover);

		if (type=="resizer" && $El.hasClass(root+_slide))
			classes += (root+_slide+_hover) + (root+_pane+_slide+_hover);

		return $.trim(classes);
	}
,	addHover	= function (evt, el) {
		var $E = $(el || this);
		if (evt && $E.data("layoutRole") === "toggler")
			evt.stopPropagation(); // prevent triggering 'slide' on Resizer-bar
		$E.addClass( getHoverClasses($E) );
	}
,	removeHover	= function (evt, el) {
		var $E = $(el || this);
		$E.removeClass( getHoverClasses($E, true) );
	}

,	onResizerEnter	= function (evt) { // ALSO called by toggler.mouseenter
		var pane	= $(this).data("layoutEdge")
		,	s		= state[pane]
		,	$d		= $(document)
		;
		// ignore closed-panes and mouse moving back & forth over resizer!
		// also ignore if ANY pane is currently resizing
		if ( s.isResizing || state.paneResizing ) return;

		if (options.maskPanesEarly)
			showMasks( pane, { resizing: true });
	}
,	onResizerLeave	= function (evt, el) {
		var	e		= el || this // el is only passed when called by the timer
		,	pane	= $(e).data("layoutEdge")
		,	name	= pane +"ResizerLeave"
		,	$d		= $(document)
		;
		timer.clear(pane+"_openSlider"); // cancel slideOpen timer, if set
		timer.clear(name); // cancel enableSelection timer - may re/set below
		// this method calls itself on a timer because it needs to allow
		// enough time for dragging to kick-in and set the isResizing flag
		// dragging has a 100ms delay set, so this delay must be >100
		if (!el) // 1st call - mouseleave event
			timer.set(name, function(){ onResizerLeave(evt, e); }, 200);
		// if user is resizing, dragStop will reset everything, so skip it here
		else if (options.maskPanesEarly && !state.paneResizing) // 2nd call - by timer
			hideMasks();
	}

/*
 * ###########################
 *   INITIALIZATION METHODS
 * ###########################
 */

	/**
	 * Initialize the layout - called automatically whenever an instance of layout is created
	 *
	 * @see  none - triggered onInit
	 * @return  mixed	true = fully initialized | false = panes not initialized (yet) | 'cancel' = abort
	 */
,	_create = function () {
		// initialize config/options
		initOptions();
		var o = options
		,	s = state;

		// TEMP state so isInitialized returns true during init process
		s.creatingLayout = true;

		// init plugins for this layout, if there are any (eg: stateManagement)
		runPluginCallbacks( Instance, $.layout.onCreate );

		// options & state have been initialized, so now run beforeLoad callback
		// onload will CANCEL layout creation if it returns false
		if (false === _runCallbacks("onload_start"))
			return 'cancel';

		// initialize the container element
		_initContainer();

		// bind hotkey function - keyDown - if required
		initHotkeys();

		// bind window.onunload
		$(window).bind("unload."+ sID, unload);

		// init plugins for this layout, if there are any (eg: customButtons)
		runPluginCallbacks( Instance, $.layout.onLoad );

		// if layout elements are hidden, then layout WILL NOT complete initialization!
		// initLayoutElements will set initialized=true and run the onload callback IF successful
		if (o.initPanes) _initLayoutElements();

		delete s.creatingLayout;

		return state.initialized;
	}

	/**
	 * Initialize the layout IF not already
	 *
	 * @see  All methods in Instance run this test
	 * @return  boolean	true = layoutElements have been initialized | false = panes are not initialized (yet)
	 */
,	isInitialized = function () {
		if (state.initialized || state.creatingLayout) return true;	// already initialized
		else return _initLayoutElements();	// try to init panes NOW
	}

	/**
	 * Initialize the layout - called automatically whenever an instance of layout is created
	 *
	 * @see  _create() & isInitialized
	 * @param {boolean=}		[retry=false]	// indicates this is a 2nd try
	 * @return  An object pointer to the instance created
	 */
,	_initLayoutElements = function (retry) {
		// initialize config/options
		var o = options;
		// CANNOT init panes inside a hidden container!
		if (!$N.is(":visible")) {
			// handle Chrome bug where popup window 'has no height'
			// if layout is BODY element, try again in 50ms
			// SEE: http://layout.jquery-dev.com/samples/test_popup_window.html
			if ( !retry && browser.webkit && $N[0].tagName === "BODY" )
				setTimeout(function(){ _initLayoutElements(true); }, 50);
			return false;
		}

		// a center pane is required, so make sure it exists
		if (!getPane("center").length) {
			return _log( o.errors.centerPaneMissing );
		}

		// TEMP state so isInitialized returns true during init process
		state.creatingLayout = true;

		// update Container dims
		$.extend(sC, elDims( $N, o.inset )); // passing inset means DO NOT include insetX values

		// initialize all layout elements
		initPanes();	// size & position panes - calls initHandles() - which calls initResizable()

		if (o.scrollToBookmarkOnLoad) {
			var l = self.location;
			if (l.hash) l.replace( l.hash ); // scrollTo Bookmark
		}

		// check to see if this layout 'nested' inside a pane
		if (Instance.hasParentLayout)
			o.resizeWithWindow = false;
		// bind resizeAll() for 'this layout instance' to window.resize event
		else if (o.resizeWithWindow)
			$(window).bind("resize."+ sID, windowResize);

		delete state.creatingLayout;
		state.initialized = true;

		// init plugins for this layout, if there are any
		runPluginCallbacks( Instance, $.layout.onReady );

		// now run the onload callback, if exists
		_runCallbacks("onload_end");

		return true; // elements initialized successfully
	}

	/**
	 * Initialize nested layouts for a specific pane - can optionally pass layout-options
	 *
	 * @param {(string|Object)}	evt_or_pane	The pane being opened, ie: north, south, east, or west
	 * @param {Object=}			[opts]		Layout-options - if passed, will OVERRRIDE options[pane].children
	 * @return  An object pointer to the layout instance created - or null
	 */
,	createChildren = function (evt_or_pane, opts) {
		var	pane = evtPane.call(this, evt_or_pane)
		,	$P	= $Ps[pane]
		;
		if (!$P) return;
		var	$C	= $Cs[pane]
		,	s	= state[pane]
		,	o	= options[pane]
		,	sm	= options.stateManagement || {}
		,	cos = opts ? (o.children = opts) : o.children
		;
		if ( $.isPlainObject( cos ) )
			cos = [ cos ]; // convert a hash to a 1-elem array
		else if (!cos || !$.isArray( cos ))
			return;

		$.each( cos, function (idx, co) {
			if ( !$.isPlainObject( co ) ) return;

			// determine which element is supposed to be the 'child container'
			// if pane has a 'containerSelector' OR a 'content-div', use those instead of the pane
			var $containers = co.containerSelector ? $P.find( co.containerSelector ) : ($C || $P);

			$containers.each(function(){
				var $cont	= $(this)
				,	child	= $cont.data("layout") //	see if a child-layout ALREADY exists on this element
				;
				// if no layout exists, but children are set, try to create the layout now
				if (!child) {
					// TODO: see about moving this to the stateManagement plugin, as a method
					// set a unique child-instance key for this layout, if not already set
					setInstanceKey({ container: $cont, options: co }, s );
					// If THIS layout has a hash in stateManagement.autoLoad,
					// then see if it also contains state-data for this child-layout
					// If so, copy the stateData to child.options.stateManagement.autoLoad
					if ( sm.includeChildren && state.stateData[pane] ) {
						//	THIS layout's state was cached when its state was loaded
						var	paneChildren = state.stateData[pane].children || {}
						,	childState	= paneChildren[ co.instanceKey ]
						,	co_sm		= co.stateManagement || (co.stateManagement = { autoLoad: true })
						;
						// COPY the stateData into the autoLoad key
						if ( co_sm.autoLoad === true && childState ) {
							co_sm.autoSave			= false; // disable autoSave because saving handled by parent-layout
							co_sm.includeChildren	= true;  // cascade option - FOR NOW
							co_sm.autoLoad = $.extend(true, {}, childState); // COPY the state-hash
						}
					}

					// create the layout
					child = $cont.layout( co );

					// if successful, update data
					if (child) {
						// add the child and update all layout-pointers
						// MAY have already been done by child-layout calling parent.refreshChildren()
						refreshChildren( pane, child );
					}
				}
			});
		});
	}

,	setInstanceKey = function (child, parentPaneState) {
		// create a named key for use in state and instance branches
		var	$c	= child.container
		,	o	= child.options
		,	sm	= o.stateManagement
		,	key	= o.instanceKey || $c.data("layoutInstanceKey")
		;
		if (!key) key = (sm && sm.cookie ? sm.cookie.name : '') || o.name; // look for a name/key
		if (!key) key = "layout"+ (++parentPaneState.childIdx);	// if no name/key found, generate one
		else key = key.replace(/[^\w-]/gi, '_').replace(/_{2,}/g, '_');	 // ensure is valid as a hash key
		o.instanceKey = key;
		$c.data("layoutInstanceKey", key); // useful if layout is destroyed and then recreated
		return key;
	}

	/**
	 * @param {string}		pane		The pane being opened, ie: north, south, east, or west
	 * @param {Object=}		newChild	New child-layout Instance to add to this pane
	 */
,	refreshChildren = function (pane, newChild) {
		var	$P	= $Ps[pane]
		,	pC	= children[pane]
		,	s	= state[pane]
		,	o
		;
		// check for destroy()ed layouts and update the child pointers & arrays
		if ($.isPlainObject( pC )) {
			$.each( pC, function (key, child) {
				if (child.destroyed) delete pC[key]
			});
			// if no more children, remove the children hash
			if ($.isEmptyObject( pC ))
				pC = children[pane] = null; // clear children hash
		}

		// see if there is a directly-nested layout inside this pane
		// if there is, then there can be only ONE child-layout, so check that...
		if (!newChild && !pC) {
			newChild = $P.data("layout");
		}

		// if a newChild instance was passed, add it to children[pane]
		if (newChild) {
			// update child.state
			newChild.hasParentLayout = true; // set parent-flag in child
			// instanceKey is a key-name used in both state and children
			o = newChild.options;
			// set a unique child-instance key for this layout, if not already set
			setInstanceKey( newChild, s );
			// add pointer to pane.children hash
			if (!pC) pC = children[pane] = {}; // create an empty children hash
			pC[ o.instanceKey ] = newChild.container.data("layout"); // add childLayout instance
		}

		// ALWAYS refresh the pane.children alias, even if null
		Instance[pane].children = children[pane];

		// if newChild was NOT passed - see if there is a child layout NOW
		if (!newChild) {
			createChildren(pane); // MAY create a child and re-call this method
		}
	}

,	windowResize = function () {
		var	o = options
		,	delay = Number(o.resizeWithWindowDelay);
		if (delay < 10) delay = 100; // MUST have a delay!
		// resizing uses a delay-loop because the resize event fires repeatly - except in FF, but delay anyway
		timer.clear("winResize"); // if already running
		timer.set("winResize", function(){
			timer.clear("winResize");
			timer.clear("winResizeRepeater");
			var dims = elDims( $N, o.inset );
			// only trigger resizeAll() if container has changed size
			if (dims.innerWidth !== sC.innerWidth || dims.innerHeight !== sC.innerHeight)
				resizeAll();
		}, delay);
		// ALSO set fixed-delay timer, if not already running
		if (!timer.data["winResizeRepeater"]) setWindowResizeRepeater();
	}

,	setWindowResizeRepeater = function () {
		var delay = Number(options.resizeWithWindowMaxDelay);
		if (delay > 0)
			timer.set("winResizeRepeater", function(){ setWindowResizeRepeater(); resizeAll(); }, delay);
	}

,	unload = function () {
		var o = options;

		_runCallbacks("onunload_start");

		// trigger plugin callabacks for this layout (eg: stateManagement)
		runPluginCallbacks( Instance, $.layout.onUnload );

		_runCallbacks("onunload_end");
	}

	/**
	 * Validate and initialize container CSS and events
	 *
	 * @see  _create()
	 */
,	_initContainer = function () {
		var
			N		= $N[0]	
		,	$H		= $("html")
		,	tag		= sC.tagName = N.tagName
		,	id		= sC.id = N.id
		,	cls		= sC.className = N.className
		,	o		= options
		,	name	= o.name
		,	props	= "position,margin,padding,border"
		,	css		= "layoutCSS"
		,	CSS		= {}
		,	hid		= "hidden" // used A LOT!
		//	see if this container is a 'pane' inside an outer-layout
		,	parent	= $N.data("parentLayout")	// parent-layout Instance
		,	pane	= $N.data("layoutEdge")		// pane-name in parent-layout
		,	isChild	= parent && pane
		,	num		= $.layout.cssNum
		,	$parent, n
		;
		// sC = state.container
		sC.selector = $N.selector.split(".slice")[0];
		sC.ref		= (o.name ? o.name +' layout / ' : '') + tag + (id ? "#"+id : cls ? '.['+cls+']' : ''); // used in messages
		sC.isBody	= (tag === "BODY");

		// try to find a parent-layout
		if (!isChild && !sC.isBody) {
			$parent = $N.closest("."+ $.layout.defaults.panes.paneClass);
			parent	= $parent.data("parentLayout");
			pane	= $parent.data("layoutEdge");
			isChild	= parent && pane;
		}

		$N	.data({
				layout: Instance
			,	layoutContainer: sID // FLAG to indicate this is a layout-container - contains unique internal ID
			})
			.addClass(o.containerClass)
		;
		var layoutMethods = {
			destroy:	''
		,	initPanes:	''
		,	resizeAll:	'resizeAll'
		,	resize:		'resizeAll'
		};
		// loop hash and bind all methods - include layoutID namespacing
		for (name in layoutMethods) {
			$N.bind("layout"+ name.toLowerCase() +"."+ sID, Instance[ layoutMethods[name] || name ]);
		}

		// if this container is another layout's 'pane', then set child/parent pointers
		if (isChild) {
			// update parent flag
			Instance.hasParentLayout = true;
			// set pointers to THIS child-layout (Instance) in parent-layout
			parent.refreshChildren( pane, Instance );
		}

		// SAVE original container CSS for use in destroy()
		if (!$N.data(css)) {
			// handle props like overflow different for BODY & HTML - has 'system default' values
			if (sC.isBody) {
				// SAVE <body> CSS
				$N.data(css, $.extend( styles($N, props), {
					height:		$N.css("height")
				,	overflow:	$N.css("overflow")
				,	overflowX:	$N.css("overflowX")
				,	overflowY:	$N.css("overflowY")
				}));
				// ALSO SAVE <html> CSS
				$H.data(css, $.extend( styles($H, 'padding'), {
					height:		"auto" // FF would return a fixed px-size!
				,	overflow:	$H.css("overflow")
				,	overflowX:	$H.css("overflowX")
				,	overflowY:	$H.css("overflowY")
				}));
			}
			else // handle props normally for non-body elements
				$N.data(css, styles($N, props+",top,bottom,left,right,width,height,overflow,overflowX,overflowY") );
		}

		try {
			// common container CSS
			CSS = {
				overflow:	hid
			,	overflowX:	hid
			,	overflowY:	hid
			};
			$N.css( CSS );

			if (o.inset && !$.isPlainObject(o.inset)) {
				// can specify a single number for equal outset all-around
				n = parseInt(o.inset, 10) || 0
				o.inset = {
					top:	n
				,	bottom:	n
				,	left:	n
				,	right:	n
				};
			}

			// format html & body if this is a full page layout
			if (sC.isBody) {
				// if HTML has padding, use this as an outer-spacing around BODY
				if (!o.outset) {
					// use padding from parent-elem (HTML) as outset
					o.outset = {
						top:	num($H, "paddingTop")
					,	bottom:	num($H, "paddingBottom")
					,	left:	num($H, "paddingLeft")
					,	right:	num($H, "paddingRight")
					};
				}
				else if (!$.isPlainObject(o.outset)) {
					// can specify a single number for equal outset all-around
					n = parseInt(o.outset, 10) || 0
					o.outset = {
						top:	n
					,	bottom:	n
					,	left:	n
					,	right:	n
					};
				}
				// HTML
				$H.css( CSS ).css({
					height:		"100%"
				,	border:		"none"	// no border or padding allowed when using height = 100%
				,	padding:	0		// ditto
				,	margin:		0
				});
				// BODY
				if (browser.isIE6) {
					// IE6 CANNOT use the trick of setting absolute positioning on all 4 sides - must have 'height'
					$N.css({
						width:		"100%"
					,	height:		"100%"
					,	border:		"none"	// no border or padding allowed when using height = 100%
					,	padding:	0		// ditto
					,	margin:		0
					,	position:	"relative"
					});
					// convert body padding to an inset option - the border cannot be measured in IE6!
					if (!o.inset) o.inset = elDims( $N ).inset;
				}
				else { // use absolute positioning for BODY to allow borders & padding without overflow
					$N.css({
						width:		"auto"
					,	height:		"auto"
					,	margin:		0
					,	position:	"absolute"	// allows for border and padding on BODY
					});
					// apply edge-positioning created above
					$N.css( o.outset );
				}
				// set current layout-container dimensions
				$.extend(sC, elDims( $N, o.inset )); // passing inset means DO NOT include insetX values
			}
			else {
				// container MUST have 'position'
				var	p = $N.css("position");
				if (!p || !p.match(/(fixed|absolute|relative)/))
					$N.css("position","relative");

				// set current layout-container dimensions
				if ( $N.is(":visible") ) {
					$.extend(sC, elDims( $N, o.inset )); // passing inset means DO NOT change insetX (padding) values
					if (sC.innerHeight < 1) // container has no 'height' - warn developer
						_log( o.errors.noContainerHeight.replace(/CONTAINER/, sC.ref) );
				}
			}

			// if container has min-width/height, then enable scrollbar(s)
			if ( num($N, "minWidth")  ) $N.parent().css("overflowX","auto");
			if ( num($N, "minHeight") ) $N.parent().css("overflowY","auto");

		} catch (ex) {}
	}

	/**
	 * Bind layout hotkeys - if options enabled
	 *
	 * @see  _create() and addPane()
	 * @param {string=}	[panes=""]	The edge(s) to process
	 */
,	initHotkeys = function (panes) {
		panes = panes ? panes.split(",") : _c.borderPanes;
		// bind keyDown to capture hotkeys, if option enabled for ANY pane
		$.each(panes, function (i, pane) {
			var o = options[pane];
			if (o.enableCursorHotkey || o.customHotkey) {
				$(document).bind("keydown."+ sID, keyDown); // only need to bind this ONCE
				return false; // BREAK - binding was done
			}
		});
	}

	/**
	 * Build final OPTIONS data
	 *
	 * @see  _create()
	 */
,	initOptions = function () {
		var data, d, pane, key, val, i, c, o;

		// reprocess user's layout-options to have correct options sub-key structure
		opts = $.layout.transformData( opts, true ); // panes = default subkey

		// auto-rename old options for backward compatibility
		opts = $.layout.backwardCompatibility.renameAllOptions( opts );

		// if user-options has 'panes' key (pane-defaults), clean it...
		if (!$.isEmptyObject(opts.panes)) {
			// REMOVE any pane-defaults that MUST be set per-pane
			data = $.layout.optionsMap.noDefault;
			for (i=0, c=data.length; i<c; 0 i++) { key="data[i];" delete opts.panes[key]; ok if does not exist } remove any layout-options specified under opts.panes data="$.layout.optionsMap.layout;" for (i="0," c="data.length;" i<c; move non-layout-options from opts-root to var rootkeys="$.layout.config.optionRootKeys;" (key in opts) val="opts[key];" ($.inarray(key, rootkeys) < && $.inarray(key, data) 0) (!opts.panes[key]) opts.panes[key]="$.isPlainObject(val)" ? $.extend(true, {}, val) : val; opts[key] start by updating all options opts options, opts); create final (and config) each pane $.each(_c.allpanes, function (i, pane) apply 'pane-defaults' config.[pane] _c[pane]="$.extend(true," _c.panes, _c[pane]); d="options.panes;" o="options[pane];" center-pane uses some keys defaults.panes branch (pane="==" 'center') only copy listed in: $.layout.optionsmap.center list of 'center-pane keys' loop the list... need use pane-default pane-specific value set (!opts.center[key] (opts.panes[key] || !o[key])) o[key]="d[key];" else border-panes = d, o); re-apply after pane-defaults createfxoptions( ); ensure border-pane-specific base-classes (!o.resizerclass) o.resizerclass="ui-layout-resizer" ; (!o.togglerclass) o.togglerclass="ui-layout-toggler" we have base pane-class (all panes) (!o.paneclass) o.paneclass="ui-layout-pane" }); update options.zindexes a zindex-option zo="opts.zIndex" , z="options.zIndexes;" (zo> 0) {
			z.pane_normal		= zo;
			z.content_mask		= max(zo+1, z.content_mask);	// MIN = +1
			z.resizer_normal	= max(zo+2, z.resizer_normal);	// MIN = +2
		}

		// DELETE 'panes' key now that we are done - values were copied to EACH pane
		delete options.panes;


		function createFxOptions ( pane ) {
			var	o = options[pane]
			,	d = options.panes;
			// ensure fxSettings key to avoid errors
			if (!o.fxSettings) o.fxSettings = {};
			if (!d.fxSettings) d.fxSettings = {};

			$.each(["_open","_close","_size"], function (i,n) { 
				var
					sName		= "fxName"+ n
				,	sSpeed		= "fxSpeed"+ n
				,	sSettings	= "fxSettings"+ n
					// recalculate fxName according to specificity rules
				,	fxName = o[sName] =
						o[sName]	// options.west.fxName_open
					||	d[sName]	// options.panes.fxName_open
					||	o.fxName	// options.west.fxName
					||	d.fxName	// options.panes.fxName
					||	"none"		// MEANS $.layout.defaults.panes.fxName == "" || false || null || 0
				,	fxExists	= $.effects && ($.effects[fxName] || ($.effects.effect && $.effects.effect[fxName]))
				;
				// validate fxName to ensure is valid effect - MUST have effect-config data in options.effects
				if (fxName === "none" || !options.effects[fxName] || !fxExists)
					fxName = o[sName] = "none"; // effect not loaded OR unrecognized fxName

				// set vars for effects subkeys to simplify logic
				var	fx		= options.effects[fxName] || {}	// effects.slide
				,	fx_all	= fx.all	|| null				// effects.slide.all
				,	fx_pane	= fx[pane]	|| null				// effects.slide.west
				;
				// create fxSpeed[_open|_close|_size]
				o[sSpeed] =
					o[sSpeed]				// options.west.fxSpeed_open
				||	d[sSpeed]				// options.west.fxSpeed_open
				||	o.fxSpeed				// options.west.fxSpeed
				||	d.fxSpeed				// options.panes.fxSpeed
				||	null					// DEFAULT - let fxSetting.duration control speed
				;
				// create fxSettings[_open|_close|_size]
				o[sSettings] = $.extend(
					true
				,	{}
				,	fx_all					// effects.slide.all
				,	fx_pane					// effects.slide.west
				,	d.fxSettings			// options.panes.fxSettings
				,	o.fxSettings			// options.west.fxSettings
				,	d[sSettings]			// options.panes.fxSettings_open
				,	o[sSettings]			// options.west.fxSettings_open
				);
			});

			// DONE creating action-specific-settings for this pane,
			// so DELETE generic options - are no longer meaningful
			delete o.fxName;
			delete o.fxSpeed;
			delete o.fxSettings;
		}
	}

	/**
	 * Initialize module objects, styling, size and position for all panes
	 *
	 * @see  _initElements()
	 * @param {string}	pane		The pane to process
	 */
,	getPane = function (pane) {
		var sel = options[pane].paneSelector
		if (sel.substr(0,1)==="#") // ID selector
			// NOTE: elements selected 'by ID' DO NOT have to be 'children'
			return $N.find(sel).eq(0);
		else { // class or other selector
			var $P = $N.children(sel).eq(0);
			// look for the pane nested inside a 'form' element
			return $P.length ? $P : $N.children("form:first").children(sel).eq(0);
		}
	}

	/**
	 * @param {Object=}		evt
	 */
,	initPanes = function (evt) {
		// stopPropagation if called by trigger("layoutinitpanes") - use evtPane utility 
		evtPane(evt);

		// NOTE: do north & south FIRST so we can measure their height - do center LAST
		$.each(_c.allPanes, function (idx, pane) {
			addPane( pane, true );
		});

		// init the pane-handles NOW in case we have to hide or close the pane below
		initHandles();

		// now that all panes have been initialized and initially-sized,
		// make sure there is really enough space available for each pane
		$.each(_c.borderPanes, function (i, pane) {
			if ($Ps[pane] && state[pane].isVisible) { // pane is OPEN
				setSizeLimits(pane);
				makePaneFit(pane); // pane may be Closed, Hidden or Resized by makePaneFit()
			}
		});
		// size center-pane AGAIN in case we 'closed' a border-pane in loop above
		sizeMidPanes("center");

		//	Chrome/Webkit sometimes fires callbacks BEFORE it completes resizing!
		//	Before RC30.3, there was a 10ms delay here, but that caused layout 
		//	to load asynchrously, which is BAD, so try skipping delay for now

		// process pane contents and callbacks, and init/resize child-layout if exists
		$.each(_c.allPanes, function (idx, pane) {
			afterInitPane(pane);
		});
	}

	/**
	 * Add a pane to the layout - subroutine of initPanes()
	 *
	 * @see  initPanes()
	 * @param {string}	pane			The pane to process
	 * @param {boolean=}	[force=false]	Size content after init
	 */
,	addPane = function (pane, force) {
		if ( !force && !isInitialized() ) return;
		var
			o		= options[pane]
		,	s		= state[pane]
		,	c		= _c[pane]
		,	dir		= c.dir
		,	fx		= s.fx
		,	spacing	= o.spacing_open || 0
		,	isCenter = (pane === "center")
		,	CSS		= {}
		,	$P		= $Ps[pane]
		,	size, minSize, maxSize, child
		;
		// if pane-pointer already exists, remove the old one first
		if ($P)
			removePane( pane, false, true, false );
		else
			$Cs[pane] = false; // init

		$P = $Ps[pane] = getPane(pane);
		if (!$P.length) {
			$Ps[pane] = false; // logic
			return;
		}

		// SAVE original Pane CSS
		if (!$P.data("layoutCSS")) {
			var props = "position,top,left,bottom,right,width,height,overflow,zIndex,display,backgroundColor,padding,margin,border";
			$P.data("layoutCSS", styles($P, props));
		}

		// create alias for pane data in Instance - initHandles will add more
		Instance[pane] = {
			name:		pane
		,	pane:		$Ps[pane]
		,	content:	$Cs[pane]
		,	options:	options[pane]
		,	state:		state[pane]
		,	children:	children[pane]
		};

		// add classes, attributes & events
		$P	.data({
				parentLayout:	Instance		// pointer to Layout Instance
			,	layoutPane:		Instance[pane]	// NEW pointer to pane-alias-object
			,	layoutEdge:		pane
			,	layoutRole:		"pane"
			})
			.css(c.cssReq).css("zIndex", options.zIndexes.pane_normal)
			.css(o.applyDemoStyles ? c.cssDemo : {}) // demo styles
			.addClass( o.paneClass +" "+ o.paneClass+"-"+pane ) // default = "ui-layout-pane ui-layout-pane-west" - may be a dupe of 'paneSelector'
			.bind("mouseenter."+ sID, addHover )
			.bind("mouseleave."+ sID, removeHover )
			;
		var paneMethods = {
				hide:				''
			,	show:				''
			,	toggle:				''
			,	close:				''
			,	open:				''
			,	slideOpen:			''
			,	slideClose:			''
			,	slideToggle:		''
			,	size:				'sizePane'
			,	sizePane:			'sizePane'
			,	sizeContent:		''
			,	sizeHandles:		''
			,	enableClosable:		''
			,	disableClosable:	''
			,	enableSlideable:	''
			,	disableSlideable:	''
			,	enableResizable:	''
			,	disableResizable:	''
			,	swapPanes:			'swapPanes'
			,	swap:				'swapPanes'
			,	move:				'swapPanes'
			,	removePane:			'removePane'
			,	remove:				'removePane'
			,	createChildren:		''
			,	resizeChildren:		''
			,	resizeAll:			'resizeAll'
			,	resizeLayout:		'resizeAll'
			}
		,	name;
		// loop hash and bind all methods - include layoutID namespacing
		for (name in paneMethods) {
			$P.bind("layoutpane"+ name.toLowerCase() +"."+ sID, Instance[ paneMethods[name] || name ]);
		}

		// see if this pane has a 'scrolling-content element'
		initContent(pane, false); // false = do NOT sizeContent() - called later

		if (!isCenter) {
			// call _parseSize AFTER applying pane classes & styles - but before making visible (if hidden)
			// if o.size is auto or not valid, then MEASURE the pane and use that as its 'size'
			size	= s.size = _parseSize(pane, o.size);
			minSize	= _parseSize(pane,o.minSize) || 1;
			maxSize	= _parseSize(pane,o.maxSize) || 100000;
			if (size > 0) size = max(min(size, maxSize), minSize);
			s.autoResize = o.autoResize; // used with percentage sizes

			// state for border-panes
			s.isClosed  = false; // true = pane is closed
			s.isSliding = false; // true = pane is currently open by 'sliding' over adjacent panes
			s.isResizing= false; // true = pane is in process of being resized
			s.isHidden	= false; // true = pane is hidden - no spacing, resizer or toggler is visible!

			// array for 'pin buttons' whose classNames are auto-updated on pane-open/-close
			if (!s.pins) s.pins = [];
		}
		//	states common to ALL panes
		s.tagName	= $P[0].tagName;
		s.edge		= pane;		// useful if pane is (or about to be) 'swapped' - easy find out where it is (or is going)
		s.noRoom	= false;	// true = pane 'automatically' hidden due to insufficient room - will unhide automatically
		s.isVisible	= true;		// false = pane is invisible - closed OR hidden - simplify logic

		// init pane positioning
		setPanePosition( pane );

		// if pane is not visible, 
		if (dir === "horz") // north or south pane
			CSS.height = cssH($P, size);
		else if (dir === "vert") // east or west pane
			CSS.width = cssW($P, size);
		//else if (isCenter) {}

		$P.css(CSS); // apply size -- top, bottom & height will be set by sizeMidPanes
		if (dir != "horz") sizeMidPanes(pane, true); // true = skipCallback

		// if manually adding a pane AFTER layout initialization, then...
		if (state.initialized) {
			initHandles( pane );
			initHotkeys( pane );
		}

		// close or hide the pane if specified in settings
		if (o.initClosed && o.closable && !o.initHidden)
			close(pane, true, true); // true, true = force, noAnimation
		else if (o.initHidden || o.initClosed)
			hide(pane); // will be completely invisible - no resizer or spacing
		else if (!s.noRoom)
			// make the pane visible - in case was initially hidden
			$P.css("display","block");
		// ELSE setAsOpen() - called later by initHandles()

		// RESET visibility now - pane will appear IF display:block
		$P.css("visibility","visible");

		// check option for auto-handling of pop-ups & drop-downs
		if (o.showOverflowOnHover)
			$P.hover( allowOverflow, resetOverflow );

		// if manually adding a pane AFTER layout initialization, then...
		if (state.initialized) {
			afterInitPane( pane );
		}
	}

,	afterInitPane = function (pane) {
		var	$P	= $Ps[pane]
		,	s	= state[pane]
		,	o	= options[pane]
		;
		if (!$P) return;

		// see if there is a directly-nested layout inside this pane
		if ($P.data("layout"))
			refreshChildren( pane, $P.data("layout") );

		// process pane contents and callbacks, and init/resize child-layout if exists
		if (s.isVisible) { // pane is OPEN
			if (state.initialized) // this pane was added AFTER layout was created
				resizeAll(); // will also sizeContent
			else
				sizeContent(pane);

			if (o.triggerEventsOnLoad)
				_runCallbacks("onresize_end", pane);
			else // automatic if onresize called, otherwise call it specifically
				// resize child - IF inner-layout already exists (created before this layout)
				resizeChildren(pane, true); // a previously existing childLayout
		}

		// init childLayouts - even if pane is not visible
		if (o.initChildren && o.children)
			createChildren(pane);
	}

	/**
	 * @param {string=}	panes		The pane(s) to process
	 */
,	setPanePosition = function (panes) {
		panes = panes ? panes.split(",") : _c.borderPanes;

		// create toggler DIVs for each pane, and set object pointers for them, eg: $R.north = north toggler DIV
		$.each(panes, function (i, pane) {
			var $P	= $Ps[pane]
			,	$R	= $Rs[pane]
			,	o	= options[pane]
			,	s	= state[pane]
			,	side =  _c[pane].side
			,	CSS	= {}
			;
			if (!$P) return; // pane does not exist - skip

			// set css-position to account for container borders & padding
			switch (pane) {
				case "north": 	CSS.top 	= sC.inset.top;
								CSS.left 	= sC.inset.left;
								CSS.right	= sC.inset.right;
								break;
				case "south": 	CSS.bottom	= sC.inset.bottom;
								CSS.left 	= sC.inset.left;
								CSS.right 	= sC.inset.right;
								break;
				case "west": 	CSS.left 	= sC.inset.left; // top, bottom & height set by sizeMidPanes()
								break;
				case "east": 	CSS.right 	= sC.inset.right; // ditto
								break;
				case "center":	// top, left, width & height set by sizeMidPanes()
			}
			// apply position
			$P.css(CSS); 

			// update resizer position
			if ($R && s.isClosed)
				$R.css(side, sC.inset[side]);
			else if ($R && !s.isHidden)
				$R.css(side, sC.inset[side] + getPaneSize(pane));
		});
	}

	/**
	 * Initialize module objects, styling, size and position for all resize bars and toggler buttons
	 *
	 * @see  _create()
	 * @param {string=}	[panes=""]	The edge(s) to process
	 */
,	initHandles = function (panes) {
		panes = panes ? panes.split(",") : _c.borderPanes;

		// create toggler DIVs for each pane, and set object pointers for them, eg: $R.north = north toggler DIV
		$.each(panes, function (i, pane) {
			var $P		= $Ps[pane];
			$Rs[pane]	= false; // INIT
			$Ts[pane]	= false;
			if (!$P) return; // pane does not exist - skip

			var	o		= options[pane]
			,	s		= state[pane]
			,	c		= _c[pane]
			,	paneId	= o.paneSelector.substr(0,1) === "#" ? o.paneSelector.substr(1) : ""
			,	rClass	= o.resizerClass
			,	tClass	= o.togglerClass
			,	spacing	= (s.isVisible ? o.spacing_open : o.spacing_closed)
			,	_pane	= "-"+ pane // used for classNames
			,	_state	= (s.isVisible ? "-open" : "-closed") // used for classNames
			,	I		= Instance[pane]
				// INIT RESIZER BAR
			,	$R		= I.resizer = $Rs[pane] = $("<div></div>")
				// INIT TOGGLER BUTTON
			,	$T		= I.toggler = (o.closable ? $Ts[pane] = $("<div></div>") : false)
			;

			//if (s.isVisible && o.resizable) ... handled by initResizable
			if (!s.isVisible && o.slidable)
				$R.attr("title", o.tips.Slide).css("cursor", o.sliderCursor);

			$R	// if paneSelector is an ID, then create a matching ID for the resizer, eg: "#paneLeft" => "paneLeft-resizer"
				.attr("id", paneId ? paneId +"-resizer" : "" )
				.data({
					parentLayout:	Instance
				,	layoutPane:		Instance[pane]	// NEW pointer to pane-alias-object
				,	layoutEdge:		pane
				,	layoutRole:		"resizer"
				})
				.css(_c.resizers.cssReq).css("zIndex", options.zIndexes.resizer_normal)
				.css(o.applyDemoStyles ? _c.resizers.cssDemo : {}) // add demo styles
				.addClass(rClass +" "+ rClass+_pane)
				.hover(addHover, removeHover) // ALWAYS add hover-classes, even if resizing is not enabled - handle with CSS instead
				.hover(onResizerEnter, onResizerLeave) // ALWAYS NEED resizer.mouseleave to balance toggler.mouseenter
				.mousedown($.layout.disableTextSelection)	// prevent text-selection OUTSIDE resizer
				.mouseup($.layout.enableTextSelection)		// not really necessary, but just in case
				.appendTo($N) // append DIV to container
			;
			if ($.fn.disableSelection)
				$R.disableSelection(); // prevent text-selection INSIDE resizer
			if (o.resizerDblClickToggle)
				$R.bind("dblclick."+ sID, toggle );

			if ($T) {
				$T	// if paneSelector is an ID, then create a matching ID for the resizer, eg: "#paneLeft" => "#paneLeft-toggler"
					.attr("id", paneId ? paneId +"-toggler" : "" )
					.data({
						parentLayout:	Instance
					,	layoutPane:		Instance[pane]	// NEW pointer to pane-alias-object
					,	layoutEdge:		pane
					,	layoutRole:		"toggler"
					})
					.css(_c.togglers.cssReq) // add base/required styles
					.css(o.applyDemoStyles ? _c.togglers.cssDemo : {}) // add demo styles
					.addClass(tClass +" "+ tClass+_pane)
					.hover(addHover, removeHover) // ALWAYS add hover-classes, even if toggling is not enabled - handle with CSS instead
					.bind("mouseenter", onResizerEnter) // NEED toggler.mouseenter because mouseenter MAY NOT fire on resizer
					.appendTo($R) // append SPAN to resizer DIV
				;
				// ADD INNER-SPANS TO TOGGLER
				if (o.togglerContent_open) // ui-layout-open
					$("<span>"+ o.togglerContent_open +"</span>")
						.data({
							layoutEdge:		pane
						,	layoutRole:		"togglerContent"
						})
						.data("layoutRole", "togglerContent")
						.data("layoutEdge", pane)
						.addClass("content content-open")
						.css("display","none")
						.appendTo( $T )
						//.hover( addHover, removeHover ) // use ui-layout-toggler-west-hover .content-open instead!
					;
				if (o.togglerContent_closed) // ui-layout-closed
					$("<span>"+ o.togglerContent_closed +"</span>")
						.data({
							layoutEdge:		pane
						,	layoutRole:		"togglerContent"
						})
						.addClass("content content-closed")
						.css("display","none")
						.appendTo( $T )
						//.hover( addHover, removeHover ) // use ui-layout-toggler-west-hover .content-closed instead!
					;
				// ADD TOGGLER.click/.hover
				enableClosable(pane);
			}

			// add Draggable events
			initResizable(pane);

			// ADD CLASSNAMES & SLIDE-BINDINGS - eg: class="resizer resizer-west resizer-open"
			if (s.isVisible)
				setAsOpen(pane);	// onOpen will be called, but NOT onResize
			else {
				setAsClosed(pane);	// onClose will be called
				bindStartSlidingEvents(pane, true); // will enable events IF option is set
			}

		});

		// SET ALL HANDLE DIMENSIONS
		sizeHandles();
	}


	/**
	 * Initialize scrolling ui-layout-content div - if exists
	 *
	 * @see  initPane() - or externally after an Ajax injection
	 * @param {string}	pane			The pane to process
	 * @param {boolean=}	[resize=true]	Size content after init
	 */
,	initContent = function (pane, resize) {
		if (!isInitialized()) return;
		var 
			o	= options[pane]
		,	sel	= o.contentSelector
		,	I	= Instance[pane]
		,	$P	= $Ps[pane]
		,	$C
		;
		if (sel) $C = I.content = $Cs[pane] = (o.findNestedContent)
			? $P.find(sel).eq(0) // match 1-element only
			: $P.children(sel).eq(0)
		;
		if ($C && $C.length) {
			$C.data("layoutRole", "content");
			// SAVE original Content CSS
			if (!$C.data("layoutCSS"))
				$C.data("layoutCSS", styles($C, "height"));
			$C.css( _c.content.cssReq );
			if (o.applyDemoStyles) {
				$C.css( _c.content.cssDemo ); // add padding & overflow: auto to content-div
				$P.css( _c.content.cssDemoPane ); // REMOVE padding/scrolling from pane
			}
			// ensure no vertical scrollbar on pane - will mess up measurements
			if ($P.css("overflowX").match(/(scroll|auto)/)) {
				$P.css("overflow", "hidden");
			}
			state[pane].content = {}; // init content state
			if (resize !== false) sizeContent(pane);
			// sizeContent() is called AFTER init of all elements
		}
		else
			I.content = $Cs[pane] = false;
	}


	/**
	 * Add resize-bars to all panes that specify it in options
	 * -dependancy: $.fn.resizable - will skip if not found
	 *
	 * @see  _create()
	 * @param {string=}	[panes=""]	The edge(s) to process
	 */
,	initResizable = function (panes) {
		var	draggingAvailable = $.layout.plugins.draggable
		,	side // set in start()
		;
		panes = panes ? panes.split(",") : _c.borderPanes;

		$.each(panes, function (idx, pane) {
			var o = options[pane];
			if (!draggingAvailable || !$Ps[pane] || !o.resizable) {
				o.resizable = false;
				return true; // skip to next
			}

			var s		= state[pane]
			,	z		= options.zIndexes
			,	c		= _c[pane]
			,	side	= c.dir=="horz" ? "top" : "left"
			,	$P 		= $Ps[pane]
			,	$R		= $Rs[pane]
			,	base	= o.resizerClass
			,	lastPos	= 0 // used when live-resizing
			,	r, live // set in start because may change
			//	'drag' classes are applied to the ORIGINAL resizer-bar while dragging is in process
			,	resizerClass		= base+"-drag"				// resizer-drag
			,	resizerPaneClass	= base+"-"+pane+"-drag"		// resizer-north-drag
			//	'helper' class is applied to the CLONED resizer-bar while it is being dragged
			,	helperClass			= base+"-dragging"			// resizer-dragging
			,	helperPaneClass		= base+"-"+pane+"-dragging" // resizer-north-dragging
			,	helperLimitClass	= base+"-dragging-limit"	// resizer-drag
			,	helperPaneLimitClass = base+"-"+pane+"-dragging-limit"	// resizer-north-drag
			,	helperClassesSet	= false 					// logic var
			;

			if (!s.isClosed)
				$R.attr("title", o.tips.Resize)
				  .css("cursor", o.resizerCursor); // n-resize, s-resize, etc

			$R.draggable({
				containment:	$N[0] // limit resizing to layout container
			,	axis:			(c.dir=="horz" ? "y" : "x") // limit resizing to horz or vert axis
			,	delay:			0
			,	distance:		1
			,	grid:			o.resizingGrid
			//	basic format for helper - style it using class: .ui-draggable-dragging
			,	helper:			"clone"
			,	opacity:		o.resizerDragOpacity
			,	addClasses:		false // avoid ui-state-disabled class when disabled
			//,	iframeFix:		o.draggableIframeFix // TODO: consider using when bug is fixed
			,	zIndex:			z.resizer_drag

			,	start: function (e, ui) {
					// REFRESH options & state pointers in case we used swapPanes
					o = options[pane];
					s = state[pane];
					// re-read options
					live = o.livePaneResizing;

					// ondrag_start callback - will CANCEL hide if returns false
					// TODO: dragging CANNOT be cancelled like this, so see if there is a way?
					if (false === _runCallbacks("ondrag_start", pane)) return false;

					s.isResizing		= true; // prevent pane from closing while resizing
					state.paneResizing	= pane; // easy to see if ANY pane is resizing
					timer.clear(pane+"_closeSlider"); // just in case already triggered

					// SET RESIZER LIMITS - used in drag()
					setSizeLimits(pane); // update pane/resizer state
					r = s.resizerPosition;
					lastPos = ui.position[ side ]

					$R.addClass( resizerClass +" "+ resizerPaneClass ); // add drag classes
					helperClassesSet = false; // reset logic var - see drag()

					// MASK PANES CONTAINING IFRAMES, APPLETS OR OTHER TROUBLESOME ELEMENTS
					showMasks( pane, { resizing: true });
				}

			,	drag: function (e, ui) {
					if (!helperClassesSet) { // can only add classes after clone has been added to the DOM
						//$(".ui-draggable-dragging")
						ui.helper
							.addClass( helperClass +" "+ helperPaneClass ) // add helper classes
							.css({ right: "auto", bottom: "auto" })	// fix dir="rtl" issue
							.children().css("visibility","hidden")	// hide toggler inside dragged resizer-bar
						;
						helperClassesSet = true;
						// draggable bug!? RE-SET zIndex to prevent E/W resize-bar showing through N/S pane!
						if (s.isSliding) $Ps[pane].css("zIndex", z.pane_sliding);
					}
					// CONTAIN RESIZER-BAR TO RESIZING LIMITS
					var limit = 0;
					if (ui.position[side] < r.min) {
						ui.position[side] = r.min;
						limit = -1;
					}
					else if (ui.position[side] > r.max) {
						ui.position[side] = r.max;
						limit = 1;
					}
					// ADD/REMOVE dragging-limit CLASS
					if (limit) {
						ui.helper.addClass( helperLimitClass +" "+ helperPaneLimitClass ); // at dragging-limit
						window.defaultStatus = (limit>0 && pane.match(/(north|west)/)) || (limit<0 && pane.match( (south|east) )) ? o.tips.maxsizewarning : o.tips.minsizewarning; } else { ui.helper.removeclass( helperlimitclass +" "+ helperpanelimitclass ); not at dragging-limit window.defaultstatus ; dynamically resize panes if option enabled won't trigger unless resizer has actually moved! (live math.abs(ui.position[side] - lastpos)>= o.liveResizingTolerance) {
						lastPos = ui.position[side];
						resizePanes(e, ui, pane)
					}
				}

			,	stop: function (e, ui) {
					$('body').enableSelection(); // RE-ENABLE TEXT SELECTION
					window.defaultStatus = ""; // clear 'resizing limit' message from statusbar
					$R.removeClass( resizerClass +" "+ resizerPaneClass ); // remove drag classes from Resizer
					s.isResizing		= false;
					state.paneResizing	= false; // easy to see if ANY pane is resizing
					resizePanes(e, ui, pane, true); // true = resizingDone
				}

			});
		});

		/**
		 * resizePanes
		 *
		 * Sub-routine called from stop() - and drag() if livePaneResizing
		 *
		 * @param {!Object}		evt
		 * @param {!Object}		ui
		 * @param {string}		pane
		 * @param {boolean=}		[resizingDone=false]
		 */
		var resizePanes = function (evt, ui, pane, resizingDone) {
			var	dragPos	= ui.position
			,	c		= _c[pane]
			,	o		= options[pane]
			,	s		= state[pane]
			,	resizerPos
			;
			switch (pane) {
				case "north":	resizerPos = dragPos.top; break;
				case "west":	resizerPos = dragPos.left; break;
				case "south":	resizerPos = sC.layoutHeight - dragPos.top  - o.spacing_open; break;
				case "east":	resizerPos = sC.layoutWidth  - dragPos.left - o.spacing_open; break;
			};
			// remove container margin from resizer position to get the pane size
			var newSize = resizerPos - sC.inset[c.side];

			// Disable OR Resize Mask(s) created in drag.start
			if (!resizingDone) {
				// ensure we meet liveResizingTolerance criteria
				if (Math.abs(newSize - s.size) < o.liveResizingTolerance)
					return; // SKIP resize this time
				// resize the pane
				manualSizePane(pane, newSize, false, true); // true = noAnimation
				sizeMasks(); // resize all visible masks
			}
			else { // resizingDone
				// ondrag_end callback
				if (false !== _runCallbacks("ondrag_end", pane))
					manualSizePane(pane, newSize, false, true); // true = noAnimation
				hideMasks(true); // true = force hiding all masks even if one is 'sliding'
				if (s.isSliding) // RE-SHOW 'object-masks' so objects won't show through sliding pane
					showMasks( pane, { resizing: true });
			}
		};
	}

	/**
	 *	sizeMask
	 *
	 *	Needed to overlay a DIV over an IFRAME-pane because mask CANNOT be *inside* the pane
	 *	Called when mask created, and during livePaneResizing
	 */
,	sizeMask = function () {
		var $M		= $(this)
		,	pane	= $M.data("layoutMask") // eg: "west"
		,	s		= state[pane]
		;
		// only masks over an IFRAME-pane need manual resizing
		if (s.tagName == "IFRAME" && s.isVisible) // no need to mask closed/hidden panes
			$M.css({
				top:	s.offsetTop
			,	left:	s.offsetLeft
			,	width:	s.outerWidth
			,	height:	s.outerHeight
			});
		/* ALT Method...
		var $P = $Ps[pane];
		$M.css( $P.position() ).css({ width: $P[0].offsetWidth, height: $P[0].offsetHeight });
		*/
	}
,	sizeMasks = function () {
		$Ms.each( sizeMask ); // resize all 'visible' masks
	}

	/**
	 * @param {string}	pane		The pane being resized, animated or isSliding
	 * @param {Object=}	[args]		(optional) Options: which masks to apply, and to which panes
	 */
,	showMasks = function (pane, args) {
		var	c		= _c[pane]
		,	panes	=  ["center"]
		,	z		= options.zIndexes
		,	a		= $.extend({
						objectsOnly:	false
					,	animation:		false
					,	resizing:		true
					,	sliding:		state[pane].isSliding
					},	args )
		,	o, s
		;
		if (a.resizing)
			panes.push( pane );
		if (a.sliding)
			panes.push( _c.oppositeEdge[pane] ); // ADD the oppositeEdge-pane

		if (c.dir === "horz") {
			panes.push("west");
			panes.push("east");
		}

		$.each(panes, function(i,p){
			s = state[p];
			o = options[p];
			if (s.isVisible && ( o.maskObjects || (!a.objectsOnly && o.maskContents) )) {
				getMasks(p).each(function(){
					sizeMask.call(this);
					this.style.zIndex = s.isSliding ? z.pane_sliding+1 : z.pane_normal+1
					this.style.display = "block";
				});
			}
		});
	}

	/**
	 * @param {boolean=}	force		Hide masks even if a pane is sliding
	 */
,	hideMasks = function (force) {
		// ensure no pane is resizing - could be a timing issue
		if (force || !state.paneResizing) {
			$Ms.hide(); // hide ALL masks
		}
		// if ANY pane is sliding, then DO NOT remove masks from panes with maskObjects enabled
		else if (!force && !$.isEmptyObject( state.panesSliding )) {
			var	i = $Ms.length - 1
			,	p, $M;
			for (; i >= 0; i--) {
				$M	= $Ms.eq(i);
				p	= $M.data("layoutMask");
				if (!options[p].maskObjects) {
					$M.hide();
				}
			}
		}
	}

	/**
	 * @param {string}	pane
	 */
,	getMasks = function (pane) {
		var $Masks	= $([])
		,	$M, i = 0, c = $Ms.length
		;
		for (; i<c; 2 i++) { $m="$Ms.eq(i);" if ($m.data("layoutmask")="==" pane) $masks="$Masks.add(" ); } ($masks.length) return $masks; else createmasks(pane); ** * createmasks generates both div (always used) and iframe (optional) elements as masks an mask is created *under* the when maskobjects="true," because a cannot applet @param {string} pane , (pane) var $p="$Ps[pane]" s="state[pane]" o="options[pane]" z="options.zIndexes" isiframe, el, $m, css, i ; (!o.maskcontents && !o.maskobjects) $([]); o.maskobjects="true," then loop twice to create kinds of mask, only for (i="0;" < (o.maskobjects ? : 1); isiframe="o.maskObjects" el="document.createElement(" "iframe" "div" pane); add data relate el.classname="ui-layout-mask ui-layout-mask-" + pane; user styling css="el.style;" divs iframes css.background="#FFF" css.position="absolute" css.display="block" (isiframe) iframe-only props el.src="about:blank" el.frameborder="0;" css.border="0;" css.opacity="0;" css.filter="Alpha(Opacity='0')" el.allowtransparency="true;" - ie, but breaks masking ability! div-only iframe, must itself (s.tagname="=" "iframe") note sizing done by subroutine so can be called during live-resizing css.zindex="z.pane_normal+1;" 1-higher than $n.append( append layout container otherwise put *inside pane* its contents $m.addclass("ui-layout-mask-inside-pane"); || z.content_mask; usually 1, customizable css.top="0;" css.left="0;" css.width="100%" css.height="100%" $p.append( inside element cached array resized & reused $ms="$Ms.add(" $ms; destroy this reset all {boolean="}" [destroychildren="false]" destory child-layouts first? (evt_or_destroychildren, destroychildren) unbind events remove global object $(window).unbind("."+ sid); resize unload $(document).unbind("."+ keydown (hotkeys) (typeof evt_or_destroychildren="==" "object") stoppropagation trigger("layoutdestroy") use evtpane utility evtpane(evt_or_destroychildren); no event, transfer 1st param destroychildren need look parent before we data, skips level parentpane="Instance.hasParentLayout" $.layout.getparentpaneinstance( $n ) null; layout-container .clearqueue() .removedata("layout") .removedata("layoutcontainer") .removeclass(options.containerclass) .unbind("."+ sid) that have been $ms.remove(); panes classes, attributes bindings $.each(_c.allpanes, function (i, removepane( pane, false, true, true="skipResize" }); do not 'pane' (or 'content') in outer-layout 'nested' ($n.data(css) !$n.data("layoutrole")) $n.css( $n.data(css) ).removedata(css); full-page layouts, also <html> CSS
		if (sC.tagName === "BODY" && ($N = $("html")).data(css)) // RESET <html> CSS
			$N.css( $N.data(css) ).removeData(css);

		// trigger plugins for this layout, if there are any
		runPluginCallbacks( Instance, $.layout.onDestroy );

		// trigger state-management and onunload callback
		unload();

		// clear the Instance of everything except for container & options (so could recreate)
		// RE-CREATE: myLayout = myLayout.container.layout( myLayout.options );
		for (var n in Instance)
			if (!n.match(/^(container|options)$/)) delete Instance[ n ];
		// add a 'destroyed' flag to make it easy to check
		Instance.destroyed = true;

		// if this is a child layout, CLEAR the child-pointer in the parent
		/* for now the pointer REMAINS, but with only container, options and destroyed keys
		if (parentPane) {
			var layout	= parentPane.pane.data("parentLayout")
			,	key		= layout.options.instanceKey || 'error';
			// THIS SYNTAX MAY BE WRONG!
			parentPane.children[key] = layout.children[ parentPane.name ].children[key] = null;
		}
		*/

		return Instance; // for coding convenience
	}

	/**
	 * Remove a pane from the layout - subroutine of destroy()
	 *
	 * @see  destroy()
	 * @param {(string|Object)}	evt_or_pane			The pane to process
	 * @param {boolean=}			[remove=false]		Remove the DOM element?
	 * @param {boolean=}			[skipResize=false]	Skip calling resizeAll()?
	 * @param {boolean=}			[destroyChild=true]	Destroy Child-layouts? If not passed, obeys options setting
	 */
,	removePane = function (evt_or_pane, remove, skipResize, destroyChild) {
		if (!isInitialized()) return;
		var	pane = evtPane.call(this, evt_or_pane)
		,	$P	= $Ps[pane]
		,	$C	= $Cs[pane]
		,	$R	= $Rs[pane]
		,	$T	= $Ts[pane]
		;
		// NOTE: elements can still exist even after remove()
		//		so check for missing data(), which is cleared by removed()
		if ($P && $.isEmptyObject( $P.data() )) $P = false;
		if ($C && $.isEmptyObject( $C.data() )) $C = false;
		if ($R && $.isEmptyObject( $R.data() )) $R = false;
		if ($T && $.isEmptyObject( $T.data() )) $T = false;

		if ($P) $P.stop(true, true);

		var	o	= options[pane]
		,	s	= state[pane]
		,	d	= "layout"
		,	css	= "layoutCSS"
		,	pC	= children[pane]
		,	hasChildren	= $.isPlainObject( pC ) && !$.isEmptyObject( pC )
		,	destroy		= destroyChild !== undefined ? destroyChild : o.destroyChildren
		;
		// FIRST destroy the child-layout(s)
		if (hasChildren && destroy) {
			$.each( pC, function (key, child) {
				if (!child.destroyed)
					child.destroy(true);// tell child-layout to destroy ALL its child-layouts too
				if (child.destroyed)	// destroy was successful
					delete pC[key];
			});
			// if no more children, remove the children hash
			if ($.isEmptyObject( pC )) {
				pC = children[pane] = null; // clear children hash
				hasChildren = false;
			}
		}

		// Note: can't 'remove' a pane element with non-destroyed children
		if ($P && remove && !hasChildren)
			$P.remove(); // remove the pane-element and everything inside it
		else if ($P && $P[0]) {
			//	create list of ALL pane-classes that need to be removed
			var	root	= o.paneClass // default="ui-layout-pane"
			,	pRoot	= root +"-"+ pane // eg: "ui-layout-pane-west"
			,	_open	= "-open"
			,	_sliding= "-sliding"
			,	_closed	= "-closed"
			,	classes	= [	root, root+_open, root+_closed, root+_sliding,		// generic classes
							pRoot, pRoot+_open, pRoot+_closed, pRoot+_sliding ]	// pane-specific classes
			;
			$.merge(classes, getHoverClasses($P, true)); // ADD hover-classes
			// remove all Layout classes from pane-element
			$P	.removeClass( classes.join(" ") ) // remove ALL pane-classes
				.removeData("parentLayout")
				.removeData("layoutPane")
				.removeData("layoutRole")
				.removeData("layoutEdge")
				.removeData("autoHidden")	// in case set
				.unbind("."+ sID) // remove ALL Layout events
				// TODO: remove these extra unbind commands when jQuery is fixed
				//.unbind("mouseenter"+ sID)
				//.unbind("mouseleave"+ sID)
			;
			// do NOT reset CSS if this pane/content is STILL the container of a nested layout!
			// the nested layout will reset its 'container' CSS when/if it is destroyed
			if (hasChildren && $C) {
				// a content-div may not have a specific width, so give it one to contain the Layout
				$C.width( $C.width() );
				$.each( pC, function (key, child) {
					child.resizeAll(); // resize the Layout
				});
			}
			else if ($C)
				$C.css( $C.data(css) ).removeData(css).removeData("layoutRole");
			// remove pane AFTER content in case there was a nested layout
			if (!$P.data(d))
				$P.css( $P.data(css) ).removeData(css);
		}

		// REMOVE pane resizer and toggler elements
		if ($T) $T.remove();
		if ($R) $R.remove();

		// CLEAR all pointers and state data
		Instance[pane] = $Ps[pane] = $Cs[pane] = $Rs[pane] = $Ts[pane] = false;
		s = { removed: true };

		if (!skipResize)
			resizeAll();
	}


/*
 * ###########################
 *	   ACTION METHODS
 * ###########################
 */

	/**
	 * @param {string}	pane
	 */
,	_hidePane = function (pane) {
		var $P	= $Ps[pane]
		,	o	= options[pane]
		,	s	= $P[0].style
		;
		if (o.useOffscreenClose) {
			if (!$P.data(_c.offscreenReset))
				$P.data(_c.offscreenReset, { left: s.left, right: s.right });
			$P.css( _c.offscreenCSS );
		}
		else
			$P.hide().removeData(_c.offscreenReset);
	}

	/**
	 * @param {string}	pane
	 */
,	_showPane = function (pane) {
		var $P	= $Ps[pane]
		,	o	= options[pane]
		,	off	= _c.offscreenCSS
		,	old	= $P.data(_c.offscreenReset)
		,	s	= $P[0].style
		;
		$P	.show() // ALWAYS show, just in case
			.removeData(_c.offscreenReset);
		if (o.useOffscreenClose && old) {
			if (s.left == off.left)
				s.left = old.left;
			if (s.right == off.right)
				s.right = old.right;
		}
	}


	/**
	 * Completely 'hides' a pane, including its spacing - as if it does not exist
	 * The pane is not actually 'removed' from the source, so can use 'show' to un-hide it
	 *
	 * @param {(string|Object)}	evt_or_pane			The pane being hidden, ie: north, south, east, or west
	 * @param {boolean=}			[noAnimation=false]	
	 */
,	hide = function (evt_or_pane, noAnimation) {
		if (!isInitialized()) return;
		var	pane = evtPane.call(this, evt_or_pane)
		,	o	= options[pane]
		,	s	= state[pane]
		,	$P	= $Ps[pane]
		,	$R	= $Rs[pane]
		;
		if (pane === "center" || !$P || s.isHidden) return; // pane does not exist OR is already hidden

		// onhide_start callback - will CANCEL hide if returns false
		if (state.initialized && false === _runCallbacks("onhide_start", pane)) return;

		s.isSliding = false; // just in case
		delete state.panesSliding[pane];

		// now hide the elements
		if ($R) $R.hide(); // hide resizer-bar
		if (!state.initialized || s.isClosed) {
			s.isClosed = true; // to trigger open-animation on show()
			s.isHidden  = true;
			s.isVisible = false;
			if (!state.initialized)
				_hidePane(pane); // no animation when loading page
			sizeMidPanes(_c[pane].dir === "horz" ? "" : "center");
			if (state.initialized || o.triggerEventsOnLoad)
				_runCallbacks("onhide_end", pane);
		}
		else {
			s.isHiding = true; // used by onclose
			close(pane, false, noAnimation); // adjust all panes to fit
		}
	}

	/**
	 * Show a hidden pane - show as 'closed' by default unless openPane = true
	 *
	 * @param {(string|Object)}	evt_or_pane			The pane being opened, ie: north, south, east, or west
	 * @param {boolean=}			[openPane=false]
	 * @param {boolean=}			[noAnimation=false]
	 * @param {boolean=}			[noAlert=false]
	 */
,	show = function (evt_or_pane, openPane, noAnimation, noAlert) {
		if (!isInitialized()) return;
		var	pane = evtPane.call(this, evt_or_pane)
		,	o	= options[pane]
		,	s	= state[pane]
		,	$P	= $Ps[pane]
		,	$R	= $Rs[pane]
		;
		if (pane === "center" || !$P || !s.isHidden) return; // pane does not exist OR is not hidden

		// onshow_start callback - will CANCEL show if returns false
		if (false === _runCallbacks("onshow_start", pane)) return;

		s.isShowing = true; // used by onopen/onclose
		//s.isHidden  = false; - will be set by open/close - if not cancelled
		s.isSliding = false; // just in case
		delete state.panesSliding[pane];

		// now show the elements
		//if ($R) $R.show(); - will be shown by open/close
		if (openPane === false)
			close(pane, true); // true = force
		else
			open(pane, false, noAnimation, noAlert); // adjust all panes to fit
	}


	/**
	 * Toggles a pane open/closed by calling either open or close
	 *
	 * @param {(string|Object)}	evt_or_pane		The pane being toggled, ie: north, south, east, or west
	 * @param {boolean=}			[slide=false]
	 */
,	toggle = function (evt_or_pane, slide) {
		if (!isInitialized()) return;
		var	evt		= evtObj(evt_or_pane)
		,	pane	= evtPane.call(this, evt_or_pane)
		,	s		= state[pane]
		;
		if (evt) // called from to $R.dblclick OR triggerPaneEvent
			evt.stopImmediatePropagation();
		if (s.isHidden)
			show(pane); // will call 'open' after unhiding it
		else if (s.isClosed)
			open(pane, !!slide);
		else
			close(pane);
	}


	/**
	 * Utility method used during init or other auto-processes
	 *
	 * @param {string}	pane   The pane being closed
	 * @param {boolean=}	[setHandles=false]
	 */
,	_closePane = function (pane, setHandles) {
		var
			$P	= $Ps[pane]
		,	s	= state[pane]
		;
		_hidePane(pane);
		s.isClosed = true;
		s.isVisible = false;
		if (setHandles) setAsClosed(pane);
	}

	/**
	 * Close the specified pane (animation optional), and resize all other panes as needed
	 *
	 * @param {(string|Object)}	evt_or_pane			The pane being closed, ie: north, south, east, or west
	 * @param {boolean=}			[force=false]
	 * @param {boolean=}			[noAnimation=false]
	 * @param {boolean=}			[skipCallback=false]
	 */
,	close = function (evt_or_pane, force, noAnimation, skipCallback) {
		var	pane = evtPane.call(this, evt_or_pane);
		if (pane === "center") return; // validate
		// if pane has been initialized, but NOT the complete layout, close pane instantly
		if (!state.initialized && $Ps[pane]) {
			_closePane(pane, true); // INIT pane as closed
			return;
		}
		if (!isInitialized()) return;

		var
			$P	= $Ps[pane]
		,	$R	= $Rs[pane]
		,	$T	= $Ts[pane]
		,	o	= options[pane]
		,	s	= state[pane]
		,	c	= _c[pane]
		,	doFX, isShowing, isHiding, wasSliding;

		// QUEUE in case another action/animation is in progress
		$N.queue(function( queueNext ){

			if ( !$P
			||	(!o.closable && !s.isShowing && !s.isHiding)	// invalid request // (!o.resizable && !o.closable) ???
			||	(!force && s.isClosed && !s.isShowing)			// already closed
			) return queueNext();

			// onclose_start callback - will CANCEL hide if returns false
			// SKIP if just 'showing' a hidden pane as 'closed'
			var abort = !s.isShowing && false === _runCallbacks("onclose_start", pane);

			// transfer logic vars to temp vars
			isShowing	= s.isShowing;
			isHiding	= s.isHiding;
			wasSliding	= s.isSliding;
			// now clear the logic vars (REQUIRED before aborting)
			delete s.isShowing;
			delete s.isHiding;

			if (abort) return queueNext();

			doFX		= !noAnimation && !s.isClosed && (o.fxName_close != "none");
			s.isMoving	= true;
			s.isClosed	= true;
			s.isVisible	= false;
			// update isHidden BEFORE sizing panes
			if (isHiding) s.isHidden = true;
			else if (isShowing) s.isHidden = false;

			if (s.isSliding) // pane is being closed, so UNBIND trigger events
				bindStopSlidingEvents(pane, false); // will set isSliding=false
			else // resize panes adjacent to this one
				sizeMidPanes(_c[pane].dir === "horz" ? "" : "center", false); // false = NOT skipCallback

			// if this pane has a resizer bar, move it NOW - before animation
			setAsClosed(pane);

			// CLOSE THE PANE
			if (doFX) { // animate the close
				lockPaneForFX(pane, true);	// need to set left/top so animation will work
				$P.hide( o.fxName_close, o.fxSettings_close, o.fxSpeed_close, function () {
					lockPaneForFX(pane, false); // undo
					if (s.isClosed) close_2();
					queueNext();
				});
			}
			else { // hide the pane without animation
				_hidePane(pane);
				close_2();
				queueNext();
			};
		});

		// SUBROUTINE
		function close_2 () {
			s.isMoving	= false;
			bindStartSlidingEvents(pane, true); // will enable if o.slidable = true

			// if opposite-pane was autoClosed, see if it can be autoOpened now
			var altPane = _c.oppositeEdge[pane];
			if (state[ altPane ].noRoom) {
				setSizeLimits( altPane );
				makePaneFit( altPane );
			}

			if (!skipCallback && (state.initialized || o.triggerEventsOnLoad)) {
				// onclose callback - UNLESS just 'showing' a hidden pane as 'closed'
				if (!isShowing)	_runCallbacks("onclose_end", pane);
				// onhide OR onshow callback
				if (isShowing)	_runCallbacks("onshow_end", pane);
				if (isHiding)	_runCallbacks("onhide_end", pane);
			}
		}
	}

	/**
	 * @param {string}	pane	The pane just closed, ie: north, south, east, or west
	 */
,	setAsClosed = function (pane) {
		if (!$Rs[pane]) return; // handles not initialized yet!
		var
			$P		= $Ps[pane]
		,	$R		= $Rs[pane]
		,	$T		= $Ts[pane]
		,	o		= options[pane]
		,	s		= state[pane]
		,	side	= _c[pane].side
		,	rClass	= o.resizerClass
		,	tClass	= o.togglerClass
		,	_pane	= "-"+ pane // used for classNames
		,	_open	= "-open"
		,	_sliding= "-sliding"
		,	_closed	= "-closed"
		;
		$R
			.css(side, sC.inset[side]) // move the resizer
			.removeClass( rClass+_open +" "+ rClass+_pane+_open )
			.removeClass( rClass+_sliding +" "+ rClass+_pane+_sliding )
			.addClass( rClass+_closed +" "+ rClass+_pane+_closed )
		;
		// handle already-hidden panes in case called by swap() or a similar method 
		if (s.isHidden) $R.hide(); // hide resizer-bar 

		// DISABLE 'resizing' when closed - do this BEFORE bindStartSlidingEvents?
		if (o.resizable && $.layout.plugins.draggable)
			$R
				.draggable("disable")
				.removeClass("ui-state-disabled") // do NOT apply disabled styling - not suitable here
				.css("cursor", "default")
				.attr("title","")
			;

		// if pane has a toggler button, adjust that too
		if ($T) {
			$T
				.removeClass( tClass+_open +" "+ tClass+_pane+_open )
				.addClass( tClass+_closed +" "+ tClass+_pane+_closed )
				.attr("title", o.tips.Open) // may be blank
			;
			// toggler-content - if exists
			$T.children(".content-open").hide();
			$T.children(".content-closed").css("display","block");
		}

		// sync any 'pin buttons'
		syncPinBtns(pane, false);

		if (state.initialized) {
			// resize 'length' and position togglers for adjacent panes
			sizeHandles();
		}
	}

	/**
	 * Open the specified pane (animation optional), and resize all other panes as needed
	 *
	 * @param {(string|Object)}	evt_or_pane			The pane being opened, ie: north, south, east, or west
	 * @param {boolean=}			[slide=false]
	 * @param {boolean=}			[noAnimation=false]
	 * @param {boolean=}			[noAlert=false]
	 */
,	open = function (evt_or_pane, slide, noAnimation, noAlert) {
		if (!isInitialized()) return;
		var	pane = evtPane.call(this, evt_or_pane)
		,	$P	= $Ps[pane]
		,	$R	= $Rs[pane]
		,	$T	= $Ts[pane]
		,	o	= options[pane]
		,	s	= state[pane]
		,	c	= _c[pane]
		,	doFX, isShowing
		;
		if (pane === "center") return; // validate
		// QUEUE in case another action/animation is in progress
		$N.queue(function( queueNext ){

			if ( !$P
			||	(!o.resizable && !o.closable && !s.isShowing)	// invalid request
			||	(s.isVisible && !s.isSliding)					// already open
			) return queueNext();

			// pane can ALSO be unhidden by just calling show(), so handle this scenario
			if (s.isHidden && !s.isShowing) {
				queueNext(); // call before show() because it needs the queue free
				show(pane, true);
				return;
			}

			if (s.autoResize && s.size != o.size) // resize pane to original size set in options
				sizePane(pane, o.size, true, true, true); // true=skipCallback/noAnimation/forceResize
			else
				// make sure there is enough space available to open the pane
				setSizeLimits(pane, slide);

			// onopen_start callback - will CANCEL open if returns false
			var cbReturn = _runCallbacks("onopen_start", pane);

			if (cbReturn === "abort")
				return queueNext();

			// update pane-state again in case options were changed in onopen_start
			if (cbReturn !== "NC") // NC = "No Callback"
				setSizeLimits(pane, slide);

			if (s.minSize > s.maxSize) { // INSUFFICIENT ROOM FOR PANE TO OPEN!
				syncPinBtns(pane, false); // make sure pin-buttons are reset
				if (!noAlert && o.tips.noRoomToOpen)
					alert(o.tips.noRoomToOpen);
				return queueNext(); // ABORT
			}

			if (slide) // START Sliding - will set isSliding=true
				bindStopSlidingEvents(pane, true); // BIND trigger events to close sliding-pane
			else if (s.isSliding) // PIN PANE (stop sliding) - open pane 'normally' instead
				bindStopSlidingEvents(pane, false); // UNBIND trigger events - will set isSliding=false
			else if (o.slidable)
				bindStartSlidingEvents(pane, false); // UNBIND trigger events

			s.noRoom = false; // will be reset by makePaneFit if 'noRoom'
			makePaneFit(pane);

			// transfer logic var to temp var
			isShowing = s.isShowing;
			// now clear the logic var
			delete s.isShowing;

			doFX		= !noAnimation && s.isClosed && (o.fxName_open != "none");
			s.isMoving	= true;
			s.isVisible	= true;
			s.isClosed	= false;
			// update isHidden BEFORE sizing panes - WHY??? Old?
			if (isShowing) s.isHidden = false;

			if (doFX) { // ANIMATE
				// mask adjacent panes with objects
				lockPaneForFX(pane, true);	// need to set left/top so animation will work
					$P.show( o.fxName_open, o.fxSettings_open, o.fxSpeed_open, function() {
					lockPaneForFX(pane, false); // undo
					if (s.isVisible) open_2(); // continue
					queueNext();
				});
			}
			else { // no animation
				_showPane(pane);// just show pane and...
				open_2();		// continue
				queueNext();
			};
		});

		// SUBROUTINE
		function open_2 () {
			s.isMoving	= false;

			// cure iframe display issues
			_fixIframe(pane);

			// NOTE: if isSliding, then other panes are NOT 'resized'
			if (!s.isSliding) { // resize all panes adjacent to this one
				sizeMidPanes(_c[pane].dir=="vert" ? "center" : "", false); // false = NOT skipCallback
			}

			// set classes, position handles and execute callbacks...
			setAsOpen(pane);
		};
	
	}

	/**
	 * @param {string}	pane		The pane just opened, ie: north, south, east, or west
	 * @param {boolean=}	[skipCallback=false]
	 */
,	setAsOpen = function (pane, skipCallback) {
		var 
			$P		= $Ps[pane]
		,	$R		= $Rs[pane]
		,	$T		= $Ts[pane]
		,	o		= options[pane]
		,	s		= state[pane]
		,	side	= _c[pane].side
		,	rClass	= o.resizerClass
		,	tClass	= o.togglerClass
		,	_pane	= "-"+ pane // used for classNames
		,	_open	= "-open"
		,	_closed	= "-closed"
		,	_sliding= "-sliding"
		;
		$R
			.css(side, sC.inset[side] + getPaneSize(pane)) // move the resizer
			.removeClass( rClass+_closed +" "+ rClass+_pane+_closed )
			.addClass( rClass+_open +" "+ rClass+_pane+_open )
		;
		if (s.isSliding)
			$R.addClass( rClass+_sliding +" "+ rClass+_pane+_sliding )
		else // in case 'was sliding'
			$R.removeClass( rClass+_sliding +" "+ rClass+_pane+_sliding )

		removeHover( 0, $R ); // remove hover classes
		if (o.resizable && $.layout.plugins.draggable)
			$R	.draggable("enable")
				.css("cursor", o.resizerCursor)
				.attr("title", o.tips.Resize);
		else if (!s.isSliding)
			$R.css("cursor", "default"); // n-resize, s-resize, etc

		// if pane also has a toggler button, adjust that too
		if ($T) {
			$T	.removeClass( tClass+_closed +" "+ tClass+_pane+_closed )
				.addClass( tClass+_open +" "+ tClass+_pane+_open )
				.attr("title", o.tips.Close); // may be blank
			removeHover( 0, $T ); // remove hover classes
			// toggler-content - if exists
			$T.children(".content-closed").hide();
			$T.children(".content-open").css("display","block");
		}

		// sync any 'pin buttons'
		syncPinBtns(pane, !s.isSliding);

		// update pane-state dimensions - BEFORE resizing content
		$.extend(s, elDims($P));

		if (state.initialized) {
			// resize resizer & toggler sizes for all panes
			sizeHandles();
			// resize content every time pane opens - to be sure
			sizeContent(pane, true); // true = remeasure headers/footers, even if 'pane.isMoving'
		}

		if (!skipCallback && (state.initialized || o.triggerEventsOnLoad) && $P.is(":visible")) {
			// onopen callback
			_runCallbacks("onopen_end", pane);
			// onshow callback - TODO: should this be here?
			if (s.isShowing) _runCallbacks("onshow_end", pane);

			// ALSO call onresize because layout-size *may* have changed while pane was closed
			if (state.initialized)
				_runCallbacks("onresize_end", pane);
		}

		// TODO: Somehow sizePane("north") is being called after this point???
	}


	/**
	 * slideOpen / slideClose / slideToggle
	 *
	 * Pass-though methods for sliding
	 */
,	slideOpen = function (evt_or_pane) {
		if (!isInitialized()) return;
		var	evt		= evtObj(evt_or_pane)
		,	pane	= evtPane.call(this, evt_or_pane)
		,	s		= state[pane]
		,	delay	= options[pane].slideDelay_open
		;
		if (pane === "center") return; // validate
		// prevent event from triggering on NEW resizer binding created below
		if (evt) evt.stopImmediatePropagation();

		if (s.isClosed && evt && evt.type === "mouseenter" && delay > 0)
			// trigger = mouseenter - use a delay
			timer.set(pane+"_openSlider", open_NOW, delay);
		else
			open_NOW(); // will unbind events if is already open

		/**
		 * SUBROUTINE for timed open
		 */
		function open_NOW () {
			if (!s.isClosed) // skip if no longer closed!
				bindStopSlidingEvents(pane, true); // BIND trigger events to close sliding-pane
			else if (!s.isMoving)
				open(pane, true); // true = slide - open() will handle binding
		};
	}

,	slideClose = function (evt_or_pane) {
		if (!isInitialized()) return;
		var	evt		= evtObj(evt_or_pane)
		,	pane	= evtPane.call(this, evt_or_pane)
		,	o		= options[pane]
		,	s		= state[pane]
		,	delay	= s.isMoving ? 1000 : 300 // MINIMUM delay - option may override
		;
		if (pane === "center") return; // validate
		if (s.isClosed || s.isResizing)
			return; // skip if already closed OR in process of resizing
		else if (o.slideTrigger_close === "click")
			close_NOW(); // close immediately onClick
		else if (o.preventQuickSlideClose && s.isMoving)
			return; // handle Chrome quick-close on slide-open
		else if (o.preventPrematureSlideClose && evt && $.layout.isMouseOverElem(evt, $Ps[pane]))
			return; // handle incorrect mouseleave trigger, like when over a SELECT-list in IE
		else if (evt) // trigger = mouseleave - use a delay
			// 1 sec delay if 'opening', else .3 sec
			timer.set(pane+"_closeSlider", close_NOW, max(o.slideDelay_close, delay));
		else // called programically
			close_NOW();

		/**
		 * SUBROUTINE for timed close
		 */
		function close_NOW () {
			if (s.isClosed) // skip 'close' if already closed!
				bindStopSlidingEvents(pane, false); // UNBIND trigger events - TODO: is this needed here?
			else if (!s.isMoving)
				close(pane); // close will handle unbinding
		};
	}

	/**
	 * @param {(string|Object)}	evt_or_pane		The pane being opened, ie: north, south, east, or west
	 */
,	slideToggle = function (evt_or_pane) {
		var pane = evtPane.call(this, evt_or_pane);
		toggle(pane, true);
	}


	/**
	 * Must set left/top on East/South panes so animation will work properly
	 *
	 * @param {string}	pane	The pane to lock, 'east' or 'south' - any other is ignored!
	 * @param {boolean}	doLock  true = set left/top, false = remove
	 */
,	lockPaneForFX = function (pane, doLock) {
		var $P	= $Ps[pane]
		,	s	= state[pane]
		,	o	= options[pane]
		,	z	= options.zIndexes
		;
		if (doLock) {
			showMasks( pane, { animation: true, objectsOnly: true });
			$P.css({ zIndex: z.pane_animate }); // overlay all elements during animation
			if (pane=="south")
				$P.css({ top: sC.inset.top + sC.innerHeight - $P.outerHeight() });
			else if (pane=="east")
				$P.css({ left: sC.inset.left + sC.innerWidth - $P.outerWidth() });
		}
		else { // animation DONE - RESET CSS
			hideMasks();
			$P.css({ zIndex: (s.isSliding ? z.pane_sliding : z.pane_normal) });
			if (pane=="south")
				$P.css({ top: "auto" });
			// if pane is positioned 'off-screen', then DO NOT screw with it!
			else if (pane=="east" && !$P.css("left").match(/\-99999/))
				$P.css({ left: "auto" });
			// fix anti-aliasing in IE - only needed for animations that change opacity
			if (browser.msie && o.fxOpacityFix && o.fxName_open != "slide" && $P.css("filter") && $P.css("opacity") == 1)
				$P[0].style.removeAttribute('filter');
		}
	}


	/**
	 * Toggle sliding functionality of a specific pane on/off by adding removing 'slide open' trigger
	 *
	 * @see  open(), close()
	 * @param {string}	pane	The pane to enable/disable, 'north', 'south', etc.
	 * @param {boolean}	enable	Enable or Disable sliding?
	 */
,	bindStartSlidingEvents = function (pane, enable) {
		var o		= options[pane]
		,	$P		= $Ps[pane]
		,	$R		= $Rs[pane]
		,	evtName	= o.slideTrigger_open.toLowerCase()
		;
		if (!$R || (enable && !o.slidable)) return;

		// make sure we have a valid event
		if (evtName.match(/mouseover/))
			evtName = o.slideTrigger_open = "mouseenter";
		else if (!evtName.match(/(click|dblclick|mouseenter)/)) 
			evtName = o.slideTrigger_open = "click";

		// must remove double-click-toggle when using dblclick-slide
		if (o.resizerDblClickToggle && evtName.match(/click/)) {
			$R[enable ? "unbind" : "bind"]('dblclick.'+ sID, toggle)
		}

		$R
			// add or remove event
			[enable ? "bind" : "unbind"](evtName +'.'+ sID, slideOpen)
			// set the appropriate cursor & title/tip
			.css("cursor", enable ? o.sliderCursor : "default")
			.attr("title", enable ? o.tips.Slide : "")
		;
	}

	/**
	 * Add or remove 'mouseleave' events to 'slide close' when pane is 'sliding' open or closed
	 * Also increases zIndex when pane is sliding open
	 * See bindStartSlidingEvents for code to control 'slide open'
	 *
	 * @see  slideOpen(), slideClose()
	 * @param {string}	pane	The pane to process, 'north', 'south', etc.
	 * @param {boolean}	enable	Enable or Disable events?
	 */
,	bindStopSlidingEvents = function (pane, enable) {
		var	o		= options[pane]
		,	s		= state[pane]
		,	c		= _c[pane]
		,	z		= options.zIndexes
		,	evtName	= o.slideTrigger_close.toLowerCase()
		,	action	= (enable ? "bind" : "unbind")
		,	$P		= $Ps[pane]
		,	$R		= $Rs[pane]
		;
		timer.clear(pane+"_closeSlider"); // just in case

		if (enable) {
			s.isSliding = true;
			state.panesSliding[pane] = true;
			// remove 'slideOpen' event from resizer
			// ALSO will raise the zIndex of the pane & resizer
			bindStartSlidingEvents(pane, false);
		}
		else {
			s.isSliding = false;
			delete state.panesSliding[pane];
		}

		// RE/SET zIndex - increases when pane is sliding-open, resets to normal when not
		$P.css("zIndex", enable ? z.pane_sliding : z.pane_normal);
		$R.css("zIndex", enable ? z.pane_sliding+2 : z.resizer_normal); // NOTE: mask = pane_sliding+1

		// make sure we have a valid event
		if (!evtName.match(/(click|mouseleave)/))
			evtName = o.slideTrigger_close = "mouseleave"; // also catches 'mouseout'

		// add/remove slide triggers
		$R[action](evtName, slideClose); // base event on resize
		// need extra events for mouseleave
		if (evtName === "mouseleave") {
			// also close on pane.mouseleave
			$P[action]("mouseleave."+ sID, slideClose);
			// cancel timer when mouse moves between 'pane' and 'resizer'
			$R[action]("mouseenter."+ sID, cancelMouseOut);
			$P[action]("mouseenter."+ sID, cancelMouseOut);
		}

		if (!enable)
			timer.clear(pane+"_closeSlider");
		else if (evtName === "click" && !o.resizable) {
			// IF pane is not resizable (which already has a cursor and tip) 
			// then set the a cursor & title/tip on resizer when sliding
			$R.css("cursor", enable ? o.sliderCursor : "default");
			$R.attr("title", enable ? o.tips.Close : ""); // use Toggler-tip, eg: "Close Pane"
		}

		// SUBROUTINE for mouseleave timer clearing
		function cancelMouseOut (evt) {
			timer.clear(pane+"_closeSlider");
			evt.stopPropagation();
		}
	}


	/**
	 * Hides/closes a pane if there is insufficient room - reverses this when there is room again
	 * MUST have already called setSizeLimits() before calling this method
	 *
	 * @param {string}	pane					The pane being resized
	 * @param {boolean=}	[isOpening=false]		Called from onOpen?
	 * @param {boolean=}	[skipCallback=false]	Should the onresize callback be run?
	 * @param {boolean=}	[force=false]
	 */
,	makePaneFit = function (pane, isOpening, skipCallback, force) {
		var	o	= options[pane]
		,	s	= state[pane]
		,	c	= _c[pane]
		,	$P	= $Ps[pane]
		,	$R	= $Rs[pane]
		,	isSidePane 	= c.dir==="vert"
		,	hasRoom		= false
		;
		// special handling for center & east/west panes
		if (pane === "center" || (isSidePane && s.noVerticalRoom)) {
			// see if there is enough room to display the pane
			// ERROR: hasRoom = s.minHeight <= s.maxheight && (issidepane || s.minwidth <="s.maxWidth);" hasroom="(s.maxHeight">= 0);
			if (hasRoom && s.noRoom) { // previously hidden due to noRoom, so show now
				_showPane(pane);
				if ($R) $R.show();
				s.isVisible = true;
				s.noRoom = false;
				if (isSidePane) s.noVerticalRoom = false;
				_fixIframe(pane);
			}
			else if (!hasRoom && !s.noRoom) { // not currently hidden, so hide now
				_hidePane(pane);
				if ($R) $R.hide();
				s.isVisible = false;
				s.noRoom = true;
			}
		}

		// see if there is enough room to fit the border-pane
		if (pane === "center") {
			// ignore center in this block
		}
		else if (s.minSize <= s.maxsize) { pane can fit hasroom="true;" if (s.size> s.maxSize) // pane is too big - shrink it
				sizePane(pane, s.maxSize, skipCallback, true, force); // true = noAnimation
			else if (s.size < s.minSize) // pane is too small - enlarge it
				sizePane(pane, s.minSize, skipCallback, true, force); // true = noAnimation
			// need s.isVisible because new pseudoClose method keeps pane visible, but off-screen
			else if ($R && s.isVisible && $P.is(":visible")) {
				// make sure resizer-bar is positioned correctly
				// handles situation where nested layout was 'hidden' when initialized
				var	pos = s.size + sC.inset[c.side];
				if ($.layout.cssNum( $R, c.side ) != pos) $R.css( c.side, pos );
			}

			// if was previously hidden due to noRoom, then RESET because NOW there is room
			if (s.noRoom) {
				// s.noRoom state will be set by open or show
				if (s.wasOpen && o.closable) {
					if (o.autoReopen)
						open(pane, false, true, true); // true = noAnimation, true = noAlert
					else // leave the pane closed, so just update state
						s.noRoom = false;
				}
				else
					show(pane, s.wasOpen, true, true); // true = noAnimation, true = noAlert
			}
		}
		else { // !hasRoom - pane CANNOT fit
			if (!s.noRoom) { // pane not set as noRoom yet, so hide or close it now...
				s.noRoom = true; // update state
				s.wasOpen = !s.isClosed && !s.isSliding;
				if (s.isClosed){} // SKIP
				else if (o.closable) // 'close' if possible
					close(pane, true, true); // true = force, true = noAnimation
				else // 'hide' pane if cannot just be closed
					hide(pane, true); // true = noAnimation
			}
		}
	}


	/**
	 * manualSizePane is an exposed flow-through method allowing extra code when pane is 'manually resized'
	 *
	 * @param {(string|Object)}	evt_or_pane				The pane being resized
	 * @param {number}			size					The *desired* new size for this pane - will be validated
	 * @param {boolean=}			[skipCallback=false]	Should the onresize callback be run?
	 * @param {boolean=}			[noAnimation=false]
	 * @param {boolean=}			[force=false]			Force resizing even if does not seem necessary
	 */
,	manualSizePane = function (evt_or_pane, size, skipCallback, noAnimation, force) {
		if (!isInitialized()) return;
		var	pane = evtPane.call(this, evt_or_pane)
		,	o	= options[pane]
		,	s	= state[pane]
		//	if resizing callbacks have been delayed and resizing is now DONE, force resizing to complete...
		,	forceResize = force || (o.livePaneResizing && !s.isResizing)
		;
		if (pane === "center") return; // validate
		// ANY call to manualSizePane disables autoResize - ie, percentage sizing
		s.autoResize = false;
		// flow-through...
		sizePane(pane, size, skipCallback, noAnimation, forceResize); // will animate resize if option enabled
	}

	/**
	 * sizePane is called only by internal methods whenever a pane needs to be resized
	 *
	 * @param {(string|Object)}	evt_or_pane				The pane being resized
	 * @param {number}			size					The *desired* new size for this pane - will be validated
	 * @param {boolean=}			[skipCallback=false]	Should the onresize callback be run?
	 * @param {boolean=}			[noAnimation=false]
	 * @param {boolean=}			[force=false]			Force resizing even if does not seem necessary
	 */
,	sizePane = function (evt_or_pane, size, skipCallback, noAnimation, force) {
		if (!isInitialized()) return;
		var	pane	= evtPane.call(this, evt_or_pane) // probably NEVER called from event?
		,	o		= options[pane]
		,	s		= state[pane]
		,	$P		= $Ps[pane]
		,	$R		= $Rs[pane]
		,	side	= _c[pane].side
		,	dimName	= _c[pane].sizeType.toLowerCase()
		,	skipResizeWhileDragging = s.isResizing && !o.triggerEventsDuringLiveResize
		,	doFX	= noAnimation !== true && o.animatePaneSizing
		,	oldSize, newSize
		;
		if (pane === "center") return; // validate
		// QUEUE in case another action/animation is in progress
		$N.queue(function( queueNext ){
			// calculate 'current' min/max sizes
			setSizeLimits(pane); // update pane-state
			oldSize = s.size;
			size = _parseSize(pane, size); // handle percentages & auto
			size = max(size, _parseSize(pane, o.minSize));
			size = min(size, s.maxSize);
			if (size < s.minSize) { // not enough room for pane!
				queueNext(); // call before makePaneFit() because it needs the queue free
				makePaneFit(pane, false, skipCallback);	// will hide or close pane
				return;
			}

			// IF newSize is same as oldSize, then nothing to do - abort
			if (!force && size === oldSize)
				return queueNext();

			s.newSize = size;

			// onresize_start callback CANNOT cancel resizing because this would break the layout!
			if (!skipCallback && state.initialized && s.isVisible)
				_runCallbacks("onresize_start", pane);

			// resize the pane, and make sure its visible
			newSize = cssSize(pane, size);

			if (doFX && $P.is(":visible")) { // ANIMATE
				var fx		= $.layout.effects.size[pane] || $.layout.effects.size.all
				,	easing	= o.fxSettings_size.easing || fx.easing
				,	z		= options.zIndexes
				,	props	= {};
				props[ dimName ] = newSize +'px';
				s.isMoving = true;
				// overlay all elements during animation
				$P.css({ zIndex: z.pane_animate })
				  .show().animate( props, o.fxSpeed_size, easing, function(){
					// reset zIndex after animation
					$P.css({ zIndex: (s.isSliding ? z.pane_sliding : z.pane_normal) });
					s.isMoving = false;
					delete s.newSize;
					sizePane_2(); // continue
					queueNext();
				});
			}
			else { // no animation
				$P.css( dimName, newSize );	// resize pane
				delete s.newSize;
				// if pane is visible, then 
				if ($P.is(":visible"))
					sizePane_2(); // continue
				else {
					// pane is NOT VISIBLE, so just update state data...
					// when pane is *next opened*, it will have the new size
					s.size = size;				// update state.size
					//$.extend(s, elDims($P));	// update state dimensions - CANNOT do this when not visible!				}
				}
				queueNext();
			};

		});

		// SUBROUTINE
		function sizePane_2 () {
			/*	Panes are sometimes not sized precisely in some browsers!?
			 *	This code will resize the pane up to 3 times to nudge the pane to the correct size
			 */
			var	actual	= dimName==='width' ? $P.outerWidth() : $P.outerHeight()
			,	tries	= [{
						   	pane:		pane
						,	count:		1
						,	target:		size
						,	actual:		actual
						,	correct:	(size === actual)
						,	attempt:	size
						,	cssSize:	newSize
						}]
			,	lastTry = tries[0]
			,	thisTry	= {}
			,	msg		= 'Inaccurate size after resizing the '+ pane +'-pane.'
			;
			while ( !lastTry.correct ) {
				thisTry = { pane: pane, count: lastTry.count+1, target: size };

				if (lastTry.actual > size)
					thisTry.attempt = max(0, lastTry.attempt - (lastTry.actual - size));
				else // lastTry.actual < size
					thisTry.attempt = max(0, lastTry.attempt + (size - lastTry.actual));

				thisTry.cssSize = cssSize(pane, thisTry.attempt);
				$P.css( dimName, thisTry.cssSize );

				thisTry.actual	= dimName=='width' ? $P.outerWidth() : $P.outerHeight();
				thisTry.correct	= (size === thisTry.actual);

				// log attempts and alert the user of this *non-fatal error* (if showDebugMessages)
				if ( tries.length === 1) {
					_log(msg, false, true);
					_log(lastTry, false, true);
				}
				_log(thisTry, false, true);
				// after 4 tries, is as close as its gonna get!
				if (tries.length > 3) break;

				tries.push( thisTry );
				lastTry = tries[ tries.length - 1 ];
			}
			// END TESTING CODE

			// update pane-state dimensions
			s.size	= size;
			$.extend(s, elDims($P));

			if (s.isVisible && $P.is(":visible")) {
				// reposition the resizer-bar
				if ($R) $R.css( side, size + sC.inset[side] );
				// resize the content-div
				sizeContent(pane);
			}

			if (!skipCallback && !skipResizeWhileDragging && state.initialized && s.isVisible)
				_runCallbacks("onresize_end", pane);

			// resize all the adjacent panes, and adjust their toggler buttons
			// when skipCallback passed, it means the controlling method will handle 'other panes'
			if (!skipCallback) {
				// also no callback if live-resize is in progress and NOT triggerEventsDuringLiveResize
				if (!s.isSliding) sizeMidPanes(_c[pane].dir=="horz" ? "" : "center", skipResizeWhileDragging, force);
				sizeHandles();
			}

			// if opposite-pane was autoClosed, see if it can be autoOpened now
			var altPane = _c.oppositeEdge[pane];
			if (size < oldSize && state[ altPane ].noRoom) {
				setSizeLimits( altPane );
				makePaneFit( altPane, false, skipCallback );
			}

			// DEBUG - ALERT user/developer so they know there was a sizing problem
			if (tries.length > 1)
				_log(msg +'\nSee the Error Console for details.', true, true);
		}
	}

	/**
	 * @see  initPanes(), sizePane(), 	resizeAll(), open(), close(), hide()
	 * @param {(Array.<string>|string)}	panes					The pane(s) being resized, comma-delmited string
	 * @param {boolean=}					[skipCallback=false]	Should the onresize callback be run?
	 * @param {boolean=}					[force=false]
	 */
,	sizeMidPanes = function (panes, skipCallback, force) {
		panes = (panes ? panes : "east,west,center").split(",");

		$.each(panes, function (i, pane) {
			if (!$Ps[pane]) return; // NO PANE - skip
			var 
				o		= options[pane]
			,	s		= state[pane]
			,	$P		= $Ps[pane]
			,	$R		= $Rs[pane]
			,	isCenter= (pane=="center")
			,	hasRoom	= true
			,	CSS		= {}
			//	if pane is not visible, show it invisibly NOW rather than for *each call* in this script
			,	visCSS	= $.layout.showInvisibly($P)

			,	newCenter	= calcNewCenterPaneDims()
			;

			// update pane-state dimensions
			$.extend(s, elDims($P));

			if (pane === "center") {
				if (!force && s.isVisible && newCenter.width === s.outerWidth && newCenter.height === s.outerHeight) {
					$P.css(visCSS);
					return true; // SKIP - pane already the correct size
				}
				// set state for makePaneFit() logic
				$.extend(s, cssMinDims(pane), {
					maxWidth:	newCenter.width
				,	maxHeight:	newCenter.height
				});
				CSS = newCenter;
				s.newWidth	= CSS.width;
				s.newHeight	= CSS.height;
				// convert OUTER width/height to CSS width/height 
				CSS.width	= cssW($P, CSS.width);
				// NEW - allow pane to extend 'below' visible area rather than hide it
				CSS.height	= cssH($P, CSS.height);
				hasRoom		= CSS.width >= 0 && CSS.height >= 0; // height >= 0 = ALWAYS TRUE NOW

				// during layout init, try to shrink east/west panes to make room for center
				if (!state.initialized && o.minWidth > newCenter.width) {
					var
						reqPx	= o.minWidth - s.outerWidth
					,	minE	= options.east.minSize || 0
					,	minW	= options.west.minSize || 0
					,	sizeE	= state.east.size
					,	sizeW	= state.west.size
					,	newE	= sizeE
					,	newW	= sizeW
					;
					if (reqPx > 0 && state.east.isVisible && sizeE > minE) {
						newE = max( sizeE-minE, sizeE-reqPx );
						reqPx -= sizeE-newE;
					}
					if (reqPx > 0 && state.west.isVisible && sizeW > minW) {
						newW = max( sizeW-minW, sizeW-reqPx );
						reqPx -= sizeW-newW;
					}
					// IF we found enough extra space, then resize the border panes as calculated
					if (reqPx === 0) {
						if (sizeE && sizeE != minE)
							sizePane('east', newE, true, true, force); // true = skipCallback/noAnimation - initPanes will handle when done
						if (sizeW && sizeW != minW)
							sizePane('west', newW, true, true, force); // true = skipCallback/noAnimation
						// now start over!
						sizeMidPanes('center', skipCallback, force);
						$P.css(visCSS);
						return; // abort this loop
					}
				}
			}
			else { // for east and west, set only the height, which is same as center height
				// set state.min/maxWidth/Height for makePaneFit() logic
				if (s.isVisible && !s.noVerticalRoom)
					$.extend(s, elDims($P), cssMinDims(pane))
				if (!force && !s.noVerticalRoom && newCenter.height === s.outerHeight) {
					$P.css(visCSS);
					return true; // SKIP - pane already the correct size
				}
				// east/west have same top, bottom & height as center
				CSS.top		= newCenter.top;
				CSS.bottom	= newCenter.bottom;
				s.newSize	= newCenter.height
				// NEW - allow pane to extend 'below' visible area rather than hide it
				CSS.height	= cssH($P, newCenter.height);
				s.maxHeight	= CSS.height;
				hasRoom		= (s.maxHeight >= 0); // ALWAYS TRUE NOW
				if (!hasRoom) s.noVerticalRoom = true; // makePaneFit() logic
			}

			if (hasRoom) {
				// resizeAll passes skipCallback because it triggers callbacks after ALL panes are resized
				if (!skipCallback && state.initialized)
					_runCallbacks("onresize_start", pane);

				$P.css(CSS); // apply the CSS to pane
				if (pane !== "center")
					sizeHandles(pane); // also update resizer length
				if (s.noRoom && !s.isClosed && !s.isHidden)
					makePaneFit(pane); // will re-open/show auto-closed/hidden pane
				if (s.isVisible) {
					$.extend(s, elDims($P)); // update pane dimensions
					if (state.initialized) sizeContent(pane); // also resize the contents, if exists
				}
			}
			else if (!s.noRoom && s.isVisible) // no room for pane
				makePaneFit(pane); // will hide or close pane

			// reset visibility, if necessary
			$P.css(visCSS);

			delete s.newSize;
			delete s.newWidth;
			delete s.newHeight;

			if (!s.isVisible)
				return true; // DONE - next pane

			/*
			 * Extra CSS for IE6 or IE7 in Quirks-mode - add 'width' to NORTH/SOUTH panes
			 * Normally these panes have only 'left' & 'right' positions so pane auto-sizes
			 * ALSO required when pane is an IFRAME because will NOT default to 'full width'
			 *	TODO: Can I use width:100% for a north/south iframe?
			 *	TODO: Sounds like a job for $P.outerWidth( sC.innerWidth ) SETTER METHOD
			 */
			if (pane === "center") { // finished processing midPanes
				var fix = browser.isIE6 || !browser.boxModel;
				if ($Ps.north && (fix || state.north.tagName=="IFRAME")) 
					$Ps.north.css("width", cssW($Ps.north, sC.innerWidth));
				if ($Ps.south && (fix || state.south.tagName=="IFRAME"))
					$Ps.south.css("width", cssW($Ps.south, sC.innerWidth));
			}

			// resizeAll passes skipCallback because it triggers callbacks after ALL panes are resized
			if (!skipCallback && state.initialized)
				_runCallbacks("onresize_end", pane);
		});
	}


	/**
	 * @see  window.onresize(), callbacks or custom code
	 * @param {(Object|boolean)=}	evt_or_refresh	If 'true', then also reset pane-positioning
	 */
,	resizeAll = function (evt_or_refresh) {
		var	oldW	= sC.innerWidth
		,	oldH	= sC.innerHeight
		;
		// stopPropagation if called by trigger("layoutdestroy") - use evtPane utility 
		evtPane(evt_or_refresh);

		// cannot size layout when 'container' is hidden or collapsed
		if (!$N.is(":visible")) return;

		if (!state.initialized) {
			_initLayoutElements();
			return; // no need to resize since we just initialized!
		}

		if (evt_or_refresh === true && $.isPlainObject(options.outset)) {
			// update container CSS in case outset option has changed
			$N.css( options.outset );
		}
		// UPDATE container dimensions
		$.extend(sC, elDims( $N, options.inset ));
		if (!sC.outerHeight) return;

		// if 'true' passed, refresh pane & handle positioning too
		if (evt_or_refresh === true) {
			setPanePosition();
		}

		// onresizeall_start will CANCEL resizing if returns false
		// state.container has already been set, so user can access this info for calcuations
		if (false === _runCallbacks("onresizeall_start")) return false;

		var	// see if container is now 'smaller' than before
			shrunkH	= (sC.innerHeight < oldH)
		,	shrunkW	= (sC.innerWidth < oldW)
		,	$P, o, s
		;
		// NOTE special order for sizing: S-N-E-W
		$.each(["south","north","east","west"], function (i, pane) {
			if (!$Ps[pane]) return; // no pane - SKIP
			o = options[pane];
			s = state[pane];
			if (s.autoResize && s.size != o.size) // resize pane to original size set in options
				sizePane(pane, o.size, true, true, true); // true=skipCallback/noAnimation/forceResize
			else {
				setSizeLimits(pane);
				makePaneFit(pane, false, true, true); // true=skipCallback/forceResize
			}
		});

		sizeMidPanes("", true, true); // true=skipCallback/forceResize
		sizeHandles(); // reposition the toggler elements

		// trigger all individual pane callbacks AFTER layout has finished resizing
		$.each(_c.allPanes, function (i, pane) {
			$P = $Ps[pane];
			if (!$P) return; // SKIP
			if (state[pane].isVisible) // undefined for non-existent panes
				_runCallbacks("onresize_end", pane); // callback - if exists
		});

		_runCallbacks("onresizeall_end");
		//_triggerLayoutEvent(pane, 'resizeall');
	}

	/**
	 * Whenever a pane resizes or opens that has a nested layout, trigger resizeAll
	 *
	 * @param {(string|Object)}	evt_or_pane		The pane just resized or opened
	 */
,	resizeChildren = function (evt_or_pane, skipRefresh) {
		var	pane = evtPane.call(this, evt_or_pane);

		if (!options[pane].resizeChildren) return;

		// ensure the pane-children are up-to-date
		if (!skipRefresh) refreshChildren( pane );
		var pC = children[pane];
		if ($.isPlainObject( pC )) {
			// resize one or more children
			$.each( pC, function (key, child) {
				if (!child.destroyed) child.resizeAll();
			});
		}
	}

	/**
	 * IF pane has a content-div, then resize all elements inside pane to fit pane-height
	 *
	 * @param {(string|Object)}	evt_or_panes		The pane(s) being resized
	 * @param {boolean=}			[remeasure=false]	Should the content (header/footer) be remeasured?
	 */
,	sizeContent = function (evt_or_panes, remeasure) {
		if (!isInitialized()) return;

		var panes = evtPane.call(this, evt_or_panes);
		panes = panes ? panes.split(",") : _c.allPanes;

		$.each(panes, function (idx, pane) {
			var
				$P	= $Ps[pane]
			,	$C	= $Cs[pane]
			,	o	= options[pane]
			,	s	= state[pane]
			,	m	= s.content // m = measurements
			;
			if (!$P || !$C || !$P.is(":visible")) return true; // NOT VISIBLE - skip

			// if content-element was REMOVED, update OR remove the pointer
			if (!$C.length) {
				initContent(pane, false);	// false = do NOT sizeContent() - already there!
				if (!$C) return;			// no replacement element found - pointer have been removed
			}

			// onsizecontent_start will CANCEL resizing if returns false
			if (false === _runCallbacks("onsizecontent_start", pane)) return;

			// skip re-measuring offsets if live-resizing
			if ((!s.isMoving && !s.isResizing) || o.liveContentResizing || remeasure || m.top == undefined) {
				_measure();
				// if any footers are below pane-bottom, they may not measure correctly,
				// so allow pane overflow and re-measure
				if (m.hiddenFooters > 0 && $P.css("overflow") === "hidden") {
					$P.css("overflow", "visible");
					_measure(); // remeasure while overflowing
					$P.css("overflow", "hidden");
				}
			}
			// NOTE: spaceAbove/Below *includes* the pane paddingTop/Bottom, but not pane.borders
			var newH = s.innerHeight - (m.spaceAbove - s.css.paddingTop) - (m.spaceBelow - s.css.paddingBottom);

			if (!$C.is(":visible") || m.height != newH) {
				// size the Content element to fit new pane-size - will autoHide if not enough room
				setOuterHeight($C, newH, true); // true=autoHide
				m.height = newH; // save new height
			};

			if (state.initialized)
				_runCallbacks("onsizecontent_end", pane);

			function _below ($E) {
				return max(s.css.paddingBottom, (parseInt($E.css("marginBottom"), 10) || 0));
			};

			function _measure () {
				var
					ignore	= options[pane].contentIgnoreSelector
				,	$Fs		= $C.nextAll().not(".ui-layout-mask").not(ignore || ":lt(0)") // not :lt(0) = ALL
				,	$Fs_vis	= $Fs.filter(':visible')
				,	$F		= $Fs_vis.filter(':last')
				;
				m = {
					top:			$C[0].offsetTop
				,	height:			$C.outerHeight()
				,	numFooters:		$Fs.length
				,	hiddenFooters:	$Fs.length - $Fs_vis.length
				,	spaceBelow:		0 // correct if no content footer ($E)
				}
					m.spaceAbove	= m.top; // just for state - not used in calc
					m.bottom		= m.top + m.height;
				if ($F.length)
					//spaceBelow = (LastFooter.top + LastFooter.height) [footerBottom] - Content.bottom + max(LastFooter.marginBottom, pane.paddingBotom)
					m.spaceBelow = ($F[0].offsetTop + $F.outerHeight()) - m.bottom + _below($F);
				else // no footer - check marginBottom on Content element itself
					m.spaceBelow = _below($C);
			};
		});
	}


	/**
	 * Called every time a pane is opened, closed, or resized to slide the togglers to 'center' and adjust their length if necessary
	 *
	 * @see  initHandles(), open(), close(), resizeAll()
	 * @param {(string|Object)=}		evt_or_panes	The pane(s) being resized
	 */
,	sizeHandles = function (evt_or_panes) {
		var panes = evtPane.call(this, evt_or_panes)
		panes = panes ? panes.split(",") : _c.borderPanes;

		$.each(panes, function (i, pane) {
			var 
				o	= options[pane]
			,	s	= state[pane]
			,	$P	= $Ps[pane]
			,	$R	= $Rs[pane]
			,	$T	= $Ts[pane]
			,	$TC
			;
			if (!$P || !$R) return;

			var
				dir			= _c[pane].dir
			,	_state		= (s.isClosed ? "_closed" : "_open")
			,	spacing		= o["spacing"+ _state]
			,	togAlign	= o["togglerAlign"+ _state]
			,	togLen		= o["togglerLength"+ _state]
			,	paneLen
			,	left
			,	offset
			,	CSS = {}
			;

			if (spacing === 0) {
				$R.hide();
				return;
			}
			else if (!s.noRoom && !s.isHidden) // skip if resizer was hidden for any reason
				$R.show(); // in case was previously hidden

			// Resizer Bar is ALWAYS same width/height of pane it is attached to
			if (dir === "horz") { // north/south
				//paneLen = $P.outerWidth(); // s.outerWidth || 
				paneLen = sC.innerWidth; // handle offscreen-panes
				s.resizerLength = paneLen;
				left = $.layout.cssNum($P, "left")
				$R.css({
					width:	cssW($R, paneLen) // account for borders & padding
				,	height:	cssH($R, spacing) // ditto
				,	left:	left > -9999 ? left : sC.inset.left // handle offscreen-panes
				});
			}
			else { // east/west
				paneLen = $P.outerHeight(); // s.outerHeight || 
				s.resizerLength = paneLen;
				$R.css({
					height:	cssH($R, paneLen) // account for borders & padding
				,	width:	cssW($R, spacing) // ditto
				,	top:	sC.inset.top + getPaneSize("north", true) // TODO: what if no North pane?
				//,	top:	$.layout.cssNum($Ps["center"], "top")
				});
			}

			// remove hover classes
			removeHover( o, $R );

			if ($T) {
				if (togLen === 0 || (s.isSliding && o.hideTogglerOnSlide)) {
					$T.hide(); // always HIDE the toggler when 'sliding'
					return;
				}
				else
					$T.show(); // in case was previously hidden

				if (!(togLen > 0) || togLen === "100%" || togLen > paneLen) {
					togLen = paneLen;
					offset = 0;
				}
				else { // calculate 'offset' based on options.PANE.togglerAlign_open/closed
					if (isStr(togAlign)) {
						switch (togAlign) {
							case "top":
							case "left":	offset = 0;
											break;
							case "bottom":
							case "right":	offset = paneLen - togLen;
											break;
							case "middle":
							case "center":
							default:		offset = round((paneLen - togLen) / 2); // 'default' catches typos
						}
					}
					else { // togAlign = number
						var x = parseInt(togAlign, 10); //
						if (togAlign >= 0) offset = x;
						else offset = paneLen - togLen + x; // NOTE: x is negative!
					}
				}

				if (dir === "horz") { // north/south
					var width = cssW($T, togLen);
					$T.css({
						width:	width  // account for borders & padding
					,	height:	cssH($T, spacing) // ditto
					,	left:	offset // TODO: VERIFY that toggler  positions correctly for ALL values
					,	top:	0
					});
					// CENTER the toggler content SPAN
					$T.children(".content").each(function(){
						$TC = $(this);
						$TC.css("marginLeft", round((width-$TC.outerWidth())/2)); // could be negative
					});
				}
				else { // east/west
					var height = cssH($T, togLen);
					$T.css({
						height:	height // account for borders & padding
					,	width:	cssW($T, spacing) // ditto
					,	top:	offset // POSITION the toggler
					,	left:	0
					});
					// CENTER the toggler content SPAN
					$T.children(".content").each(function(){
						$TC = $(this);
						$TC.css("marginTop", round((height-$TC.outerHeight())/2)); // could be negative
					});
				}

				// remove ALL hover classes
				removeHover( 0, $T );
			}

			// DONE measuring and sizing this resizer/toggler, so can be 'hidden' now
			if (!state.initialized && (o.initHidden || s.isHidden)) {
				$R.hide();
				if ($T) $T.hide();
			}
		});
	}


	/**
	 * @param {(string|Object)}	evt_or_pane
	 */
,	enableClosable = function (evt_or_pane) {
		if (!isInitialized()) return;
		var	pane = evtPane.call(this, evt_or_pane)
		,	$T	= $Ts[pane]
		,	o	= options[pane]
		;
		if (!$T) return;
		o.closable = true;
		$T	.bind("click."+ sID, function(evt){ evt.stopPropagation(); toggle(pane); })
			.css("visibility", "visible")
			.css("cursor", "pointer")
			.attr("title", state[pane].isClosed ? o.tips.Open : o.tips.Close) // may be blank
			.show();
	}
	/**
	 * @param {(string|Object)}	evt_or_pane
	 * @param {boolean=}			[hide=false]
	 */
,	disableClosable = function (evt_or_pane, hide) {
		if (!isInitialized()) return;
		var	pane = evtPane.call(this, evt_or_pane)
		,	$T	= $Ts[pane]
		;
		if (!$T) return;
		options[pane].closable = false;
		// is closable is disable, then pane MUST be open!
		if (state[pane].isClosed) open(pane, false, true);
		$T	.unbind("."+ sID)
			.css("visibility", hide ? "hidden" : "visible") // instead of hide(), which creates logic issues
			.css("cursor", "default")
			.attr("title", "");
	}


	/**
	 * @param {(string|Object)}	evt_or_pane
	 */
,	enableSlidable = function (evt_or_pane) {
		if (!isInitialized()) return;
		var	pane = evtPane.call(this, evt_or_pane)
		,	$R	= $Rs[pane]
		;
		if (!$R || !$R.data('draggable')) return;
		options[pane].slidable = true; 
		if (state[pane].isClosed)
			bindStartSlidingEvents(pane, true);
	}
	/**
	 * @param {(string|Object)}	evt_or_pane
	 */
,	disableSlidable = function (evt_or_pane) {
		if (!isInitialized()) return;
		var	pane = evtPane.call(this, evt_or_pane)
		,	$R	= $Rs[pane]
		;
		if (!$R) return;
		options[pane].slidable = false; 
		if (state[pane].isSliding)
			close(pane, false, true);
		else {
			bindStartSlidingEvents(pane, false);
			$R	.css("cursor", "default")
				.attr("title", "");
			removeHover(null, $R[0]); // in case currently hovered
		}
	}


	/**
	 * @param {(string|Object)}	evt_or_pane
	 */
,	enableResizable = function (evt_or_pane) {
		if (!isInitialized()) return;
		var	pane = evtPane.call(this, evt_or_pane)
		,	$R	= $Rs[pane]
		,	o	= options[pane]
		;
		if (!$R || !$R.data('draggable')) return;
		o.resizable = true; 
		$R.draggable("enable");
		if (!state[pane].isClosed)
			$R	.css("cursor", o.resizerCursor)
			 	.attr("title", o.tips.Resize);
	}
	/**
	 * @param {(string|Object)}	evt_or_pane
	 */
,	disableResizable = function (evt_or_pane) {
		if (!isInitialized()) return;
		var	pane = evtPane.call(this, evt_or_pane)
		,	$R	= $Rs[pane]
		;
		if (!$R || !$R.data('draggable')) return;
		options[pane].resizable = false; 
		$R	.draggable("disable")
			.css("cursor", "default")
			.attr("title", "");
		removeHover(null, $R[0]); // in case currently hovered
	}


	/**
	 * Move a pane from source-side (eg, west) to target-side (eg, east)
	 * If pane exists on target-side, move that to source-side, ie, 'swap' the panes
	 *
	 * @param {(string|Object)}	evt_or_pane1	The pane/edge being swapped
	 * @param {string}			pane2			ditto
	 */
,	swapPanes = function (evt_or_pane1, pane2) {
		if (!isInitialized()) return;
		var pane1 = evtPane.call(this, evt_or_pane1);
		// change state.edge NOW so callbacks can know where pane is headed...
		state[pane1].edge = pane2;
		state[pane2].edge = pane1;
		// run these even if NOT state.initialized
		if (false === _runCallbacks("onswap_start", pane1)
		 ||	false === _runCallbacks("onswap_start", pane2)
		) {
			state[pane1].edge = pane1; // reset
			state[pane2].edge = pane2;
			return;
		}

		var
			oPane1	= copy( pane1 )
		,	oPane2	= copy( pane2 )
		,	sizes	= {}
		;
		sizes[pane1] = oPane1 ? oPane1.state.size : 0;
		sizes[pane2] = oPane2 ? oPane2.state.size : 0;

		// clear pointers & state
		$Ps[pane1] = false; 
		$Ps[pane2] = false;
		state[pane1] = {};
		state[pane2] = {};
		
		// ALWAYS remove the resizer & toggler elements
		if ($Ts[pane1]) $Ts[pane1].remove();
		if ($Ts[pane2]) $Ts[pane2].remove();
		if ($Rs[pane1]) $Rs[pane1].remove();
		if ($Rs[pane2]) $Rs[pane2].remove();
		$Rs[pane1] = $Rs[pane2] = $Ts[pane1] = $Ts[pane2] = false;

		// transfer element pointers and data to NEW Layout keys
		move( oPane1, pane2 );
		move( oPane2, pane1 );

		// cleanup objects
		oPane1 = oPane2 = sizes = null;

		// make panes 'visible' again
		if ($Ps[pane1]) $Ps[pane1].css(_c.visible);
		if ($Ps[pane2]) $Ps[pane2].css(_c.visible);

		// fix any size discrepancies caused by swap
		resizeAll();

		// run these even if NOT state.initialized
		_runCallbacks("onswap_end", pane1);
		_runCallbacks("onswap_end", pane2);

		return;

		function copy (n) { // n = pane
			var
				$P	= $Ps[n]
			,	$C	= $Cs[n]
			;
			return !$P ? false : {
				pane:		n
			,	P:			$P ? $P[0] : false
			,	C:			$C ? $C[0] : false
			,	state:		$.extend(true, {}, state[n])
			,	options:	$.extend(true, {}, options[n])
			}
		};

		function move (oPane, pane) {
			if (!oPane) return;
			var
				P		= oPane.P
			,	C		= oPane.C
			,	oldPane = oPane.pane
			,	c		= _c[pane]
			//	save pane-options that should be retained
			,	s		= $.extend(true, {}, state[pane])
			,	o		= options[pane]
			//	RETAIN side-specific FX Settings - more below
			,	fx		= { resizerCursor: o.resizerCursor }
			,	re, size, pos
			;
			$.each("fxName,fxSpeed,fxSettings".split(","), function (i, k) {
				fx[k +"_open"]  = o[k +"_open"];
				fx[k +"_close"] = o[k +"_close"];
				fx[k +"_size"]  = o[k +"_size"];
			});

			// update object pointers and attributes
			$Ps[pane] = $(P)
				.data({
					layoutPane:		Instance[pane]	// NEW pointer to pane-alias-object
				,	layoutEdge:		pane
				})
				.css(_c.hidden)
				.css(c.cssReq)
			;
			$Cs[pane] = C ? $(C) : false;

			// set options and state
			options[pane]	= $.extend(true, {}, oPane.options, fx);
			state[pane]		= $.extend(true, {}, oPane.state);

			// change classNames on the pane, eg: ui-layout-pane-east ==> ui-layout-pane-west
			re = new RegExp(o.paneClass +"-"+ oldPane, "g");
			P.className = P.className.replace(re, o.paneClass +"-"+ pane);

			// ALWAYS regenerate the resizer & toggler elements
			initHandles(pane); // create the required resizer & toggler

			// if moving to different orientation, then keep 'target' pane size
			if (c.dir != _c[oldPane].dir) {
				size = sizes[pane] || 0;
				setSizeLimits(pane); // update pane-state
				size = max(size, state[pane].minSize);
				// use manualSizePane to disable autoResize - not useful after panes are swapped
				manualSizePane(pane, size, true, true); // true/true = skipCallback/noAnimation
			}
			else // move the resizer here
				$Rs[pane].css(c.side, sC.inset[c.side] + (state[pane].isVisible ? getPaneSize(pane) : 0));


			// ADD CLASSNAMES & SLIDE-BINDINGS
			if (oPane.state.isVisible && !s.isVisible)
				setAsOpen(pane, true); // true = skipCallback
			else {
				setAsClosed(pane);
				bindStartSlidingEvents(pane, true); // will enable events IF option is set
			}

			// DESTROY the object
			oPane = null;
		};
	}


	/**
	 * INTERNAL method to sync pin-buttons when pane is opened or closed
	 * Unpinned means the pane is 'sliding' - ie, over-top of the adjacent panes
	 *
	 * @see  open(), setAsOpen(), setAsClosed()
	 * @param {string}	pane   These are the params returned to callbacks by layout()
	 * @param {boolean}	doPin  True means set the pin 'down', False means 'up'
	 */
,	syncPinBtns = function (pane, doPin) {
		if ($.layout.plugins.buttons)
			$.each(state[pane].pins, function (i, selector) {
				$.layout.buttons.setPinState(Instance, $(selector), pane, doPin);
			});
	}

;	// END var DECLARATIONS

	/**
	 * Capture keys when enableCursorHotkey - toggle pane if hotkey pressed
	 *
	 * @see  document.keydown()
	 */
	function keyDown (evt) {
		if (!evt) return true;
		var code = evt.keyCode;
		if (code < 33) return true; // ignore special keys: ENTER, TAB, etc

		var
			PANE = {
				38: "north" // Up Cursor	- $.ui.keyCode.UP
			,	40: "south" // Down Cursor	- $.ui.keyCode.DOWN
			,	37: "west"  // Left Cursor	- $.ui.keyCode.LEFT
			,	39: "east"  // Right Cursor	- $.ui.keyCode.RIGHT
			}
		,	ALT		= evt.altKey // no worky!
		,	SHIFT	= evt.shiftKey
		,	CTRL	= evt.ctrlKey
		,	CURSOR	= (CTRL && code >= 37 && code <= 2 30 2014 40) , o, k, m, pane ; if (cursor && options[pane[code]].enablecursorhotkey) valid cursor-hotkey else (ctrl || shift) check to see this matches a custom-hotkey $.each(_c.borderpanes, function (i, p) { loop each its hotkey o="options[p];" k="o.customHotkey;" m="o.customHotkeyModifier;" missing or invalid, treated as "ctrl+shift" ((shift shift)) modifier (k code="==" (isnan(k) <="9" ? k.touppercase().charcodeat(0) : k)) key return false; break } }); validate (!pane !$ps[pane] !options[pane].closable state[pane].ishidden) true; toggle(pane); evt.stoppropagation(); evt.returnvalue="false;" cancel }; * ###################################### utility methods called externally by initbuttons ** change reset overflow setting & zindex allow popups drop-downs work @param {object="}" [el] (optional) can also be 'bound' click, mouseover, other event allowoverflow (el) (!isinitialized()) return; (this this.tagname) el="this;" bound element var $p; (isstr(el)) $p="$Ps[el];" ($(el).data("layoutrole")) $(el).parents().each(function(){ ($(this).data("layoutrole")) (!$p !$p.length) invalid s="state[pane]" is already raised, then it before doing again! would happen attached both the and an (s.csssaved) resetoverflow(pane); previous css continuing raised sliding resizing, closed, abort (s.issliding s.isresizing s.isclosed) s.csssaved="false;" newcss="{" zindex: (options.zindexes.resizer_normal + 1) curcss="{}" of="$P.css("overflow")" ofx="$P.css("overflowX")" ofy="$P.css("overflowY")" determine which, any, settings need changed (of !="visible" ) curcss.overflow="of;" newcss.overflow="visible" (ofx !ofx.match( (visible|auto) )) curcss.overflowx="ofX;" newcss.overflowx="visible" (ofy !ofy.match( curcss.overflowy="ofX;" newcss.overflowy="visible" save current - even blank! apply new raise and, necessary, make 'visible' $p.css( ); sure all panes normal $.each(_c.allpanes, function(i, (p resetoverflow(p); resetoverflow {} (!s.issliding !s.isresizing) $p.css("zindex", options.zindexes.pane_normal); necessary clear ##################### create layout that container exists $n="$(this).eq(0);" first matching (!$n.length) _log( options.errors.containermissing users retrieve instance with: $n.layout() $n.data("layout") instance-pointer has been initialized ($n.data("layoutcontainer") $n.data("layout")) $n.data("layout"); cached pointer init global vars $ps="{}" x5 set in initpanes() $cs="{}" content $rs="{}" resizers x4 inithandles() $ts="{}" togglers $ms="$([])" masks up per (iframe div) aliases for brevity sc="state.container" alias easy access 'container dimensions' sid="state.id" unique id namespace eg: "layout435" object expose data option properties, primary action options: options property hash state: state dimensions pointers container: panes: panes.north, panes.center contents: content: contents.north, contents.center resizers: resizers, resizers.north togglers: togglers, togglers.north border-pane open close hide: hide method ditto show: show toggle: toggle pass 'pane' ("north", "west", etc) open: close: slideopen: slideopen slideclose: slideclose slidetoggle: slidetoggle actions setsizelimits: setsizelimits update min max _sizepane: sizepane -intended user plugins only! sizepane: manualsizepane 'outer-size' pixels percent, 'auto' sizecontent: sizecontent swappanes: swappanes two 'panes' will swap them showmasks: showmasks list default="all" with mask hidemasks: hidemasks ditto' initcontent: initcontent addpane: addpane removepane: removepane remove from layout, add 'true' delete pane-elem createchildren: createchildren layout-options (overrides options[pane].children refreshchildren: refreshchildren layout-instance special enableclosable: enableclosable disableclosable: disableclosable enableslidable: enableslidable disableslidable: disableslidable enableresizable: enableresizable disableresizable: disableresizable allowoverflow: calling (this) resetoverflow: control destroy: destroy no parameters initpanes: isinitialized resizeall: resizeall callback triggering runcallbacks: _runcallbacks evtname (if pane-event), trigger("onopen", "west") collections options, children created extended elsewhere hasparentlayout: false initcontainer() children: child-layouts, instance.children.west.layoutname north: group: name: pane, pane: $ps[pane], options[pane], state[pane], children[pane] south: west: east: center: border now (_create()="==" 'cancel') onload_start returned creation null; true -- layout-elements did not (hidden do exist), auto-init later instance; })( jquery jquery.layout.state 1.2 $date: 2014-08-30 08:00:00 (sat, aug 2014) $ copyright (c) kevin dalman (http: allpro.net) dual licensed under gpl www.gnu.org licenses gpl.html) mit www.opensource.org mit-license.php) licenses. @requires: ui 1.4.0 higher $.ui.cookie (above) @see: http: groups.google.com group jquery-ui-layout ;(function ($) (!$.layout) cookie $.cookie *should standard*, but until then... creates so does cookie.jquery.js plugin note: required layout.state are part management (!$.ui) $.ui="{};" cookieenabled dom specs, works browsers,including ie6 acceptscookies: !!navigator.cookieenabled read: (name) c="document.cookie" cs="c" c.split(';') [] pair, data, i (i="0;" pair="cs[i];" i++) name="value" => [ name, value ]
			if (data[0] == name) // found the layout cookie
				return decodeURIComponent(data[1]);
		}
		return null;
	}

,	write: function (name, val, cookieOpts) {
		var	params	= ""
		,	date	= ""
		,	clear	= false
		,	o		= cookieOpts || {}
		,	x		= o.expires  || null
		,	t		= $.type(x)
		;
		if (t === "date")
			date = x;
		else if (t === "string" && x > 0) {
			x = parseInt(x,10);
			t = "number";
		}
		if (t === "number") {
			date = new Date();
			if (x > 0)
				date.setDate(date.getDate() + x);
			else {
				date.setFullYear(1970);
				clear = true;
			}
		}
		if (date)		params += ";expires="+ date.toUTCString();
		if (o.path)		params += ";path="+ o.path;
		if (o.domain)	params += ";domain="+ o.domain;
		if (o.secure)	params += ";secure";
		document.cookie = name +"="+ (clear ? "" : encodeURIComponent( val )) + params; // write or clear cookie
	}

,	clear: function (name) {
		$.ui.cookie.write(name, "", {expires: -1});
	}

};
// if cookie.jquery.js is not loaded, create an alias to replicate it
// this may be useful to other plugins or code dependent on that plugin
if (!$.cookie) $.cookie = function (k, v, o) {
	var C = $.ui.cookie;
	if (v === null)
		C.clear(k);
	else if (v === undefined)
		return C.read(k);
	else
		C.write(k, v, o);
};



/**
 *	State-management options stored in options.stateManagement, which includes a .cookie hash
 *	Default options saves ALL KEYS for ALL PANES, ie: pane.size, pane.isClosed, pane.isHidden
 *
 *	// STATE/COOKIE OPTIONS
 *	@example $(el).layout({
				stateManagement: {
					enabled:	true
				,	stateKeys:	"east.size,west.size,east.isClosed,west.isClosed"
				,	cookie:		{ name: "appLayout", path: "/" }
				}
			})
 *	@example $(el).layout({ stateManagement__enabled: true }) // enable auto-state-management using cookies
 *	@example $(el).layout({ stateManagement__cookie: { name: "appLayout", path: "/" } })
 *	@example $(el).layout({ stateManagement__cookie__name: "appLayout", stateManagement__cookie__path: "/" })
 *
 *	// STATE/COOKIE METHODS
 *	@example myLayout.saveCookie( "west.isClosed,north.size,south.isHidden", {expires: 7} );
 *	@example myLayout.loadCookie();
 *	@example myLayout.deleteCookie();
 *	@example var JSON = myLayout.readState();	// CURRENT Layout State
 *	@example var JSON = myLayout.readCookie();	// SAVED Layout State (from cookie)
 *	@example var JSON = myLayout.state.stateData;	// LAST LOADED Layout State (cookie saved in layout.state hash)
 *
 *	CUSTOM STATE-MANAGEMENT (eg, saved in a database)
 *	@example var JSON = myLayout.readState( "west.isClosed,north.size,south.isHidden" );
 *	@example myLayout.loadState( JSON );
 */

// tell Layout that the state plugin is available
$.layout.plugins.stateManagement = true;

//	Add State-Management options to layout.defaults
$.layout.defaults.stateManagement = {
	enabled:		false	// true = enable state-management, even if not using cookies
,	autoSave:		true	// Save a state-cookie when page exits?
,	autoLoad:		true	// Load the state-cookie when Layout inits?
,	animateLoad:	true	// animate panes when loading state into an active layout
,	includeChildren: true	// recurse into child layouts to include their state as well
	// List state-data to save - must be pane-specific
,	stateKeys:	"north.size,south.size,east.size,west.size,"+
				"north.isClosed,south.isClosed,east.isClosed,west.isClosed,"+
				"north.isHidden,south.isHidden,east.isHidden,west.isHidden"
,	cookie: {
		name:	""	// If not specified, will use Layout.name, else just "Layout"
	,	domain:	""	// blank = current domain
	,	path:	""	// blank = current page, "/" = entire website
	,	expires: ""	// 'days' to keep cookie - leave blank for 'session cookie'
	,	secure:	false
	}
};

// Set stateManagement as a 'layout-option', NOT a 'pane-option'
$.layout.optionsMap.layout.push("stateManagement");
// Update config so layout does not move options into the pane-default branch (panes)
$.layout.config.optionRootKeys.push("stateManagement");

/*
 *	State Management methods
 */
$.layout.state = {

	/**
	 * Get the current layout state and save it to a cookie
	 *
	 * myLayout.saveCookie( keys, cookieOpts )
	 *
	 * @param {Object}			inst
	 * @param {(string|Array)=}	keys
	 * @param {Object=}			cookieOpts
	 */
	saveCookie: function (inst, keys, cookieOpts) {
		var o	= inst.options
		,	sm	= o.stateManagement
		,	oC	= $.extend(true, {}, sm.cookie, cookieOpts || null)
		,	data = inst.state.stateData = inst.readState( keys || sm.stateKeys ) // read current panes-state
		;
		$.ui.cookie.write( oC.name || o.name || "Layout", $.layout.state.encodeJSON(data), oC );
		return $.extend(true, {}, data); // return COPY of state.stateData data
	}

	/**
	 * Remove the state cookie
	 *
	 * @param {Object}	inst
	 */
,	deleteCookie: function (inst) {
		var o = inst.options;
		$.ui.cookie.clear( o.stateManagement.cookie.name || o.name || "Layout" );
	}

	/**
	 * Read & return data from the cookie - as JSON
	 *
	 * @param {Object}	inst
	 */
,	readCookie: function (inst) {
		var o = inst.options;
		var c = $.ui.cookie.read( o.stateManagement.cookie.name || o.name || "Layout" );
		// convert cookie string back to a hash and return it
		return c ? $.layout.state.decodeJSON(c) : {};
	}

	/**
	 * Get data from the cookie and USE IT to loadState
	 *
	 * @param {Object}	inst
	 */
,	loadCookie: function (inst) {
		var c = $.layout.state.readCookie(inst); // READ the cookie
		if (c && !$.isEmptyObject( c )) {
			inst.state.stateData = $.extend(true, {}, c); // SET state.stateData
			inst.loadState(c); // LOAD the retrieved state
		}
		return c;
	}

	/**
	 * Update layout options from the cookie, if one exists
	 *
	 * @param {Object}		inst
	 * @param {Object=}		stateData
	 * @param {boolean=}	animate
	 */
,	loadState: function (inst, data, opts) {
		if (!$.isPlainObject( data ) || $.isEmptyObject( data )) return;

		// normalize data & cache in the state object
		data = inst.state.stateData = $.layout.transformData( data ); // panes = default subkey

		// add missing/default state-restore options
		var smo = inst.options.stateManagement;
		opts = $.extend({
			animateLoad:		false //smo.animateLoad
		,	includeChildren:	smo.includeChildren
		}, opts );

		if (!inst.state.initialized) {
			/*
			 *	layout NOT initialized, so just update its options
			 */
			// MUST remove pane.children keys before applying to options
			// use a copy so we don't remove keys from original data
			var o = $.extend(true, {}, data);
			//delete o.center; // center has no state-data - only children
			$.each($.layout.config.allPanes, function (idx, pane) {
				if (o[pane]) delete o[pane].children;		   
			 });
			// update CURRENT layout-options with saved state data
			$.extend(true, inst.options, o);
		}
		else {
			/*
			 *	layout already initialized, so modify layout's configuration
			 */
			var noAnimate = !opts.animateLoad
			,	o, c, h, state, open
			;
			$.each($.layout.config.borderPanes, function (idx, pane) {
				o = data[ pane ];
				if (!$.isPlainObject( o )) return; // no key, skip pane

				s	= o.size;
				c	= o.initClosed;
				h	= o.initHidden;
				ar	= o.autoResize
				state	= inst.state[pane];
				open	= state.isVisible;

				// reset autoResize
				if (ar)
					state.autoResize = ar;
				// resize BEFORE opening
				if (!open)
					inst._sizePane(pane, s, false, false, false); // false=skipCallback/noAnimation/forceResize
				// open/close as necessary - DO NOT CHANGE THIS ORDER!
				if (h === true)			inst.hide(pane, noAnimate);
				else if (c === true)	inst.close(pane, false, noAnimate);
				else if (c === false)	inst.open (pane, false, noAnimate);
				else if (h === false)	inst.show (pane, false, noAnimate);
				// resize AFTER any other actions
				if (open)
					inst._sizePane(pane, s, false, false, noAnimate); // animate resize if option passed
			});

			/*
			 *	RECURSE INTO CHILD-LAYOUTS
			 */
			if (opts.includeChildren) {
				var paneStateChildren, childState;
				$.each(inst.children, function (pane, paneChildren) {
					paneStateChildren = data[pane] ? data[pane].children : 0;
					if (paneStateChildren && paneChildren) {
						$.each(paneChildren, function (stateKey, child) {
							childState = paneStateChildren[stateKey];
							if (child && childState)
								child.loadState( childState );
						});
					}
				});
			}
		}
	}

	/**
	 * Get the *current layout state* and return it as a hash
	 *
	 * @param {Object=}		inst	// Layout instance to get state for
	 * @param {object=}		[opts]	// State-Managements override options
	 */
,	readState: function (inst, opts) {
		// backward compatility
		if ($.type(opts) === 'string') opts = { keys: opts };
		if (!opts) opts = {};
		var	sm		= inst.options.stateManagement
		,	ic		= opts.includeChildren
		,	recurse	= ic !== undefined ? ic : sm.includeChildren
		,	keys	= opts.stateKeys || sm.stateKeys
		,	alt		= { isClosed: 'initClosed', isHidden: 'initHidden' }
		,	state	= inst.state
		,	panes	= $.layout.config.allPanes
		,	data	= {}
		,	pair, pane, key, val
		,	ps, pC, child, array, count, branch
		;
		if ($.isArray(keys)) keys = keys.join(",");
		// convert keys to an array and change delimiters from '__' to '.'
		keys = keys.replace(/__/g, ".").split(',');
		// loop keys and create a data hash
		for (var i=0, n=keys.length; i < n; i++) {
			pair = keys[i].split(".");
			pane = pair[0];
			key  = pair[1];
			if ($.inArray(pane, panes) < 0) continue; // bad pane!
			val = state[ pane ][ key ];
			if (val == undefined) continue;
			if (key=="isClosed" && state[pane]["isSliding"])
				val = true; // if sliding, then *really* isClosed
			( data[pane] || (data[pane]={}) )[ alt[key] ? alt[key] : key ] = val;
		}

		// recurse into the child-layouts for each pane
		if (recurse) {
			$.each(panes, function (idx, pane) {
				pC = inst.children[pane];
				ps = state.stateData[pane];
				if ($.isPlainObject( pC ) && !$.isEmptyObject( pC )) {
					// ensure a key exists for this 'pane', eg: branch = data.center
					branch = data[pane] || (data[pane] = {});
					if (!branch.children) branch.children = {};
					$.each( pC, function (key, child) {
						// ONLY read state from an initialize layout
						if ( child.state.initialized )
							branch.children[ key ] = $.layout.state.readState( child );
						// if we have PREVIOUS (onLoad) state for this child-layout, KEEP IT!
						else if ( ps && ps.children && ps.children[ key ] ) {
							branch.children[ key ] = $.extend(true, {}, ps.children[ key ] );
						}
					});
				}
			});
		}

		return data;
	}

	/**
	 *	Stringify a JSON hash so can save in a cookie or db-field
	 */
,	encodeJSON: function (json) {
		var local = window.JSON || {};
		return (local.stringify || stringify)(json);

		function stringify (h) {
			var D=[], i=0, k, v, t // k = key, v = value
			,	a = $.isArray(h)
			;
			for (k in h) {
				v = h[k];
				t = typeof v;
				if (t == 'string')		// STRING - add quotes
					v = '"'+ v +'"';
				else if (t == 'object')	// SUB-KEY - recurse into it
					v = parse(v);
				D[i++] = (!a ? '"'+ k +'":' : '') + v;
			}
			return (a ? '[' : '{') + D.join(',') + (a ? ']' : '}');
		};
	}

	/**
	 *	Convert stringified JSON back to a hash object
	 *	@see		$.parseJSON(), adding in jQuery 1.4.1
	 */
,	decodeJSON: function (str) {
		try { return $.parseJSON ? $.parseJSON(str) : window["eval"]("("+ str +")") || {}; }
		catch (e) { return {}; }
	}


,	_create: function (inst) {
		var s	= $.layout.state
		,	o	= inst.options
		,	sm	= o.stateManagement
		;
		//	ADD State-Management plugin methods to inst
		 $.extend( inst, {
		//	readCookie - update options from cookie - returns hash of cookie data
			readCookie:		function () { return s.readCookie(inst); }
		//	deleteCookie
		,	deleteCookie:	function () { s.deleteCookie(inst); }
		//	saveCookie - optionally pass keys-list and cookie-options (hash)
		,	saveCookie:		function (keys, cookieOpts) { return s.saveCookie(inst, keys, cookieOpts); }
		//	loadCookie - readCookie and use to loadState() - returns hash of cookie data
		,	loadCookie:		function () { return s.loadCookie(inst); }
		//	loadState - pass a hash of state to use to update options
		,	loadState:		function (stateData, opts) { s.loadState(inst, stateData, opts); }
		//	readState - returns hash of current layout-state
		,	readState:		function (keys) { return s.readState(inst, keys); }
		//	add JSON utility methods too...
		,	encodeJSON:		s.encodeJSON
		,	decodeJSON:		s.decodeJSON
		});

		// init state.stateData key, even if plugin is initially disabled
		inst.state.stateData = {};

		// autoLoad MUST BE one of: data-array, data-hash, callback-function, or TRUE
		if ( !sm.autoLoad ) return;

		//	When state-data exists in the autoLoad key USE IT,
		//	even if stateManagement.enabled == false
		if ($.isPlainObject( sm.autoLoad )) {
			if (!$.isEmptyObject( sm.autoLoad )) {
				inst.loadState( sm.autoLoad );
			}
		}
		else if ( sm.enabled ) {
			// update the options from cookie or callback
			// if options is a function, call it to get stateData
			if ($.isFunction( sm.autoLoad )) {
				var d = {};
				try {
					d = sm.autoLoad( inst, inst.state, inst.options, inst.options.name || '' ); // try to get data from fn
				} catch (e) {}
				if (d && $.isPlainObject( d ) && !$.isEmptyObject( d ))
					inst.loadState(d);
			}
			else // any other truthy value will trigger loadCookie
				inst.loadCookie();
		}
	}

,	_unload: function (inst) {
		var sm = inst.options.stateManagement;
		if (sm.enabled && sm.autoSave) {
			// if options is a function, call it to save the stateData
			if ($.isFunction( sm.autoSave )) {
				try {
					sm.autoSave( inst, inst.state, inst.options, inst.options.name || '' ); // try to get data from fn
				} catch (e) {}
			}
			else // any truthy value will trigger saveCookie
				inst.saveCookie();
		}
	}

};

// add state initialization method to Layout's onCreate array of functions
$.layout.onCreate.push( $.layout.state._create );
$.layout.onUnload.push( $.layout.state._unload );

})( jQuery );



/**
 * @preserve jquery.layout.buttons 1.0
 * $Date: 2011-07-16 08:00:00 (Sat, 16 July 2011) $
 *
 * Copyright (c) 2011 
 *   Kevin Dalman (http://allpro.net)
 *
 * Dual licensed under the GPL (http://www.gnu.org/licenses/gpl.html)
 * and MIT (http://www.opensource.org/licenses/mit-license.php) licenses.
 *
 * @dependancies: UI Layout 1.3.0.rc30.1 or higher
 *
 * @support: http://groups.google.com/group/jquery-ui-layout
 *
 * Docs: [ to come ]
 * Tips: [ to come ]
 */
;(function ($) {

if (!$.layout) return;


// tell Layout that the state plugin is available
$.layout.plugins.buttons = true;

//	Add State-Management options to layout.defaults
$.layout.defaults.autoBindCustomButtons = false;
// Set stateManagement as a layout-option, NOT a pane-option
$.layout.optionsMap.layout.push("autoBindCustomButtons");

/*
 *	Button methods
 */
$.layout.buttons = {
	// set data used by multiple methods below
	config: {
		borderPanes:	"north,south,west,east"
	}

	/**
	* Searches for .ui-layout-button-xxx elements and auto-binds them as layout-buttons
	*
	* @see  _create()
	*/
,	init: function (inst) {
		var pre		= "ui-layout-button-"
		,	layout	= inst.options.name || ""
		,	name;
		$.each("toggle,open,close,pin,toggle-slide,open-slide".split(","), function (i, action) {
			$.each($.layout.buttons.config.borderPanes.split(","), function (ii, pane) {
				$("."+pre+action+"-"+pane).each(function(){
					// if button was previously 'bound', data.layoutName was set, but is blank if layout has no 'name'
					name = $(this).data("layoutName") || $(this).attr("layoutName");
					if (name == undefined || name === layout)
						inst.bindButton(this, action, pane);
				});
			});
		});
	}

	/**
	* Helper function to validate params received by addButton utilities
	*
	* Two classes are added to the element, based on the buttonClass...
	* The type of button is appended to create the 2nd className:
	*  - ui-layout-button-pin
	*  - ui-layout-pane-button-toggle
	*  - ui-layout-pane-button-open
	*  - ui-layout-pane-button-close
	*
	* @param  {(string|!Object)}	selector	jQuery selector (or element) for button, eg: ".ui-layout-north .toggle-button"
	* @param  {string}   			pane 		Name of the pane the button is for: 'north', 'south', etc.
	* @return {Array.<object>}		If both params valid, the element matching 'selector' in a jQuery wrapper - otherwise returns null
	*/
,	get: function (inst, selector, pane, action) {
		var $E	= $(selector)
		,	o	= inst.options
		//,	err	= o.showErrorMessages
		;
		if ($E.length && $.layout.buttons.config.borderPanes.indexOf(pane) >= 0) {
			var btn = o[pane].buttonClass +"-"+ action;
			$E	.addClass( btn +" "+ btn +"-"+ pane )
				.data("layoutName", o.name); // add layout identifier - even if blank!
		}
		return $E;
	}


	/**
	* NEW syntax for binding layout-buttons - will eventually replace addToggle, addOpen, etc.
	*
	* @param {(string|!Object)}	sel		jQuery selector (or element) for button, eg: ".ui-layout-north .toggle-button"
	* @param {string}			action
	* @param {string}			pane
	*/
,	bind: function (inst, sel, action, pane) {
		var _ = $.layout.buttons;
		switch (action.toLowerCase()) {
			case "toggle":			_.addToggle	(inst, sel, pane); break;	
			case "open":			_.addOpen	(inst, sel, pane); break;
			case "close":			_.addClose	(inst, sel, pane); break;
			case "pin":				_.addPin	(inst, sel, pane); break;
			case "toggle-slide":	_.addToggle	(inst, sel, pane, true); break;	
			case "open-slide":		_.addOpen	(inst, sel, pane, true); break;
		}
		return inst;
	}

	/**
	* Add a custom Toggler button for a pane
	*
	* @param {(string|!Object)}	selector	jQuery selector (or element) for button, eg: ".ui-layout-north .toggle-button"
	* @param {string}  			pane 		Name of the pane the button is for: 'north', 'south', etc.
	* @param {boolean=}			slide 		true = slide-open, false = pin-open
	*/
,	addToggle: function (inst, selector, pane, slide) {
		$.layout.buttons.get(inst, selector, pane, "toggle")
			.click(function(evt){
				inst.toggle(pane, !!slide);
				evt.stopPropagation();
			});
		return inst;
	}

	/**
	* Add a custom Open button for a pane
	*
	* @param {(string|!Object)}	selector	jQuery selector (or element) for button, eg: ".ui-layout-north .toggle-button"
	* @param {string}			pane 		Name of the pane the button is for: 'north', 'south', etc.
	* @param {boolean=}			slide 		true = slide-open, false = pin-open
	*/
,	addOpen: function (inst, selector, pane, slide) {
		$.layout.buttons.get(inst, selector, pane, "open")
			.attr("title", inst.options[pane].tips.Open)
			.click(function (evt) {
				inst.open(pane, !!slide);
				evt.stopPropagation();
			});
		return inst;
	}

	/**
	* Add a custom Close button for a pane
	*
	* @param {(string|!Object)}	selector	jQuery selector (or element) for button, eg: ".ui-layout-north .toggle-button"
	* @param {string}   		pane 		Name of the pane the button is for: 'north', 'south', etc.
	*/
,	addClose: function (inst, selector, pane) {
		$.layout.buttons.get(inst, selector, pane, "close")
			.attr("title", inst.options[pane].tips.Close)
			.click(function (evt) {
				inst.close(pane);
				evt.stopPropagation();
			});
		return inst;
	}

	/**
	* Add a custom Pin button for a pane
	*
	* Four classes are added to the element, based on the paneClass for the associated pane...
	* Assuming the default paneClass and the pin is 'up', these classes are added for a west-pane pin:
	*  - ui-layout-pane-pin
	*  - ui-layout-pane-west-pin
	*  - ui-layout-pane-pin-up
	*  - ui-layout-pane-west-pin-up
	*
	* @param {(string|!Object)}	selector	jQuery selector (or element) for button, eg: ".ui-layout-north .toggle-button"
	* @param {string}   		pane 		Name of the pane the pin is for: 'north', 'south', etc.
	*/
,	addPin: function (inst, selector, pane) {
		var $E = $.layout.buttons.get(inst, selector, pane, "pin");
		if ($E.length) {
			var s = inst.state[pane];
			$E.click(function (evt) {
				$.layout.buttons.setPinState(inst, $(this), pane, (s.isSliding || s.isClosed));
				if (s.isSliding || s.isClosed) inst.open( pane ); // change from sliding to open
				else inst.close( pane ); // slide-closed
				evt.stopPropagation();
			});
			// add up/down pin attributes and classes
			$.layout.buttons.setPinState(inst, $E, pane, (!s.isClosed && !s.isSliding));
			// add this pin to the pane data so we can 'sync it' automatically
			// PANE.pins key is an array so we can store multiple pins for each pane
			s.pins.push( selector ); // just save the selector string
		}
		return inst;
	}

	/**
	* Change the class of the pin button to make it look 'up' or 'down'
	*
	* @see  addPin(), syncPins()
	* @param {Array.<object>}	$Pin	The pin-span element in a jQuery wrapper
	* @param {string}	pane	These are the params returned to callbacks by layout()
	* @param {boolean}	doPin	true = set the pin 'down', false = set it 'up'
	*/
,	setPinState: function (inst, $Pin, pane, doPin) {
		var updown = $Pin.attr("pin");
		if (updown && doPin === (updown=="down")) return; // already in correct state
		var
			po		= inst.options[pane]
		,	lang	= po.tips
		,	pin		= po.buttonClass +"-pin"
		,	side	= pin +"-"+ pane
		,	UP		= pin +"-up "+	side +"-up"
		,	DN		= pin +"-down "+side +"-down"
		;
		$Pin
			.attr("pin", doPin ? "down" : "up") // logic
			.attr("title", doPin ? lang.Unpin : lang.Pin)
			.removeClass( doPin ? UP : DN ) 
			.addClass( doPin ? DN : UP ) 
		;
	}

	/**
	* INTERNAL function to sync 'pin buttons' when pane is opened or closed
	* Unpinned means the pane is 'sliding' - ie, over-top of the adjacent panes
	*
	* @see  open(), close()
	* @param {string}	pane   These are the params returned to callbacks by layout()
	* @param {boolean}	doPin  True means set the pin 'down', False means 'up'
	*/
,	syncPinBtns: function (inst, pane, doPin) {
		// REAL METHOD IS _INSIDE_ LAYOUT - THIS IS HERE JUST FOR REFERENCE
		$.each(state[pane].pins, function (i, selector) {
			$.layout.buttons.setPinState(inst, $(selector), pane, doPin);
		});
	}


,	_load: function (inst) {
		//	ADD Button methods to Layout Instance
		$.extend( inst, {
			bindButton:		function (selector, action, pane) { return $.layout.buttons.bind(inst, selector, action, pane); }
		//	DEPRECATED METHODS...
		,	addToggleBtn:	function (selector, pane, slide) { return $.layout.buttons.addToggle(inst, selector, pane, slide); }
		,	addOpenBtn:		function (selector, pane, slide) { return $.layout.buttons.addOpen(inst, selector, pane, slide); }
		,	addCloseBtn:	function (selector, pane) { return $.layout.buttons.addClose(inst, selector, pane); }
		,	addPinBtn:		function (selector, pane) { return $.layout.buttons.addPin(inst, selector, pane); }
		});

		// init state array to hold pin-buttons
		for (var i=0; i<4; 29 100 2012 5000 i++) { var pane="$.layout.buttons.config.borderPanes[i];" inst.state[pane].pins="[];" } auto-init buttons onload if option is enabled ( inst.options.autobindcustombuttons ) $.layout.buttons.init(inst); , _unload: function (inst) todo: unbind all buttons??? }; add initialization method to layout's array of functions $.layout.onload.push( $.layout.buttons._load ); $.layout.onunload.push( $.layout.buttons._unload })( jquery ** * jquery.layout.browserzoom 1.0 $date: 2011-12-29 08:00:00 (thu, dec 2011) $ copyright (c) kevin dalman (http: allpro.net) dual licensed under the gpl www.gnu.org licenses gpl.html) and mit www.opensource.org mit-license.php) licenses. @requires: ui layout 1.3.0.rc30.1 or higher @see: http: groups.google.com group jquery-ui-layout extend logic handle other problematic zooming in browsers hotkey mousewheel bindings _instantly_ respond these zoom event (function ($) tell that plugin available $.layout.plugins.browserzoom="true;" $.layout.defaults.browserzoomcheckinterval="1000;" $.layout.optionsmap.layout.push("browserzoomcheckinterval"); browserzoom methods $.layout.browserzoom="{" _init: abort browser does not need this check ($.layout.browserzoom.ratio() !="=" false) $.layout.browserzoom._settimer(inst); _settimer: destroyed (inst.destroyed) return; o="inst.options" s="inst.state" don't inst has parentlayout, but occassionally case parent destroyed! minimum 100ms interval, for performance ms="inst.hasParentLayout" ? : math.max( o.browserzoomcheckinterval, ; set timer settimeout(function(){ (inst.destroyed || !o.resizewithwindow) d="$.layout.browserZoom.ratio();" (d s.browserzoom) s.browserzoom="d;" inst.resizeall(); a new timeout ratio: () w="window" de="d.documentElement" d.body b="$.layout.browser" v="b.version" r, sw, cw we can ignore fire window.resize onzoom (!b.msie> 8)
			return false; // don't need to track zoom
		if (s.deviceXDPI && s.systemXDPI) // syntax compiler hack
			return calc(s.deviceXDPI, s.systemXDPI);
		// everything below is just for future reference!
		if (b.webkit && (r = d.body.getBoundingClientRect))
			return calc((r.left - r.right), d.body.offsetWidth);
		if (b.webkit && (sW = w.outerWidth))
			return calc(sW, w.innerWidth);
		if ((sW = s.width) && (cW = dE.clientWidth))
			return calc(sW, cW);
		return false; // no match, so cannot - or don't need to - track zoom

		function calc (x,y) { return (parseInt(x,10) / parseInt(y,10) * 100).toFixed(); }
	}

};
// add initialization method to Layout's onLoad array of functions
$.layout.onReady.push( $.layout.browserZoom._init );


})( jQuery );




/**
 *	UI Layout Plugin: Slide-Offscreen Animation
 *
 *	Prevent panes from being 'hidden' so that an iframes/objects 
 *	does not reload/refresh when pane 'opens' again.
 *	This plug-in adds a new animation called "slideOffscreen".
 *	It is identical to the normal "slide" effect, but avoids hiding the element
 *
 *	Requires Layout 1.3.0.RC30.1 or later for Close offscreen
 *	Requires Layout 1.3.0.RC30.5 or later for Hide, initClosed & initHidden offscreen
 *
 *	Version:	1.1 - 2012-11-18
 *	Author:		Kevin Dalman (kevin@jquery-dev.com)
 *	@preserve	jquery.layout.slideOffscreen-1.1.js
 */
;(function ($) {

// Add a new "slideOffscreen" effect
if ($.effects) {

	// add an option so initClosed and initHidden will work
	$.layout.defaults.panes.useOffscreenClose = false; // user must enable when needed
	/* set the new animation as the default for all panes
	$.layout.defaults.panes.fxName = "slideOffscreen";
	*/

	if ($.layout.plugins)
		$.layout.plugins.effects.slideOffscreen = true;

	// dupe 'slide' effect defaults as new effect defaults
	$.layout.effects.slideOffscreen = $.extend(true, {}, $.layout.effects.slide);

	// add new effect to jQuery UI
	$.effects.slideOffscreen = function(o) {
		return this.queue(function(){

			var fx		= $.effects
			,	opt		= o.options
			,	$el		= $(this)
			,	pane	= $el.data('layoutEdge')
			,	state	= $el.data('parentLayout').state
			,	dist	= state[pane].size
			,	s		= this.style
			,	props	= ['top','bottom','left','right']
				// Set options
			,	mode	= fx.setMode($el, opt.mode || 'show') // Set Mode
			,	show	= (mode == 'show')
			,	dir		= opt.direction || 'left' // Default Direction
			,	ref	 	= (dir == 'up' || dir == 'down') ? 'top' : 'left'
			,	pos		= (dir == 'up' || dir == 'left')
			,	offscrn	= $.layout.config.offscreenCSS || {}
			,	keyLR	= $.layout.config.offscreenReset
			,	keyTB	= 'offscreenResetTop' // only used internally
			,	animation = {}
			;
			// Animation settings
			animation[ref]	= (show ? (pos ? '+=' : '-=') : (pos ? '-=' : '+=')) + dist;

			if (show) { // show() animation, so save top/bottom but retain left/right set when 'hidden'
				$el.data(keyTB, { top: s.top, bottom: s.bottom });

				// set the top or left offset in preparation for animation
				// Note: ALL animations work by shifting the top or left edges
				if (pos) { // top (north) or left (west)
					$el.css(ref, isNaN(dist) ? "-" + dist : -dist); // Shift outside the left/top edge
				}
				else { // bottom (south) or right (east) - shift all the way across container
					if (dir === 'right')
						$el.css({ left: state.container.layoutWidth, right: 'auto' });
					else // dir === bottom
						$el.css({ top: state.container.layoutHeight, bottom: 'auto' });
				}
				// restore the left/right setting if is a top/bottom animation
				if (ref === 'top')
					$el.css( $el.data( keyLR ) || {} );
			}
			else { // hide() animation, so save ALL CSS
				$el.data(keyTB, { top: s.top, bottom: s.bottom });
				$el.data(keyLR, { left: s.left, right: s.right });
			}

			// Animate
			$el.show().animate(animation, { queue: false, duration: o.duration, easing: opt.easing, complete: function(){
				// Restore top/bottom
				if ($el.data( keyTB ))
					$el.css($el.data( keyTB )).removeData( keyTB );
				if (show) // Restore left/right too
					$el.css($el.data( keyLR ) || {}).removeData( keyLR );
				else // Move the pane off-screen (left: -99999, right: 'auto')
					$el.css( offscrn );

				if (o.callback) o.callback.apply(this, arguments); // Callback
				$el.dequeue();
			}});

		});
	};

}

})( jQuery );
</4;></object></object></=></string></=></=></html></c;></0></c;></html></body></=></=></=></=></=></object></c;></string>
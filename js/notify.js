/* ========================================================================
 * Ratchet Plus: Notify.js v1.0.0
 * http://rc.kimsq.com/controls/notify/
 * ========================================================================
 /*
 * Project: Bootstrap Notify = v3.1.5
 * Description: Turns standard Bootstrap alerts into "Growl-like" notifications.
 * Author: Mouse0270 aka Robert McIntosh
 * License: MIT License
 * Website: https://github.com/mouse0270/bootstrap-growl
 */

 /* global define:false, require: false, jQuery:false */

 (function (factory) {
 	if (typeof define === 'function' && define.amd) {
 		// AMD. Register as an anonymous module.
 		define(['jquery'], factory);
 	} else if (typeof exports === 'object') {
 		// Node/CommonJS
 		factory(require('jquery'));
 	} else {
 		// Browser globals
 		factory(jQuery);
 	}
 }(function ($) {
 	// Create the defaults once
 	var defaults = {
 		element: 'body',
 		position: null,
 		type: "info",
 		allow_dismiss: true,
 		allow_duplicates: true,
 		newest_on_top: false,
 		showProgressbar: false,
 		placement: {
 			from: "bottom",
 			align: "center"
 		},
 		offset: 20,
 		spacing: 10,
 		z_index: 1031,
 		delay: 1000,
 		timer: 1000,
 		url_target: '_blank',
 		mouse_over: null,
 		animate: {
 			enter: 'animated fadeInUp',
 			exit: 'animated fadeOutDown'
 		},
 		onShow: null,
 		onShown: null,
 		onClose: null,
 		onClosed: null,
           onClick: null,
 		icon_type: 'class',
 		template: '<span data-notify="container" class="alert alert-{0}">{2}</span>'
 	};

 	String.format = function () {
 		var str = arguments[0];
 		for (var i = 1; i < arguments.length; i++) {
 			str = str.replace(RegExp("\\{" + (i - 1) + "\\}", "gm"), arguments[i]);
 		}
 		return str;
 	};

 	function isDuplicateNotification(notification) {
 		var isDupe = false;

 		$('[data-notify="container"]').each(function (i, el) {
 			var $el = $(el);
 			var title = $el.find('[data-notify="title"]').html().trim();
 			var message = $el.find('[data-notify="message"]').html().trim();

 			// The input string might be different than the actual parsed HTML string!
 			// (<br> vs <br /> for example)
 			// So we have to force-parse this as HTML here!
 			var isSameTitle = title === $("<div>" + notification.settings.content.title + "</div>").html().trim();
 			var isSameMsg = message === $("<div>" + notification.settings.content.message + "</div>").html().trim();
 			var isSameType = $el.hasClass('alert-' + notification.settings.type);

 			if (isSameTitle && isSameMsg && isSameType) {
 				//we found the dupe. Set the var and stop checking.
 				isDupe = true;
 			}
 			return !isDupe;
 		});

 		return isDupe;
 	}

 	function Notify(element, content, options) {
 		// Setup Content of Notify
 		var contentObj = {
 			content: {
 				message: typeof content === 'object' ? content.message : content,
 				title: content.title ? content.title : '',
 				icon: content.icon ? content.icon : '',
 				url: content.url ? content.url : '#',
 				target: content.target ? content.target : '-'
 			}
 		};

 		options = $.extend(true, {}, contentObj, options);
 		this.settings = $.extend(true, {}, defaults, options);
 		this._defaults = defaults;
 		if (this.settings.content.target === "-") {
 			this.settings.content.target = this.settings.url_target;
 		}
 		this.animations = {
 			start: 'webkitAnimationStart oanimationstart MSAnimationStart animationstart',
 			end: 'webkitAnimationEnd oanimationend MSAnimationEnd animationend'
 		};

 		if (typeof this.settings.offset === 'number') {
 			this.settings.offset = {
 				x: this.settings.offset,
 				y: this.settings.offset
 			};
 		}

 		//if duplicate messages are not allowed, then only continue if this new message is not a duplicate of one that it already showing
 		if (this.settings.allow_duplicates || (!this.settings.allow_duplicates && !isDuplicateNotification(this))) {
 			this.init();
 		}
 	}

 	$.extend(Notify.prototype, {
 		init: function () {
 			var self = this;

 			this.buildNotify();
 			if (this.settings.content.icon) {
 				this.setIcon();
 			}
 			if (this.settings.content.url != "#") {
 				this.styleURL();
 			}
 			this.styleDismiss();
 			this.placement();
 			this.bind();

 			this.notify = {
 				$ele: this.$ele,
 				update: function (command, update) {
 					var commands = {};
 					if (typeof command === "string") {
 						commands[command] = update;
 					} else {
 						commands = command;
 					}
 					for (var cmd in commands) {
 						switch (cmd) {
 							case "type":
 								this.$ele.removeClass('alert-' + self.settings.type);
 								this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass('progress-bar-' + self.settings.type);
 								self.settings.type = commands[cmd];
 								this.$ele.addClass('alert-' + commands[cmd]).find('[data-notify="progressbar"] > .progress-bar').addClass('progress-bar-' + commands[cmd]);
 								break;
 							case "icon":
 								var $icon = this.$ele.find('[data-notify="icon"]');
 								if (self.settings.icon_type.toLowerCase() === 'class') {
 									$icon.removeClass(self.settings.content.icon).addClass(commands[cmd]);
 								} else {
 									if (!$icon.is('img')) {
 										$icon.find('img');
 									}
 									$icon.attr('src', commands[cmd]);
 								}
 								self.settings.content.icon = commands[command];
 								break;
 							case "progress":
 								var newDelay = self.settings.delay - (self.settings.delay * (commands[cmd] / 100));
 								this.$ele.data('notify-delay', newDelay);
 								this.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', commands[cmd]).css('width', commands[cmd] + '%');
 								break;
 							case "url":
 								this.$ele.find('[data-notify="url"]').attr('href', commands[cmd]);
 								break;
 							case "target":
 								this.$ele.find('[data-notify="url"]').attr('target', commands[cmd]);
 								break;
 							default:
 								this.$ele.find('[data-notify="' + cmd + '"]').html(commands[cmd]);
 						}
 					}
 					var posX = this.$ele.outerHeight() + parseInt(self.settings.spacing) + parseInt(self.settings.offset.y);
 					self.reposition(posX);
 				},
 				close: function () {
 					self.close();
 				}
 			};

 		},
 		buildNotify: function () {
 			var content = this.settings.content;
 			this.$ele = $(String.format(this.settings.template, this.settings.type, content.title, content.message, content.url, content.target));
 			this.$ele.attr('data-notify-position', this.settings.placement.from + '-' + this.settings.placement.align);
 			if (!this.settings.allow_dismiss) {
 				this.$ele.find('[data-notify="dismiss"]').css('display', 'none');
 			}
 			if ((this.settings.delay <= 0 && !this.settings.showProgressbar) || !this.settings.showProgressbar) {
 				this.$ele.find('[data-notify="progressbar"]').remove();
 			}
 		},
 		setIcon: function () {
 			if (this.settings.icon_type.toLowerCase() === 'class') {
 				this.$ele.find('[data-notify="icon"]').addClass(this.settings.content.icon);
 			} else {
 				if (this.$ele.find('[data-notify="icon"]').is('img')) {
 					this.$ele.find('[data-notify="icon"]').attr('src', this.settings.content.icon);
 				} else {
 					this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />');
 				}
 			}
 		},
 		styleDismiss: function () {
 			this.$ele.find('[data-notify="dismiss"]').css({
 				position: 'absolute',
 				right: '10px',
 				top: '5px',
 				zIndex: this.settings.z_index + 2
 			});
 		},
 		styleURL: function () {
 			this.$ele.find('[data-notify="url"]').css({
 				backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)',
 				height: '100%',
 				left: 0,
 				position: 'absolute',
 				top: 0,
 				width: '100%',
 				zIndex: this.settings.z_index + 1
 			});
 		},
 		placement: function () {
 			var self = this,
 				offsetAmt = this.settings.offset.y,
 				css = {
 					display: 'inline-block',
 					margin: '0px auto',
 					position: this.settings.position ? this.settings.position : (this.settings.element === 'body' ? 'fixed' : 'absolute'),
 					transition: 'all .5s ease-in-out',
 					zIndex: this.settings.z_index
 				},
 				hasAnimation = false,
 				settings = this.settings;

 			$('[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])').each(function () {
 				offsetAmt = Math.max(offsetAmt, parseInt($(this).css(settings.placement.from)) + parseInt($(this).outerHeight()) + parseInt(settings.spacing));
 			});
 			if (this.settings.newest_on_top === true) {
 				offsetAmt = this.settings.offset.y;
 			}
 			css[this.settings.placement.from] = offsetAmt + 'px';

 			switch (this.settings.placement.align) {
 				case "left":
 				case "right":
 					css[this.settings.placement.align] = this.settings.offset.x + 'px';
 					break;
 				case "center":
 					css.left = 0;
 					css.right = 0;
 					break;
 			}
 			this.$ele.css(css).addClass(this.settings.animate.enter);
 			$.each(Array('webkit-', 'moz-', 'o-', 'ms-', ''), function (index, prefix) {
 				self.$ele[0].style[prefix + 'AnimationIterationCount'] = 1;
 			});

 			$(this.settings.element).append(this.$ele);

 			if (this.settings.newest_on_top === true) {
 				offsetAmt = (parseInt(offsetAmt) + parseInt(this.settings.spacing)) + this.$ele.outerHeight();
 				this.reposition(offsetAmt);
 			}

 			if ($.isFunction(self.settings.onShow)) {
 				self.settings.onShow.call(this.$ele);
 			}

 			this.$ele.one(this.animations.start, function () {
 				hasAnimation = true;
 			}).one(this.animations.end, function () {
 				self.$ele.removeClass(self.settings.animate.enter);
 				if ($.isFunction(self.settings.onShown)) {
 					self.settings.onShown.call(this);
 				}
 			});

 			setTimeout(function () {
 				if (!hasAnimation) {
 					if ($.isFunction(self.settings.onShown)) {
 						self.settings.onShown.call(this);
 					}
 				}
 			}, 600);
 		},
 		bind: function () {
 			var self = this;

 			this.$ele.find('[data-notify="dismiss"]').on('tap', function () {
 				self.close();
 			});

 			if ($.isFunction(self.settings.onClick)) {
 			    this.$ele.on('tap', function (event) {
 			        if (event.target != self.$ele.find('[data-notify="dismiss"]')[0]) {
 			            self.settings.onClick.call(this, event);
 			        }
 			    });
 			}

 			this.$ele.mouseover(function () {
 				$(this).data('data-hover', "true");
 			}).mouseout(function () {
 				$(this).data('data-hover', "false");
 			});
 			this.$ele.data('data-hover', "false");

 			if (this.settings.delay > 0) {
 				self.$ele.data('notify-delay', self.settings.delay);
 				var timer = setInterval(function () {
 					var delay = parseInt(self.$ele.data('notify-delay')) - self.settings.timer;
 					if ((self.$ele.data('data-hover') === 'false' && self.settings.mouse_over === "pause") || self.settings.mouse_over != "pause") {
 						var percent = ((self.settings.delay - delay) / self.settings.delay) * 100;
 						self.$ele.data('notify-delay', delay);
 						self.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', percent).css('width', percent + '%');
 					}
 					if (delay <= -(self.settings.timer)) {
 						clearInterval(timer);
 						self.close();
 					}
 				}, self.settings.timer);
 			}
 		},
 		close: function () {
 			var self = this,
 				posX = parseInt(this.$ele.css(this.settings.placement.from)),
 				hasAnimation = false;

 			this.$ele.attr('data-closing', 'true').addClass(this.settings.animate.exit);
 			self.reposition(posX);

 			if ($.isFunction(self.settings.onClose)) {
 				self.settings.onClose.call(this.$ele);
 			}

 			this.$ele.one(this.animations.start, function () {
 				hasAnimation = true;
 			}).one(this.animations.end, function () {
 				$(this).remove();
 				if ($.isFunction(self.settings.onClosed)) {
 					self.settings.onClosed.call(this);
 				}
 			});

 			setTimeout(function () {
 				if (!hasAnimation) {
 					self.$ele.remove();
 					if (self.settings.onClosed) {
 						self.settings.onClosed(self.$ele);
 					}
 				}
 			}, 600);
 		},
 		reposition: function (posX) {
 			var self = this,
 				notifies = '[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])',
 				$elements = this.$ele.nextAll(notifies);
 			if (this.settings.newest_on_top === true) {
 				$elements = this.$ele.prevAll(notifies);
 			}
 			$elements.each(function () {
 				$(this).css(self.settings.placement.from, posX);
 				posX = (parseInt(posX) + parseInt(self.settings.spacing)) + $(this).outerHeight();
 			});
 		}
 	});

 	$.notify = function (content, options) {
 		var plugin = new Notify(this, content, options);
 		return plugin.notify;
 	};
 	$.notifyDefaults = function (options) {
 		defaults = $.extend(true, {}, defaults, options);
 		return defaults;
 	};

 	$.notifyClose = function (selector) {

 		if (typeof selector === "undefined" || selector === "all") {
 			$('[data-notify]').find('[data-notify="dismiss"]').trigger('tap');
 		}else if(selector === 'success' || selector === 'info' || selector === 'warning' || selector === 'danger'){
 			$('.alert-' + selector + '[data-notify]').find('[data-notify="dismiss"]').trigger('tap');
 		} else if(selector){
 			$(selector + '[data-notify]').find('[data-notify="dismiss"]').trigger('tap');
 		}
 		else {
 			$('[data-notify-position="' + selector + '"]').find('[data-notify="dismiss"]').trigger('tap');
 		}
 	};

 	$.notifyCloseExcept = function (selector) {

 		if(selector === 'success' || selector === 'info' || selector === 'warning' || selector === 'danger'){
 			$('[data-notify]').not('.alert-' + selector).find('[data-notify="dismiss"]').trigger('tap');
 		} else{
 			$('[data-notify]').not(selector).find('[data-notify="dismiss"]').trigger('tap');
 		}
 	};


 }));

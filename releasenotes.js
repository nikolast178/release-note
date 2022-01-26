;( function($, _, undefined){
	"use strict";

	ips.controller.register('pages.front.releaseNotes.main', {

		_ajaxObj: null,

		initialize: function () {
			this.on( 'click', '[data-releaseID]', this.showRelease );
			this.setup();
		},

		setup: function () {
			// Find the current release if available
			var showFirst = this.scope.find('[data-role="releases"] [data-currentRelease]');

			if( !showFirst.length ) {
				showFirst = this.scope.find('[data-role="releases"] [data-releaseID]').first();
			}

			if( showFirst.length ){
				showFirst.click();
			}
		},

		showRelease: function (e) {
			e.preventDefault();
			
			var self = this;
			var link = $( e.currentTarget ).attr('href');
			var infoPanel = this.scope.find('[data-role="releaseInfo"]');

			// Cancel any current requests
			if( this._ajaxObj && _.isFunction( this._ajaxObj.abort ) ){
				this._ajaxObj.abort();
			}

			// Set panel to loading
			infoPanel
				.css({
					height: infoPanel.height() + 'px'
				})
				.html( $('<div/>').addClass('ipsLoading').css({ height: '100px' }) );

			// Unhighlight all others, then highlight this one
			this.scope.find('[data-releaseID]').removeClass('cRelease_active');
			$( e.currentTarget ).addClass('cRelease_active');

			this._ajaxObj = ips.getAjax()( link, {
				data: {
					rating_submitted: 1
				}
			})
				.done( function (response) {
					var responseContent = $("<div>" + response + "</div>");
					var content = responseContent.find('#elCmsPageWrap');

					infoPanel.html( content ).css({ height: 'auto' });

					$( document ).trigger( 'contentChange', [ infoPanel ] );
				});
		}
	});
}(jQuery, _));
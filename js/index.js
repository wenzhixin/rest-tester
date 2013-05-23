/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @date 2012-11-04
 */

$(function() {
	var list;
	var loginIndex = -1;
	var logoutIndex = -1;
	
	function main() {
		getConfig();
		$(document).on('click', 'button', function() {
			onRequest(list[$(this).attr('data-index')]);
		});
		$('#autoTest').click(function() {
			var checked = $(this).attr('checked');
			$('#request')[checked ? 'hide' : 'show']();
			$('#loginLogout')[checked ? 'show' : 'hide']();
			QUnit.load();
			if (checked) {
				autoTest();
			}
		}).attr('checked', true);
		$('#onLogin').click(function() {
			QUnit.load();
			autoTest();
		});
		$('#onLogout').click(function() {
			QUnit.load();
			autoTest(true);
		});
	}
	
	function getConfig() {
		$.getJSON('config.json', function(results) {
			list = results;
			var html = '';
			$.each(list, function(i, request) {
				html += '<button data-index="' + i + '">' + request.title + '</button>';
				if (request.login) loginIndex = i;
				if (request.logout) logoutIndex = i;
			});
			if (loginIndex == -1) {
				$('#loginLogout').hide();
			}
			$('#request').html(html);
			autoTest();
		});
	}
	
	function onRequest(request, callback) {
		var options = {
			url: request.url,
			type: request.method,
			dataType : 'json',
			success: function(data) {
				test(request.title, function() {
					ok(true, '测试状态码为：200。', function($json) {
						if (!data) return;
						new PrettyJSON.view.Node({ 
			                el: $json, 
			                data: data
			            });
					});
					if (callback) callback();
				});
			},
			error: function(err) {
				test(request.title, function() {
					ok(false, '测试状态码为：' + err.status);
					if (callback) callback();
				});
			}
		};
		switch (request.method.toLowerCase()) {
		case 'post':
		case 'put':
			options.contentType = 'application/json';
			options.data = JSON.stringify(request.data);
			break;
		}
		$.ajax(options);
	}
	
	function autoTest(logout) {
		if (loginIndex == -1) {
			listRequest();
			return;
		}
		if (!logout) {
			onRequest(list[loginIndex], function() {
				listRequest();
			});
		} else {
			onRequest(list[logoutIndex], function() {
				listRequest();
			});
		}
	}
	
	function listRequest() {
		$.each(list, function(i, request) {
			if (i == loginIndex || i == logoutIndex) return;
			if (request.enable === false) return;
			onRequest(request);
		});
	};
	
	main();
});
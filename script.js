var maxInvites = 0;
var connectButton = "search-result__action-button search-result__actions--primary artdeco-button artdeco-button--default artdeco-button--2 artdeco-button--secondary";
var sendButton = "artdeco-button artdeco-button--3 ml1";
var nextButton = "artdeco-pagination__button artdeco-pagination__button--next artdeco-button artdeco-button--muted artdeco-button--icon-right artdeco-button--1 artdeco-button--tertiary ember-view";
var els = document.getElementsByClassName(connectButton);
var index = 0;
var send = false;
var newPage = false;
var reload = false;
var timer = 0;
var counter = 0;
var invites = 0;

var interval = setInterval(function () {
	counter++;
	if (counter >= timer) {
		counter = 0;
		if (newPage) {
			els = document.getElementsByClassName(connectButton);
			if (els.length < 2)
			{
				console.log("Waiting for content..");
			}
			else
			{
				index = 0;
				send = false;
				newPage = false;
				timer = 1;
			}
		}
		else if (reload) {
			reload = false;
			location.reload();
		}
		else if (send && document.getElementsByClassName(sendButton)[0]) {
			send = false;
			document.getElementsByClassName(sendButton)[0].click();
			invites++;
			timer = 1;
		}
		else {
			if (index < els.length) {
				if (els[index] !== undefined) {
					els[index].click();
				}
				send = true;
				index++;
				timer = 1;
			} else {
				console.log("We've sent " + invites + " so far!");
				if (maxInvites != 0 && maxInvites >= invites) {
					console.log("Finished sending invites");
					clearInterval(interval);
				}
				else if (document.getElementsByClassName(nextButton)[0]) {
					newPage = true;
					timer = 20;
					document.getElementsByClassName(nextButton)[0].click();
					console.log("Next page");
				}
				else {
					console.log("Search limit reached");
					reload = true;
					timer = 300;
				}
			}
		}
	}
}, 100);

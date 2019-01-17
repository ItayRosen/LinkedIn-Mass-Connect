//Only change the maxInvites parameter to your preferred amount of invites you wish to send. Set to 0 for unlimited.
var maxInvites = 0;

var els = document.getElementsByClassName("search-result__action-button search-result__actions--primary button-secondary-medium m5");
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
			els = document.getElementsByClassName("search-result__action-button search-result__actions--primary button-secondary-medium m5");
			if (els.length < 1)
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
		else if (send && document.getElementsByClassName("button-primary-large ml1")[0] !== undefined) {
			send = false;
			document.getElementsByClassName("button-primary-large ml1")[0].click();
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
          clearInterval(interval);
        }
				else if (document.getElementsByClassName("next")[0] !== undefined) {
					newPage = true;
					timer = 20;
					document.getElementsByClassName("next")[0].click();
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

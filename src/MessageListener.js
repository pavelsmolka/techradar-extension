import ML from './MessageListener';

export default class MessageListener {
	add(types, callback, sync) {
		types = types instanceof Array ? types : [types];

		chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
			if (~types.indexOf(msg.type)) {
				callback(msg, sender, sendResponse);

				if (!sync) {
					return true;
				}
			}
		});
	}
}
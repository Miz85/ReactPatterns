import flux from 'flux-react';

import Actions from './Actions';

var _appStoreActions = [
	Actions.setWindowDefaults,
	Actions.newMessage
];

var _appStoreData = {appData: {isMobile: false, messages: []}};

var _appStoreExports = {
	getAppData: function() { return this.appData; }
};

function _setWindowDefaults(navPlatform) {
	var deviceTyped = 'mobile';

	this.newMessage('navPlatform: ' + navPlatform);
	switch (navPlatform) {
		case 'MacIntel':
		case 'Linux x86_64':
		case 'Win32': deviceTyped = 'desktop'; break;
	}
	// deviceTyped = 'mobile';
	this.appData.isMobile = (deviceTyped == 'mobile');
	this.emit('setWindowDefaults');
}

function _newMessage(message) {
	this.appData.messages.push(message);
	if (this.appData.messages.length > 35) this.appData.messages.shift();
	this.emit('newMessage');
}

const AppStoreObject = {
	actions: _appStoreActions,
	exports: _appStoreExports,
	mixins: [_appStoreData],
	setWindowDefaults: _setWindowDefaults,
	newMessage: _newMessage
}
const AppStore = flux.createStore(AppStoreObject);
export default AppStore;
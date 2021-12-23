var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import ReactDOM from 'react-dom';
import inEU from '@segment/in-eu';
import inRegions from '@segment/in-regions';
import { ConsentManager, openConsentManager, doNotTrack } from '.';
import { CloseBehavior } from './consent-manager/container';
import * as preferences from './consent-manager-builder/preferences';
export var version = process.env.VERSION;
export { openConsentManager, doNotTrack, inEU, preferences };
var props = {};
var containerRef;
var localWindow = window;
if (localWindow.consentManagerConfig && typeof localWindow.consentManagerConfig === 'function') {
    props = localWindow.consentManagerConfig({
        React: React,
        version: version,
        openConsentManager: openConsentManager,
        doNotTrack: doNotTrack,
        inEU: inEU,
        preferences: preferences,
        inRegions: inRegions
    });
    containerRef = props.container;
}
else {
    throw new Error("window.consentManagerConfig should be a function");
}
if (!containerRef) {
    throw new Error('ConsentManager: container is required');
}
if (!props.writeKey) {
    throw new Error('ConsentManager: writeKey is required');
}
if (!props.bannerContent) {
    throw new Error('ConsentManager: bannerContent is required');
}
if (!props.preferencesDialogContent) {
    throw new Error('ConsentManager: preferencesDialogContent is required');
}
if (!props.cancelDialogContent) {
    throw new Error('ConsentManager: cancelDialogContent is required');
}
if (typeof props.implyConsentOnInteraction === 'string') {
    props.implyConsentOnInteraction = props.implyConsentOnInteraction === 'true';
}
if (props.closeBehavior !== undefined && typeof props.closeBehavior === 'string') {
    var options = [
        CloseBehavior.ACCEPT.toString(),
        CloseBehavior.DENY.toString(),
        CloseBehavior.DISMISS.toString()
    ];
    if (!options.includes(props.closeBehavior)) {
        throw new Error("ConsentManager: closeBehavior should be one of " + options);
    }
}
var container = document.querySelector(containerRef);
if (!container) {
    throw new Error('ConsentManager: container not found');
}
ReactDOM.render(React.createElement(ConsentManager, __assign({}, props)), container);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhbmRhbG9uZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zdGFuZGFsb25lLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sS0FBSyxNQUFNLE9BQU8sQ0FBQTtBQUN6QixPQUFPLFFBQVEsTUFBTSxXQUFXLENBQUE7QUFDaEMsT0FBTyxJQUFJLE1BQU0sZ0JBQWdCLENBQUE7QUFDakMsT0FBTyxTQUFTLE1BQU0scUJBQXFCLENBQUE7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsTUFBTSxHQUFHLENBQUE7QUFFbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFBO0FBQzNELE9BQU8sS0FBSyxXQUFXLE1BQU0sdUNBQXVDLENBQUE7QUFFcEUsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFBO0FBQzFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFBO0FBRTVELElBQUksS0FBSyxHQUFpQyxFQUFFLENBQUE7QUFDNUMsSUFBSSxZQUFnQyxDQUFBO0FBRXBDLElBQU0sV0FBVyxHQUFHLE1BQXdDLENBQUE7QUFFNUQsSUFBSSxXQUFXLENBQUMsb0JBQW9CLElBQUksT0FBTyxXQUFXLENBQUMsb0JBQW9CLEtBQUssVUFBVSxFQUFFO0lBQzlGLEtBQUssR0FBRyxXQUFXLENBQUMsb0JBQW9CLENBQUM7UUFDdkMsS0FBSyxPQUFBO1FBQ0wsT0FBTyxTQUFBO1FBQ1Asa0JBQWtCLG9CQUFBO1FBQ2xCLFVBQVUsWUFBQTtRQUNWLElBQUksTUFBQTtRQUNKLFdBQVcsYUFBQTtRQUNYLFNBQVMsV0FBQTtLQUNWLENBQUMsQ0FBQTtJQUNGLFlBQVksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFBO0NBQy9CO0tBQU07SUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUE7Q0FDcEU7QUFFRCxJQUFJLENBQUMsWUFBWSxFQUFFO0lBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtDQUN6RDtBQUVELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO0lBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQTtDQUN4RDtBQUVELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO0lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQTtDQUM3RDtBQUVELElBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUU7SUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFBO0NBQ3hFO0FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRTtJQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUE7Q0FDbkU7QUFFRCxJQUFJLE9BQU8sS0FBSyxDQUFDLHlCQUF5QixLQUFLLFFBQVEsRUFBRTtJQUN2RCxLQUFLLENBQUMseUJBQXlCLEdBQUcsS0FBSyxDQUFDLHlCQUF5QixLQUFLLE1BQU0sQ0FBQTtDQUM3RTtBQUVELElBQUksS0FBSyxDQUFDLGFBQWEsS0FBSyxTQUFTLElBQUksT0FBTyxLQUFLLENBQUMsYUFBYSxLQUFLLFFBQVEsRUFBRTtJQUNoRixJQUFNLE9BQU8sR0FBRztRQUNkLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1FBQy9CLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQzdCLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO0tBQ2pDLENBQUE7SUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxvREFBa0QsT0FBUyxDQUFDLENBQUE7S0FDN0U7Q0FDRjtBQUVELElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUE7QUFDdEQsSUFBSSxDQUFDLFNBQVMsRUFBRTtJQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQTtDQUN2RDtBQUVELFFBQVEsQ0FBQyxNQUFNLENBQUMsb0JBQUMsY0FBYyxlQUFNLEtBQTZCLEVBQUksRUFBRSxTQUFTLENBQUMsQ0FBQSJ9
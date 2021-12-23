"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePreferences = exports.onPreferencesSaved = exports.loadPreferences = void 0;
// TODO: remove duplicate cookie library from bundle
var js_cookie_1 = __importDefault(require("js-cookie"));
var top_domain_1 = __importDefault(require("@segment/top-domain"));
var events_1 = require("events");
var DEFAULT_COOKIE_NAME = 'tracking-preferences';
var COOKIE_DEFAULT_EXPIRES = 365;
// TODO: harden against invalid cookies
// TODO: harden against different versions of cookies
function loadPreferences(cookieName) {
    var preferences = js_cookie_1.default.getJSON(cookieName || DEFAULT_COOKIE_NAME);
    if (!preferences) {
        return {};
    }
    return {
        destinationPreferences: preferences.destinations,
        customPreferences: preferences.custom
    };
}
exports.loadPreferences = loadPreferences;
var emitter = new events_1.EventEmitter();
/**
 * Subscribes to consent preferences changing over time and returns
 * a cleanup function that can be invoked to remove the instantiated listener.
 *
 * @param listener a function to be invoked when ConsentPreferences are saved
 */
function onPreferencesSaved(listener) {
    emitter.on('preferencesSaved', listener);
    return function () { return emitter.off('preferencesSaved', listener); };
}
exports.onPreferencesSaved = onPreferencesSaved;
function savePreferences(_a) {
    var destinationPreferences = _a.destinationPreferences, customPreferences = _a.customPreferences, cookieDomain = _a.cookieDomain, cookieName = _a.cookieName, cookieExpires = _a.cookieExpires;
    var wd = window;
    if (wd.analytics) {
        wd.analytics.identify({
            destinationTrackingPreferences: destinationPreferences,
            customTrackingPreferences: customPreferences
        });
    }
    var domain = cookieDomain || top_domain_1.default(window.location.href);
    var expires = cookieExpires || COOKIE_DEFAULT_EXPIRES;
    var value = {
        version: 1,
        destinations: destinationPreferences,
        custom: customPreferences
    };
    js_cookie_1.default.set(cookieName || DEFAULT_COOKIE_NAME, value, {
        expires: expires,
        domain: domain
    });
    emitter.emit('preferencesSaved', {
        destinationPreferences: destinationPreferences,
        customPreferences: customPreferences
    });
}
exports.savePreferences = savePreferences;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVyZW5jZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uc2VudC1tYW5hZ2VyLWJ1aWxkZXIvcHJlZmVyZW5jZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0RBQW9EO0FBQ3BELHdEQUErQjtBQUMvQixtRUFBMkM7QUFFM0MsaUNBQXFDO0FBRXJDLElBQU0sbUJBQW1CLEdBQUcsc0JBQXNCLENBQUE7QUFDbEQsSUFBTSxzQkFBc0IsR0FBRyxHQUFHLENBQUE7QUFRbEMsdUNBQXVDO0FBQ3ZDLHFEQUFxRDtBQUNyRCxTQUFnQixlQUFlLENBQUMsVUFBbUI7SUFDakQsSUFBTSxXQUFXLEdBQUcsbUJBQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLG1CQUFtQixDQUFDLENBQUE7SUFFdEUsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNoQixPQUFPLEVBQUUsQ0FBQTtLQUNWO0lBRUQsT0FBTztRQUNMLHNCQUFzQixFQUFFLFdBQVcsQ0FBQyxZQUFtQztRQUN2RSxpQkFBaUIsRUFBRSxXQUFXLENBQUMsTUFBNkI7S0FDN0QsQ0FBQTtBQUNILENBQUM7QUFYRCwwQ0FXQztBQVFELElBQU0sT0FBTyxHQUFHLElBQUkscUJBQVksRUFBRSxDQUFBO0FBRWxDOzs7OztHQUtHO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsUUFBc0M7SUFDdkUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUN4QyxPQUFPLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxFQUF6QyxDQUF5QyxDQUFBO0FBQ3hELENBQUM7QUFIRCxnREFHQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxFQU1kO1FBTGhCLHNCQUFzQiw0QkFBQSxFQUN0QixpQkFBaUIsdUJBQUEsRUFDakIsWUFBWSxrQkFBQSxFQUNaLFVBQVUsZ0JBQUEsRUFDVixhQUFhLG1CQUFBO0lBRWIsSUFBTSxFQUFFLEdBQUcsTUFBdUIsQ0FBQTtJQUNsQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUU7UUFDaEIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDcEIsOEJBQThCLEVBQUUsc0JBQXNCO1lBQ3RELHlCQUF5QixFQUFFLGlCQUFpQjtTQUM3QyxDQUFDLENBQUE7S0FDSDtJQUVELElBQU0sTUFBTSxHQUFHLFlBQVksSUFBSSxvQkFBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDOUQsSUFBTSxPQUFPLEdBQUcsYUFBYSxJQUFJLHNCQUFzQixDQUFBO0lBQ3ZELElBQU0sS0FBSyxHQUFHO1FBQ1osT0FBTyxFQUFFLENBQUM7UUFDVixZQUFZLEVBQUUsc0JBQXNCO1FBQ3BDLE1BQU0sRUFBRSxpQkFBaUI7S0FDMUIsQ0FBQTtJQUVELG1CQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxtQkFBbUIsRUFBRSxLQUFLLEVBQUU7UUFDcEQsT0FBTyxTQUFBO1FBQ1AsTUFBTSxRQUFBO0tBQ1AsQ0FBQyxDQUFBO0lBRUYsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtRQUMvQixzQkFBc0Isd0JBQUE7UUFDdEIsaUJBQWlCLG1CQUFBO0tBQ2xCLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFoQ0QsMENBZ0NDIn0=
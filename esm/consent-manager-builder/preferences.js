// TODO: remove duplicate cookie library from bundle
import cookies from 'js-cookie';
import topDomain from '@segment/top-domain';
import { EventEmitter } from 'events';
var DEFAULT_COOKIE_NAME = 'tracking-preferences';
var COOKIE_DEFAULT_EXPIRES = 365;
// TODO: harden against invalid cookies
// TODO: harden against different versions of cookies
export function loadPreferences(cookieName) {
    var preferences = cookies.getJSON(cookieName || DEFAULT_COOKIE_NAME);
    if (!preferences) {
        return {};
    }
    return {
        destinationPreferences: preferences.destinations,
        customPreferences: preferences.custom
    };
}
var emitter = new EventEmitter();
/**
 * Subscribes to consent preferences changing over time and returns
 * a cleanup function that can be invoked to remove the instantiated listener.
 *
 * @param listener a function to be invoked when ConsentPreferences are saved
 */
export function onPreferencesSaved(listener) {
    emitter.on('preferencesSaved', listener);
    return function () { return emitter.off('preferencesSaved', listener); };
}
export function savePreferences(_a) {
    var destinationPreferences = _a.destinationPreferences, customPreferences = _a.customPreferences, cookieDomain = _a.cookieDomain, cookieName = _a.cookieName, cookieExpires = _a.cookieExpires;
    var wd = window;
    if (wd.analytics) {
        wd.analytics.identify({
            destinationTrackingPreferences: destinationPreferences,
            customTrackingPreferences: customPreferences
        });
    }
    var domain = cookieDomain || topDomain(window.location.href);
    var expires = cookieExpires || COOKIE_DEFAULT_EXPIRES;
    var value = {
        version: 1,
        destinations: destinationPreferences,
        custom: customPreferences
    };
    cookies.set(cookieName || DEFAULT_COOKIE_NAME, value, {
        expires: expires,
        domain: domain
    });
    emitter.emit('preferencesSaved', {
        destinationPreferences: destinationPreferences,
        customPreferences: customPreferences
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVyZW5jZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uc2VudC1tYW5hZ2VyLWJ1aWxkZXIvcHJlZmVyZW5jZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0RBQW9EO0FBQ3BELE9BQU8sT0FBTyxNQUFNLFdBQVcsQ0FBQTtBQUMvQixPQUFPLFNBQVMsTUFBTSxxQkFBcUIsQ0FBQTtBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBRXJDLElBQU0sbUJBQW1CLEdBQUcsc0JBQXNCLENBQUE7QUFDbEQsSUFBTSxzQkFBc0IsR0FBRyxHQUFHLENBQUE7QUFRbEMsdUNBQXVDO0FBQ3ZDLHFEQUFxRDtBQUNyRCxNQUFNLFVBQVUsZUFBZSxDQUFDLFVBQW1CO0lBQ2pELElBQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLG1CQUFtQixDQUFDLENBQUE7SUFFdEUsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNoQixPQUFPLEVBQUUsQ0FBQTtLQUNWO0lBRUQsT0FBTztRQUNMLHNCQUFzQixFQUFFLFdBQVcsQ0FBQyxZQUFtQztRQUN2RSxpQkFBaUIsRUFBRSxXQUFXLENBQUMsTUFBNkI7S0FDN0QsQ0FBQTtBQUNILENBQUM7QUFRRCxJQUFNLE9BQU8sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFBO0FBRWxDOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUFDLFFBQXNDO0lBQ3ZFLE9BQU8sQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDeEMsT0FBTyxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsRUFBekMsQ0FBeUMsQ0FBQTtBQUN4RCxDQUFDO0FBRUQsTUFBTSxVQUFVLGVBQWUsQ0FBQyxFQU1kO1FBTGhCLHNCQUFzQiw0QkFBQSxFQUN0QixpQkFBaUIsdUJBQUEsRUFDakIsWUFBWSxrQkFBQSxFQUNaLFVBQVUsZ0JBQUEsRUFDVixhQUFhLG1CQUFBO0lBRWIsSUFBTSxFQUFFLEdBQUcsTUFBdUIsQ0FBQTtJQUNsQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUU7UUFDaEIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDcEIsOEJBQThCLEVBQUUsc0JBQXNCO1lBQ3RELHlCQUF5QixFQUFFLGlCQUFpQjtTQUM3QyxDQUFDLENBQUE7S0FDSDtJQUVELElBQU0sTUFBTSxHQUFHLFlBQVksSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM5RCxJQUFNLE9BQU8sR0FBRyxhQUFhLElBQUksc0JBQXNCLENBQUE7SUFDdkQsSUFBTSxLQUFLLEdBQUc7UUFDWixPQUFPLEVBQUUsQ0FBQztRQUNWLFlBQVksRUFBRSxzQkFBc0I7UUFDcEMsTUFBTSxFQUFFLGlCQUFpQjtLQUMxQixDQUFBO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksbUJBQW1CLEVBQUUsS0FBSyxFQUFFO1FBQ3BELE9BQU8sU0FBQTtRQUNQLE1BQU0sUUFBQTtLQUNQLENBQUMsQ0FBQTtJQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7UUFDL0Isc0JBQXNCLHdCQUFBO1FBQ3RCLGlCQUFpQixtQkFBQTtLQUNsQixDQUFDLENBQUE7QUFDSixDQUFDIn0=
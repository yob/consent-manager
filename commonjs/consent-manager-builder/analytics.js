"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getConsentMiddleware(destinationPreferences, categoryPreferences, defaultDestinationBehavior) {
    return function (_a) {
        var payload = _a.payload, next = _a.next;
        payload.obj.context.consent = {
            defaultDestinationBehavior: defaultDestinationBehavior,
            categoryPreferences: categoryPreferences,
            destinationPreferences: destinationPreferences
        };
        next(payload);
    };
}
function conditionallyLoadAnalytics(_a) {
    var writeKey = _a.writeKey, destinations = _a.destinations, destinationPreferences = _a.destinationPreferences, isConsentRequired = _a.isConsentRequired, _b = _a.shouldReload, shouldReload = _b === void 0 ? true : _b, defaultDestinationBehavior = _a.defaultDestinationBehavior, categoryPreferences = _a.categoryPreferences, integrationsAllowList = _a.integrationsAllowList;
    var wd = window;
    var integrations = { All: false, 'Segment.io': true };
    var isAnythingEnabled = false;
    if (!destinationPreferences) {
        if (isConsentRequired) {
            return;
        }
        // Load a.js normally when consent isn't required and there's no preferences
        if (!wd.analytics.initialized) {
            wd.analytics.load(writeKey);
        }
        return;
    }
    var _loop_1 = function (destination) {
        // The user may have consented to this destination, but we should also
        // confirm that this integration is permitted in this particular location
        if (integrationsAllowList && !integrationsAllowList.find(function (name) { return name === destination.id; })) {
            return "continue";
        }
        // Was a preference explicitly set on this destination?
        var explicitPreference = destination.id in destinationPreferences;
        if (!explicitPreference && defaultDestinationBehavior === 'enable') {
            integrations[destination.id] = true;
            return "continue";
        }
        var isEnabled = Boolean(destinationPreferences[destination.id]);
        if (isEnabled) {
            isAnythingEnabled = true;
        }
        integrations[destination.id] = isEnabled;
    };
    for (var _i = 0, destinations_1 = destinations; _i < destinations_1.length; _i++) {
        var destination = destinations_1[_i];
        _loop_1(destination);
    }
    // Reload the page if the trackers have already been initialised so that
    // the user's new preferences can take affect
    if (wd.analytics && wd.analytics.initialized) {
        if (shouldReload) {
            window.location.reload();
        }
        return;
    }
    // Don't load a.js at all if nothing has been enabled
    if (isAnythingEnabled) {
        var middleware = getConsentMiddleware(destinationPreferences, categoryPreferences, defaultDestinationBehavior);
        // @ts-ignore: Analytics.JS type should be updated with addSourceMiddleware
        wd.analytics.addSourceMiddleware(middleware);
        wd.analytics.load(writeKey, { integrations: integrations });
    }
}
exports.default = conditionallyLoadAnalytics;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnNlbnQtbWFuYWdlci1idWlsZGVyL2FuYWx5dGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQW1CQSxTQUFTLG9CQUFvQixDQUMzQixzQkFBc0IsRUFDdEIsbUJBQW1CLEVBQ25CLDBCQUEwQjtJQUUxQixPQUFPLFVBQUMsRUFBaUI7WUFBZixPQUFPLGFBQUEsRUFBRSxJQUFJLFVBQUE7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHO1lBQzVCLDBCQUEwQiw0QkFBQTtZQUMxQixtQkFBbUIscUJBQUE7WUFDbkIsc0JBQXNCLHdCQUFBO1NBQ3ZCLENBQUE7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDZixDQUFDLENBQUE7QUFDSCxDQUFDO0FBRUQsU0FBd0IsMEJBQTBCLENBQUMsRUFTakM7UUFSaEIsUUFBUSxjQUFBLEVBQ1IsWUFBWSxrQkFBQSxFQUNaLHNCQUFzQiw0QkFBQSxFQUN0QixpQkFBaUIsdUJBQUEsRUFDakIsb0JBQW1CLEVBQW5CLFlBQVksbUJBQUcsSUFBSSxLQUFBLEVBQ25CLDBCQUEwQixnQ0FBQSxFQUMxQixtQkFBbUIseUJBQUEsRUFDbkIscUJBQXFCLDJCQUFBO0lBRXJCLElBQU0sRUFBRSxHQUFHLE1BQXVCLENBQUE7SUFDbEMsSUFBTSxZQUFZLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQTtJQUN2RCxJQUFJLGlCQUFpQixHQUFHLEtBQUssQ0FBQTtJQUU3QixJQUFJLENBQUMsc0JBQXNCLEVBQUU7UUFDM0IsSUFBSSxpQkFBaUIsRUFBRTtZQUNyQixPQUFNO1NBQ1A7UUFFRCw0RUFBNEU7UUFDNUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFO1lBQzdCLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQzVCO1FBQ0QsT0FBTTtLQUNQOzRCQUVVLFdBQVc7UUFDcEIsc0VBQXNFO1FBQ3RFLHlFQUF5RTtRQUN6RSxJQUFJLHFCQUFxQixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxLQUFLLFdBQVcsQ0FBQyxFQUFFLEVBQXZCLENBQXVCLENBQUMsRUFBRTs7U0FFMUY7UUFFRCx1REFBdUQ7UUFDdkQsSUFBTSxrQkFBa0IsR0FBRyxXQUFXLENBQUMsRUFBRSxJQUFJLHNCQUFzQixDQUFBO1FBQ25FLElBQUksQ0FBQyxrQkFBa0IsSUFBSSwwQkFBMEIsS0FBSyxRQUFRLEVBQUU7WUFDbEUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUE7O1NBRXBDO1FBRUQsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ2pFLElBQUksU0FBUyxFQUFFO1lBQ2IsaUJBQWlCLEdBQUcsSUFBSSxDQUFBO1NBQ3pCO1FBQ0QsWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUE7O0lBbEIxQyxLQUEwQixVQUFZLEVBQVosNkJBQVksRUFBWiwwQkFBWSxFQUFaLElBQVk7UUFBakMsSUFBTSxXQUFXLHFCQUFBO2dCQUFYLFdBQVc7S0FtQnJCO0lBRUQsd0VBQXdFO0lBQ3hFLDZDQUE2QztJQUM3QyxJQUFJLEVBQUUsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUU7UUFDNUMsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtTQUN6QjtRQUNELE9BQU07S0FDUDtJQUVELHFEQUFxRDtJQUNyRCxJQUFJLGlCQUFpQixFQUFFO1FBQ3JCLElBQU0sVUFBVSxHQUFHLG9CQUFvQixDQUNyQyxzQkFBc0IsRUFDdEIsbUJBQW1CLEVBQ25CLDBCQUEwQixDQUMzQixDQUFBO1FBQ0QsMkVBQTJFO1FBQzNFLEVBQUUsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUE7UUFFNUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsWUFBWSxjQUFBLEVBQUUsQ0FBQyxDQUFBO0tBQzlDO0FBQ0gsQ0FBQztBQXBFRCw2Q0FvRUMifQ==
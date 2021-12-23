import EventEmitter from 'events';
import React from 'react';
import Banner from './banner';
import PreferenceDialog from './preference-dialog';
import CancelDialog from './cancel-dialog';
import { ADVERTISING_CATEGORIES, FUNCTIONAL_CATEGORIES } from './categories';
var emitter = new EventEmitter();
export function openDialog() {
    emitter.emit('openDialog');
}
export var CloseBehavior;
(function (CloseBehavior) {
    CloseBehavior["ACCEPT"] = "accept";
    CloseBehavior["DENY"] = "deny";
    CloseBehavior["DISMISS"] = "dismiss";
})(CloseBehavior || (CloseBehavior = {}));
function normalizeDestinations(destinations) {
    var marketingDestinations = [];
    var advertisingDestinations = [];
    var functionalDestinations = [];
    var _loop_1 = function (destination) {
        if (ADVERTISING_CATEGORIES.find(function (c) { return c === destination.category; })) {
            advertisingDestinations.push(destination);
        }
        else if (FUNCTIONAL_CATEGORIES.find(function (c) { return c === destination.category; })) {
            functionalDestinations.push(destination);
        }
        else {
            // Fallback to marketing
            marketingDestinations.push(destination);
        }
    };
    for (var _i = 0, destinations_1 = destinations; _i < destinations_1.length; _i++) {
        var destination = destinations_1[_i];
        _loop_1(destination);
    }
    return { marketingDestinations: marketingDestinations, advertisingDestinations: advertisingDestinations, functionalDestinations: functionalDestinations };
}
var Container = function (props) {
    var _a = React.useState(false || (props.workspaceAddedNewDestinations && props.defaultDestinationBehavior === 'ask')), isDialogOpen = _a[0], toggleDialog = _a[1];
    var _b = React.useState(true), showBanner = _b[0], toggleBanner = _b[1];
    var _c = React.useState(false), isCancelling = _c[0], toggleCancel = _c[1];
    var banner = React.useRef(null);
    var preferenceDialog = React.useRef(null);
    var cancelDialog = React.useRef(null);
    var _d = normalizeDestinations(props.destinations), marketingDestinations = _d.marketingDestinations, advertisingDestinations = _d.advertisingDestinations, functionalDestinations = _d.functionalDestinations;
    var onAcceptAll = function () {
        props.setPreferences(props.preferences);
        props.saveConsent();
    };
    var onDenyAll = function () {
        var falsePreferences = Object.keys(props.preferences).reduce(function (acc, category) {
            acc[category] = false;
            return acc;
        }, {});
        props.setPreferences(falsePreferences);
        return props.saveConsent();
    };
    var onClose = function () {
        if (props.closeBehavior === undefined || props.closeBehavior === CloseBehavior.DISMISS) {
            return toggleBanner(false);
        }
        if (props.closeBehavior === CloseBehavior.ACCEPT) {
            return onAcceptAll();
        }
        if (props.closeBehavior === CloseBehavior.DENY) {
            return onDenyAll();
        }
        // closeBehavior is a custom function
        var customClosePreferences = props.closeBehavior(props.preferences);
        props.setPreferences(customClosePreferences);
        props.saveConsent();
        return toggleBanner(false);
    };
    var showDialog = function () { return toggleDialog(true); };
    var handleBodyClick = function (e) {
        // Do nothing if no new implicit consent needs to be saved
        if (!props.isConsentRequired ||
            !props.implyConsentOnInteraction ||
            props.newDestinations.length === 0) {
            return;
        }
        // Ignore propogated clicks from inside the consent manager
        if ((banner.current && banner.current.contains(e.target)) ||
            (preferenceDialog.current && preferenceDialog.current.contains(e.target)) ||
            (cancelDialog.current && cancelDialog.current.contains(e.target))) {
            return;
        }
        // Accept all consent on page interaction.
        if (!isDialogOpen && props.implyConsentOnInteraction) {
            onAcceptAll();
        }
    };
    React.useEffect(function () {
        emitter.on('openDialog', showDialog);
        if (props.isConsentRequired && props.implyConsentOnInteraction) {
            document.body.addEventListener('click', handleBodyClick, false);
        }
        return function () {
            emitter.removeListener('openDialog', showDialog);
            document.body.removeEventListener('click', handleBodyClick, false);
        };
    });
    React.useEffect(function () {
        if (isDialogOpen) {
            props.resetPreferences();
        }
    }, [isDialogOpen]);
    var handleCategoryChange = function (category, value) {
        var _a;
        props.setPreferences((_a = {},
            _a[category] = value,
            _a));
    };
    var handleSave = function () {
        toggleDialog(false);
        props.saveConsent();
    };
    var handleCancel = function () {
        // Only show the cancel confirmation if there's unconsented destinations
        if (props.newDestinations.length > 0) {
            toggleCancel(true);
        }
        else {
            toggleDialog(false);
            props.resetPreferences();
        }
    };
    var handleCancelBack = function () {
        toggleCancel(false);
    };
    var handleCancelConfirm = function () {
        toggleCancel(false);
        toggleDialog(false);
        props.resetPreferences();
    };
    return (React.createElement("div", null,
        showBanner && props.isConsentRequired && props.newDestinations.length > 0 && (React.createElement(Banner, { innerRef: function (current) { return (banner = { current: current }); }, onClose: onClose, onChangePreferences: function () { return toggleDialog(true); }, content: props.bannerContent, subContent: props.bannerSubContent, actionsBlock: props.bannerActionsBlock, textColor: props.bannerTextColor, backgroundColor: props.bannerBackgroundColor, onAcceptAll: onAcceptAll, onDenyAll: onDenyAll, hideCloseButton: props.bannerHideCloseButton, asModal: props.bannerAsModal })),
        isDialogOpen && (React.createElement(PreferenceDialog, { customCategories: props.customCategories, destinations: props.destinations, preferences: props.preferences, innerRef: function (current) { return (preferenceDialog = { current: current }); }, onCancel: handleCancel, onSave: handleSave, onChange: handleCategoryChange, marketingDestinations: marketingDestinations, advertisingDestinations: advertisingDestinations, functionalDestinations: functionalDestinations, marketingAndAnalytics: props.preferences.marketingAndAnalytics, advertising: props.preferences.advertising, functional: props.preferences.functional, title: props.preferencesDialogTitle, content: props.preferencesDialogContent, preferencesDialogTemplate: props.preferencesDialogTemplate })),
        isCancelling && (React.createElement(CancelDialog, { innerRef: function (current) { return (cancelDialog = { current: current }); }, onBack: handleCancelBack, onConfirm: handleCancelConfirm, title: props.cancelDialogTitle, content: props.cancelDialogContent, preferencesDialogTemplate: props.preferencesDialogTemplate }))));
};
export default Container;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnNlbnQtbWFuYWdlci9jb250YWluZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLFFBQVEsQ0FBQTtBQUNqQyxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUE7QUFDekIsT0FBTyxNQUFNLE1BQU0sVUFBVSxDQUFBO0FBQzdCLE9BQU8sZ0JBQWdCLE1BQU0scUJBQXFCLENBQUE7QUFDbEQsT0FBTyxZQUFZLE1BQU0saUJBQWlCLENBQUE7QUFDMUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sY0FBYyxDQUFBO0FBVTVFLElBQU0sT0FBTyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUE7QUFDbEMsTUFBTSxVQUFVLFVBQVU7SUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUM1QixDQUFDO0FBRUQsTUFBTSxDQUFOLElBQVksYUFJWDtBQUpELFdBQVksYUFBYTtJQUN2QixrQ0FBaUIsQ0FBQTtJQUNqQiw4QkFBYSxDQUFBO0lBQ2Isb0NBQW1CLENBQUE7QUFDckIsQ0FBQyxFQUpXLGFBQWEsS0FBYixhQUFhLFFBSXhCO0FBa0NELFNBQVMscUJBQXFCLENBQUMsWUFBMkI7SUFDeEQsSUFBTSxxQkFBcUIsR0FBa0IsRUFBRSxDQUFBO0lBQy9DLElBQU0sdUJBQXVCLEdBQWtCLEVBQUUsQ0FBQTtJQUNqRCxJQUFNLHNCQUFzQixHQUFrQixFQUFFLENBQUE7NEJBRXJDLFdBQVc7UUFDcEIsSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssV0FBVyxDQUFDLFFBQVEsRUFBMUIsQ0FBMEIsQ0FBQyxFQUFFO1lBQ2hFLHVCQUF1QixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtTQUMxQzthQUFNLElBQUkscUJBQXFCLENBQUMs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
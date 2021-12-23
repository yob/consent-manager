"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseBehavior = exports.openDialog = void 0;
var events_1 = __importDefault(require("events"));
var react_1 = __importDefault(require("react"));
var banner_1 = __importDefault(require("./banner"));
var preference_dialog_1 = __importDefault(require("./preference-dialog"));
var cancel_dialog_1 = __importDefault(require("./cancel-dialog"));
var categories_1 = require("./categories");
var emitter = new events_1.default();
function openDialog() {
    emitter.emit('openDialog');
}
exports.openDialog = openDialog;
var CloseBehavior;
(function (CloseBehavior) {
    CloseBehavior["ACCEPT"] = "accept";
    CloseBehavior["DENY"] = "deny";
    CloseBehavior["DISMISS"] = "dismiss";
})(CloseBehavior = exports.CloseBehavior || (exports.CloseBehavior = {}));
function normalizeDestinations(destinations) {
    var marketingDestinations = [];
    var advertisingDestinations = [];
    var functionalDestinations = [];
    var _loop_1 = function (destination) {
        if (categories_1.ADVERTISING_CATEGORIES.find(function (c) { return c === destination.category; })) {
            advertisingDestinations.push(destination);
        }
        else if (categories_1.FUNCTIONAL_CATEGORIES.find(function (c) { return c === destination.category; })) {
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
    var _a = react_1.default.useState(false || (props.workspaceAddedNewDestinations && props.defaultDestinationBehavior === 'ask')), isDialogOpen = _a[0], toggleDialog = _a[1];
    var _b = react_1.default.useState(true), showBanner = _b[0], toggleBanner = _b[1];
    var _c = react_1.default.useState(false), isCancelling = _c[0], toggleCancel = _c[1];
    var banner = react_1.default.useRef(null);
    var preferenceDialog = react_1.default.useRef(null);
    var cancelDialog = react_1.default.useRef(null);
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
    react_1.default.useEffect(function () {
        emitter.on('openDialog', showDialog);
        if (props.isConsentRequired && props.implyConsentOnInteraction) {
            document.body.addEventListener('click', handleBodyClick, false);
        }
        return function () {
            emitter.removeListener('openDialog', showDialog);
            document.body.removeEventListener('click', handleBodyClick, false);
        };
    });
    react_1.default.useEffect(function () {
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
    return (react_1.default.createElement("div", null,
        showBanner && props.isConsentRequired && props.newDestinations.length > 0 && (react_1.default.createElement(banner_1.default, { innerRef: function (current) { return (banner = { current: current }); }, onClose: onClose, onChangePreferences: function () { return toggleDialog(true); }, content: props.bannerContent, subContent: props.bannerSubContent, actionsBlock: props.bannerActionsBlock, textColor: props.bannerTextColor, backgroundColor: props.bannerBackgroundColor, onAcceptAll: onAcceptAll, onDenyAll: onDenyAll, hideCloseButton: props.bannerHideCloseButton, asModal: props.bannerAsModal })),
        isDialogOpen && (react_1.default.createElement(preference_dialog_1.default, { customCategories: props.customCategories, destinations: props.destinations, preferences: props.preferences, innerRef: function (current) { return (preferenceDialog = { current: current }); }, onCancel: handleCancel, onSave: handleSave, onChange: handleCategoryChange, marketingDestinations: marketingDestinations, advertisingDestinations: advertisingDestinations, functionalDestinations: functionalDestinations, marketingAndAnalytics: props.preferences.marketingAndAnalytics, advertising: props.preferences.advertising, functional: props.preferences.functional, title: props.preferencesDialogTitle, content: props.preferencesDialogContent, preferencesDialogTemplate: props.preferencesDialogTemplate })),
        isCancelling && (react_1.default.createElement(cancel_dialog_1.default, { innerRef: function (current) { return (cancelDialog = { current: current }); }, onBack: handleCancelBack, onConfirm: handleCancelConfirm, title: props.cancelDialogTitle, content: props.cancelDialogContent, preferencesDialogTemplate: props.preferencesDialogTemplate }))));
};
exports.default = Container;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnNlbnQtbWFuYWdlci9jb250YWluZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUFpQztBQUNqQyxnREFBeUI7QUFDekIsb0RBQTZCO0FBQzdCLDBFQUFrRDtBQUNsRCxrRUFBMEM7QUFDMUMsMkNBQTRFO0FBVTVFLElBQU0sT0FBTyxHQUFHLElBQUksZ0JBQVksRUFBRSxDQUFBO0FBQ2xDLFNBQWdCLFVBQVU7SUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUM1QixDQUFDO0FBRkQsZ0NBRUM7QUFFRCxJQUFZLGFBSVg7QUFKRCxXQUFZLGFBQWE7SUFDdkIsa0NBQWlCLENBQUE7SUFDakIsOEJBQWEsQ0FBQTtJQUNiLG9DQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFKVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQUl4QjtBQWtDRCxTQUFTLHFCQUFxQixDQUFDLFlBQTJCO0lBQ3hELElBQU0scUJBQXFCLEdBQWtCLEVBQUUsQ0FBQTtJQUMvQyxJQUFNLHVCQUF1QixHQUFrQixFQUFFLENBQUE7SUFDakQsSUFBTSxzQkFBc0IsR0FBa0IsRUFBRSxDQUFBOzRCQUVyQyxXQUFXO1FBQ3BCLElBQUksbUNBQXNCLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxRQUFRLEVBQTFCLENBQTBCLENBQUMsRUFBRTtZQUNoRSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7U0FDMUM7YUFBTSxJQUFJLGtDQUFxQixDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsS0FBSyxXQUFXLENBQUMsUUFBUSxFQUExQixDQUEwQixDQUFDLEVBQUU7WUFDdEUsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1NB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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import React, { PureComponent } from 'react';
import ConsentManagerBuilder from '../consent-manager-builder';
import Container from './container';
import { ADVERTISING_CATEGORIES, FUNCTIONAL_CATEGORIES } from './categories';
var zeroValuePreferences = {
    marketingAndAnalytics: null,
    advertising: null,
    functional: null
};
var defaultPreferencesDialogTemplate = {
    headings: {
        allowValue: 'Allow',
        categoryValue: 'Category',
        purposeValue: 'Purpose',
        toolsValue: 'Tools'
    },
    checkboxes: {
        noValue: 'No',
        yesValue: 'Yes'
    },
    actionButtons: {
        cancelValue: 'Cancel',
        saveValue: 'Save'
    },
    cancelDialogButtons: {
        cancelValue: 'Yes, Cancel',
        backValue: 'Go Back'
    },
    categories: [
        {
            key: 'functional',
            name: 'Functional',
            description: 'To monitor the performance of our site and to enhance your browsing experience.',
            example: 'For example, these tools enable you to communicate with us via live chat.'
        },
        {
            key: 'marketing',
            name: 'Marketing and Analytics',
            description: 'To understand user behavior in order to provide you with a more relevant browsing experience or personalize the content on our site.',
            example: 'For example, we collect information about which pages you visit to help us present more relevant information.'
        },
        {
            key: 'advertising',
            name: 'Advertising',
            description: 'To personalize and measure the effectiveness of advertising on our site and other websites.',
            example: 'For example, we may serve you a personalized ad based on the pages you visit on our site.'
        },
        {
            key: 'essential',
            name: 'Essential',
            description: 'We use browser cookies that are necessary for the site to work as intended.',
            example: 'For example, we store your website data collection preferences so we can honor them if you return to our site. You can disable these cookies in your browser settings but if you do the site may not work as intended.'
        }
    ]
};
var ConsentManager = /** @class */ (function (_super) {
    __extends(ConsentManager, _super);
    function ConsentManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mergeTemplates = function (newProps, defaultPreferencesDialogTemplate) {
            var headingsMerge = __assign(__assign({}, defaultPreferencesDialogTemplate.headings), newProps.headings);
            var checkboxesMerge = __assign(__assign({}, defaultPreferencesDialogTemplate.checkboxes), newProps.checkboxes);
            var actionButtonsMerge = __assign(__assign({}, defaultPreferencesDialogTemplate.actionButtons), newProps.actionButtons);
            var cancelDialogButtonsMerge = __assign(__assign({}, defaultPreferencesDialogTemplate.cancelDialogButtons), newProps.cancelDialogButtons);
            var categoriesMerge = defaultPreferencesDialogTemplate === null || defaultPreferencesDialogTemplate === void 0 ? void 0 : defaultPreferencesDialogTemplate.categories.map(function (category) {
                var _a;
                return (__assign(__assign({}, category), (_a = newProps === null || newProps === void 0 ? void 0 : newProps.categories) === null || _a === void 0 ? void 0 : _a.find(function (c) { return c.key === category.key; })));
            });
            return {
                headings: headingsMerge,
                checkboxes: checkboxesMerge,
                actionButtons: actionButtonsMerge,
                cancelDialogButtons: cancelDialogButtonsMerge,
                categories: categoriesMerge
            };
        };
        _this.getInitialPreferences = function () {
            var _a = _this.props, initialPreferences = _a.initialPreferences, customCategories = _a.customCategories;
            if (initialPreferences) {
                return initialPreferences;
            }
            if (!customCategories) {
                return zeroValuePreferences;
            }
            var initialCustomPreferences = {};
            Object.keys(customCategories).forEach(function (category) {
                initialCustomPreferences[category] = null;
            });
            return initialCustomPreferences;
        };
        _this.handleMapCustomPreferences = function (destinations, preferences) {
            var customCategories = _this.props.customCategories;
            var destinationPreferences = {};
            var customPreferences = {};
            if (customCategories) {
                for (var _i = 0, _a = Object.keys(customCategories); _i < _a.length; _i++) {
                    var preferenceName = _a[_i];
                    var value = preferences[preferenceName];
                    if (typeof value === 'boolean') {
                        customPreferences[preferenceName] = value;
                    }
                    else {
                        customPreferences[preferenceName] = true;
                    }
                }
                destinations.forEach(function (destination) {
                    // Mark custom categories
                    Object.entries(customCategories).forEach(function (_a) {
                        var categoryName = _a[0], integrations = _a[1].integrations;
                        var consentAlreadySetToFalse = destinationPreferences[destination.id] === false;
                        var shouldSetConsent = integrations.includes(destination.id);
                        if (shouldSetConsent && !consentAlreadySetToFalse) {
                            destinationPreferences[destination.id] = customPreferences[categoryName];
                        }
                    });
                });
                return { destinationPreferences: destinationPreferences, customPreferences: customPreferences };
            }
            // Default unset preferences to true (for implicit consent)
            for (var _b = 0, _c = Object.keys(preferences); _b < _c.length; _b++) {
                var preferenceName = _c[_b];
                var value = preferences[preferenceName];
                if (typeof value === 'boolean') {
                    customPreferences[preferenceName] = value;
                }
                else {
                    customPreferences[preferenceName] = true;
                }
            }
            var customPrefs = customPreferences;
            var _loop_1 = function (destination) {
                // Mark advertising destinations
                if (ADVERTISING_CATEGORIES.find(function (c) { return c === destination.category; }) &&
                    destinationPreferences[destination.id] !== false) {
                    destinationPreferences[destination.id] = customPrefs.advertising;
                }
                // Mark function destinations
                if (FUNCTIONAL_CATEGORIES.find(function (c) { return c === destination.category; }) &&
                    destinationPreferences[destination.id] !== false) {
                    destinationPreferences[destination.id] = customPrefs.functional;
                }
                // Fallback to marketing
                if (!(destination.id in destinationPreferences)) {
                    destinationPreferences[destination.id] = customPrefs.marketingAndAnalytics;
                }
            };
            for (var _d = 0, destinations_1 = destinations; _d < destinations_1.length; _d++) {
                var destination = destinations_1[_d];
                _loop_1(destination);
            }
            return { destinationPreferences: destinationPreferences, customPreferences: customPreferences };
        };
        return _this;
    }
    ConsentManager.prototype.render = function () {
        var _this = this;
        var _a = this.props, writeKey = _a.writeKey, otherWriteKeys = _a.otherWriteKeys, integrationsAllowList = _a.integrationsAllowList, shouldRequireConsent = _a.shouldRequireConsent, implyConsentOnInteraction = _a.implyConsentOnInteraction, cookieDomain = _a.cookieDomain, cookieName = _a.cookieName, cookieExpires = _a.cookieExpires, bannerContent = _a.bannerContent, bannerActionsBlock = _a.bannerActionsBlock, bannerSubContent = _a.bannerSubContent, bannerTextColor = _a.bannerTextColor, bannerBackgroundColor = _a.bannerBackgroundColor, bannerHideCloseButton = _a.bannerHideCloseButton, bannerAsModal = _a.bannerAsModal, preferencesDialogTitle = _a.preferencesDialogTitle, preferencesDialogContent = _a.preferencesDialogContent, cancelDialogTitle = _a.cancelDialogTitle, cancelDialogContent = _a.cancelDialogContent, customCategories = _a.customCategories, defaultDestinationBehavior = _a.defaultDestinationBehavior, cdnHost = _a.cdnHost, preferencesDialogTemplate = _a.preferencesDialogTemplate, onError = _a.onError;
        return (React.createElement(ConsentManagerBuilder, { onError: onError, writeKey: writeKey, otherWriteKeys: otherWriteKeys, integrationsAllowList: integrationsAllowList, shouldRequireConsent: shouldRequireConsent, cookieDomain: cookieDomain, cookieName: cookieName, cookieExpires: cookieExpires, initialPreferences: this.getInitialPreferences(), mapCustomPreferences: this.handleMapCustomPreferences, customCategories: customCategories, defaultDestinationBehavior: defaultDestinationBehavior, cdnHost: cdnHost }, function (_a) {
            var destinations = _a.destinations, customCategories = _a.customCategories, newDestinations = _a.newDestinations, preferences = _a.preferences, isConsentRequired = _a.isConsentRequired, setPreferences = _a.setPreferences, resetPreferences = _a.resetPreferences, saveConsent = _a.saveConsent, havePreferencesChanged = _a.havePreferencesChanged, workspaceAddedNewDestinations = _a.workspaceAddedNewDestinations;
            return (React.createElement(Container, { customCategories: customCategories, destinations: destinations, newDestinations: newDestinations, preferences: preferences, isConsentRequired: isConsentRequired, setPreferences: setPreferences, resetPreferences: resetPreferences, saveConsent: saveConsent, closeBehavior: _this.props.closeBehavior, implyConsentOnInteraction: implyConsentOnInteraction !== null && implyConsentOnInteraction !== void 0 ? implyConsentOnInteraction : ConsentManager.defaultProps.implyConsentOnInteraction, bannerContent: bannerContent, bannerSubContent: bannerSubContent, bannerActionsBlock: bannerActionsBlock, bannerHideCloseButton: bannerHideCloseButton, bannerTextColor: bannerTextColor || ConsentManager.defaultProps.bannerTextColor, bannerBackgroundColor: bannerBackgroundColor || ConsentManager.defaultProps.bannerBackgroundColor, bannerAsModal: bannerAsModal, preferencesDialogTitle: preferencesDialogTitle, preferencesDialogContent: preferencesDialogContent, cancelDialogTitle: cancelDialogTitle, cancelDialogContent: cancelDialogContent, havePreferencesChanged: havePreferencesChanged, defaultDestinationBehavior: defaultDestinationBehavior, workspaceAddedNewDestinations: workspaceAddedNewDestinations, preferencesDialogTemplate: preferencesDialogTemplate
                    ? _this.mergeTemplates(preferencesDialogTemplate, defaultPreferencesDialogTemplate)
                    : ConsentManager.defaultProps.preferencesDialogTemplate }));
        }));
    };
    ConsentManager.displayName = 'ConsentManager';
    ConsentManager.defaultProps = {
        otherWriteKeys: [],
        shouldRequireConsent: function () { return true; },
        implyConsentOnInteraction: false,
        onError: undefined,
        cookieDomain: undefined,
        cookieName: undefined,
        cookieExpires: undefined,
        customCategories: undefined,
        bannerActionsBlock: undefined,
        bannerHideCloseButton: false,
        bannerTextColor: '#fff',
        bannerSubContent: 'You can change your preferences at any time.',
        bannerBackgroundColor: '#1f4160',
        preferencesDialogTitle: 'Website Data Collection Preferences',
        cancelDialogTitle: 'Are you sure you want to cancel?',
        defaultDestinationBehavior: 'disable',
        preferencesDialogTemplate: defaultPreferencesDialogTemplate
    };
    return ConsentManager;
}(PureComponent));
export default ConsentManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uc2VudC1tYW5hZ2VyL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssRUFBRSxFQUFFLGFBQWEsRUFBRSxNQUFNLE9BQU8sQ0FBQTtBQUM1QyxPQUFPLHFCQUFxQixNQUFNLDRCQUE0QixDQUFBO0FBQzlELE9BQU8sU0FBUyxNQUFNLGFBQWEsQ0FBQTtBQUNuQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFRNUUsSUFBTSxvQkFBb0IsR0FBd0I7SUFDaEQscUJBQXFCLEVBQUUsSUFBSTtJQUMzQixXQUFXLEVBQUUsSUFBSTtJQUNqQixVQUFVLEVBQUUsSUFBSTtDQUNqQixDQUFBO0FBRUQsSUFBTSxnQ0FBZ0MsR0FBNkI7SUFDakUsUUFBUSxFQUFFO1FBQ1IsVUFBVSxFQUFFLE9BQU87UUFDbkIsYUFBYSxFQUFFLFVBQVU7UUFDekIsWUFBWSxFQUFFLFNBQVM7UUFDdkIsVUFBVSxFQUFFLE9BQU87S0FDcEI7SUFDRCxVQUFVLEVBQUU7UUFDVixPQUFPLEVBQUUsSUFBSTtRQUNiLFFBQVEsRUFBRSxLQUFLO0tBQ2hCO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsV0FBVyxFQUFFLFFBQVE7UUFDckIsU0FBUyxFQUFFLE1BQU07S0FDbEI7SUFDRCxtQkFBbUIsRUFBRTtRQUNuQixXQUFXLEVBQUUsYUFBYTtRQUMxQixTQUFTLEVBQUUsU0FBUztLQUNyQjtJQUNELFVBQVUsRUFBRTtRQUNWO1lBQ0UsR0FBRyxFQUFFLFlBQVk7WUFDakIsSUFBSSxFQUFFLFlBQVk7WUFDbEIsV0FBVyxFQUNULGlGQUFpRjtZQUNuRixPQUFPLEVBQUUsMkVBQTJFO1NBQ3JGO1FBQ0Q7WUFDRSxHQUFHLEVBQUUsV0FBVztZQUNoQixJQUFJLEVBQUUseUJBQXlCO1lBQy9CLFdB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
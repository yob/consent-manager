"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var enzyme_1 = require("enzyme");
var nock_1 = __importDefault(require("nock"));
var sinon_1 = __importDefault(require("sinon"));
var consent_manager_builder_1 = __importDefault(require("../../consent-manager-builder"));
var categories_1 = require("../../consent-manager/categories");
describe('ConsentManagerBuilder', function () {
    beforeEach(function () {
        document = {};
        window = {};
    });
    test.todo('doesn՚t load analytics.js when consent is required');
    test('provides a list of enabled destinations', function (done) {
        nock_1.default('https://cdn.segment.com')
            .get('/v1/projects/123/integrations')
            .reply(200, [
            {
                name: 'Google Analytics',
                creationName: 'Google Analytics'
            },
            {
                name: 'Amplitude',
                creationName: 'Amplitude'
            }
        ])
            .get('/v1/projects/abc/integrations')
            .reply(200, [
            {
                name: 'FullStory',
                creationName: 'FullStory'
            }
        ]);
        enzyme_1.shallow(react_1.default.createElement(consent_manager_builder_1.default, { writeKey: "123", otherWriteKeys: ['abc'] }, function (_a) {
            var destinations = _a.destinations;
            expect(destinations).toMatchObject([
                {
                    id: 'Amplitude',
                    name: 'Amplitude'
                },
                {
                    id: 'FullStory',
                    name: 'FullStory'
                },
                {
                    id: 'Google Analytics',
                    name: 'Google Analytics'
                }
            ]);
            done();
        }));
    });
    test('provides a list of newly added destinations', function (done) {
        document.cookie =
            'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}}';
        window.analytics = { load: function () { }, track: function () { }, addSourceMiddleware: function () { } };
        nock_1.default('https://cdn.segment.com')
            .get('/v1/projects/123/integrations')
            .reply(200, [
            {
                name: 'Google Analytics',
                creationName: 'Google Analytics'
            },
            {
                name: 'Amplitude',
                creationName: 'Amplitude'
            }
        ]);
        enzyme_1.shallow(react_1.default.createElement(consent_manager_builder_1.default, { writeKey: "123" }, function (_a) {
            var newDestinations = _a.newDestinations;
            expect(newDestinations).toMatchObject([
                {
                    name: 'Google Analytics',
                    id: 'Google Analytics'
                }
            ]);
            done();
        }));
    });
    test('loads analytics.js with the user՚s preferences', function (done) {
        var ajsLoad = sinon_1.default.spy();
        document.cookie =
            'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}}';
        window.analytics = { load: ajsLoad, track: function () { }, addSourceMiddleware: function () { } };
        var writeKey = '123';
        nock_1.default('https://cdn.segment.com')
            .get('/v1/projects/123/integrations')
            .reply(200, [
            {
                name: 'Amplitude',
                creationName: 'Amplitude'
            }
        ]);
        enzyme_1.shallow(react_1.default.createElement(consent_manager_builder_1.default, { writeKey: writeKey }, function () {
            expect(ajsLoad.calledOnce).toBe(true);
            expect(ajsLoad.args[0][0]).toBe(writeKey);
            expect(ajsLoad.args[0][1]).toMatchObject({
                integrations: {
                    All: false,
                    Amplitude: true,
                    'Segment.io': true
                }
            });
            done();
        }));
    });
    test('provides an object containing the WIP preferences', function (done) {
        document.cookie =
            'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}}';
        window.analytics = { load: function () { }, track: function () { }, addSourceMiddleware: function () { }, addSourceMiddleware: function () { } };
        nock_1.default('https://cdn.segment.com')
            .get('/v1/projects/123/integrations')
            .reply(200, [
            {
                name: 'Amplitude',
                creationName: 'Amplitude'
            }
        ]);
        enzyme_1.shallow(react_1.default.createElement(consent_manager_builder_1.default, { writeKey: "123" }, function (_a) {
            var preferences = _a.preferences;
            expect(preferences).toMatchObject({
                Amplitude: true
            });
            done();
        }));
    });
    test('does not imply consent on interacation', function (done) {
        nock_1.default('https://cdn.segment.com')
            .get('/v1/projects/123/integrations')
            .reply(200, [
            {
                name: 'Amplitude',
                creationName: 'Amplitude'
            }
        ]);
        enzyme_1.shallow(react_1.default.createElement(consent_manager_builder_1.default, { writeKey: "123" }, function (_a) {
            var preferences = _a.preferences;
            expect(preferences).toMatchObject({});
            done();
        }));
    });
    test('if defaultDestinationBehavior is set to imply and category is set to true, loads new destination', function (done) {
        document.cookie =
            'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}%2C%22custom%22:{%22advertising%22:false%2C%22marketingAndAnalytics%22:true%2C%22functional%22:true}}';
        window.analytics = { load: function () { }, identify: function () { }, track: function () { }, addSourceMiddleware: function () { } };
        nock_1.default('https://cdn.segment.com')
            .get('/v1/projects/123/integrations')
            .reply(200, [
            {
                name: 'Google Analytics',
                creationName: 'Google Analytics'
            },
            {
                name: 'Amplitude',
                creationName: 'Amplitude'
            }
        ]);
        enzyme_1.shallow(react_1.default.createElement(consent_manager_builder_1.default, { defaultDestinationBehavior: "imply", writeKey: "123", mapCustomPreferences: function (destinations, preferences) {
                var destinationPreferences = {};
                var customPreferences = {};
                // Default unset preferences to true (for implicit consent)
                for (var _i = 0, _a = Object.keys(preferences); _i < _a.length; _i++) {
                    var preferenceName = _a[_i];
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
                    if (categories_1.ADVERTISING_CATEGORIES.find(function (c) { return c === destination.category; }) &&
                        destinationPreferences[destination.id] !== false) {
                        destinationPreferences[destination.id] = customPrefs.advertising;
                    }
                    // Mark function destinations
                    if (categories_1.FUNCTIONAL_CATEGORIES.find(function (c) { return c === destination.category; }) &&
                        destinationPreferences[destination.id] !== false) {
                        destinationPreferences[destination.id] = customPrefs.functional;
                    }
                    // Fallback to marketing
                    if (!(destination.id in destinationPreferences)) {
                        destinationPreferences[destination.id] = customPrefs.marketingAndAnalytics;
                    }
                };
                for (var _b = 0, destinations_1 = destinations; _b < destinations_1.length; _b++) {
                    var destination = destinations_1[_b];
                    _loop_1(destination);
                }
                return { destinationPreferences: destinationPreferences, customPreferences: customPreferences };
            } }, function (_a) {
            var destinationPreferences = _a.destinationPreferences;
            expect(destinationPreferences).toMatchObject({
                Amplitude: true,
                'Google Analytics': true
            });
            done();
        }));
    });
    test('if defaultDestinationBehavior is set to imply and category is set to false, does not load new destination', function (done) {
        document.cookie =
            'tracking-preferences={%22version%22:1%2C%22destinations%22:{%22Amplitude%22:true}%2C%22custom%22:{%22advertising%22:false%2C%22marketingAndAnalytics%22:false%2C%22functional%22:true}}';
        window.analytics = {
            load: function () { },
            identify: function () { },
            track: function () { },
            addSourceMiddleware: function () { }
        };
        nock_1.default('https://cdn.segment.com')
            .get('/v1/projects/123/integrations')
            .reply(200, [
            {
                name: 'Google Analytics',
                creationName: 'Google Analytics'
            },
            {
                name: 'Amplitude',
                creationName: 'Amplitude'
            }
        ]);
        enzyme_1.shallow(react_1.default.createElement(consent_manager_builder_1.default, { defaultDestinationBehavior: "imply", writeKey: "123", mapCustomPreferences: function (destinations, preferences) {
                var destinationPreferences = {};
                var customPreferences = {};
                // Default unset preferences to true (for implicit consent)
                for (var _i = 0, _a = Object.keys(preferences); _i < _a.length; _i++) {
                    var preferenceName = _a[_i];
                    var value = preferences[preferenceName];
                    if (typeof value === 'boolean') {
                        customPreferences[preferenceName] = value;
                    }
                    else {
                        customPreferences[preferenceName] = true;
                    }
                }
                var customPrefs = customPreferences;
                var _loop_2 = function (destination) {
                    // Mark advertising destinations
                    if (categories_1.ADVERTISING_CATEGORIES.find(function (c) { return c === destination.category; }) &&
                        destinationPreferences[destination.id] !== false) {
                        destinationPreferences[destination.id] = customPrefs.advertising;
                    }
                    // Mark function destinations
                    if (categories_1.FUNCTIONAL_CATEGORIES.find(function (c) { return c === destination.category; }) &&
                        destinationPreferences[destination.id] !== false) {
                        destinationPreferences[destination.id] = customPrefs.functional;
                    }
                    // Fallback to marketing
                    if (!(destination.id in destinationPreferences)) {
                        destinationPreferences[destination.id] = customPrefs.marketingAndAnalytics;
                    }
                };
                for (var _b = 0, destinations_2 = destinations; _b < destinations_2.length; _b++) {
                    var destination = destinations_2[_b];
                    _loop_2(destination);
                }
                return { destinationPreferences: destinationPreferences, customPreferences: customPreferences };
            } }, function (_a) {
            var destinationPreferences = _a.destinationPreferences;
            expect(destinationPreferences).toMatchObject({
                Amplitude: false,
                'Google Analytics': false
            });
            done();
        }));
    });
    test('a different cdn is used when cdnHost is set', function (done) {
        nock_1.default('https://foo.bar.com')
            .get('/v1/projects/123/integrations')
            .reply(200, [
            {
                name: 'Google Analytics',
                creationName: 'Google Analytics'
            },
            {
                name: 'Amplitude',
                creationName: 'Amplitude'
            }
        ])
            .get('/v1/projects/abc/integrations')
            .reply(200, [
            {
                name: 'FullStory',
                creationName: 'FullStory'
            }
        ]);
        enzyme_1.shallow(react_1.default.createElement(consent_manager_builder_1.default, { writeKey: "123", otherWriteKeys: ['abc'], cdnHost: "foo.bar.com" }, function (_a) {
            var destinations = _a.destinations;
            expect(destinations).toMatchObject([
                {
                    id: 'Amplitude',
                    name: 'Amplitude'
                },
                {
                    id: 'FullStory',
                    name: 'FullStory'
                },
                {
                    id: 'Google Analytics',
                    name: 'Google Analytics'
                }
            ]);
            done();
        }));
    });
    test.todo('loads analytics.js normally when consent isn՚t required');
    test.todo('still applies preferences when consent isn՚t required');
    test.todo('provides a setPreferences() function for setting the preferences');
    test.todo('setPreferences() function can be passed a boolean to set all preferences');
    test.todo('provides a resetPreferences() function for resetting the preferences');
    test.todo('provides a saveConsent() function for persisting the preferences and loading analytics.js');
    test.todo('saveConsent() can be passed additional preferences to persist');
    test.todo('saveConsent() can be passed a boolean to set all preferences');
    test.todo('saveConsent() fills in missing preferences');
    test.todo('initialPreferences sets the initial preferences');
    test.todo('loads custom preferences');
    test.todo('saveConsent() maps custom preferences to destination preferences');
    test.todo('mapCustomPreferences allows customPreferences to be updated');
    test.todo('saveConsent() saves custom preferences');
    test.todo('cookieDomain sets the cookie domain');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudG9kby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9fX3Rlc3RzX18vY29uc2VudC1tYW5hZ2VyLWJ1aWxkZXIvaW5kZXgudG9kby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUF5QjtBQUN6QixpQ0FBZ0M7QUFDaEMsOENBQXVCO0FBQ3ZCLGdEQUF5QjtBQUN6QiwwRkFBaUU7QUFDakUsK0RBQWdHO0FBRWhHLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtJQUNoQyxVQUFVLENBQUM7UUFDVCxRQUFRLEdBQUcsRUFBRSxDQUFBO1FBQ2IsTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNiLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxvREFBb0QsQ0FBQyxDQUFBO0lBRS9ELElBQUksQ0FBQyx5Q0FBeUMsRUFBRSxVQUFBLElBQUk7UUFDbEQsY0FBSSxDQUFDLHlCQUF5QixDQUFDO2FBQzVCLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQzthQUNwQyxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ1Y7Z0JBQ0UsSUFBSSxFQUFFLGtCQUFrQjtnQkFDeEIsWUFBWSxFQUFFLGtCQUFrQjthQUNqQztZQUNEO2dCQUNFLElBQUksRUFBRSxXQUFXO2dCQUNqQixZQUFZLEVBQUUsV0FBVzthQUMxQjtTQUNGLENBQUM7YUFDRCxHQUFHLENBQUMsK0JBQStCLENBQUM7YUFDcEMsS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNWO2dCQUNFLElBQUksRUFBRSxXQUFXO2dCQUNqQixZQUFZLEVBQUUsV0FBVzthQUMxQjtTQUNGLENBQUMsQ0FBQTtRQUVKLGdCQUFPLENBQ0wsOEJBQUMsaUNBQXFCLElBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxjQUFjLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFDMUQsVUFBQyxFQUFnQjtnQkFBZCxZQUFZLGtCQUFBO1lBQ2QsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLGFBQWEs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
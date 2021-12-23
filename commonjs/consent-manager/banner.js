"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_emotion_1 = __importDefault(require("react-emotion"));
var font_styles_1 = __importDefault(require("./font-styles"));
var buttons_1 = require("./buttons");
var Overlay = react_emotion_1.default('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: #fff;\n  opacity: 0.8;\n"], ["\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: #fff;\n  opacity: 0.8;\n"])));
var Centered = react_emotion_1.default('div')(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  max-width: 500px;\n  @media (max-width: 767px) {\n    width: 80vw;\n  }\n"], ["\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  max-width: 500px;\n  @media (max-width: 767px) {\n    width: 80vw;\n  }\n"])));
var RootCentered = react_emotion_1.default('div')(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  ", ";\n  position: relative;\n  max-width: 500px;\n  padding: 18px;\n  padding-right: ", ";\n  background: ", ";\n  color: ", ";\n  text-align: center;\n  font-size: 14px;\n  line-height: 1.3;\n"], ["\n  ", ";\n  position: relative;\n  max-width: 500px;\n  padding: 18px;\n  padding-right: ", ";\n  background: ", ";\n  color: ", ";\n  text-align: center;\n  font-size: 14px;\n  line-height: 1.3;\n"])), font_styles_1.default, function (props) { return (props.hideCloseButton ? '18px' : '40px'); }, function (props) { return props.backgroundColor; }, function (props) { return props.textColor; });
var Root = react_emotion_1.default('div')(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  ", ";\n  position: relative;\n  padding: 8px;\n  padding-right: ", ";\n  background: ", ";\n  color: ", ";\n  text-align: center;\n  font-size: 12px;\n  line-height: 1.3;\n  @media (min-width: 768px) {\n    display: flex;\n    align-items: center;\n  }\n"], ["\n  ", ";\n  position: relative;\n  padding: 8px;\n  padding-right: ", ";\n  background: ", ";\n  color: ", ";\n  text-align: center;\n  font-size: 12px;\n  line-height: 1.3;\n  @media (min-width: 768px) {\n    display: flex;\n    align-items: center;\n  }\n"])), font_styles_1.default, function (props) { return (props.hideCloseButton ? '8px' : '40px'); }, function (props) { return props.backgroundColor; }, function (props) { return props.textColor; });
var Content = react_emotion_1.default('div')(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  margin-bottom: ", ";\n  @media (min-width: 768px) {\n    flex: auto;\n    margin-bottom: ", ";\n  }\n  a,\n  button {\n    display: inline;\n    padding: 0;\n    border: none;\n    background: none;\n    color: inherit;\n    font: inherit;\n    text-decoration: underline;\n    cursor: pointer;\n  }\n"], ["\n  margin-bottom: ", ";\n  @media (min-width: 768px) {\n    flex: auto;\n    margin-bottom: ", ";\n  }\n  a,\n  button {\n    display: inline;\n    padding: 0;\n    border: none;\n    background: none;\n    color: inherit;\n    font: inherit;\n    text-decoration: underline;\n    cursor: pointer;\n  }\n"])), function (props) { return (props.asModal ? '20px' : '8px'); }, function (props) { return (props.asModal ? '20px' : '0'); });
var ActionsBlock = react_emotion_1.default('div')(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  color: #000;\n  button {\n    margin: 4px 0;\n    width: 100%;\n    @media (min-width: 768px) {\n      margin: 4px 8px;\n      width: 200px;\n    }\n  }\n"], ["\n  color: #000;\n  button {\n    margin: 4px 0;\n    width: 100%;\n    @media (min-width: 768px) {\n      margin: 4px 8px;\n      width: 200px;\n    }\n  }\n"])));
var P = react_emotion_1.default('p')(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  margin: 0;\n  &:not(:last-child) {\n    margin-bottom: 6px;\n  }\n"], ["\n  margin: 0;\n  &:not(:last-child) {\n    margin-bottom: 6px;\n  }\n"])));
var CloseButton = react_emotion_1.default('button')(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  position: absolute;\n  right: 8px;\n  top: ", ";\n  transform: translateY(-50%);\n  padding: 8px;\n  border: none;\n  background: none;\n  color: inherit;\n  font: inherit;\n  font-size: 14px;\n  line-height: 1;\n  cursor: pointer;\n"], ["\n  position: absolute;\n  right: 8px;\n  top: ", ";\n  transform: translateY(-50%);\n  padding: 8px;\n  border: none;\n  background: none;\n  color: inherit;\n  font: inherit;\n  font-size: 14px;\n  line-height: 1;\n  cursor: pointer;\n"])), function (props) { return (props.isTop ? '20px' : '50%'); });
var Banner = /** @class */ (function (_super) {
    __extends(Banner, _super);
    function Banner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Banner.prototype.render = function () {
        var _a = this.props, innerRef = _a.innerRef, onClose = _a.onClose, onChangePreferences = _a.onChangePreferences, content = _a.content, subContent = _a.subContent, actionsBlock = _a.actionsBlock, backgroundColor = _a.backgroundColor, textColor = _a.textColor, onAcceptAll = _a.onAcceptAll, onDenyAll = _a.onDenyAll, hideCloseButton = _a.hideCloseButton, asModal = _a.asModal;
        var RootContent = (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(Content, { asModal: asModal },
                react_1.default.createElement(P, null, content),
                react_1.default.createElement(P, null,
                    react_1.default.createElement("button", { type: "button", onClick: onChangePreferences }, subContent))),
            typeof actionsBlock === 'function' &&
                actionsBlock({
                    acceptAll: onAcceptAll,
                    denyAll: onDenyAll,
                    changePreferences: onChangePreferences
                }),
            actionsBlock === true && (react_1.default.createElement(ActionsBlock, null,
                react_1.default.createElement(buttons_1.GreenButton, { type: "button", onClick: onAcceptAll }, "Allow all"),
                !asModal && (react_1.default.createElement(buttons_1.DefaultButton, { type: "button", onClick: onDenyAll }, "Deny all")))),
            !hideCloseButton && (react_1.default.createElement(CloseButton, { type: "button", title: "Close", "aria-label": "Close", onClick: onClose, isTop: asModal }, "\u2715"))));
        if (asModal) {
            return (react_1.default.createElement(react_1.Fragment, null,
                react_1.default.createElement(Overlay, null),
                react_1.default.createElement(Centered, null,
                    react_1.default.createElement(RootCentered, { innerRef: innerRef, backgroundColor: backgroundColor, textColor: textColor, hideCloseButton: hideCloseButton }, RootContent))));
        }
        return (react_1.default.createElement(Root, { innerRef: innerRef, backgroundColor: backgroundColor, textColor: textColor, hideCloseButton: hideCloseButton }, RootContent));
    };
    Banner.displayName = 'Banner';
    return Banner;
}(react_1.PureComponent));
exports.default = Banner;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnNlbnQtbWFuYWdlci9iYW5uZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXNEO0FBQ3RELGdFQUFrQztBQUNsQyw4REFBc0M7QUFFdEMscUNBQXNEO0FBWXRELElBQU0sT0FBTyxHQUFHLHVCQUFNLENBQUMsS0FBSyxDQUFDLG1MQUFBLGdIQVE1QixJQUFBLENBQUE7QUFFRCxJQUFNLFFBQVEsR0FBRyx1QkFBTSxDQUFDLEtBQUssQ0FBQyxzT0FBQSxtS0FTN0IsSUFBQSxDQUFBO0FBRUQsSUFBTSxZQUFZLEdBQUcsdUJBQU0sQ0FBQyxLQUFLLENBQUMsMlFBQVcsTUFDekMsRUFBVSxvRkFJSyxFQUFrRCxtQkFDckQsRUFBOEIsY0FDbkMsRUFBd0IscUVBSWxDLEtBVkcscUJBQVUsRUFJSyxVQUFBLEtBQUssSUFBSSxPQUFBLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBekMsQ0FBeUMsRUFDckQsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsZUFBZSxFQUFyQixDQUFxQixFQUNuQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxTQUFTLEVBQWYsQ0FBZSxDQUlsQyxDQUFBO0FBRUQsSUFBTSxJQUFJLEdBQUcsdUJBQU0sQ0FBQyxLQUFLLENBQUMsdVVBQVcsTUFDakMsRUFBVSw4REFHSyxFQUFpRCxtQkFDcEQsRUFBOEIsY0FDbkMsRUFBd0IsdUpBUWxDLEtBYkcscUJBQVUsRUFHSyxVQUFBLEtBQUssSUFBSSxPQUFBLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBeEMsQ0FBd0MsRUFDcEQsVUFBQSxL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
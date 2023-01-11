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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react'; // Do not remove line
import AvatarBauhaus from './avatar-bauhaus';
import AvatarBeam from './avatar-beam';
import AvatarMarble from './avatar-marble';
import AvatarPixel from './avatar-pixel';
import AvatarRing from './avatar-ring';
import AvatarSunset from './avatar-sunset';
var variants = ['pixel', 'bauhaus', 'ring', 'beam', 'sunset', 'marble'];
var deprecatedVariants = { geometric: 'beam', abstract: 'bauhaus' };
var Avatar = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'marble' : _b, _c = _a.colors, colors = _c === void 0 ? ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'] : _c, _d = _a.name, name = _d === void 0 ? 'Clara Barton' : _d, _e = _a.square, square = _e === void 0 ? false : _e, _f = _a.title, title = _f === void 0 ? false : _f, _g = _a.size, size = _g === void 0 ? 40 : _g, props = __rest(_a, ["variant", "colors", "name", "square", "title", "size"]);
    var avatarProps = __assign({ colors: colors, name: name, title: title, size: size, square: square }, props);
    var checkedVariant = function () {
        if (Object.keys(deprecatedVariants).includes(variant)) {
            return deprecatedVariants[variant];
        }
        if (variants.includes(variant)) {
            return variant;
        }
        return 'marble';
    };
    var avatars = {
        pixel: <AvatarPixel {...avatarProps}/>,
        bauhaus: <AvatarBauhaus {...avatarProps}/>,
        ring: <AvatarRing {...avatarProps}/>,
        beam: <AvatarBeam {...avatarProps}/>,
        sunset: <AvatarSunset {...avatarProps}/>,
        marble: <AvatarMarble {...avatarProps}/>,
    };
    return avatars[checkedVariant()];
};
export default Avatar;

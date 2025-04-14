#!/usr/bin/env zx
"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
// FROM: https://github.com/vitest-dev/vitest/blob/a9d36c719f8ce5551f61da20181490d3673bdf99/scripts/release.ts
var bumpp_1 = require("bumpp");
var tinyglobby_1 = require("tinyglobby");
var zx_1 = require("zx");
try {
    var packages = await (0, tinyglobby_1.glob)(['package.json', './packages/*/package.json'], { expandDirectories: false });
    console.log('Bumping versions in packages:', packages.join(', '), '\n');
    var result = await (0, bumpp_1.versionBump)({
        files: packages,
        commit: true,
        push: true,
        tag: true,
    });
    if (!result.newVersion.includes('beta')) {
        console.log('Pushing to release branch');
        await (0, zx_1.$)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["git update-ref refs/heads/release refs/heads/main"], ["git update-ref refs/heads/release refs/heads/main"])));
        await (0, zx_1.$)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["git push origin release"], ["git push origin release"])));
    }
    console.log('New release is ready, waiting for conformation at https://github.com/iceprosurface/vueireact/actions');
}
catch (err) {
    console.error(err);
}
var templateObject_1, templateObject_2;

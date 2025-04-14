#!/usr/bin/env zx
"use strict";
// FROM: https://github.com/vitest-dev/vitest/blob/a9d36c719f8ce5551f61da20181490d3673bdf99/scripts/publish-ci.ts
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fs_1 = require("node:fs");
var node_url_1 = require("node:url");
var zx_1 = require("zx");
var version = process.argv[2];
if (!version) {
    throw new Error('No tag specified');
}
if (version.startsWith('v')) {
    version = version.slice(1);
}
var pkgPath = (0, node_url_1.fileURLToPath)(new URL('../package.json', import.meta.url));
var pkg = JSON.parse((0, node_fs_1.readFileSync)(pkgPath, 'utf-8'));
if (pkg.version !== version) {
    throw new Error("Package version from tag \"".concat(version, "\" mismatches with the current version \"").concat(pkg.version, "\""));
}
var releaseTag = version.includes('beta')
    ? 'beta'
    : version.includes('alpha')
        ? 'alpha'
        : undefined;
console.log('Publishing version', version, 'with tag', releaseTag || 'latest');
if (releaseTag) {
    await (0, zx_1.$)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["pnpm -r publish --access public --no-git-checks --tag ", ""], ["pnpm -r publish --access public --no-git-checks --tag ", ""])), releaseTag);
}
else {
    await (0, zx_1.$)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["pnpm -r publish --access public --no-git-checks"], ["pnpm -r publish --access public --no-git-checks"])));
}
var templateObject_1, templateObject_2;

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@actions/core');
var lighthouseCheck = require('@foo-software/lighthouse-check');
var github = require('@actions/github');
var exec = require('@actions/exec');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var reporter = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var token, comment, _a, repo, owner, client, commit, number;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                token = config.token, comment = config.comment;
                _a = github.context.repo, repo = _a.repo, owner = _a.owner;
                client = github.getOctokit(token);
                return [4 /*yield*/, client.repos.listPullRequestsAssociatedWithCommit({
                        repo: repo,
                        owner: owner,
                        commit_sha: github.context.sha,
                    })];
            case 1:
                commit = _b.sent();
                number = commit.data[0].number;
                return [4 /*yield*/, client.issues.createComment({
                        repo: repo,
                        owner: owner,
                        body: comment,
                        issue_number: number,
                    })];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };

var inputFormatter = function (input) {
    if (input === 'true')
        return true;
    if (input === 'false')
        return false;
    if (input === '')
        return undefined;
    return input;
};

var tablemark = require('tablemark');
// eslint-disable-next-line
function lighthouse(config) {
    return __awaiter(this, void 0, void 0, function () {
        var urls, token, report, check, data, code, emulatedFormFactor, reportTable_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    urls = config.urls, token = config.token, report = config.report;
                    return [4 /*yield*/, lighthouseCheck.lighthouseCheck({
                            urls: urls.split(','),
                            emulatedFormFactor: 'all',
                            verbose: false,
                        })];
                case 1:
                    check = _a.sent();
                    data = check.data, code = check.code, emulatedFormFactor = check.emulatedFormFactor;
                    if (!(code === 'SUCCESS')) return [3 /*break*/, 4];
                    if (!(inputFormatter(token) && inputFormatter(report))) return [3 /*break*/, 3];
                    reportTable_1 = '';
                    check.data.map(function (page, index) {
                        var url = page.url, scores = page.scores;
                        return (reportTable_1 += "|\n| URL: " + url + " / Agent: " + (index % 2 === 0 ? 'Desktop' : 'Mobile') + "\n|        \n" + tablemark([scores]));
                    });
                    return [4 /*yield*/, reporter({
                            token: token,
                            comment: "<p>Lighthouse Audit: <code>Desktop, Mobile</code></p>\n<details><summary>Performance report</summary>\n<p>\n<pre>" + reportTable_1 + "</pre>\n</p>\n</details>",
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/, data.map(function (page) {
                        var url = page.url, scores = page.scores;
                        return {
                            url: url,
                            scores: scores,
                            type: emulatedFormFactor,
                        };
                    })];
                case 4: throw Error('vsf: Something went wrong');
            }
        });
    });
}

var execSync = require('child_process').execSync;
var coverage = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var command, token, report, options, output_1, percentage, percentageFormatted, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                command = config.command, token = config.token, report = config.report;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                options = {};
                output_1 = '';
                options.listeners = {
                    stdout: function (data) {
                        output_1 += data.toString();
                    },
                };
                return [4 /*yield*/, exec.exec("" + command, [], options)];
            case 2:
                _a.sent();
                percentage = execSync('npx coverage-percentage ./coverage/lcov.info --lcov').toString();
                percentageFormatted = parseFloat(percentage).toFixed(2);
                if (!(inputFormatter(token) && inputFormatter(report))) return [3 /*break*/, 4];
                return [4 /*yield*/, reporter({
                        token: token,
                        comment: "<p>Tests Coverage: <code>" + (percentageFormatted + '%') + "</code></p>\n<details><summary>Coverage report</summary>\n<p>\n<pre>" + output_1 + "</pre>\n</p>\n</details>",
                    })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/, percentageFormatted];
            case 5:
                error_1 = _a.sent();
                throw Error(error_1);
            case 6: return [2 /*return*/];
        }
    });
}); };

var test = function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var command, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                command = config.command;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, exec.exec(command || 'yarn test --coverage --passWithNoTests --forceExit')];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_1 = _a.sent();
                throw Error(error_1);
            case 4: return [2 /*return*/];
        }
    });
}); };

(function () { return __awaiter(void 0, void 0, void 0, function () {
    var lighthouseCheck, coverageCheck, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, lighthouse({
                        urls: core.getInput('lighthouse_urls'),
                        token: core.getInput('github_token'),
                        report: core.getInput('lighthouse_report'),
                    })];
            case 1:
                lighthouseCheck = _a.sent();
                core.setOutput("Lighthouse Check Results (desktop, mobile)", JSON.stringify(lighthouseCheck));
                if (!!inputFormatter(core.getInput('test_disabled'))) return [3 /*break*/, 4];
                return [4 /*yield*/, test({
                        command: core.getInput('test_command'),
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, coverage({
                        command: core.getInput('test_command'),
                        token: core.getInput('github_token'),
                        report: core.getInput('test_report'),
                    })];
            case 3:
                coverageCheck = _a.sent();
                core.setOutput('Coverage Check Results', coverageCheck.toString());
                if (Number(coverageCheck) < Number(core.getInput('test_failed'))) {
                    return [2 /*return*/, Error('Tests Coverage is too Low')];
                }
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                return [2 /*return*/, core.setFailed(error_1)];
            case 6: return [2 /*return*/];
        }
    });
}); })();

exports.inputFormatter = inputFormatter;
//# sourceMappingURL=index.cjs.js.map

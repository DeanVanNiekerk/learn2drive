webpackJsonp([0],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContentService = /** @class */ (function () {
    function ContentService(http) {
        this.http = http;
        this.contentFilePath = 'content/content.json';
        this.contentData = null;
    }
    ContentService.prototype.getData = function () {
        var _this = this;
        if (this.contentData) {
            return Promise.resolve(this.contentData);
        }
        return new Promise(function (resolve) {
            _this.http.get(_this.contentFilePath)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.contentData = data;
                resolve(_this.contentData);
            });
        });
    };
    // Gets a list of navidation items one level down
    ContentService.prototype.getNavigationItems = function (key) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getData().then(function (data) {
                var result = alasql("\n          SELECT DISTINCT Node \n          FROM ? \n          WHERE Node LIKE \"" + key + ".%\"", [data]);
                // Get list of nav items one level down
                var level = key.split('.').length;
                var oneLevelDown = result.map(function (item) {
                    var name = item.Node.split('.')[level];
                    return key + "." + name;
                });
                // Filter out duplicates
                oneLevelDown = oneLevelDown.filter(function (x, i) {
                    return oneLevelDown.indexOf(x) === i;
                });
                // Map to model
                var models = oneLevelDown.map(function (item) {
                    return new __WEBPACK_IMPORTED_MODULE_2__models__["g" /* NavigationItem */](item);
                });
                resolve(models);
            });
        });
    };
    // Gets all navigations items below
    ContentService.prototype.getAllNavigationItems = function (key) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getData().then(function (data) {
                var result = alasql("\n            SELECT DISTINCT Node \n            FROM ? \n            WHERE Node LIKE \"" + key + ".%\"", [data]);
                var items = [];
                // First add top level
                items.push(key);
                // Get list of nav items
                var level = key.split('.').length;
                result.forEach(function (item) {
                    var currentKey = key;
                    var split = item.Node.split('.');
                    for (var i = level; i < split.length; i++) {
                        currentKey = currentKey + "." + split[i];
                        items.push(currentKey.toString());
                    }
                });
                // Filter out duplicates
                items = items.filter(function (x, i) {
                    return items.indexOf(x) === i;
                });
                // Map to model
                var models = items.map(function (item) {
                    return new __WEBPACK_IMPORTED_MODULE_2__models__["g" /* NavigationItem */](item);
                });
                resolve(models);
            });
        });
    };
    ContentService.prototype.getContent = function (key) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getData().then(function (data) {
                var result = alasql("\n            SELECT Heading, Description, ImageName\n            FROM ? \n            WHERE Node = \"" + key + "\"", [data]);
                // Map to model
                var models = result.map(function (item) {
                    return new __WEBPACK_IMPORTED_MODULE_2__models__["d" /* Content */](item.Heading, item.Description, item.ImageName);
                });
                resolve(models);
            });
        });
    };
    ContentService.prototype.getContentSectionCount = function (key) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getData().then(function (data) {
                var result = alasql("\n            SELECT COUNT (DISTINCT Node) AS [count]\n            FROM ? \n            WHERE Node LIKE \"" + key + "%\"", [data]);
                resolve(result[0].count);
            });
        });
    };
    ContentService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], ContentService);
    return ContentService;
}());

//# sourceMappingURL=content.service.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StoreService = /** @class */ (function () {
    // Init an empty DB if it does not exist by now!
    function StoreService(storage) {
        this.storage = storage;
        this.MOCK_TEST_PASS_TARGET = 3;
        this.storage = storage;
    }
    StoreService.prototype.insertContentRead = function (navigationKey) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_CONTENTREAD)
                .then(function (rawData) {
                var data = rawData ? JSON.parse(rawData) : [];
                data.push({ navigationKey: navigationKey, readDate: new Date().getTime() });
                _this.storage.set(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_CONTENTREAD, JSON.stringify(data)).then(function (result) {
                    resolve(result);
                });
            });
        });
    };
    StoreService.prototype.getContentReadCount = function (navigationKey) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_CONTENTREAD)
                .then(function (rawData) {
                var data = rawData ? JSON.parse(rawData) : [];
                var result = alasql("\n                SELECT COUNT(DISTINCT navigationKey) AS readCount\n                FROM ? \n                WHERE navigationKey LIKE ('" + navigationKey + "%')", [data]);
                resolve(result[0].readCount);
            });
        });
    };
    StoreService.prototype.insertTestResult = function (testResult) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_TESTRESULTS)
                .then(function (rawData) {
                var data = rawData ? JSON.parse(rawData) : [];
                data.push({
                    navigationKey: testResult.navigationKey,
                    totalQuestions: testResult.totalQuestions,
                    correctAnswers: testResult.correctAnswers,
                    testDate: new Date().getTime()
                });
                _this.storage.set(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_TESTRESULTS, JSON.stringify(data)).then(function (result) {
                    resolve(result);
                });
            });
        });
    };
    StoreService.prototype.getLatestTestResult = function (navigationKey) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_TESTRESULTS)
                .then(function (rawData) {
                var data = rawData ? JSON.parse(rawData) : [];
                var result = alasql("\n                    SELECT TOP 1 navigationKey,totalQuestions,correctAnswers,testDate \n                    FROM ?\n                    WHERE navigationKey = '" + navigationKey + "'\n                    ORDER BY testDate DESC", [data]);
                var testResults = result.map(function (r) {
                    return _this.mapTestResults(r);
                });
                resolve(testResults.length > 0 ? testResults[0] : null);
            });
        });
    };
    StoreService.prototype.getTestResults = function (navigationKey) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_TESTRESULTS)
                .then(function (rawData) {
                var data = rawData ? JSON.parse(rawData) : [];
                var result = alasql("\n                    SELECT navigationKey,totalQuestions,correctAnswers,testDate\n                    FROM ?\n                    WHERE navigationKey = '" + navigationKey + "'\n                    ORDER BY testDate DESC", [data]);
                var testResults = result.map(function (r) {
                    return _this.mapTestResults(r);
                });
                resolve(testResults);
            });
        });
    };
    StoreService.prototype.mapTestResults = function (r) {
        return new __WEBPACK_IMPORTED_MODULE_1__models__["i" /* TestResult */](r.navigationKey, r.totalQuestions, r.correctAnswers, r.testDate);
    };
    StoreService.prototype.getTestSectionsPassed = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_TESTRESULTS)
                .then(function (rawData) {
                var data = rawData ? JSON.parse(rawData) : [];
                var result = alasql("\n                    SELECT DISTINCT navigationKey\n                    FROM ?\n                    WHERE totalQuestions = correctAnswers", [data]);
                var keys = result.map(function (r) {
                    return r.navigationKey;
                });
                resolve(keys);
            });
        });
    };
    StoreService.prototype.insertMockTestResult = function (testResult) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_MOCKTESTRESULTS)
                .then(function (rawData) {
                var data = rawData ? JSON.parse(rawData) : [];
                data.push({
                    sectionAPassed: testResult.sectionAPassed(),
                    sectionBPassed: testResult.sectionBPassed(),
                    sectionCPassed: testResult.sectionCPassed(),
                    testDate: new Date().getTime()
                });
                _this.storage.set(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_MOCKTESTRESULTS, JSON.stringify(data)).then(function (result) {
                    resolve(result);
                });
            });
        });
    };
    StoreService.prototype.getMockTestsPassed = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_MOCKTESTRESULTS)
                .then(function (rawData) {
                var data = rawData ? JSON.parse(rawData) : [];
                var result = alasql("\n                    SELECT COUNT(*) AS mockTestsPassed\n                    FROM ?\n                    WHERE sectionAPassed = true\n                    AND sectionBPassed = true\n                    AND sectionCPassed = true", [data]);
                resolve(result[0].mockTestsPassed);
            });
        });
    };
    StoreService.prototype.updateChecklistItem = function (key, complete) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getChecklistItem(key)
                .then(function (item) {
                _this.storage.get(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_CHECKLIST)
                    .then(function (rawData) {
                    var data = rawData ? JSON.parse(rawData) : [];
                    // Insert
                    if (item == null) {
                        data.push({ key: key, complete: complete });
                    }
                    else {
                        data.forEach(function (item) {
                            if (item.key === key)
                                item.complete = complete;
                        });
                    }
                    _this.storage.set(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_CHECKLIST, JSON.stringify(data)).then(function (result) {
                        resolve(result);
                    });
                });
            });
        });
    };
    StoreService.prototype.getCompleteChecklistItemCount = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_CHECKLIST)
                .then(function (rawData) {
                var data = rawData ? JSON.parse(rawData) : [];
                var result = alasql("\n                    SELECT COUNT(*) AS itemCount\n                    FROM ?\n                    WHERE complete = true", [data]);
                resolve(result[0].itemCount);
            });
        });
    };
    StoreService.prototype.getChecklistItem = function (key) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_CHECKLIST)
                .then(function (rawData) {
                var data = rawData ? JSON.parse(rawData) : [];
                var result = alasql("\n                    SELECT [key], [complete]\n                     FROM ?\n                     WHERE [key] = '" + key + "'", [data]);
                var checklistitem = null;
                if (result.length > 0) {
                    var item = result[0];
                    checklistitem = new __WEBPACK_IMPORTED_MODULE_1__models__["c" /* ChecklistItem */](item.key, item.complete);
                }
                resolve(checklistitem);
            });
        });
    };
    StoreService.prototype.updateMessage = function (message) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getMessageQuery(message.key)
                .then(function (result) {
                _this.storage.get(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_MESSAGES)
                    .then(function (rawData) {
                    var data = rawData ? JSON.parse(rawData) : [];
                    // Insert
                    if (result.length === 0) {
                        data.push({ key: message.key, shown: message.shown, showAgain: message.showAgain });
                    }
                    else {
                        data.forEach(function (item) {
                            if (item.key === message.key) {
                                item.shown = message.shown;
                                item.showAgain = message.showAgain;
                            }
                        });
                    }
                    _this.storage.set(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_MESSAGES, JSON.stringify(data)).then(function (result) {
                        resolve(result);
                    });
                });
            });
        });
    };
    StoreService.prototype.getMessage = function (key) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getMessageQuery(key)
                .then(function (result) {
                var message = null;
                if (result.length > 0) {
                    var item = result[0];
                    message = new __WEBPACK_IMPORTED_MODULE_1__models__["e" /* Message */](item.key, item.shown, item.showAgain);
                }
                else {
                    // Default
                    message = new __WEBPACK_IMPORTED_MODULE_1__models__["e" /* Message */](key, false, true);
                }
                resolve(message);
            });
        });
    };
    StoreService.prototype.getMessageQuery = function (key) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storage.get(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_MESSAGES)
                .then(function (rawData) {
                var data = rawData ? JSON.parse(rawData) : [];
                var result = alasql("\n                     SELECT [key], [shown], [showAgain]\n                     FROM ?\n                     WHERE [key] = '" + key + "'", [data]);
                resolve(result);
            });
        });
    };
    StoreService.prototype.clearTestResults = function () {
        return this.storage.remove(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_TESTRESULTS);
    };
    StoreService.prototype.clearContentRead = function () {
        return this.storage.remove(__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */].KEY_CONTENTREAD);
    };
    // KILLS ALL DATA
    StoreService.prototype.clearAll = function () {
        return this.storage.clear();
    };
    StoreService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services__["g" /* StorageService */]])
    ], StoreService);
    return StoreService;
}());

//# sourceMappingURL=store.service.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__translate_pipe__ = __webpack_require__(208);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipes_module__ = __webpack_require__(312);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__pipes_module__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ 118:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 118;

/***/ }),

/***/ 12:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__storage_service__ = __webpack_require__(288);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_0__storage_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__content_service__ = __webpack_require__(106);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__content_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__progress_service__ = __webpack_require__(298);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__progress_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__question_service__ = __webpack_require__(299);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__question_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__resource_service__ = __webpack_require__(207);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_4__resource_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__test_service__ = __webpack_require__(300);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_5__test_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__store_service__ = __webpack_require__(107);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_6__store_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__rate_service__ = __webpack_require__(301);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_7__rate_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ad_service__ = __webpack_require__(302);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_8__ad_service__["a"]; });









//# sourceMappingURL=index.js.map

/***/ }),

/***/ 159:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 159;

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Progress; });
var Progress = /** @class */ (function () {
    function Progress(total, complete) {
        this.total = total;
        this.complete = complete;
    }
    Progress.prototype.percent = function () {
        return (this.complete / this.total) * 100;
    };
    Progress.prototype.isComplete = function () {
        return this.complete >= this.total;
    };
    return Progress;
}());

//# sourceMappingURL=progress.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ResourceService = /** @class */ (function () {
    function ResourceService(http) {
        this.http = http;
        this.resourceFilePath = 'content/strings.json';
        this.resourceData = null;
    }
    ResourceService.prototype.getData = function () {
        var _this = this;
        if (this.resourceData) {
            return Promise.resolve(this.resourceData);
        }
        return new Promise(function (resolve) {
            _this.http.get(_this.resourceFilePath)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.resourceData = data;
                resolve(_this.resourceData);
            });
        });
    };
    ResourceService.prototype.getResourceIndex = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getData().then(function (data) {
                var result = alasql('SELECT [Name], [Value] FROM ?', [data]);
                var index = [];
                result.forEach(function (item) {
                    index[item.Name] = item.Value;
                });
                resolve(index);
            });
        });
    };
    ResourceService.prototype.getResource = function (key) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getData().then(function (data) {
                var result = alasql("\n          SELECT [Name], [Value] \n          FROM ?\n          WHERE [Name] = \"" + key + "\"", [data]);
                resolve(result[0].Value);
            });
        });
    };
    ResourceService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], ResourceService);
    return ResourceService;
}());

//# sourceMappingURL=resource.service.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TranslatePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_resource_service__ = __webpack_require__(207);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TranslatePipe = /** @class */ (function () {
    function TranslatePipe(resourceService) {
        this.resourceService = resourceService;
        this.text = '';
    }
    TranslatePipe.prototype.transform = function (key) {
        var _this = this;
        if (!this.promise) {
            this.promise = this.resourceService.getResource(key);
            this.promise.then(function (text) { return _this.text = text; });
        }
        return this.text;
    };
    TranslatePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'translate',
            pure: false
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_resource_service__["a" /* ResourceService */]])
    ], TranslatePipe);
    return TranslatePipe;
}());

//# sourceMappingURL=translate.pipe.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_module__ = __webpack_require__(234);



Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_home__ = __webpack_require__(287);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__home_home__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__content_content__ = __webpack_require__(313);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__content_content__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__test_test__ = __webpack_require__(314);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_2__test_test__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__test_result_test_result__ = __webpack_require__(315);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_3__test_result_test_result__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__checklist_checklist__ = __webpack_require__(316);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__checklist_checklist__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__checklist_item_info_checklist_item_info__ = __webpack_require__(317);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_5__checklist_item_info_checklist_item_info__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__about_about__ = __webpack_require__(318);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_6__about_about__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__settings_settings__ = __webpack_require__(319);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_7__settings_settings__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mock_test_mock_test__ = __webpack_require__(320);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_8__mock_test_mock_test__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__mock_test_result_mock_test_result__ = __webpack_require__(321);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_9__mock_test_result_mock_test_result__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__introduction_slides_introduction_slides__ = __webpack_require__(322);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_10__introduction_slides_introduction_slides__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__test_history_test_history__ = __webpack_require__(323);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_11__test_history_test_history__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_module__ = __webpack_require__(324);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_12__pages_module__["a"]; });













//# sourceMappingURL=index.js.map

/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_admob_pro__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_app_rate__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_app_version__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pipes__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* L2D3DApp */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_11__pages__["i" /* PagesModule */],
                __WEBPACK_IMPORTED_MODULE_13__pipes__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* L2D3DApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* L2D3DApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages__["e" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages__["d" /* ContentPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages__["l" /* TestPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages__["m" /* TestResultPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages__["c" /* ChecklistPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages__["b" /* ChecklistItemInfoPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages__["j" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages__["g" /* MockTestPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages__["h" /* MockTestResultPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages__["f" /* IntroductionSlidesPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages__["k" /* TestHistoryPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_admob_pro__["a" /* AdMobPro */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_app_rate__["a" /* AppRate */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_app_version__["a" /* AppVersion */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_12__services__["b" /* ContentService */],
                __WEBPACK_IMPORTED_MODULE_12__services__["d" /* QuestionService */],
                __WEBPACK_IMPORTED_MODULE_12__services__["f" /* ResourceService */],
                __WEBPACK_IMPORTED_MODULE_12__services__["i" /* TestService */],
                __WEBPACK_IMPORTED_MODULE_12__services__["c" /* ProgressService */],
                __WEBPACK_IMPORTED_MODULE_12__services__["e" /* RateService */],
                __WEBPACK_IMPORTED_MODULE_12__services__["a" /* AdService */],
                __WEBPACK_IMPORTED_MODULE_12__services__["g" /* StorageService */],
                __WEBPACK_IMPORTED_MODULE_12__services__["h" /* StoreService */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return L2D3DApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var L2D3DApp = /** @class */ (function () {
    function L2D3DApp(platform, statusBar, splashScreen, app) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.app = app;
        this.initializeApp();
    }
    L2D3DApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages__["e" /* HomePage */];
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.handlePhysicalBackButton();
            //console.log('production: ' + environment.production);
        });
    };
    L2D3DApp.prototype.handlePhysicalBackButton = function () {
        var _this = this;
        // Registration of push in Android and Windows Phone
        this.platform.registerBackButtonAction(function () {
            var nav = _this.app.getRootNav();
            var view = nav.getActive();
            // Handle back on test page
            if (view.instance instanceof __WEBPACK_IMPORTED_MODULE_4__pages__["l" /* TestPage */]) {
                var testPage = view.instance;
                testPage.navigateBack();
                return;
            }
            // Handle back on mock test page
            if (view.instance instanceof __WEBPACK_IMPORTED_MODULE_4__pages__["g" /* MockTestPage */]) {
                var testPage = view.instance;
                testPage.navigateBack();
                return;
            }
            // Default back handler
            if (nav.canGoBack()) {
                // Go back if we can
                _this.app.navPop();
            }
            else {
                // Exit from app
                _this.platform.exitApp();
            }
        });
    };
    L2D3DApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\_repository\l2dv2\src\app\app.html"*/'<ion-nav [root]="rootPage" #content></ion-nav>'/*ion-inline-end:"C:\_repository\l2dv2\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], L2D3DApp);
    return L2D3DApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4____ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Services



var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, viewCtrl, popoverCtrl, progressService, storeService, rateService, menuCtrl) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.popoverCtrl = popoverCtrl;
        this.progressService = progressService;
        this.storeService = storeService;
        this.rateService = rateService;
        this.menuCtrl = menuCtrl;
        this.hidden = true;
        this.rootNavigationKey = 'rootNavigation.learner';
        this.introductionMessageKey = 'IntroductionSlidesShown';
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.viewCtrl.didEnter.subscribe(function () {
            _this.rateService.promptForRating(false);
            _this.progressService.getChecklistProgress().
                then(function (progress) {
                _this.checklistProgressComponent.update(progress.percent());
            });
            _this.progressService.getContentProgress(_this.rootNavigationKey).
                then(function (progress) {
                _this.contentProgressComponent.update(progress.percent());
            });
            _this.storeService.getMockTestsPassed().
                then(function (count) {
                var mockTestPassTarget = _this.storeService.MOCK_TEST_PASS_TARGET;
                if (count > mockTestPassTarget)
                    count = mockTestPassTarget;
                var percent = (count / mockTestPassTarget) * 100;
                _this.mockTestProgressComponent.update(percent);
            });
            _this.storeService.getMessage(_this.introductionMessageKey)
                .then(function (message) {
                // if (message.showAgain === true) 
                //  this.navigateToIntroductionSlides(); 
                // else 
                _this.hidden = false;
            });
        });
    };
    HomePage.prototype.openMenu = function () {
        this.menuCtrl.open();
    };
    HomePage.prototype.navigateToContent = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4____["d" /* ContentPage */], {
            navigationKey: 'rootNavigation.learner'
        });
    };
    HomePage.prototype.navigateToIntroductionSlides = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4____["f" /* IntroductionSlidesPage */]);
    };
    HomePage.prototype.navigateToMockTest = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4____["g" /* MockTestPage */]);
    };
    HomePage.prototype.navigateToChecklist = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4____["c" /* ChecklistPage */]);
    };
    HomePage.prototype.navigateToSettings = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4____["j" /* SettingsPage */]);
    };
    HomePage.prototype.navigateToAbout = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4____["a" /* AboutPage */]);
    };
    HomePage.prototype.rateApp = function () {
        this.rateService.promptForRating(true);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('checklistprogressbar'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__components__["g" /* ProgressBarComponent */])
    ], HomePage.prototype, "checklistProgressComponent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('contentprogressbar'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__components__["g" /* ProgressBarComponent */])
    ], HomePage.prototype, "contentProgressComponent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('mocktestprogressbar'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__components__["g" /* ProgressBarComponent */])
    ], HomePage.prototype, "mockTestProgressComponent", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\_repository\l2dv2\src\pages\home\home.html"*/'\n\n<ion-menu [content]="homeMenu">\n\n    <ion-header>\n\n        <ion-toolbar color="dark">\n\n            <ion-title>Menu</ion-title>\n\n        </ion-toolbar>\n\n    </ion-header>\n\n\n\n    <ion-content>\n\n        <ion-list>\n\n            <button ion-item menuClose (click)="navigateToSettings()">\n\n                Settings\n\n            </button>\n\n            <button ion-item menuClose (click)="navigateToAbout()">\n\n                About\n\n            </button>\n\n            <button ion-item menuClose (click)="rateApp()">\n\n                Rate App\n\n            </button>\n\n        </ion-list>\n\n    </ion-content>\n\n</ion-menu>\n\n\n\n<ion-nav #homeMenu side="right" [root]="rootPage"></ion-nav>\n\n\n\n<ion-header>\n\n  <ion-navbar color=\'primary\'>\n\n    <ion-title>Learn2Drive</ion-title>\n\n\n\n    <ion-buttons end>\n\n        <button ion-button icon-only (click)="openMenu()">\n\n            <ion-icon name="more"></ion-icon>\n\n        </button>\n\n    </ion-buttons>\n\n    \n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="home" [hidden]="hidden">\n\n\n\n    <ion-card class="checklist" (click)="navigateToChecklist()">\n\n         <ion-card-content>\n\n           \n\n            <ion-row>\n\n                <ion-col width-80>\n\n                     <ion-card-title>\n\n                        <ion-icon name="clipboard"></ion-icon> Checklist \n\n                    </ion-card-title>\n\n                    <p>\n\n                        The <b>Checklist</b> helps you keep track of all the tasks you\'ll need to do before you write your test.\n\n                    </p> \n\n                </ion-col>\n\n                <ion-col width-20 class="progress">\n\n                    <progressbar #checklistprogressbar \n\n                        key=\'checklist-progressbar\'\n\n                        colorFrom=\'#616161\'\n\n                        colorTo=\'#616161\'>\n\n                    </progressbar>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-card-content>\n\n    </ion-card>\n\n  \n\n    <ion-card class="learners" (click)="navigateToContent()">\n\n        <ion-card-content>\n\n            \n\n            <ion-row>\n\n                <ion-col width-80>\n\n                    <ion-card-title>\n\n                        <ion-icon name="list-box"></ion-icon>\n\n                        Learner\'s License Content\n\n                    </ion-card-title>\n\n                    <p>\n\n                        The <b>Learner\'s License Content</b> section contains everything you need to know to pass your Learner\'s Licence test.\n\n                    </p> \n\n                </ion-col>\n\n                <ion-col width-20 class="progress">\n\n                    <progressbar #contentprogressbar \n\n                        key=\'content-progressbar\'\n\n                        colorFrom=\'#42A4F5\'\n\n                        colorTo=\'#42A4F5\'>\n\n                    </progressbar>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card class="mock-test" (click)="navigateToMockTest()">\n\n         <ion-card-content>\n\n            <ion-row>\n\n                <ion-col width-80>\n\n                    <ion-card-title>\n\n                        <ion-icon name="school"></ion-icon> Mock Test\n\n                    </ion-card-title>\n\n                    <p>\n\n                        <b>Mock Tests</b> are set up in the same way as the Learner\'s Licence test you\'ll write at the traffic department.\n\n                    </p> \n\n                    </ion-col>\n\n                <ion-col width-20 class="progress">\n\n                    <progressbar #mocktestprogressbar \n\n                        key=\'mocktest-progressbar\'\n\n                        colorFrom=\'#FF3737\'\n\n                        colorTo=\'#FF3737\'\n\n                        outOf=\'3\'>\n\n                    </progressbar>\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n</ion-content>\n\n\n\n\n\n\n\n\n\n\n\n'/*ion-inline-end:"C:\_repository\l2dv2\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_2__services__["c" /* ProgressService */],
            __WEBPACK_IMPORTED_MODULE_2__services__["h" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_2__services__["e" /* RateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(202);

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StorageService = /** @class */ (function () {
    function StorageService(storage) {
        this.storage = storage;
    }
    StorageService.prototype.get = function (key) {
        return this.storage.get(key);
    };
    StorageService.prototype.set = function (key, value) {
        return this.storage.set(key, value);
    };
    StorageService.prototype.remove = function (key) {
        return this.storage.remove(key);
    };
    StorageService.prototype.clear = function () {
        return this.storage.clear();
    };
    StorageService.KEY_CONTENTREAD = 'CONTENT_READ';
    StorageService.KEY_TESTRESULTS = 'TEST_RESULTS';
    StorageService.KEY_MOCKTESTRESULTS = 'MOCK_TEST_RESULTS';
    StorageService.KEY_CHECKLIST = 'CHECKLIST';
    StorageService.KEY_MESSAGES = 'MESSAGES';
    StorageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], StorageService);
    return StorageService;
}());

//# sourceMappingURL=storage.service.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Answer; });
var Answer = /** @class */ (function () {
    function Answer(id, text) {
        this.id = id;
        this.text = text;
    }
    return Answer;
}());

//# sourceMappingURL=answer.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnsweredQuestion; });
var AnsweredQuestion = /** @class */ (function () {
    function AnsweredQuestion(questionId, answerId) {
        this.questionId = questionId;
        this.answerId = answerId;
    }
    return AnsweredQuestion;
}());

//# sourceMappingURL=answered-question.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChecklistItem; });
var ChecklistItem = /** @class */ (function () {
    function ChecklistItem(key, complete) {
        this.key = key;
        this.complete = complete;
    }
    return ChecklistItem;
}());

//# sourceMappingURL=checklist-item.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Content; });
var Content = /** @class */ (function () {
    function Content(heading, text, image) {
        this.heading = heading;
        this.text = text;
        this.image = image;
    }
    return Content;
}());

//# sourceMappingURL=content.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });
var Message = /** @class */ (function () {
    function Message(key, shown, showAgain) {
        this.key = key;
        this.shown = shown;
        this.showAgain = showAgain;
    }
    return Message;
}());

//# sourceMappingURL=message.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MockTestResult; });
var MockTestResult = /** @class */ (function () {
    function MockTestResult(questionCountA, correntAnswersA, passCountA, questionCountB, correntAnswersB, passCountB, questionCountC, correntAnswersC, passCountC, testDate) {
        if (testDate === void 0) { testDate = null; }
        this.questionCountA = questionCountA;
        this.correntAnswersA = correntAnswersA;
        this.passCountA = passCountA;
        this.questionCountB = questionCountB;
        this.correntAnswersB = correntAnswersB;
        this.passCountB = passCountB;
        this.questionCountC = questionCountC;
        this.correntAnswersC = correntAnswersC;
        this.passCountC = passCountC;
        this.testDate = testDate;
    }
    MockTestResult.prototype.sectionAPassed = function () {
        return this.correntAnswersA >= this.passCountA;
    };
    MockTestResult.prototype.sectionBPassed = function () {
        return this.correntAnswersB >= this.passCountB;
    };
    MockTestResult.prototype.sectionCPassed = function () {
        return this.correntAnswersC >= this.passCountC;
    };
    MockTestResult.prototype.passed = function () {
        return this.sectionAPassed() && this.sectionBPassed() && this.sectionCPassed();
    };
    return MockTestResult;
}());

//# sourceMappingURL=mock-test-result.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigationItem; });
var NavigationItem = /** @class */ (function () {
    function NavigationItem(key) {
        this.key = key;
    }
    return NavigationItem;
}());

//# sourceMappingURL=navigation-item.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Question; });
var Question = /** @class */ (function () {
    function Question(id, answerId, text, answers, images) {
        this.id = id;
        this.answerId = answerId;
        this.text = text;
        this.answers = answers;
        this.images = images;
    }
    return Question;
}());

//# sourceMappingURL=question.js.map

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestResult; });
var TestResult = /** @class */ (function () {
    function TestResult(navigationKey, totalQuestions, correctAnswers, testDate) {
        if (totalQuestions === void 0) { totalQuestions = 0; }
        if (correctAnswers === void 0) { correctAnswers = 0; }
        if (testDate === void 0) { testDate = null; }
        this.navigationKey = navigationKey;
        this.totalQuestions = totalQuestions;
        this.correctAnswers = correctAnswers;
        this.testDate = testDate;
    }
    TestResult.prototype.resultPercent = function () {
        if (this.totalQuestions === 0)
            return 0;
        return Math.floor(this.correctAnswers / this.totalQuestions * 100);
    };
    return TestResult;
}());

//# sourceMappingURL=test-result.js.map

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_service__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__content_service__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_progress__ = __webpack_require__(206);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

// Services


// Models

var ProgressService = /** @class */ (function () {
    function ProgressService(storeService, contentService) {
        this.storeService = storeService;
        this.contentService = contentService;
        this.rootNavigationKey = 'rootNavigation.learner';
    }
    ProgressService.prototype.getChecklistProgress = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var total = 8;
            var complete = 0;
            // 1. Get Checklist count
            _this.storeService.getCompleteChecklistItemCount()
                .then(function (checklistComplete) {
                complete += checklistComplete;
                // 2. Get Content Read count
                _this.storeService.getContentReadCount(_this.rootNavigationKey)
                    .then(function (readCount) {
                    _this.contentService.getContentSectionCount(_this.rootNavigationKey)
                        .then(function (sectionCount) {
                        complete += (readCount >= sectionCount) ? 1 : 0;
                        // 3. Get Mock Tests Passed count
                        _this.storeService.getMockTestsPassed().
                            then(function (count) {
                            complete += (count >= _this.storeService.MOCK_TEST_PASS_TARGET) ? 1 : 0;
                            var progress = new __WEBPACK_IMPORTED_MODULE_3__models_progress__["a" /* Progress */](total, complete);
                            resolve(progress);
                        });
                    });
                });
            });
        });
    };
    ProgressService.prototype.getContentProgress = function (navigationKey) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.storeService.getContentReadCount(navigationKey)
                .then(function (readCount) {
                _this.contentService.getContentSectionCount(navigationKey)
                    .then(function (sectionCount) {
                    var progress = new __WEBPACK_IMPORTED_MODULE_3__models_progress__["a" /* Progress */](sectionCount, readCount);
                    resolve(progress);
                });
            });
        });
    };
    ProgressService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__store_service__["a" /* StoreService */])),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__content_service__["a" /* ContentService */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__store_service__["a" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_2__content_service__["a" /* ContentService */]])
    ], ProgressService);
    return ProgressService;
}());

//# sourceMappingURL=progress.service.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var QuestionService = /** @class */ (function () {
    function QuestionService(http) {
        this.http = http;
        this.questionFilePath = 'content/questions.json';
        this.questionData = null;
    }
    QuestionService.prototype.getData = function () {
        var _this = this;
        if (this.questionData) {
            return Promise.resolve(this.questionData);
        }
        return new Promise(function (resolve) {
            _this.http.get(_this.questionFilePath)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.questionData = data;
                resolve(_this.questionData);
            });
        });
    };
    QuestionService.prototype.getQuestionsByKeys = function (keys, count) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getData().then(function (data) {
                var whereClause = "WHERE ";
                keys.forEach(function (key, index) {
                    if (index !== 0)
                        whereClause += " OR ";
                    whereClause += "navPath LIKE \"" + key + "%\"";
                });
                var result = alasql("\n          SELECT question\n          FROM ? \n          " + whereClause, [data]);
                var models = new Array();
                result.forEach(function (item) {
                    if (!Array.isArray(item.question)) {
                        models.push(_this.mapQuestion(item.question));
                        return;
                    }
                    item.question.forEach(function (question) {
                        models.push(_this.mapQuestion(question));
                    });
                });
                // Select random questions
                models = _this.getRandomQuestions(models, count);
                resolve(models);
            });
        });
    };
    QuestionService.prototype.getQuestions = function (key, count) {
        return this.getQuestionsByKeys([key], count);
    };
    QuestionService.prototype.hasQuestions = function (key) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getQuestionsByKeys([key], 1)
                .then(function (questions) {
                resolve(questions.length > 0);
            });
        });
    };
    QuestionService.prototype.getRandomQuestions = function (questions, max) {
        // Shuffle
        questions.sort(function () { return 0.5 - Math.random(); });
        // Take top
        return questions.slice(0, max);
    };
    QuestionService.prototype.mapQuestion = function (question) {
        // Get answers
        var answers = new Array();
        question.option.forEach(function (option) {
            answers.push(new __WEBPACK_IMPORTED_MODULE_2__models__["a" /* Answer */](option.id, option.value));
        });
        // Get question text
        var text = new Array();
        if (typeof question.text === 'string') {
            text.push(question.text);
        }
        else {
            question.text.list.forEach(function (questionText) {
                text.push(questionText);
            });
        }
        // Get images
        var images = new Array();
        if (question.image)
            images.push(question.image);
        if (question.image2)
            images.push(question.image2);
        return new __WEBPACK_IMPORTED_MODULE_2__models__["h" /* Question */](parseInt(question.id), question.answer, text, answers, images);
    };
    QuestionService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], QuestionService);
    return QuestionService;
}());

//# sourceMappingURL=question.service.js.map

/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// Models

var TestService = /** @class */ (function () {
    function TestService() {
    }
    TestService.prototype.markTest = function (navigationKey, questions, answeredQuestions) {
        var result = new __WEBPACK_IMPORTED_MODULE_1__models__["i" /* TestResult */](navigationKey, 0, 0);
        if (questions.length === 0)
            return result;
        var correctAnswerCount = 0;
        questions.forEach(function (question) {
            var answer = answeredQuestions.find(function (aq) {
                return aq.questionId === question.id;
            });
            if (answer && question.answerId === answer.answerId)
                correctAnswerCount++;
        });
        result.correctAnswers = correctAnswerCount;
        result.totalQuestions = questions.length;
        return result;
    };
    TestService.prototype.markTestMock = function (questionsA, answeredQuestionsA, questionsB, answeredQuestionsB, questionsC, answeredQuestionsC) {
        var resultA = this.markTest('mocktestA', questionsA, answeredQuestionsA);
        var resultB = this.markTest('mocktestB', questionsB, answeredQuestionsB);
        var resultC = this.markTest('mocktestC', questionsC, answeredQuestionsC);
        return new __WEBPACK_IMPORTED_MODULE_1__models__["f" /* MockTestResult */](resultA.totalQuestions, resultA.correctAnswers, 7, resultB.totalQuestions, resultB.correctAnswers, 23, resultC.totalQuestions, resultC.correctAnswers, 24);
    };
    TestService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], TestService);
    return TestService;
}());

//# sourceMappingURL=test.service.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RateService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_app_rate__ = __webpack_require__(204);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RateService = /** @class */ (function () {
    function RateService(appRate) {
        this.appRate = appRate;
        this.appRate.preferences = {
            storeAppURL: {
                // ios: '849930087',
                android: 'market://details?id=mobi.learn2drive3d'
            },
            usesUntilPrompt: 12,
            customLocale: {
                title: 'Please take a moment to rate our app?',
                message: 'Ratings help us put food on the table :)',
                rateButtonLabel: 'Rate app!',
                laterButtonLabel: 'Maybe later',
                cancelButtonLabel: 'No thanks'
            }
        };
    }
    RateService.prototype.promptForRating = function (immediate) {
        this.appRate.promptForRating(immediate);
    };
    RateService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_app_rate__["a" /* AppRate */]])
    ], RateService);
    return RateService;
}());

//# sourceMappingURL=rate.service.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_admob_pro__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AdService = /** @class */ (function () {
    function AdService(admob) {
        this.admob = admob;
    }
    AdService.prototype.prepareInterstitial = function () {
        this.admob.prepareInterstitial({
            adId: 'ca-app-pub-8418396680963201/8587373373',
            autoShow: false
        });
    };
    AdService.prototype.showInterstitial = function () {
        this.admob.showInterstitial();
    };
    AdService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_admob_pro__["a" /* AdMobPro */]])
    ], AdService);
    return AdService;
}());

//# sourceMappingURL=ad.service.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LearnComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_content_service__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_store_service__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// Services


var LearnComponent = /** @class */ (function () {
    function LearnComponent(contentService, storeService) {
        this.contentService = contentService;
        this.storeService = storeService;
        this.contentItems = [];
    }
    LearnComponent.prototype.load = function (navigationKey) {
        var _this = this;
        this.contentService
            .getContent(navigationKey)
            .then(function (items) {
            _this.contentItems = items;
            if (items.length)
                _this.storeService.insertContentRead(navigationKey);
        });
    };
    LearnComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'learn',template:/*ion-inline-start:"C:\_repository\l2dv2\src\components\learn\learn.component.html"*/'\n\n\n\n\n\n<ion-card *ngFor="let content of contentItems">\n\n\n\n    <ion-card-header>\n\n        <div [innerHTML]="content.heading"></div>\n\n    </ion-card-header>\n\n\n\n    <ion-card-content>\n\n        \n\n        <div *ngIf="content.image">\n\n            <img class="image" src="content/images/{{content.image}}">\n\n        </div>\n\n        \n\n        <div [innerHTML]="content.text"></div>\n\n\n\n    </ion-card-content>\n\n</ion-card>\n\n'/*ion-inline-end:"C:\_repository\l2dv2\src\components\learn\learn.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_content_service__["a" /* ContentService */],
            __WEBPACK_IMPORTED_MODULE_2__services_store_service__["a" /* StoreService */]])
    ], LearnComponent);
    return LearnComponent;
}());

//# sourceMappingURL=learn.component.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigatorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavigatorComponent = /** @class */ (function () {
    function NavigatorComponent(navCtrl, contentService) {
        this.navCtrl = navCtrl;
        this.contentService = contentService;
        this.navigationItems = [];
    }
    NavigatorComponent.prototype.load = function (key) {
        var _this = this;
        this.contentService
            .getNavigationItems(key)
            .then(function (items) {
            _this.navigationItems = items;
        });
    };
    NavigatorComponent.prototype.navigateTo = function (navigationItem) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages__["d" /* ContentPage */], {
            navigationKey: navigationItem.key
        });
    };
    NavigatorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'navigator',template:/*ion-inline-start:"C:\_repository\l2dv2\src\components\navigator\navigator.component.html"*/'\n\n<ion-list>\n\n    <ion-item *ngFor="let item of navigationItems" (click)="navigateTo(item)">\n\n        <h2>{{item.key | translate}}</h2>\n\n\n\n        <ion-note item-right>\n\n            <content-progress\n\n                [navigationKey]="item.key">\n\n            </content-progress>\n\n        </ion-note>\n\n         \n\n    </ion-item>\n\n</ion-list>'/*ion-inline-end:"C:\_repository\l2dv2\src\components\navigator\navigator.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__services__["b" /* ContentService */]])
    ], NavigatorComponent);
    return NavigatorComponent;
}());

//# sourceMappingURL=navigator.component.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentProgressComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Services

var ContentProgressComponent = /** @class */ (function () {
    function ContentProgressComponent(navCtrl, progressService) {
        this.navCtrl = navCtrl;
        this.progressService = progressService;
        this.navigationKey = '';
        this.progress = '';
        this.complete = false;
    }
    ContentProgressComponent.prototype.ngOnInit = function () {
        this.loadContentProgress();
    };
    ContentProgressComponent.prototype.loadContentProgress = function () {
        var _this = this;
        this.progressService.getContentProgress(this.navigationKey)
            .then(function (progress) {
            _this.progress = progress.complete + "/" + progress.total;
            _this.complete = progress.isComplete();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], ContentProgressComponent.prototype, "navigationKey", void 0);
    ContentProgressComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'content-progress',template:/*ion-inline-start:"C:\_repository\l2dv2\src\components\content-progress\content-progress.component.html"*/'\n\n<span *ngIf="!complete">{{progress}}</span>\n\n<ion-icon color="favorite" name="md-done-all" *ngIf="complete"></ion-icon>'/*ion-inline-end:"C:\_repository\l2dv2\src\components\content-progress\content-progress.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__services__["c" /* ProgressService */]])
    ], ContentProgressComponent);
    return ContentProgressComponent;
}());

//# sourceMappingURL=content-progress.component.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// Models

var QuestionComponent = /** @class */ (function () {
    function QuestionComponent() {
        this.answerChangedEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.selectedAnswerId = '';
    }
    QuestionComponent.prototype.selectAnswer = function (answerId) {
        this.selectedAnswerId = answerId;
    };
    QuestionComponent.prototype.answerChanged = function () {
        if (this.selectedAnswerId === '')
            return;
        var answeredQuestion = new __WEBPACK_IMPORTED_MODULE_1__models__["b" /* AnsweredQuestion */](this.question.id, this.selectedAnswerId);
        this.answerChangedEvent.emit(answeredQuestion);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__models__["h" /* Question */])
    ], QuestionComponent.prototype, "question", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], QuestionComponent.prototype, "questionNumber", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], QuestionComponent.prototype, "answerChangedEvent", void 0);
    QuestionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'question',template:/*ion-inline-start:"C:\_repository\l2dv2\src\components\question\question.component.html"*/'<ion-card>\n\n\n\n    <ion-card-header>\n\n        Question {{questionNumber}}\n\n    </ion-card-header>\n\n\n\n    <ion-card-content>\n\n\n\n        <p *ngFor="let text of question.text">\n\n            {{text}}\n\n        </p>\n\n\n\n        <p *ngFor="let image of question.images">\n\n            <img class="image" src="content/images/{{image}}">\n\n        </p>\n\n\n\n\n\n        <br/>\n\n\n\n        <ion-list radio-group [(ngModel)]="selectedAnswerId" (ionChange)="answerChanged()">\n\n\n\n          <ion-grid>\n\n                <ion-row *ngFor="let answer of question.answers">\n\n                    <ion-col width-10>\n\n                        <ion-radio value="{{answer.id}}"></ion-radio>\n\n                    </ion-col>\n\n                    <ion-col width-90>\n\n                        <p (click)="selectAnswer(answer.id)">{{answer.text}}</p>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-grid>\n\n\n\n        </ion-list>\n\n\n\n\n\n    </ion-card-content>\n\n\n\n</ion-card>\n\n'/*ion-inline-end:"C:\_repository\l2dv2\src\components\question\question.component.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], QuestionComponent);
    return QuestionComponent;
}());

//# sourceMappingURL=question.component.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestResultQuestionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TestResultQuestionsComponent = /** @class */ (function () {
    function TestResultQuestionsComponent() {
        this.questions = [];
        this.answeredQuestions = [];
    }
    TestResultQuestionsComponent.prototype.isQuestionCorrectlyAnswered = function (question) {
        var userAnswerId = this.getUserAnswer(question.id);
        return question.answerId === userAnswerId;
    };
    TestResultQuestionsComponent.prototype.isCorrectAnswer = function (question, answer) {
        return question.answerId === answer.id;
    };
    TestResultQuestionsComponent.prototype.isUsersAnswer = function (question, answer) {
        return answer.id === this.getUserAnswer(question.id);
    };
    TestResultQuestionsComponent.prototype.getUserAnswer = function (questionId) {
        var answeredQuestion = this.answeredQuestions.find(function (aq) {
            return aq.questionId === questionId;
        });
        if (!answeredQuestion)
            return '0';
        return answeredQuestion.answerId;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], TestResultQuestionsComponent.prototype, "questions", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], TestResultQuestionsComponent.prototype, "answeredQuestions", void 0);
    TestResultQuestionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'test-result-questions',template:/*ion-inline-start:"C:\_repository\l2dv2\src\components\test-result-questions\test-result-questions.component.html"*/'\n\n\n\n<div class="test-result-questions" *ngFor="let question of questions; let i = index">\n\n        \n\n        <ion-card>\n\n\n\n            <ion-card-header>\n\n                Question {{i + 1}}\n\n\n\n                <ion-icon color="favorite" *ngIf="isQuestionCorrectlyAnswered(question)" name="checkmark-circle-outline"></ion-icon>\n\n                <ion-icon color="danger" *ngIf="!isQuestionCorrectlyAnswered(question)" name="close-circle"></ion-icon>\n\n            </ion-card-header>\n\n\n\n            <ion-card-content>\n\n                \n\n                <p ion-text *ngFor="let text of question.text">\n\n                    {{text}}\n\n                </p>\n\n\n\n                <p ion-text *ngFor="let image of question.images">\n\n                    <img class="image" src="content/images/{{image}}">\n\n                </p>\n\n                \n\n                <br/>\n\n            \n\n                <ion-list>\n\n                    <ion-grid>\n\n                        <ion-row *ngFor="let answer of question.answers">\n\n                            <ion-col width-10>\n\n                                <div *ngIf="isCorrectAnswer(question, answer)">\n\n                                    <ion-radio color="favorite" checked="true" [hidden]="question.answerId != answer.id"></ion-radio>\n\n                                </div>\n\n                                <div *ngIf="!isCorrectAnswer(question, answer) && isUsersAnswer(question, answer)">\n\n                                    <ion-radio color="danger" checked="true"></ion-radio>\n\n                                </div>\n\n                                <div *ngIf="!isCorrectAnswer(question, answer) && !isUsersAnswer(question, answer)">\n\n                                    <ion-radio></ion-radio>\n\n                                </div>\n\n                            </ion-col>\n\n                            <ion-col width-90>\n\n                                <p ion-text>{{answer.text}}</p>\n\n                            </ion-col>\n\n                        </ion-row>\n\n                    </ion-grid>\n\n\n\n                </ion-list>\n\n\n\n            </ion-card-content>\n\n\n\n        </ion-card>\n\n\n\n    </div>\n\n'/*ion-inline-end:"C:\_repository\l2dv2\src\components\test-result-questions\test-result-questions.component.html"*/
        })
    ], TestResultQuestionsComponent);
    return TestResultQuestionsComponent;
}());

//# sourceMappingURL=test-result-questions.component.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChecklistItemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Services

// Components

var ChecklistItemComponent = /** @class */ (function () {
    function ChecklistItemComponent(navCtrl, storeService) {
        this.navCtrl = navCtrl;
        this.storeService = storeService;
        this.complete = false;
    }
    ChecklistItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.storeService.getChecklistItem(this.key)
            .then(function (item) {
            if (item != null)
                _this.complete = item.complete;
        });
    };
    ChecklistItemComponent.prototype.showInformation = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages__["b" /* ChecklistItemInfoPage */], {
            heading: this.heading,
            information: this.information
        });
    };
    ChecklistItemComponent.prototype.toggleComplete = function () {
        this.complete = !this.complete;
        this.storeService.updateChecklistItem(this.key, this.complete);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], ChecklistItemComponent.prototype, "key", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], ChecklistItemComponent.prototype, "heading", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], ChecklistItemComponent.prototype, "information", void 0);
    ChecklistItemComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'checklist-item',template:/*ion-inline-start:"C:\_repository\l2dv2\src\components\checklist-item\checklist-item.component.html"*/' \n\n \n\n <div class="checklist-item">\n\n    <ion-card [class.complete]="complete">\n\n        <ion-card-content>\n\n            <ion-card-title (click)="toggleComplete()">\n\n                <ion-row>\n\n                    <ion-col width-10>\n\n                        <ion-icon name="radio-button-off" *ngIf="!complete"></ion-icon>\n\n                        <ion-icon color="favorite" name="checkmark-circle" *ngIf="complete"></ion-icon>\n\n                    </ion-col>\n\n                    <ion-col width-90>\n\n                        {{heading}}\n\n                    </ion-col>\n\n                </ion-row>\n\n                \n\n            </ion-card-title>\n\n\n\n            <p (click)="showInformation()" >More info..</p>\n\n\n\n        </ion-card-content>\n\n    </ion-card>\n\n </div>'/*ion-inline-end:"C:\_repository\l2dv2\src\components\checklist-item\checklist-item.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__services__["h" /* StoreService */]])
    ], ChecklistItemComponent);
    return ChecklistItemComponent;
}());

//# sourceMappingURL=checklist-item.component.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChecklistProgressComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Services

var ChecklistProgressComponent = /** @class */ (function () {
    function ChecklistProgressComponent(navCtrl, progressService) {
        this.navCtrl = navCtrl;
        this.progressService = progressService;
        this.completeCount = 0;
        this.totalCount = 8;
    }
    ChecklistProgressComponent.prototype.ngOnInit = function () {
        this.loadChecklistProgress();
    };
    ChecklistProgressComponent.prototype.loadChecklistProgress = function () {
        var _this = this;
        this.progressService.getChecklistProgress()
            .then(function (progress) {
            _this.totalCount = progress.total;
            _this.completeCount = progress.complete;
        });
    };
    ChecklistProgressComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'checklist-progress',template:/*ion-inline-start:"C:\_repository\l2dv2\src\components\checklist-progress\checklist-progress.component.html"*/'\n\n\n\n<span>{{completeCount}}</span>/<span>{{totalCount}}</span>\n\n'/*ion-inline-end:"C:\_repository\l2dv2\src\components\checklist-progress\checklist-progress.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__services__["c" /* ProgressService */]])
    ], ChecklistProgressComponent);
    return ChecklistProgressComponent;
}());

//# sourceMappingURL=checklist-progress.component.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProgressBarComponent = /** @class */ (function () {
    function ProgressBarComponent() {
        this.progressBar = null;
    }
    ProgressBarComponent.prototype.ngOnInit = function () {
    };
    ProgressBarComponent.prototype.update = function (percent) {
        this.initialize();
        this.progressBar.animate(percent / 100);
    };
    ProgressBarComponent.prototype.initialize = function () {
        if (this.progressBar != null)
            return;
        var outOf = this.outOf;
        this.progressBar = new ProgressBar.Circle('#' + this.key, {
            color: this.colorFrom,
            trailColor: '#eee',
            strokeWidth: 6,
            duration: 1400,
            easing: 'easeInOut',
            from: { color: this.colorFrom },
            to: { color: this.colorTo },
            // Set default step function for all animate calls
            step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
                var value = Math.round(circle.value() * 100);
                var displayText = '';
                if (outOf) {
                    // let x = 1 / outOf * 100;
                    var done = Math.round(value / (1 / outOf * 100));
                    displayText = done + '/' + outOf;
                }
                else {
                    displayText = value + '%';
                }
                circle.setText(displayText);
                circle.text.style.color = state.color;
            }
        });
        this.progressBar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
        this.progressBar.text.style.fontSize = '1.2rem';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], ProgressBarComponent.prototype, "key", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], ProgressBarComponent.prototype, "colorFrom", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], ProgressBarComponent.prototype, "colorTo", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], ProgressBarComponent.prototype, "outOf", void 0);
    ProgressBarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'progressbar',template:/*ion-inline-start:"C:\_repository\l2dv2\src\components\progressbar\progressbar.component.html"*/'<div class="progressbar">\n\n\n\n    <div id=\'{{key}}\'>\n\n    </div>\n\n\n\n</div>'/*ion-inline-end:"C:\_repository\l2dv2\src\components\progressbar\progressbar.component.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ProgressBarComponent);
    return ProgressBarComponent;
}());

//# sourceMappingURL=progressbar.component.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pipes__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3____ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3____["e" /* LearnComponent */],
                __WEBPACK_IMPORTED_MODULE_3____["f" /* NavigatorComponent */],
                __WEBPACK_IMPORTED_MODULE_3____["d" /* ContentProgressComponent */],
                __WEBPACK_IMPORTED_MODULE_3____["h" /* QuestionComponent */],
                __WEBPACK_IMPORTED_MODULE_3____["i" /* TestResultQuestionsComponent */],
                __WEBPACK_IMPORTED_MODULE_3____["a" /* ChecklistItemComponent */],
                __WEBPACK_IMPORTED_MODULE_3____["b" /* ChecklistProgressComponent */],
                __WEBPACK_IMPORTED_MODULE_3____["g" /* ProgressBarComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__pipes__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicModule */],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3____["e" /* LearnComponent */],
                __WEBPACK_IMPORTED_MODULE_3____["f" /* NavigatorComponent */],
                __WEBPACK_IMPORTED_MODULE_3____["d" /* ContentProgressComponent */],
                __WEBPACK_IMPORTED_MODULE_3____["h" /* QuestionComponent */],
                __WEBPACK_IMPORTED_MODULE_3____["i" /* TestResultQuestionsComponent */],
                __WEBPACK_IMPORTED_MODULE_3____["a" /* ChecklistItemComponent */],
                __WEBPACK_IMPORTED_MODULE_3____["b" /* ChecklistProgressComponent */],
                __WEBPACK_IMPORTED_MODULE_3____["g" /* ProgressBarComponent */]
            ],
            entryComponents: [],
            providers: [],
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__translate_pipe__ = __webpack_require__(208);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__translate_pipe__["a" /* TranslatePipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__translate_pipe__["a" /* TranslatePipe */]
            ]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ContentPage = /** @class */ (function () {
    function ContentPage(navCtrl, navParams, contentService, storeService, questionService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.contentService = contentService;
        this.storeService = storeService;
        this.questionService = questionService;
        this.navigationKey = '';
        this.lastTestResult = null;
        this.noTestWrittenForSection = false;
        this.sectionHasTestQuestions = false;
        // Get the supplied navigation key, if not supply use default
        this.navigationKey = navParams.get('navigationKey');
    }
    ContentPage.prototype.ionViewDidEnter = function () {
        this.navigatorComponent.load(this.navigationKey);
        this.loadLastTestResult();
    };
    ContentPage.prototype.ngOnInit = function () {
        var _this = this;
        this.learnComponent.load(this.navigationKey);
        this.questionService.hasQuestions(this.navigationKey)
            .then(function (hasQuestions) {
            _this.sectionHasTestQuestions = hasQuestions;
        });
    };
    ContentPage.prototype.loadLastTestResult = function () {
        var _this = this;
        this.storeService.getLatestTestResult(this.navigationKey)
            .then(function (testResult) {
            _this.lastTestResult = testResult;
            _this.noTestWrittenForSection = testResult ? false : true;
        });
    };
    ContentPage.prototype.startTest = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages__["l" /* TestPage */], {
            navigationKey: this.navigationKey
        });
    };
    ContentPage.prototype.navigateToTestHistory = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages__["k" /* TestHistoryPage */], {
            navigationKey: this.navigationKey
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3__components__["e" /* LearnComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__components__["e" /* LearnComponent */])
    ], ContentPage.prototype, "learnComponent", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3__components__["f" /* NavigatorComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__components__["f" /* NavigatorComponent */])
    ], ContentPage.prototype, "navigatorComponent", void 0);
    ContentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\_repository\l2dv2\src\pages\content\content.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>{{navigationKey | translate}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="content">\n\n  \n\n  <navigator></navigator>\n\n  \n\n  <learn></learn>\n\n\n\n</ion-content>\n\n\n\n\n\n<ion-footer class="content-footer">\n\n  <ion-toolbar *ngIf="sectionHasTestQuestions">\n\n      \n\n      <p ion-text padding-left outline *ngIf="lastTestResult != null" color="secondary">\n\n        Last Test Result for this Section: <b>{{lastTestResult.resultPercent()}}%</b>\n\n      </p>\n\n\n\n      <p ion-text padding-left outline *ngIf="noTestWrittenForSection" color="secondary">\n\n        No Test Written for this Section yet\n\n      </p>\n\n\n\n      <ion-buttons padding-right end *ngIf="lastTestResult != null">\n\n        <button ion-button icon-only color="secondary" (click)="navigateToTestHistory()">\n\n          <ion-icon name="list-box"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n \n\n  </ion-toolbar>\n\n</ion-footer>\n\n\n\n\n\n<ion-fab right bottom class="test-button" *ngIf="sectionHasTestQuestions" style="bottom: 70px">\n\n  <button ion-fab color="secondary" (click)="startTest()" class="test-button">\n\n    <ion-icon name="school"></ion-icon>\n\n  </button>\n\n</ion-fab>'/*ion-inline-end:"C:\_repository\l2dv2\src\pages\content\content.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services__["b" /* ContentService */],
            __WEBPACK_IMPORTED_MODULE_2__services__["h" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_2__services__["d" /* QuestionService */]])
    ], ContentPage);
    return ContentPage;
}());

//# sourceMappingURL=content.js.map

/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3____ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TestPage = /** @class */ (function () {
    function TestPage(navCtrl, navParams, viewCtrl, alertCtrl, questionService, testService, storeService, resourceService, adService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.questionService = questionService;
        this.testService = testService;
        this.storeService = storeService;
        this.resourceService = resourceService;
        this.adService = adService;
        this.navigationKey = '';
        this.questions = [];
        this.testInformationMessageKey = 'TestInformation';
        // AnsweredQuestion Index
        this.answeredQuestions = {};
        // Get the supplied navigation key
        this.navigationKey = navParams.get('navigationKey');
    }
    TestPage.prototype.ngOnInit = function () {
        var _this = this;
        this.viewCtrl.showBackButton(false);
        this.questionService.getQuestions(this.navigationKey, 10)
            .then(function (questions) {
            _this.questions = questions;
        });
        this.storeService.getMessage(this.testInformationMessageKey)
            .then(function (message) {
            if (message.showAgain === true)
                _this.showTestInformation(message);
        });
        this.adService.prepareInterstitial();
    };
    TestPage.prototype.answerChanged = function (answeredQuestion) {
        // Update index
        this.answeredQuestions[answeredQuestion.questionId] = answeredQuestion;
    };
    TestPage.prototype.markTest = function () {
        var answeredQuestions = this.getAnsweredQuestionsList();
        if (answeredQuestions.length < this.questions.length) {
            // Show modal
            this.showMarkTestConfirmation();
            return;
        }
        this.navigateToTestResults();
    };
    TestPage.prototype.navigateToTestResults = function () {
        var _this = this;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3____["m" /* TestResultPage */], {
            navigationKey: this.navigationKey,
            questions: this.questions,
            answeredQuestions: this.getAnsweredQuestionsList()
        })
            .then(function () {
            // Remove itself from the nav stack, 
            // so that we go dont come back here after results
            var index = _this.viewCtrl.index;
            _this.navCtrl.remove(index);
        });
    };
    TestPage.prototype.showTestInformation = function (message) {
        var _this = this;
        this.resourceService.getResource(this.navigationKey)
            .then(function (sectionName) {
            var infoAlert = _this.alertCtrl.create({
                title: 'Information',
                message: "This test contains a set of questions <b>randomly</b> drawn from the <b>'" + sectionName + "'</b> section. \n                    <br/><br/>Tests will contain a maximum of 10 questions.",
                inputs: [
                    {
                        name: 'show-again',
                        label: 'Show this message again?',
                        checked: true,
                        type: 'checkbox'
                    }
                ],
                buttons: [
                    {
                        text: 'Okay',
                        handler: function (data) {
                            var showAgain = data.length === 1;
                            message.showAgain = showAgain;
                            message.shown = true;
                            _this.storeService.updateMessage(message);
                        }
                    }
                ]
            });
            infoAlert.present();
        });
    };
    TestPage.prototype.showMarkTestConfirmation = function () {
        var _this = this;
        var confirmAlert = this.alertCtrl.create({
            title: 'Hold up!',
            message: 'Not all questions have been answered, are you sure you want to mark the test?',
            buttons: [
                {
                    text: 'No',
                    handler: function () { }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.navigateToTestResults();
                    }
                }
            ]
        });
        confirmAlert.present();
    };
    TestPage.prototype.navigateBack = function () {
        var answeredQuestions = this.getAnsweredQuestionsList();
        if (answeredQuestions.length > 0) {
            // Show modal
            this.showNavigateBackConfirmation();
            return;
        }
        this.navCtrl.pop();
    };
    TestPage.prototype.showNavigateBackConfirmation = function () {
        var _this = this;
        var confirmAlert = this.alertCtrl.create({
            title: 'Hold up!',
            message: 'Are you sure you want to quit writing this test?',
            buttons: [
                {
                    text: 'No',
                    handler: function () { }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.navCtrl.pop();
                    }
                }
            ]
        });
        confirmAlert.present();
    };
    TestPage.prototype.getAnsweredQuestionsList = function () {
        var answeredQuestions = [];
        for (var questionId in this.answeredQuestions) {
            answeredQuestions.push(this.answeredQuestions[questionId]);
        }
        return answeredQuestions;
    };
    TestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\_repository\l2dv2\src\pages\test\test.html"*/'\n\n<ion-header>\n\n  <ion-navbar color="secondary">\n\n    <ion-title>{{navigationKey | translate}} Test</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="test">\n\n\n\n    <div *ngFor="let question of questions; let i = index">\n\n        <question \n\n          [question]="question" \n\n          [questionNumber]="i + 1"\n\n          (answerChangedEvent)="answerChanged($event)"></question>\n\n    </div>\n\n\n\n</ion-content>\n\n\n\n\n\n<ion-footer>\n\n  <ion-toolbar color="dark">\n\n\n\n    <ion-buttons left>\n\n      <button ion-button (click)="navigateBack()">\n\n        Cancel\n\n      </button>\n\n    </ion-buttons>\n\n\n\n    <ion-buttons right>\n\n      <button ion-button outline (click)="markTest()">\n\n        Mark Test\n\n      </button>\n\n    </ion-buttons>\n\n    \n\n  </ion-toolbar>\n\n</ion-footer>\n\n\n\n'/*ion-inline-end:"C:\_repository\l2dv2\src\pages\test\test.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__services__["d" /* QuestionService */],
            __WEBPACK_IMPORTED_MODULE_2__services__["i" /* TestService */],
            __WEBPACK_IMPORTED_MODULE_2__services__["h" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_2__services__["f" /* ResourceService */],
            __WEBPACK_IMPORTED_MODULE_2__services__["a" /* AdService */]])
    ], TestPage);
    return TestPage;
}());

//# sourceMappingURL=test.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestResultPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Services

var TestResultPage = /** @class */ (function () {
    function TestResultPage(navCtrl, navParams, testService, storeService, adService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.testService = testService;
        this.storeService = storeService;
        this.adService = adService;
        this.navigationKey = '';
        this.questions = [];
        this.answeredQuestions = [];
        this.resultPercent = null;
        this.navigationKey = navParams.get('navigationKey');
        this.questions = navParams.get('questions');
        this.answeredQuestions = navParams.get('answeredQuestions');
    }
    TestResultPage.prototype.ngOnInit = function () {
        var result = this.testService.markTest(this.navigationKey, this.questions, this.answeredQuestions);
        this.resultPercent = result.resultPercent();
        this.storeService.insertTestResult(result);
        this.adService.showInterstitial();
    };
    TestResultPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\_repository\l2dv2\src\pages\test-result\test-result.html"*/'\n\n\n\n<ion-header>\n\n  <ion-navbar color="secondary">\n\n    <ion-title>Test Result</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="test-result">\n\n\n\n    <ion-card>\n\n        <ion-card-header>\n\n            \n\n            <h1>Your Mark: <b>{{resultPercent}}%</b></h1>\n\n            <hr/>\n\n            <h2 color="dark">Section: {{navigationKey | translate}}</h2>\n\n            \n\n        </ion-card-header>\n\n    </ion-card>\n\n\n\n    <test-result-questions\n\n        [questions]="questions"\n\n        [answeredQuestions]="answeredQuestions">\n\n    </test-result-questions>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\_repository\l2dv2\src\pages\test-result\test-result.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services__["i" /* TestService */],
            __WEBPACK_IMPORTED_MODULE_2__services__["h" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_2__services__["a" /* AdService */]])
    ], TestResultPage);
    return TestResultPage;
}());

//# sourceMappingURL=test-result.js.map

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChecklistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChecklistPage = /** @class */ (function () {
    function ChecklistPage(alertCtrl, storeService, contentService) {
        this.alertCtrl = alertCtrl;
        this.storeService = storeService;
        this.contentService = contentService;
        this.rootNavigationKey = 'rootNavigation.learner';
        // Conent Read
        this.contentAllRead = null;
        this.contentReadCount = null;
        this.contentSectionCount = null;
        // Mock Test
        this.mockTestsPassed = false;
    }
    ChecklistPage.prototype.ngOnInit = function () {
        this.loadContentRead();
        this.loadMockTestsPassed();
    };
    ChecklistPage.prototype.loadContentRead = function () {
        var _this = this;
        this.storeService.getContentReadCount(this.rootNavigationKey)
            .then(function (readCount) {
            _this.contentService.getContentSectionCount(_this.rootNavigationKey)
                .then(function (sectionCount) {
                _this.contentAllRead = readCount >= sectionCount;
                _this.contentReadCount = readCount;
                _this.contentSectionCount = sectionCount;
            });
        });
    };
    ChecklistPage.prototype.loadMockTestsPassed = function () {
        var _this = this;
        this.storeService.getMockTestsPassed().
            then(function (count) {
            _this.mockTestsPassed = (count >= _this.storeService.MOCK_TEST_PASS_TARGET);
        });
    };
    ChecklistPage.prototype.toggleContentAllRead = function () {
        if (this.contentAllRead === true)
            return;
        var infoAlert = this.alertCtrl.create({
            title: 'Information',
            message: 'In order to complete this checklist item you must first read through all the content.',
            buttons: [
                {
                    text: 'Okay'
                }
            ]
        });
        infoAlert.present();
    };
    ChecklistPage.prototype.toggleMockTestsPassed = function () {
        if (this.mockTestsPassed === true)
            return;
        var infoAlert = this.alertCtrl.create({
            title: 'Information',
            message: 'In order to complete this checklist item you must first pass the mock test 3 times.',
            buttons: [
                {
                    text: 'Okay'
                }
            ]
        });
        infoAlert.present();
    };
    ChecklistPage.prototype.checklistChanged = function () {
        var component = this;
        setTimeout(function () {
            component.checklistProgressComponent.loadChecklistProgress();
        }, 500);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3__components__["b" /* ChecklistProgressComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__components__["b" /* ChecklistProgressComponent */])
    ], ChecklistPage.prototype, "checklistProgressComponent", void 0);
    ChecklistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\_repository\l2dv2\src\pages\checklist\checklist.html"*/'\n\n<ion-header>\n\n<ion-navbar color="dark">\n\n  <ion-toolbar>\n\n    <ion-title>Checklist</ion-title>\n\n    <ion-buttons end>\n\n        <button ion-button color="royal" class="title">\n\n            <checklist-progress></checklist-progress>\n\n        </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-navbar>\n\n</ion-header>\n\n\n\n\n\n\n\n<ion-content class="checklist" (click)="checklistChanged()">\n\n\n\n  \n\n        <checklist-item key="HaveId"\n\n                        heading="Apply for an ID document if you don\'t already have one"\n\n                        information="Where can I go to get an ID document?\n\n <ul>\n\n <li>\n\n Any District or Regional office of the Department of Home Affairs\n\n </li>\n\n <li>\n\n The Department of Home Affairs website at <a href=\'http://www.home-affairs.gov.za\' target=\'_blank\' hidefocus>http://www.home-affairs.gov.za</a> lists offices in all the provinces\n\n </li>\n\n </ul>\n\n What are the requirements for getting an ID document?\n\n <ul>\n\n <li>\n\n You need to be 16 years or older.\n\n </li>\n\n <li>\n\n You need to be a South African citizen or Permanent Resident.\n\n </li>\n\n <li>\n\n Go to Home Affairs office and fill in form BI-9 in black pen.\n\n </li>\n\n <li>\n\n Fingerprints will be taken at the office.\n\n </li>\n\n <li>\n\n Take with you a certified copy of your birth certificate.\n\n </li>\n\n <li>\n\n Take four black and white photographs (45mm x 35mm).\n\n </li>\n\n <li>\n\n If you are married, take a certified copy of your marriage certificate\n\n </li>\n\n <li>\n\n The first application for an ID document is free of charge.\n\n </li>\n\n <li>\n\n Details on the requirements for obtaining ID documents as well as Birth and Marriage Certificates can be found on the Department of Home Affairs website at <a href=\'http://www.home-affairs.gov.za/Civic%20Services.html\' target=\'_blank\' hidefocus>http://www.home-affairs.gov.za/Civic Services.html</a>\n\n </li>\n\n </ul>\n\n How long does it take to get an ID document?\n\n <ul>\n\n <li>\n\n The Department of Home Affairs lists the waiting period as 2 months.\n\n </li>\n\n <li>\n\n You may want to apply early in case of delays.\n\n </li>\n\n <li>\n\n If two months has passed since you applied, phone them to check on the status of your application.\n\n </li>\n\n </ul>">\n\n                </checklist-item>\n\n\n\n\n\n                <checklist-item key="MeetRequirements"\n\n                        heading="Make sure you meet all the requirements for a Learner\'s Licence"\n\n                        information="<ul>\n\n <li>\n\n For light motor vehicles you need to be 17 years or older.\n\n </li>\n\n <li>\n\n You may not have been disqualified from getting a Learner\'s or Driver\'s Licence by court of law.\n\n </li>\n\n <li>\n\n You may not apply if your Licence has been suspended and you are still within the period of suspension, or your Licence has \n\n \n\n been endorsed or cancelled.\n\n </li>\n\n <li>\n\n You may not apply if you already have a Licence for same class of vehicle.\n\n </li>\n\n <li>\n\n You must have no physical or mental disability that would make it difficult or dangerous for you to drive (including \n\n \n\n uncontrolled epilepsy or diabetes). If you already have a Licence and you become aware of such a defect it is your \n\n \n\n responsibility to report it to the authorities within 21 days of becoming aware of it.\n\n </li>\n\n </ul>">\n\n                </checklist-item>\n\n\n\n      \n\n\n\n        <checklist-item key="EyeTest"\n\n                        heading="Practise the eye test, or do a free eye test at an optometrist"\n\n                        information="<ul>\n\n <li>\n\n You need to have a Snellen rating of at least 6/12 in both eyes, or if one eye is less than this the other must be 6/9.\n\n </li> \n\n <li>\n\n The SA Optometric Association website at <a href=\'http://www.saoa.co.za\' target=\'_blank\' hidefocus>http://www.saoa.co.za</a> has details on their \n\n \n\n &quot;Eye Sense for your Licence&quot; programme - you can do a free eye test at participating members, and they give you a certificate. This certificate \n\n \n\n is accepted by the Traffic Department for Driver\'s Licence applications, and by some Traffic Departments for Learner\'s Licence applications. Check with your Traffic Department. \n\n </li>\n\n <li>\n\n They also have a sample Visual Acuity Chart, similar to the eye chart that is used at the Traffic Department for the eye test, which you can print out and use to give you an idea of whether you need to go for a formal test at an optometrist.\n\n </li>\n\n <li>\n\n If you fail the eye test, get glasses or contact lenses. You may drive with glasses or contacts, but your licence will be\n\n \n\n endorsed and you will always need to have them with you when you are driving.\n\n </li>\n\n </ul>">\n\n        </checklist-item>\n\n\n\n\n\n        <checklist-item key="IdPhotots"\n\n                        heading="Get four ID photos"\n\n                        information="These should be 40mm x 30mm passport size photos and can be black and white or colour.">\n\n        </checklist-item>\n\n\n\n\n\n        <checklist-item key="BookLearners"\n\n                        heading="Book for your Learner\'s Licence test at the Test Centre"\n\n                        information="Where can I go to book for my Learner\'s Licence?\n\n <ul>\n\n <li>\n\n You need to go to a Learner\'s Licence Test Centre. Enquire from your nearest Traffic Department.\n\n </li>\n\n <li>\n\n To book tests in Gauteng, call the call centre on 0860 428 8364 after 12:30. You will still need to go to the Test Centre they \n\n \n\n book you at to make a payment, so make sure you get the details from the Call Centre.\n\n </li>\n\n </ul>\n\n What are the requirements for booking a Learner\'s Licence test?\n\n <ul>\n\n <li>\n\n Go in person.\n\n </li>\n\n <li> \n\n Take the prescribed fee. This varies per province, so contact your Test Centre to find out what the fee is.\n\n </li>\n\n <li> \n\n Take a valid ID book.\n\n </li>\n\n <li> \n\n Take two ID photos (they can be colour or black and white).\n\n </li>\n\n <li> \n\n At the Test Centre you will fill in Form LL1.\n\n </li>\n\n <li> \n\n Your eyes will be tested at the Test Centre.\n\n </li>\n\n </ul>">\n\n        </checklist-item>\n\n\n\n         <ion-card>\n\n\n\n            <ion-card-content>\n\n                <ion-card-title (click)="toggleContentAllRead()">\n\n                   \n\n                    <ion-row>\n\n                        <ion-col width-10>\n\n                            <ion-icon name="radio-button-off" *ngIf="!contentAllRead"></ion-icon>\n\n                            <ion-icon color="primary" name="checkmark-circle" *ngIf="contentAllRead"></ion-icon>\n\n                        </ion-col>\n\n                        <ion-col width-90>\n\n                             Read all content\n\n                        </ion-col>\n\n                    </ion-row>\n\n\n\n                </ion-card-title>\n\n\n\n                <p>{{contentReadCount}} of {{contentSectionCount}} sections read</p>\n\n\n\n            </ion-card-content>\n\n\n\n        </ion-card>\n\n\n\n\n\n        <ion-card>\n\n             <ion-card-content>\n\n                <ion-card-title (click)="toggleMockTestsPassed()">\n\n                    \n\n                     <ion-row>\n\n                        <ion-col width-10>\n\n                            <ion-icon name="radio-button-off" *ngIf="!mockTestsPassed"></ion-icon>\n\n                            <ion-icon color="primary" name="checkmark-circle" *ngIf="mockTestsPassed"></ion-icon>\n\n                        </ion-col>\n\n                        <ion-col width-90>\n\n                             Pass the Mock Test 3 times\n\n                        </ion-col>\n\n                    </ion-row>\n\n\n\n                </ion-card-title>\n\n\n\n            </ion-card-content>\n\n            \n\n        </ion-card>\n\n\n\n        <checklist-item key="GoToTestCenter"\n\n                        heading="Go to the Test Centre to write your test"\n\n                        information="What should I take with me to the test?\n\n <ul>\n\n <li>\n\n The test fee receipt you received when you booked your test.\n\n </li>\n\n <li>\n\n Your valid ID book.\n\n </li>\n\n <li>\n\n A pencil.\n\n </li>\n\n <li>\n\n The prescribed fee for the issuing of the Licence if you pass your test (this is a second fee, not the same as the booking \n\n \n\n fee). The fee varies, so check with your Test Centre beforehand.\n\n </li>\n\n </ul>\n\n If I pass, how long do I wait for my Learner\'s Licence?\n\n <ul>\n\n <li>\n\n Your Licence will be issued to you immediately after passing your test.\n\n </li>\n\n </ul>\n\n What does the Learner\'s Licence entitle me to do?\n\n <ul>\n\n <li>\n\n You may now drive a car, subject to the following rules:\n\n </li>\n\n <li>\n\n You must carry your Learner\'s Licence with you at all times while driving.\n\n </li>\n\n <li>\n\n You need to have a supervisor with you at all times who:\n\n <ul>\n\n <li>\n\n Has a valid Licence for the same class of vehicle\n\n </li>\n\n <li>\n\n Has to sit in the passenger seat or behind the driver\'s seat if they can\'t sit in the passenger seat\n\n </li>\n\n <li>\n\n Can\'t be under the influence of drugs or alcohol\n\n </li>\n\n </ul>\n\n </li>\n\n <li>\n\n You don\'t have to use L plates by law, but other drivers are more likely to be patient with you if you do (remember to remove \n\n \n\n them after each driving session).\n\n </li>\n\n <li>\n\n You may have other passengers in the car, but not paying passengers.\n\n </li>\n\n <li>\n\n You may tow a caravan/trailer.\n\n </li>\n\n <li>\n\n You may go on freeways.\n\n </li>\n\n </ul>\n\n How long is the Learner\'s Licence valid for?\n\n <ul>\n\n <li>\n\n 24 months from the date of issue.\n\n </li>\n\n </ul>">\n\n        </checklist-item>\n\n\n\n\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"C:\_repository\l2dv2\src\pages\checklist\checklist.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__services__["h" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_2__services__["b" /* ContentService */]])
    ], ChecklistPage);
    return ChecklistPage;
}());

//# sourceMappingURL=checklist.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChecklistItemInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ChecklistItemInfoPage = /** @class */ (function () {
    function ChecklistItemInfoPage(navParams) {
        this.navParams = navParams;
        this.heading = navParams.get('heading');
        this.information = navParams.get('information');
    }
    ChecklistItemInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\_repository\l2dv2\src\pages\checklist-item-info\checklist-item-info.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n    <ion-title>Checklist</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="checklist-item-info">\n\n\n\n      <ion-card>\n\n        <ion-card-header>\n\n            {{heading}}\n\n        </ion-card-header>\n\n        <ion-card-content>\n\n            <p [innerHTML]="information"></p>\n\n          </ion-card-content>\n\n      </ion-card>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\_repository\l2dv2\src\pages\checklist-item-info\checklist-item-info.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ChecklistItemInfoPage);
    return ChecklistItemInfoPage;
}());

//# sourceMappingURL=checklist-item-info.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_app_version__ = __webpack_require__(205);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AboutPage = /** @class */ (function () {
    function AboutPage(platform, appVersion) {
        this.platform = platform;
        this.appVersion = appVersion;
        this.version = '';
    }
    AboutPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.appVersion.getVersionNumber().then(function (s) {
                _this.version = s;
            });
        }
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            providers: [__WEBPACK_IMPORTED_MODULE_2__ionic_native_app_version__["a" /* AppVersion */]],template:/*ion-inline-start:"C:\_repository\l2dv2\src\pages\about\about.html"*/'\n\n<ion-header>\n\n  <ion-navbar color="dark">\n\n    <ion-title>About</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n\n\n    <ion-card>\n\n         <ion-card-content>\n\n            <p>\n\n                <b>Version:</b>\n\n            </p>\n\n            <p>\n\n               {{version}}\n\n            </p> \n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n         <ion-card-content>\n\n            <p>\n\n                <b>Developed by:</b>\n\n            </p>\n\n            <p>\n\n               Alchemy Software\n\n            </p> \n\n            <p>\n\n                <a class="item" href="#" onclick="window.open(\'http://www.alchemysoftware.co.za\', \'_system\', \'location=yes\'); return false;">\n\n                    http://www.alchemysoftware.co.za\n\n                </a>\n\n            </p> \n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n         <ion-card-content>\n\n            <p>\n\n                <b>Learn2Drive3D</b>\n\n            </p>\n\n            <p>\n\n               Learn2Drive is based on the full version of the application Learn2Drive3D\n\n            </p> \n\n            <p>\n\n               <a class="item" href="#" onclick="window.open(\'http://www.learn2drive3d.net/\', \'_system\', \'location=yes\'); return false;">\n\n                    http://www.learn2drive3d.net/\n\n                </a>\n\n            </p> \n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\_repository\l2dv2\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_app_version__["a" /* AppVersion */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Services

var SettingsPage = /** @class */ (function () {
    function SettingsPage(alertCtrl, storeService) {
        this.alertCtrl = alertCtrl;
        this.storeService = storeService;
    }
    SettingsPage.prototype.clearTestResults = function () {
        var _this = this;
        var confirmAlert = this.alertCtrl.create({
            title: 'Warning!',
            message: 'Are you sure you want to clear ALL your test results?',
            buttons: [
                {
                    text: 'No',
                    handler: function () { }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.storeService.clearTestResults();
                    }
                }
            ]
        });
        confirmAlert.present();
    };
    SettingsPage.prototype.clearContentRead = function () {
        var _this = this;
        var confirmAlert = this.alertCtrl.create({
            title: 'Warning!',
            message: 'Are you sure you want to clear ALL your study history?',
            buttons: [
                {
                    text: 'No',
                    handler: function () { }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.storeService.clearContentRead();
                    }
                }
            ]
        });
        confirmAlert.present();
    };
    SettingsPage.prototype.recreateSqliteDb = function () {
        var _this = this;
        var confirmAlert = this.alertCtrl.create({
            title: 'Warning!',
            message: 'Are you sure you want to delete ALL user data?',
            buttons: [
                {
                    text: 'No',
                    handler: function () { }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.storeService.clearAll();
                    }
                }
            ]
        });
        confirmAlert.present();
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            providers: [__WEBPACK_IMPORTED_MODULE_2__services__["h" /* StoreService */]],template:/*ion-inline-start:"C:\_repository\l2dv2\src\pages\settings\settings.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n    <ion-title>Settings</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n\n\n\n\n    <ion-item-group>\n\n        <ion-item-divider color="light">Study</ion-item-divider>\n\n        <ion-item (click)="clearContentRead()">\n\n            Clear Study History\n\n            <ion-icon name="trash" item-right></ion-icon>\n\n        </ion-item>\n\n    </ion-item-group>\n\n\n\n     <ion-item-group>\n\n        <ion-item-divider color="light">Tests</ion-item-divider>\n\n         <ion-item (click)="clearTestResults()">\n\n            Clear Test Results\n\n            <ion-icon name="trash" item-right></ion-icon>\n\n        </ion-item>\n\n    </ion-item-group>\n\n\n\n     <ion-item-group>\n\n        <ion-item-divider color="light">Developers</ion-item-divider>\n\n        <ion-item (click)="recreateSqliteDb()">\n\n            Delete ALL User Data\n\n            <ion-icon name="trash" item-right></ion-icon>\n\n        </ion-item>\n\n    </ion-item-group>\n\n\n\n</ion-content>\n\n\n\n\n\n'/*ion-inline-end:"C:\_repository\l2dv2\src\pages\settings\settings.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__services__["h" /* StoreService */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 320:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MockTestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3____ = __webpack_require__(22);
// <xsl:variable name="numCorrectSectionA" select="count(//testAnswer[responseId=correctResponseId]/questionParentId[substring(., 1, string-length('rootNavigation.learner.vehicleControls'))='rootNavigation.learner.vehicleControls'])"/>
//   <xsl:apply-templates select="//testAnswer[1]" mode="mockTestResult">
//   <xsl:with-param name="heading" select="'SECTION A'"/>
//   <xsl:with-param name="numQuestions" select="8"/>
//   <xsl:with-param name="passMark" select="7"/>
//   <xsl:with-param name="numCorrect" select="$numCorrectSectionA" />
//   </xsl:apply-templates>
//
// <xsl:variable name="numCorrectSectionB" select="count(//testAnswer[responseId=correctResponseId]/questionParentId[substring(., 1, string-length('rootNavigation.learner.rulesOfTheRoad'))='rootNavigation.learner.rulesOfTheRoad'    or     substring(., 1, string-length('rootNavigation.learner.defensiveDriving'))='rootNavigation.learner.defensiveDriving'    or    substring(., 1, string-length('rootNavigation.learner.roadSignals'))='rootNavigation.learner.roadSignals'])"/>
//   <xsl:apply-templates select="//testAnswer[1]" mode="mockTestResult">
//   <xsl:with-param name="heading" select="'SECTION B'"/>
//   <xsl:with-param name="numQuestions" select="28"/>
//   <xsl:with-param name="passMark" select="23"/>
//   <xsl:with-param name="numCorrect" select="$numCorrectSectionB" />
//   </xsl:apply-templates>
//
// <xsl:variable name="numCorrectSectionC" select="count(//testAnswer[responseId=correctResponseId]/questionParentId[substring(., 1, string-length('rootNavigation.learner.signs'))='rootNavigation.learner.signs'    or    substring(., 1, string-length('rootNavigation.learner.roadMarkings'))='rootNavigation.learner.roadMarkings'])"/>
//   <xsl:apply-templates select="//testAnswer[1]" mode="mockTestResult">
//   <xsl:with-param name="heading" select="'SECTION C'"/>
//   <xsl:with-param name="numQuestions" select="28"/>
//   <xsl:with-param name="passMark" select="24"/>
//   <xsl:with-param name="numCorrect" select="$numCorrectSectionC" />
//   </xsl:apply-templates>
//
// <xsl:variable name="count" select="64"/>
//   <xsl:variable name="mark" select="$numCorrectSectionA + $numCorrectSectionB + $numCorrectSectionC"/>
//   <xsl:variable name="average" select="$mark div $count * 100"/>
//   <xsl:variable name="passed" select="$numCorrectSectionA &gt;= 7 and $numCorrectSectionB &gt;= 23 and $numCorrectSectionC &gt;= 24"/>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MockTestPage = /** @class */ (function () {
    function MockTestPage(navCtrl, viewCtrl, alertCtrl, loadingCtrl, questionService, testService, adService) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.questionService = questionService;
        this.testService = testService;
        this.adService = adService;
        this.questionsA = [];
        this.questionsB = [];
        this.questionsC = [];
        this.questionCountA = 8;
        this.questionCountB = 28;
        this.questionCountC = 28;
        // AnsweredQuestion Dictionaries
        this.answeredQuestionsA = {};
        this.answeredQuestionsB = {};
        this.answeredQuestionsC = {};
    }
    MockTestPage.prototype.ngOnInit = function () {
        var _this = this;
        this.viewCtrl.showBackButton(false);
        this.questionService.getQuestions('rootNavigation.learner.vehicleControls', this.questionCountA)
            .then(function (questions) {
            _this.questionsA = questions;
        });
        this.questionService.getQuestionsByKeys(['rootNavigation.learner.rulesOfTheRoad',
            'rootNavigation.learner.defensiveDriving',
            'rootNavigation.learner.roadSignals'], this.questionCountB)
            .then(function (questions) {
            _this.questionsB = questions;
        });
        this.questionService.getQuestionsByKeys(['rootNavigation.learner.signs',
            'rootNavigation.learner.defensiveDriving',
            'rootNavigation.learner.roadMarkings'], this.questionCountC)
            .then(function (questions) {
            _this.questionsC = questions;
        });
        this.adService.prepareInterstitial();
    };
    MockTestPage.prototype.answerChangedA = function (answeredQuestion) {
        this.answeredQuestionsA[answeredQuestion.questionId] = answeredQuestion;
    };
    MockTestPage.prototype.answerChangedB = function (answeredQuestion) {
        this.answeredQuestionsB[answeredQuestion.questionId] = answeredQuestion;
    };
    MockTestPage.prototype.answerChangedC = function (answeredQuestion) {
        this.answeredQuestionsC[answeredQuestion.questionId] = answeredQuestion;
    };
    MockTestPage.prototype.markTest = function () {
        var totalQuestions = this.questionCountA +
            this.questionCountB +
            this.questionCountC;
        var answerQuestionListA = this.getAnsweredQuestionsList(this.answeredQuestionsA);
        var answerQuestionListB = this.getAnsweredQuestionsList(this.answeredQuestionsB);
        var answerQuestionListC = this.getAnsweredQuestionsList(this.answeredQuestionsC);
        var totalAnsweredQuestions = answerQuestionListA.length +
            answerQuestionListB.length +
            answerQuestionListC.length;
        if (totalAnsweredQuestions < totalQuestions) {
            // Show modal
            this.showMarkTestConfirmation(answerQuestionListA, answerQuestionListB, answerQuestionListC);
            return;
        }
        this.navigateToTestResults(answerQuestionListA, answerQuestionListB, answerQuestionListC);
    };
    MockTestPage.prototype.navigateToTestResults = function (answerQuestionListA, answerQuestionListB, answerQuestionListC) {
        var _this = this;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3____["h" /* MockTestResultPage */], {
            questionsA: this.questionsA,
            questionsB: this.questionsB,
            questionsC: this.questionsC,
            answerQuestionListA: answerQuestionListA,
            answerQuestionListB: answerQuestionListB,
            answerQuestionListC: answerQuestionListC
        })
            .then(function () {
            // Remove itself from the nav stack,
            // so that we go dont come back here after results
            var index = _this.viewCtrl.index;
            _this.navCtrl.remove(index);
        });
    };
    MockTestPage.prototype.showMarkTestConfirmation = function (answerQuestionListA, answerQuestionListB, answerQuestionListC) {
        var _this = this;
        var confirmAlert = this.alertCtrl.create({
            title: 'Hold up!',
            message: 'Not all questions have been answered, are you sure you want to mark the test?',
            buttons: [
                {
                    text: 'No',
                    handler: function () { }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.navigateToTestResults(answerQuestionListA, answerQuestionListB, answerQuestionListC);
                    }
                }
            ]
        });
        confirmAlert.present();
    };
    MockTestPage.prototype.navigateBack = function () {
        var answeredQuestions = this.getAnsweredQuestionsList(this.answeredQuestionsA).length
            + this.getAnsweredQuestionsList(this.answeredQuestionsB).length
            + this.getAnsweredQuestionsList(this.answeredQuestionsC).length;
        if (answeredQuestions > 0) {
            // Show modal
            this.showNavigateBackConfirmation();
            return;
        }
        this.navCtrl.pop();
    };
    MockTestPage.prototype.showNavigateBackConfirmation = function () {
        var _this = this;
        var confirmAlert = this.alertCtrl.create({
            title: 'Hold up!',
            message: 'Are you sure you want to quit writing this test?',
            buttons: [
                {
                    text: 'No',
                    handler: function () { }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.navCtrl.pop();
                    }
                }
            ]
        });
        confirmAlert.present();
    };
    MockTestPage.prototype.getAnsweredQuestionsList = function (dictionary) {
        var answeredQuestions = [];
        for (var questionId in dictionary) {
            answeredQuestions.push(dictionary[questionId]);
        }
        return answeredQuestions;
    };
    MockTestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\_repository\l2dv2\src\pages\mock-test\mock-test.html"*/'\n\n<ion-header>\n\n  <ion-navbar color="secondary">\n\n    <ion-title>Mock Test</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n  <ion-content class="mock-test">\n\n\n\n      <ion-card>\n\n        <ion-card-header class="section-header">\n\n          <span color="secondary" class="main">Section A</span>\n\n          <span class="secondary">8 Questions</span>\n\n        </ion-card-header>\n\n      </ion-card>\n\n\n\n      <div *ngFor="let question of questionsA; let i = index">\n\n        <question\n\n          [question]="question"\n\n          [questionNumber]="i + 1"\n\n          (answerChangedEvent)="answerChangedA($event)"></question>\n\n      </div>\n\n\n\n      <ion-card>\n\n        <ion-card-header class="section-header">\n\n          <span color="secondary" class="main">Section B</span>\n\n          <span class="secondary">28 Questions</span>\n\n        </ion-card-header>\n\n      </ion-card>\n\n\n\n      <div *ngFor="let question of questionsB; let i = index">\n\n        <question\n\n          [question]="question"\n\n          [questionNumber]="i + 1"\n\n          (answerChangedEvent)="answerChangedB($event)"></question>\n\n      </div>\n\n\n\n      <ion-card>\n\n        <ion-card-header class="section-header">\n\n          <span color="secondary" class="main">Section C</span>\n\n          <span class="secondary">28 Questions</span>\n\n        </ion-card-header>\n\n      </ion-card>\n\n\n\n      <div *ngFor="let question of questionsC; let i = index">\n\n        <question\n\n          [question]="question"\n\n          [questionNumber]="i + 1"\n\n          (answerChangedEvent)="answerChangedC($event)"></question>\n\n      </div>\n\n\n\n  </ion-content>\n\n\n\n<ion-footer>\n\n  <ion-toolbar color="secondary">\n\n\n\n    <ion-buttons left>\n\n      <button ion-button (click)="navigateBack()">\n\n        Cancel\n\n      </button>\n\n    </ion-buttons>\n\n\n\n    <ion-buttons right>\n\n      <button ion-button outline (click)="markTest()">\n\n        Mark Test\n\n      </button>\n\n    </ion-buttons>\n\n\n\n  </ion-toolbar>\n\n</ion-footer>\n\n\n\n'/*ion-inline-end:"C:\_repository\l2dv2\src\pages\mock-test\mock-test.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__services__["d" /* QuestionService */],
            __WEBPACK_IMPORTED_MODULE_2__services__["i" /* TestService */],
            __WEBPACK_IMPORTED_MODULE_2__services__["a" /* AdService */]])
    ], MockTestPage);
    return MockTestPage;
}());

//# sourceMappingURL=mock-test.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MockTestResultPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MockTestResultPage = /** @class */ (function () {
    function MockTestResultPage(navParams, testService, storeService, adService) {
        this.navParams = navParams;
        this.testService = testService;
        this.storeService = storeService;
        this.adService = adService;
        this.questionsA = [];
        this.questionsB = [];
        this.questionsC = [];
        this.answeredQuestionsA = [];
        this.answeredQuestionsB = [];
        this.answeredQuestionsC = [];
        this.testPassed = null;
        this.questionsA = navParams.get('questionsA');
        this.questionsB = navParams.get('questionsB');
        this.questionsC = navParams.get('questionsC');
        this.answeredQuestionsA = navParams.get('answerQuestionListA');
        this.answeredQuestionsB = navParams.get('answerQuestionListB');
        this.answeredQuestionsC = navParams.get('answerQuestionListC');
    }
    MockTestResultPage.prototype.ngOnInit = function () {
        this.result = this.testService.markTestMock(this.questionsA, this.answeredQuestionsA, this.questionsB, this.answeredQuestionsB, this.questionsC, this.answeredQuestionsC);
        this.testPassed = this.result.passed();
        this.storeService.insertMockTestResult(this.result);
        this.adService.showInterstitial();
    };
    MockTestResultPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\_repository\l2dv2\src\pages\mock-test-result\mock-test-result.html"*/'\n\n\n\n<ion-header>\n\n  <ion-navbar color="secondary">\n\n    <ion-title>Mock Test Result</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="mock-test-result">\n\n\n\n    <ion-card>\n\n        <ion-card-header class="main-header">\n\n            <div *ngIf="testPassed === true">\n\n              <h1 color="favorite">\n\n                Congratulations!\n\n                <ion-icon name="happy"></ion-icon>\n\n              </h1>\n\n              <h2>You passed</h2>\n\n            </div>\n\n            <div *ngIf="testPassed === false">\n\n              <h1 color="danger">\n\n                Bad Luck..\n\n                <ion-icon name="sad"></ion-icon>\n\n              </h1>\n\n              <h2>You failed</h2>\n\n            </div>\n\n        </ion-card-header>\n\n\n\n        <ion-card-content class="section-summary">\n\n\n\n          <ion-list>\n\n            <ion-item>\n\n              <ion-icon *ngIf="result.sectionAPassed()" color="favorite" name="thumbs-up" item-left></ion-icon>\n\n              <ion-icon *ngIf="!result.sectionAPassed()" color="danger" name="thumbs-down" item-left></ion-icon>\n\n              <h2>Section A</h2>\n\n              <p>Pass mark {{result.passCountA}}/{{result.questionCountA}}</p>\n\n              <ion-note item-right [class.pass]="result.sectionAPassed()" [class.fail]="!result.sectionAPassed()">\n\n                {{result.correntAnswersA}}/{{result.questionCountA}}\n\n              </ion-note>\n\n            </ion-item>\n\n            <ion-item>\n\n              <ion-icon *ngIf="result.sectionBPassed()" color="favorite" name="thumbs-up" item-left></ion-icon>\n\n              <ion-icon *ngIf="!result.sectionBPassed()" color="danger" name="thumbs-down" item-left></ion-icon>\n\n              <h2>Section B</h2>\n\n              <p>Pass mark {{result.passCountB}}/{{result.questionCountB}}</p>\n\n              <ion-note item-right [class.pass]="result.sectionBPassed()" [class.fail]="!result.sectionBPassed()">\n\n                {{result.correntAnswersB}}/{{result.questionCountB}}\n\n              </ion-note>\n\n            </ion-item>\n\n            <ion-item>\n\n              <ion-icon *ngIf="result.sectionCPassed()" color="favorite" name="thumbs-up" item-left></ion-icon>\n\n              <ion-icon *ngIf="!result.sectionCPassed()" color="danger" name="thumbs-down" item-left></ion-icon>\n\n              <h2>Section C</h2>\n\n              <p>Pass mark {{result.passCountC}}/{{result.questionCountC}}</p>\n\n              <ion-note item-right [class.pass]="result.sectionCPassed()" [class.fail]="!result.sectionCPassed()">\n\n                {{result.correntAnswersC}}/{{result.questionCountC}}\n\n              </ion-note>\n\n            </ion-item>\n\n          </ion-list>\n\n\n\n        </ion-card-content>\n\n\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n      <ion-card-header class="section-header">\n\n        <span color="secondary" class="main">Section A</span>\n\n        <span class="secondary">8 Questions</span>\n\n      </ion-card-header>\n\n    </ion-card>\n\n\n\n    <test-result-questions\n\n        [questions]="questionsA"\n\n        [answeredQuestions]="answeredQuestionsA">\n\n    </test-result-questions>\n\n\n\n    <ion-card>\n\n      <ion-card-header class="section-header">\n\n        <span color="secondary" class="main">Section B</span>\n\n        <span class="secondary">28 Questions</span>\n\n      </ion-card-header>\n\n    </ion-card>\n\n\n\n    <test-result-questions\n\n        [questions]="questionsB"\n\n        [answeredQuestions]="answeredQuestionsB">\n\n    </test-result-questions>\n\n\n\n    <ion-card>\n\n      <ion-card-header class="section-header">\n\n        <span color="secondary" class="main">Section C</span>\n\n        <span class="secondary">28 Questions</span>\n\n      </ion-card-header>\n\n    </ion-card>\n\n\n\n    <test-result-questions\n\n        [questions]="questionsC"\n\n        [answeredQuestions]="answeredQuestionsC">\n\n    </test-result-questions>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\_repository\l2dv2\src\pages\mock-test-result\mock-test-result.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services__["i" /* TestService */],
            __WEBPACK_IMPORTED_MODULE_2__services__["h" /* StoreService */],
            __WEBPACK_IMPORTED_MODULE_2__services__["a" /* AdService */]])
    ], MockTestResultPage);
    return MockTestResultPage;
}());

//# sourceMappingURL=mock-test-result.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroductionSlidesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var IntroductionSlidesPage = /** @class */ (function () {
    function IntroductionSlidesPage(navCtrl, storeService) {
        this.navCtrl = navCtrl;
        this.storeService = storeService;
        this.introductionMessageKey = 'IntroductionSlidesShown';
    }
    IntroductionSlidesPage.prototype.navigateToHome = function () {
        var _this = this;
        var message = new __WEBPACK_IMPORTED_MODULE_3__models__["e" /* Message */](this.introductionMessageKey, true, false);
        this.storeService.updateMessage(message)
            .then(function () {
            _this.navCtrl.popToRoot();
        });
    };
    IntroductionSlidesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\_repository\l2dv2\src\pages\introduction-slides\introduction-slides.html"*/'<ion-header>\n\n    <ion-navbar color="primary" [hideBackButton]="true">\n\n        <ion-title>Learn2Drive</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content class="introduction-slides">\n\n \n\n    <ion-slides pager>\n\n        \n\n        <ion-slide>\n\n            <img src="content/images/icon.png" class="slide-image-1"/>\n\n            <h2 class="slide-title">Welcome to Learn2Drive</h2>\n\n        </ion-slide>\n\n\n\n        <ion-slide>\n\n            <img src="content/images/introduction/home-checklist.feathered.png" class="slide-image-2"/>\n\n            <img src="content/images/introduction/checklist-feathered.png" class="slide-image-2"/>\n\n            <h2 class="slide-title">The Checklist</h2>\n\n            <p>\n\n                The <b>Checklist</b> helps you keep track of all the tasks you\'ll need to do before you write your test.\n\n            </p>\n\n        </ion-slide>\n\n\n\n\n\n        <ion-slide>\n\n            <h2 class="slide-title">Ready to Learn?</h2>\n\n            <button ion-button large clear icon-right (click)="navigateToHome()">\n\n                Continue\n\n                <ion-icon name="arrow-forward"></ion-icon>\n\n            </button>\n\n        </ion-slide>\n\n\n\n    </ion-slides>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\_repository\l2dv2\src\pages\introduction-slides\introduction-slides.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__services__["h" /* StoreService */]])
    ], IntroductionSlidesPage);
    return IntroductionSlidesPage;
}());

//# sourceMappingURL=introduction-slides.js.map

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestHistoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TestHistoryPage = /** @class */ (function () {
    function TestHistoryPage(navCtrl, navParams, storeService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storeService = storeService;
        this.navigationKey = '';
        this.testResults = [];
        this.navigationKey = navParams.get('navigationKey');
    }
    TestHistoryPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storeService.getTestResults(this.navigationKey)
            .then(function (testResults) {
            _this.testResults = testResults;
        });
    };
    TestHistoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\_repository\l2dv2\src\pages\test-history\test-history.html"*/'<ion-header>\n\n  <ion-navbar color="secondary">\n\n    <ion-title>{{navigationKey | translate}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="test-history">\n\n\n\n    <ion-item-group>\n\n        <ion-item-divider color="light">Test History</ion-item-divider>\n\n        <ion-item *ngFor="let testResult of testResults">\n\n            {{testResult.resultPercent()}}%\n\n            <ion-note item-right>\n\n                {{testResult.testDate | date}}\n\n            </ion-note>\n\n        </ion-item>\n\n    </ion-item-group>\n\n\n\n</ion-content>\n\n\n\n\n\n'/*ion-inline-end:"C:\_repository\l2dv2\src\pages\test-history\test-history.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services__["h" /* StoreService */]])
    ], TestHistoryPage);
    return TestHistoryPage;
}());

//# sourceMappingURL=test-history.js.map

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PagesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pipes__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4____ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var PagesModule = /** @class */ (function () {
    function PagesModule() {
    }
    PagesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4____["e" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_4____["d" /* ContentPage */],
                __WEBPACK_IMPORTED_MODULE_4____["l" /* TestPage */],
                __WEBPACK_IMPORTED_MODULE_4____["m" /* TestResultPage */],
                __WEBPACK_IMPORTED_MODULE_4____["c" /* ChecklistPage */],
                __WEBPACK_IMPORTED_MODULE_4____["b" /* ChecklistItemInfoPage */],
                __WEBPACK_IMPORTED_MODULE_4____["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_4____["j" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_4____["g" /* MockTestPage */],
                __WEBPACK_IMPORTED_MODULE_4____["h" /* MockTestResultPage */],
                __WEBPACK_IMPORTED_MODULE_4____["f" /* IntroductionSlidesPage */],
                __WEBPACK_IMPORTED_MODULE_4____["k" /* TestHistoryPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_3__components__["c" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_2__pipes__["a" /* PipesModule */]
            ],
            exports: [],
            entryComponents: [],
            providers: [],
        })
    ], PagesModule);
    return PagesModule;
}());

//# sourceMappingURL=pages.module.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__answer__ = __webpack_require__(289);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__answer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__answered_question__ = __webpack_require__(290);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__answered_question__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checklist_item__ = __webpack_require__(291);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__checklist_item__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__content__ = __webpack_require__(292);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__content__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__message__ = __webpack_require__(293);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__message__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mock_test_result__ = __webpack_require__(294);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__mock_test_result__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__navigation_item__ = __webpack_require__(295);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__navigation_item__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__progress__ = __webpack_require__(206);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__question__ = __webpack_require__(296);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_8__question__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__test_result__ = __webpack_require__(297);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_9__test_result__["a"]; });










//# sourceMappingURL=index.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__learn_learn_component__ = __webpack_require__(303);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__learn_learn_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__navigator_navigator_component__ = __webpack_require__(304);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_1__navigator_navigator_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__content_progress_content_progress_component__ = __webpack_require__(305);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__content_progress_content_progress_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__question_question_component__ = __webpack_require__(306);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_3__question_question_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__test_result_questions_test_result_questions_component__ = __webpack_require__(307);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_4__test_result_questions_test_result_questions_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__checklist_item_checklist_item_component__ = __webpack_require__(308);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__checklist_item_checklist_item_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__checklist_progress_checklist_progress_component__ = __webpack_require__(309);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_6__checklist_progress_checklist_progress_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__progressbar_progressbar_component__ = __webpack_require__(310);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_7__progressbar_progressbar_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_module__ = __webpack_require__(311);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_8__components_module__["a"]; });









//# sourceMappingURL=index.js.map

/***/ })

},[209]);
//# sourceMappingURL=main.js.map
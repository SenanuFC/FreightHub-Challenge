var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var _this = this;
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    setTimeout(function () { return resolve(); }, ms);
                })];
        });
    });
}
function randomDelay() {
    return __awaiter(this, void 0, void 0, function () {
        var randomTime;
        return __generator(this, function (_a) {
            randomTime = Math.round(Math.random() * 1000);
            return [2 /*return*/, sleep(randomTime)];
        });
    });
}
var ShipmentSearchIndex = /** @class */ (function () {
    function ShipmentSearchIndex() {
    }
    ShipmentSearchIndex.prototype.updateShipment = function (id, shipmentData) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, endTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startTime = new Date();
                        return [4 /*yield*/, randomDelay()];
                    case 1:
                        _a.sent();
                        endTime = new Date();
                        console.log("update " + id + "@" + startTime.toISOString() + " finished@" + endTime.toISOString());
                        return [2 /*return*/, { startTime: startTime, endTime: endTime }];
                }
            });
        });
    };
    return ShipmentSearchIndex;
}());
var updateRequest = /** @class */ (function () {
    function updateRequest(newId, startTime) {
        this.retry = false;
        this.id = newId;
        this.startTime = startTime;
    }
    return updateRequest;
}());
//Temp Memory
var ids = [];
var noneQueued = function (id) { return ids.filter(function (a) { return a.id = id; }).length === 0; };
var notConcurrent = function (proc) {
    var inQueue = false;
    return function () {
        if (!inQueue) {
            inQueue = (function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, , 2, 3]);
                            return [4 /*yield*/, proc()];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            inQueue = false;
                            return [7 /*endfinally*/];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })();
        }
        return inQueue;
    };
};
var ShipmentUpdateListener = /** @class */ (function () {
    function ShipmentUpdateListener() {
    }
    ShipmentUpdateListener.prototype.receiveUpdate = function (id, shipmentData) {
        return __awaiter(this, void 0, void 0, function () {
            var index, newUpdate;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = new ShipmentSearchIndex();
                        if (!noneQueued(id)) return [3 /*break*/, 2];
                        console.log("Request not in memory");
                        newUpdate = new updateRequest(id, (new Date()));
                        ids.push(newUpdate);
                        return [4 /*yield*/, index.updateShipment(id, shipmentData)];
                    case 1:
                        _a.sent();
                        ids = ids.filter(function (d) { return d.id !== id; });
                        return [3 /*break*/, 4];
                    case 2:
                        console.log("Already request pending for " + id);
                        //Delay 
                        return [4 /*yield*/, setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.receiveUpdate(id, shipmentData).then(
                                            //do nothing
                                            )];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }, 1100)];
                    case 3:
                        //Delay 
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ShipmentUpdateListener;
}());

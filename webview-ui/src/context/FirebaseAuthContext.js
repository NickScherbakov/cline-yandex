"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFirebaseAuth = exports.FirebaseAuthProvider = void 0;
var auth_1 = require("firebase/auth");
var app_1 = require("firebase/app");
var react_1 = require("react");
var vscode_1 = require("@/utils/vscode");
// Firebase configuration from extension
var firebaseConfig = {
    apiKey: "AIzaSyDcXAaanNgR2_T0dq2oOl5XyKPksYHppVo",
    authDomain: "cline-bot.firebaseapp.com",
    projectId: "cline-bot",
    storageBucket: "cline-bot.firebasestorage.app",
    messagingSenderId: "364369702101",
    appId: "1:364369702101:web:0013885dcf20b43799c65c",
    measurementId: "G-MDPRELSCD1",
};
var FirebaseAuthContext = (0, react_1.createContext)(undefined);
var FirebaseAuthProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)(null), user = _b[0], setUser = _b[1];
    var _c = (0, react_1.useState)(false), isInitialized = _c[0], setIsInitialized = _c[1];
    // Initialize Firebase
    var app = (0, app_1.initializeApp)(firebaseConfig);
    var auth = (0, auth_1.getAuth)(app);
    // Handle auth state changes
    (0, react_1.useEffect)(function () {
        var unsubscribe = auth.onAuthStateChanged(function (user) {
            setUser(user);
            setIsInitialized(true);
            console.log("onAuthStateChanged user", user);
            if (!user) {
                // when opening the extension in a new webview (ie if you logged in to sidebar webview but then open a popout tab webview) this effect will trigger without the original webview's session, resulting in us clearing out the user info object.
                // we rely on this object to determine if the user is logged in, so we only want to clear it when the user logs out, rather than whenever a webview without a session is opened.
                return;
            }
            // Sync auth state with extension
            vscode_1.vscode.postMessage({
                type: "authStateChanged",
                user: user
                    ? {
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                    }
                    : null,
            });
        });
        return function () { return unsubscribe(); };
    }, [auth]);
    var signInWithToken = (0, react_1.useCallback)(function (token) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, auth_1.signInWithCustomToken)(auth, token)];
                case 1:
                    _a.sent();
                    console.log("Successfully signed in with custom token");
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error signing in with custom token:", error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    }); }, [auth]);
    // Listen for auth callback from extension
    (0, react_1.useEffect)(function () {
        var handleMessage = function (event) {
            var message = event.data;
            if (message.type === "authCallback" && message.customToken) {
                signInWithToken(message.customToken);
            }
        };
        window.addEventListener("message", handleMessage);
        return function () { return window.removeEventListener("message", handleMessage); };
    }, [signInWithToken]);
    var handleSignOut = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, auth_1.signOut)(auth)];
                case 1:
                    _a.sent();
                    console.log("Successfully signed out of Firebase");
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error signing out of Firebase:", error_2);
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    }); }, [auth]);
    return (<FirebaseAuthContext.Provider value={{ user: user, isInitialized: isInitialized, signInWithToken: signInWithToken, handleSignOut: handleSignOut }}>
			{children}
		</FirebaseAuthContext.Provider>);
};
exports.FirebaseAuthProvider = FirebaseAuthProvider;
var useFirebaseAuth = function () {
    var context = (0, react_1.useContext)(FirebaseAuthContext);
    if (context === undefined) {
        throw new Error("useFirebaseAuth must be used within a FirebaseAuthProvider");
    }
    return context;
};
exports.useFirebaseAuth = useFirebaseAuth;

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";var _socket=require("./socket"),nickname_LS="nickname",body=document.querySelector("body"),jsLogin=document.getElementById("jsLogin"),nickname=localStorage.getItem(nickname_LS),logout="loggedOut",login="loggedIn",userLogin=function(e){var n=io("/");n.emit(window.minji.setNickname,{nickname:e}),(0,_socket.initSocket)(n)};function handleFormSubmit(e){e.preventDefault();var n=jsLogin.querySelector("input"),o=n.value;n.value="",localStorage.setItem(nickname_LS,o),body.className=login,userLogin(o)}null===nickname?body.className=logout:(body.className=login,userLogin(nickname)),jsLogin&&jsLogin.addEventListener("submit",handleFormSubmit);

},{"./socket":4}],2:[function(require,module,exports){
"use strict";require("./login"),require("./notification"),require("./socket");

},{"./login":1,"./notification":3,"./socket":4}],3:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleDisconnected=exports.handleNotification=void 0;var notifications=document.getElementById("jsNoti"),paintingNotification=function(e,n,t){var i=document.createElement("div"),o=document.createElement("div");o.innerText=e,o.style.backgroundColor=n,o.style.color=t,o.className="alert",i.appendChild(o),notifications.appendChild(i)},handleNotification=function(e){var n=e.nickname;paintingNotification('"'.concat(n,'" joined!'),"blue","white")};exports.handleNotification=handleNotification;var handleDisconnected=function(e){var n=e.nickname;paintingNotification('"'.concat(n,'" left'),"red","white")};exports.handleDisconnected=handleDisconnected;

},{}],4:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initSocket=exports.updateSocket=exports.getSocket=void 0;var _notification=require("./notification"),socket=null,getSocket=function(){return socket};exports.getSocket=getSocket;var updateSocket=function(t){return socket=t};exports.updateSocket=updateSocket;var initSocket=function(t){var e=window.minji;updateSocket(t),t.on(e.newUser,_notification.handleNotification),t.on(e.disconnected,_notification.handleDisconnected)};exports.initSocket=initSocket;

},{"./notification":3}]},{},[2]);

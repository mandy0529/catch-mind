(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.enableChat=exports.disableChat=exports.handleNewMessage=void 0;var _socket=require("./socket"),textUl=document.getElementById("textUl"),textForm=document.getElementById("textForm"),createMsg=function(e,t){var a=document.createElement("li");a.innerHTML='\n    <span class"author">'.concat(t||"You",":</span> ").concat(e,"\n    "),textUl.appendChild(a)},handleSubmit=function(e){e.preventDefault();var t=textForm.querySelector("input"),a=t.value;console.log(a),(0,_socket.getSocket)().emit(window.minji.sendMsg,{message:a}),t.value="",t.focus(),createMsg(a)},handleNewMessage=function(e){var t=e.message,a=e.nickname;createMsg(t,a)};exports.handleNewMessage=handleNewMessage;var disableChat=function(){return textForm.style.display="none"};exports.disableChat=disableChat;var enableChat=function(){return textForm.style.display="block"};exports.enableChat=enableChat,textForm&&textForm.addEventListener("submit",handleSubmit);

},{"./socket":7}],2:[function(require,module,exports){
"use strict";var _socket=require("./socket"),nickname_LS="nickname",body=document.querySelector("body"),jsLogin=document.getElementById("jsLogin"),nickname=localStorage.getItem(nickname_LS),logout="loggedOut",login="loggedIn",userLogin=function(e){var n=io("/");n.emit(window.minji.setNickname,{nickname:e}),(0,_socket.initSocket)(n)};function handleFormSubmit(e){e.preventDefault();var n=jsLogin.querySelector("input"),o=n.value;n.value="",localStorage.setItem(nickname_LS,o),body.className=login,userLogin(o)}null===nickname?body.className=logout:(body.className=login,userLogin(nickname)),jsLogin&&jsLogin.addEventListener("submit",handleFormSubmit);

},{"./socket":7}],3:[function(require,module,exports){
"use strict";require("./login"),require("./notification"),require("./socket"),require("./chat"),require("./paint");

},{"./chat":1,"./login":2,"./notification":4,"./paint":5,"./socket":7}],4:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleDisconnected=exports.handleNotification=void 0;var paintingNotification=function(e,n,t){var i=document.getElementById("jsNoti"),o=document.createElement("div");o.innerText=e,o.style.backgroundColor=n,o.style.color=t,i.appendChild(o)},handleNotification=function(e){var n=e.nickname;paintingNotification('"'.concat(n,'" joined!'),"blue","white")};exports.handleNotification=handleNotification;var handleDisconnected=function(e){var n=e.nickname;paintingNotification('"'.concat(n,'" left'),"red","white")};exports.handleDisconnected=handleDisconnected;

},{}],5:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.resetCanvas=exports.showCanvasControls=exports.hideCanvasControls=exports.enableCanvas=exports.disableCanvas=exports.handleFilledPath=exports.handleStrokedPath=exports.handleBeganPath=void 0;var _socket=require("./socket"),canvas=document.getElementById("jsCanvas"),ctx=canvas.getContext("2d"),colors=document.getElementsByClassName("jsColor"),mode=document.getElementById("jsMode"),controls=document.getElementById("controls"),INITIAL_COLOR="#2c2c2c",CANVAS_SIZE=700;canvas.width=CANVAS_SIZE,canvas.height=CANVAS_SIZE,ctx.fillStyle="white",ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE),ctx.strokeStyle=INITIAL_COLOR,ctx.fillStyle=INITIAL_COLOR,ctx.lineWidth=2.5;var painting=!1,filling=!1;function stopPainting(){painting=!1}function startPainting(){painting=!0}var beginPath=function(e,t){ctx.beginPath(),ctx.moveTo(e,t)},strokePath=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=ctx.strokeStyle;null!==n&&(ctx.strokeStyle=n),ctx.lineTo(e,t),ctx.stroke(),ctx.strokeStyle=a},filledPath=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=ctx.fillStyle;null!==e&&(ctx.fillStyle=e),ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE),ctx.fillStyle=t};function onMouseMove(e){var t=e.offsetX,n=e.offsetY;painting?(strokePath(t,n),(0,_socket.getSocket)().emit(window.minji.strokePath,{x:t,y:n,color:ctx.strokeStyle})):(beginPath(t,n),(0,_socket.getSocket)().emit(window.minji.beginPath,{x:t,y:n}))}function handleColorClick(e){var t=e.target.style.backgroundColor;ctx.strokeStyle=t,ctx.fillStyle=t}function handleModeClick(){!0===filling?(filling=!1,mode.innerText="Fill"):(filling=!0,mode.innerText="Paint")}function handleCanvasClick(){filling&&(filledPath(),(0,_socket.getSocket)().emit(window.minji.fill,{color:ctx.fillStyle}))}function handleCM(e){e.preventDefault()}Array.from(colors).forEach(function(e){return e.addEventListener("click",handleColorClick)}),mode&&mode.addEventListener("click",handleModeClick);var handleBeganPath=function(e){var t=e.x,n=e.y;return beginPath(t,n)};exports.handleBeganPath=handleBeganPath;var handleStrokedPath=function(e){var t=e.x,n=e.y,a=e.color;strokePath(t,n,a)};exports.handleStrokedPath=handleStrokedPath;var handleFilledPath=function(e){var t=e.color;return filledPath(t)};exports.handleFilledPath=handleFilledPath;var disableCanvas=function(){canvas.removeEventListener("mousemove",onMouseMove),canvas.removeEventListener("mousedown",startPainting),canvas.removeEventListener("mouseup",stopPainting),canvas.removeEventListener("mouseleave",stopPainting),canvas.removeEventListener("click",handleCanvasClick),canvas.removeEventListener("contextmenu",handleCM)};exports.disableCanvas=disableCanvas;var enableCanvas=function(){canvas.addEventListener("mousemove",onMouseMove),canvas.addEventListener("mousedown",startPainting),canvas.addEventListener("mouseup",stopPainting),canvas.addEventListener("mouseleave",stopPainting),canvas.addEventListener("click",handleCanvasClick),canvas.addEventListener("contextmenu",handleCM)};exports.enableCanvas=enableCanvas;var hideCanvasControls=function(){return controls.style.display="none"};exports.hideCanvasControls=hideCanvasControls;var showCanvasControls=function(){return controls.style.display="block"};exports.showCanvasControls=showCanvasControls;var resetCanvas=function(){return filledPath("white")};exports.resetCanvas=resetCanvas,canvas&&hideCanvasControls();

},{"./socket":7}],6:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleStartNotification=exports.handleGameEnded=exports.handleLeaderNotification=exports.handleGameStarted=exports.handlePlayerUpdate=void 0;var _chat=require("./chat"),_paint=require("./paint"),board=document.getElementById("playerBoard"),leaderNotification=document.getElementById("leaderNotification"),setNotification=function(e){leaderNotification.innerText="",leaderNotification.innerText=e},addPlayers=function(e){board.innerText="",e.forEach(function(e){var a=document.createElement("div");a.innerText="".concat(e.nickname," : ").concat(e.point,"  "),board.appendChild(a)})},handlePlayerUpdate=function(e){var a=e.sockets;return addPlayers(a)};exports.handlePlayerUpdate=handlePlayerUpdate;var handleGameStarted=function(){setNotification(""),(0,_paint.disableCanvas)(),(0,_paint.hideCanvasControls)()};exports.handleGameStarted=handleGameStarted;var handleLeaderNotification=function(e){var a=e.word;(0,_paint.enableCanvas)(),(0,_paint.showCanvasControls)(),setNotification("you are leader. keyword : ".concat(a)),(0,_chat.disableChat)()};exports.handleLeaderNotification=handleLeaderNotification;var handleGameEnded=function(){setNotification("✋🏻 game ended!"),(0,_paint.disableCanvas)(),(0,_paint.hideCanvasControls)(),(0,_paint.resetCanvas)()};exports.handleGameEnded=handleGameEnded;var handleStartNotification=function(){setNotification("✅ game will start in 3 secs!")};exports.handleStartNotification=handleStartNotification;

},{"./chat":1,"./paint":5}],7:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initSocket=exports.updateSocket=exports.getSocket=void 0;var _notification=require("./notification"),_chat=require("./chat"),_paint=require("./paint"),_players=require("./players"),socket=null,getSocket=function(){return socket};exports.getSocket=getSocket;var updateSocket=function(e){return socket=e};exports.updateSocket=updateSocket;var initSocket=function(e){var t=window.minji;(socket=e).on(t.newUser,_notification.handleNotification),socket.on(t.disconnected,_notification.handleDisconnected),socket.on(t.newMsg,_chat.handleNewMessage),socket.on(t.beganPath,_paint.handleBeganPath),socket.on(t.strokedPath,_paint.handleStrokedPath),socket.on(t.filled,_paint.handleFilledPath),socket.on(t.playerUpdate,_players.handlePlayerUpdate),socket.on(t.gameStarted,_players.handleGameStarted),socket.on(t.leaderNotification,_players.handleLeaderNotification),socket.on(t.gameEnded,_players.handleGameEnded),socket.on(t.startNotification,_players.handleStartNotification)};exports.initSocket=initSocket;

},{"./chat":1,"./notification":4,"./paint":5,"./players":6}]},{},[3]);

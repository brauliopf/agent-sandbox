/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools */ \"./src/tools.js\");\n\n\nconsole.log(\"THIS IS FROM INDEX.JS\")\n\nconst availableFunctions = {\n  getCurrentLocation: _tools__WEBPACK_IMPORTED_MODULE_0__.getCurrentLocation,\n  getCurrentWeather: _tools__WEBPACK_IMPORTED_MODULE_0__.getCurrentWeather\n}\n\n// Idea of system prompt: https://til.simonwillison.net/llms/python-react-pattern\nconst systemPrompt = `\nYou cycle through Thought, Action, PAUSE, Observation. At the end of the loop you output a final Answer.\nYour final answer should be highly specific to the observations you have from running the actions.\n1. Thought: Describe your thoughts about the question you have been asked.\n2. Action: run one of the actions available to you - then return PAUSE.\n3. PAUSE\n4. Observation: will be the result of running those actions.\n\nAvailable actions:\n- getCurrentWeather: \n    E.g. getCurrentWeather: Salt Lake City\n    Returns the current weather of the location specified.\n- getCurrentLocation:\n    E.g. getCurrentLocation: null\n    Returns user's location details. No arguments needed.\n\nExample session:\nQuestion: Please give me some ideas for activities to do this afternoon.\nThought: I should look up the user's location so I can give location-specific activity ideas.\nAction: getLocation: null\nPAUSE\n\nYou will be called again with something like this:\nObservation: \"New York City, NY\"\n\nThen you loop again:\nThought: To get even more specific activity ideas, I should get the current weather at the user's location.\nAction: getCurrentWeather: New York City\nPAUSE\n\nYou'll then be called again with something like this:\nObservation: { location: \"New York City, NY\", forecast: [\"sunny\"] }\n\nYou then output:\nAnswer: <Suggested activities based on sunny weather that are highly specific to New York City and surrounding areas.>\n`\n\nasync function agent(query) {\n  const messages = [\n    { role:\"system\", content: systemPrompt },\n    { role:\"user\", content:query }\n  ]\n  const MAX_ITERATIONS = 5\n  const actionRegex = /^Action: (\\w+): (.*)$/\n\n  try {\n    for(let i = 0; i < MAX_ITERATIONS; i++){\n      console.log(`Iteration #${i + 1}`)\n\n      // Make Request to OpenAI (Cloudflare Worker)\n      // Caching is handled by the worker using AI Gateway from Cloudflare\n      const OPENAI_WORKER_URL = 'https://openai-api-worker.brauliopf.workers.dev/'\n      const response = await fetch(OPENAI_WORKER_URL, {\n          method: 'POST',\n          header: {\n              'Content-Type': 'application/json'\n          },\n          body: JSON.stringify({ // as defined in the header, the body must be of type JSON\n            model: 'gpt-3.5-turbo',\n            messages: messages\n          })\n      })\n      \n      // Get Response\n      if(!response.ok) { throw new Error(`Worker error: ${response_json.error}`) }\n      const response_json = await response.json()\n\n      // Process Response (if action required, go get action)\n      messages.push({ role: \"assistant\", content: response_json.content}) // Add message to conversation log\n      const textResponse = response_json.content // decide what to do\n\n      // identify an action (assume there is an action <-- TODO: MUST handle this)\n      const textLines = await textResponse.split(\"\\n\")\n      const matchedStr = await textLines.find(str => actionRegex.test(str))\n      console.log('textLines', textLines)\n      console.log('matched', matchedStr)\n      if(matchedStr){\n        const action = actionRegex.exec(matchedStr)\n    \n        if(!availableFunctions.hasOwnProperty(action[1])){\n          throw new Error(`Unknwon action: ${action[1]}: ${action[2]}`)\n        }\n    \n        // execute action (add outpout to log of messages)\n        const additional_info = await availableFunctions[action[1]](action[2])\n        console.log(`add_info: ${additional_info}`)\n        messages.push({role: \"assistant\", content: `Additional Info: ${additional_info}`})\n        console.log(additional_info)\n      } else {\n        console.log(\"Agent finished with task\")\n        return textResponse\n      }\n      \n\n    }\n    console.log(messages)\n\n  } catch(error) {\n    console.error('There was a problem with the fetch operation. Error: ', error);\n  }\n}\n\nagent(\"What is current weather?\")\n// agent(\"You dont need to know location or weather for this. Just tell me my name?\")\n\n// NOT RETURNING AN ERROR <--- SO WHAT?\n\n//# sourceURL=webpack://agent-sandbox/./src/index.js?");

/***/ }),

/***/ "./src/tools.js":
/*!**********************!*\
  !*** ./src/tools.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getCurrentLocation: () => (/* binding */ getCurrentLocation),\n/* harmony export */   getCurrentWeather: () => (/* binding */ getCurrentWeather)\n/* harmony export */ });\nasync function getCurrentLocation(){\n    return 'Boston, MA'\n}\n\nasync function getCurrentWeather(){\n    const weather = {\n        temperature: '21',\n        unit: 'C',\n        forecast: 'sunny'\n    }\n    return JSON.stringify(weather)\n}\n\n//# sourceURL=webpack://agent-sandbox/./src/tools.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
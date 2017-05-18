/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["b"] = getRequest;
/* harmony export (immutable) */ exports["a"] = searchStatistics;
//import * as app from './app';
//import { main } from './app';
//import { variables } from './utils';
//import { Application } from './app';
// 
function getRequest(searchTerm, nextPage) {
    !nextPage ? nextPage = '' : nextPage = '&pageToken=' + nextPage;
    return new Promise((resolve, reject) => {
        let XHR = 'onload' in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
        let xhr = new XHR();
        xhr.open('GET', "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&order=viewCount&type=video&key=AIzaSyDDFIjNyqjHvS9w7cZyEj27sw_M_-buQLQ&q=" + searchTerm + nextPage, true);
        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function () {
            reject(new Error(''));
        };
        xhr.send();
    });
    console.log(xhr);
}

function searchStatistics(id) {
    return new Promise((resolve, reject) => {
        let XHRStatistic = "onload" in new XMLHttpRequest() ? XMLHttpRequest : XDomainRequest;
        let xhrStatistic = new XHRStatistic();
        xhrStatistic.open('GET', "https://www.googleapis.com/youtube/v3/videos?part=statistics&key=AIzaSyDDFIjNyqjHvS9w7cZyEj27sw_M_-buQLQ&id=" + id);
        xhrStatistic.onload = function () {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhrStatistic.onerror = function () {
            reject(new Error(""));
        };
        xhrStatistic.send();
    });
}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return variables; });
const variables = {
    videos: [],
    currentPageId: 1,
    currentPage: 1,
    nextPage: "",
    countVideo: 1,
    component: [],
    widthDivForResult: 440
};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__request__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__paging__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__render__ = __webpack_require__(4);





class Application {
    render() {
        const header = document.createElement('header');
        document.body.appendChild(header);

        const input = document.createElement('input');
        input.id = 'query';
        input.placeholder = 'Search videos';
        input.type = 'search';
        header.appendChild(input);
        const resultSection = document.createElement('section');
        resultSection.id = 'search-results';
        document.body.appendChild(resultSection);

        const footer = document.createElement('footer');
        footer.id = 'footer';
        document.body.appendChild(footer);

        document.addEventListener('DOMContentLoaded', () => {
            input.onkeypress = e => {
                let query = '';
                if (e.keyCode === 13) {
                    query = e.target.value;
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__render__["c" /* clearSearchSection */])();
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__request__["b" /* getRequest */])(query, __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].nextPage).then(response => {
                        const result = JSON.parse(response);

                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__render__["b" /* showResults */])(result);
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__render__["a" /* renderResultsOfPage */])(1);
                    });
                }
            };
        });
        return this;
    }
}
const myYoutube = new Application();
myYoutube.render();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__request__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__render__ = __webpack_require__(4);
/* harmony export (immutable) */ exports["c"] = setPage;
/* harmony export (immutable) */ exports["e"] = newRequest;
/* harmony export (immutable) */ exports["a"] = swipeStart;
/* harmony export (immutable) */ exports["b"] = swipeStop;
/* unused harmony export setPagesAfterResizing */
/* harmony export (immutable) */ exports["d"] = paging;




const numberVideos = Math.floor(document.documentElement.clientWidth / __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].widthDivForResult);

let changePageByClick = function (e) {
    const pageForComparing = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage;
    __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPageId = e.target.id;
    __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage = e.target.innerHTML;
    const variable = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage;
    if ((variable % 5 === 0 || variable % 5 === 1) && Number(variable) > 4) {
        __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPageId = '3';
    } else {
        __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPageId = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage % 5;
    }
    let idPage;
    const pages = document.querySelectorAll('footer>a');
    pages.forEach(item => {
        if (item.classList.contains('activePage')) {
            idPage = item.id;
        }
    });
    setTimeout(() => {
        if (idPage !== e.target.id) {
            if (pageForComparing < e.target.innerHTML) {
                __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].component.forEach(comp => {
                    comp.classList.remove('withTransformAppearOutRight');
                    comp.classList.remove('withTransformAppearRight');
                    comp.classList.remove('withTransformAppearLeft');
                    comp.classList.remove('withTransformAppearOutLeft');
                });
                __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].component.forEach(comp => {
                    if (comp.style.display === 'inline-block') {
                        comp.classList.add('withTransformAppearOutLeft');
                    } else {
                        comp.classList.add('withTransformAppearRight');
                    }
                });
            } else {
                __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].component.forEach(comp => {
                    comp.classList.remove('withTransformAppearOutRight');
                    comp.classList.remove('withTransformAppearRight');
                    comp.classList.remove('withTransformAppearLeft');
                    comp.classList.remove('withTransformAppearOutLeft');
                });
                __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].component.forEach(comp => {
                    if (comp.style.display === 'inline-block') {
                        comp.classList.add('withTransformAppearOutRight');
                    } else {
                        comp.classList.add('withTransformAppearLeft');
                    }
                });
            }
        }
        setPage(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage, __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPageId);
    }, 50);
};

function setPage(newPage, newPageId) {
    let pageForCount = newPage;
    const pages = document.querySelectorAll('footer>a');
    pages.forEach(number => {
        number.innerHTML = '';
        number.innerHTML += Number(pageForCount) - Number(newPageId) + 1;
        pageForCount = Number(pageForCount) + 1;
    });
    pages.forEach(item => {
        if (Number(item.innerHTML) !== Number(newPage)) {
            item.classList.remove('activePage');
        } else {
            item.classList.add('activePage');
        }
    });
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__render__["a" /* renderResultsOfPage */])(newPage);
}

function newRequest() {
    for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].component.length; i++) {
        if (__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].component[i].style.display === 'inline-block') {
            if (i + 2 >= __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].component.length - 2 * numberVideos) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__request__["b" /* getRequest */])(query.value, __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].nextPage).then(response => {
                    let result = JSON.parse(response);
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__render__["b" /* showResults */])(result);
                });
            }
            break;
        }
    }
}

let showNumberOfPage = function (e) {
    let numberOfPage = e.target.innerHTML;
    e.target.style.color = '#ccc8d7';
    setTimeout(() => {
        e.target.style.color = 'transparent';
    }, 200);
};

let startX = 0;
let stopX = 0;
function swipeStart(e) {
    startX = e.x;
};

function swipeStop(e) {
    stopX = e.x;
    if (stopX - startX > 50 && __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage > 1) {
        __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].component.forEach(comp => {
            comp.classList.remove('withTransformAppearOutRight');
            comp.classList.remove('withTransformAppearRight');
            comp.classList.remove('withTransformAppearLeft');
            comp.classList.remove('withTransformAppearOutLeft');
        });
        __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].component.forEach(comp => {
            if (comp.style.display === 'inline-block') {
                comp.classList.add('withTransformAppearOutRight');
            } else {
                comp.classList.add("withTransformAppearLeft");
            }
        });
        __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage = String(Number(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage) - 1);
        if ((__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage % 5 === 0 || __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage % 5 === 1) && Number(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage) > 4) {
            __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPageId = '3';
        } else {
            __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPageId = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage % 5;
        }
    } else {
        if (startX - stopX > 50 && __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage < __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].videos.length) {
            __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].component.forEach(comp => {
                comp.classList.remove('withTransformAppearOutRight');
                comp.classList.remove('withTransformAppearRight');
                comp.classList.remove('withTransformAppearLeft');
                comp.classList.remove('withTransformAppearOutLeft');
            });
            __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].component.forEach(comp => {
                if (comp.style.display === 'inline-block') {
                    comp.classList.add('withTransformAppearOutLeft');
                } else {
                    comp.classList.add('withTransformAppearRight');
                }
            });
            __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage = String(Number(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage) + 1);
            if ((__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage % 5 === 0 || __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage % 5 === 1) && Number(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage) > 4) {
                __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPageId = '3';
            } else {
                __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPageId = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage % 5;
            }
        }
    }
    setPage(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPage, __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPageId);
};

window.onresize = function (e) {
    __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].component.forEach(comp => {
        comp.classList.remove('withTransformAppearRight');
        comp.classList.remove('withTransformAppearOutRight');
        comp.classList.remove('withTransformAppearLeft');
        comp.classList.remove('withTransformAppearOutLeft');
    });
    setPagesAfterResizing();
};

function setPagesAfterResizing() {
    let numberVideosOnPageNew = Math.floor(document.documentElement.clientWidth / __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].widthDivForResult);
    for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].component.length; i++) {
        if (__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].component[i].style.display === 'inline-block') {
            __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].countVideo = i + 1;
            break;
        }
    };
    let newCurrentPage = Math.ceil(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].countVideo / numberVideosOnPageNew);
    if (newCurrentPage % 5 === 0) {
        __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPageId = '3';
    } else {
        __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPageId = String(newCurrentPage % 5);
    }
    setPage(newCurrentPage, __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* variables */].currentPageId);
}

function paging() {
    for (let i = 1; i < 6; i += 1) {
        const page = document.createElement('a');
        page.id = i;
        if (page.id === '1') {
            page.classList.add('activePage');
        }
        page.innerHTML = +i;
        page.addEventListener('click', changePageByClick);
        page.addEventListener('mousedown', showNumberOfPage);
        const footerS = document.getElementById('footer');
        footerS.appendChild(page);
    }
}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__request__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__paging__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(1);
/* unused harmony export numberVideosOnPage */
/* harmony export (immutable) */ exports["b"] = showResults;
/* harmony export (immutable) */ exports["c"] = clearSearchSection;
/* harmony export (immutable) */ exports["a"] = renderResultsOfPage;





//export let videos = [];
//export let component = [];
//export let widthDivForResult = 440;
let numberVideosOnPage = Math.floor(document.documentElement.clientWidth / __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].widthDivForResult);

function showResults(results) {
    let elem = document.getElementById('search-results');
    let sectionName = "";
    let sectionPreview = "";
    let linkToImg = "";
    let sectionAuthor = "Video by ";
    let sectionDescription = "";
    let sectionDateOfPublication = "Published: ";
    let link = "http://www.youtube.com/watch?v=";
    let entries = results.items;
    entries.forEach(item => {
        __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].videos.push(item);
        let divForResult = document.createElement("div");
        divForResult.id = 'divForResult';
        elem.appendChild(divForResult);
        let divForName = document.createElement("div");
        divForResult.appendChild(divForName);

        let names = item.snippet.title;
        sectionName += names;
        link += item.id.videoId;
        let name = document.createElement('a');
        name.href = link;
        name.target = "_blank";
        name.innerHTML = sectionName;
        divForName.appendChild(name);

        let img_div = document.createElement("div");
        divForResult.appendChild(img_div);
        let previews = item.snippet.thumbnails.medium.url;
        linkToImg += previews;
        let preview = document.createElement('img');
        preview.width = '320';
        preview.height = '180';
        preview.src = linkToImg;
        img_div.appendChild(preview);

        let divInfo = document.createElement('div');
        divInfo.id = "divInfo";
        divForResult.appendChild(divInfo);

        let authors = item.snippet.channelTitle;
        sectionAuthor += authors;
        let author = document.createElement('p');
        author.innerHTML = sectionAuthor;
        divInfo.appendChild(author);

        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__request__["a" /* searchStatistics */])(item.id.videoId).then(response => {
            let result = JSON.parse(response);
            showStatistics(result);
        });

        function showStatistics(result) {
            let viewCount = "Number views: ";
            viewCount += result.items[0].statistics.viewCount;
            let count = document.createElement('p');
            count.innerHTML = viewCount;
            divInfo.appendChild(count);
            viewCount = "Number views: ";
        }

        let dateOfPublications = new Date(Date.parse(item.snippet.publishedAt));
        sectionDateOfPublication += dateOfPublications.getDay() + 1 + '.' + (dateOfPublications.getMonth() + 1) + '.' + dateOfPublications.getFullYear();
        let dateOfPublication = document.createElement('p');
        dateOfPublication.innerHTML = sectionDateOfPublication;
        divInfo.appendChild(dateOfPublication);

        let descriptions = item.snippet.description;
        sectionDescription += descriptions;
        let description = document.createElement('p');
        description.innerHTML = sectionDescription;
        divInfo.appendChild(description);

        __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].nextPage = results.nextPageToken;

        sectionName = "";
        linkToImg = "";
        sectionPreview = "";
        sectionDescription = "";
        sectionAuthor = "Video by ";
        sectionDateOfPublication = "Published: ";
        link = "http://www.youtube.com/watch?v=";

        __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].component.push(divForResult);
    });
    if (__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].component.length === 0) {
        alert(`No results for your request.`);
    }
    elem.addEventListener('mousedown', __WEBPACK_IMPORTED_MODULE_2__paging__["a" /* swipeStart */]);
    elem.addEventListener('mouseup', __WEBPACK_IMPORTED_MODULE_2__paging__["b" /* swipeStop */]);
    //elem.addEventListener('touchstart', swipeStart);
    //elem.addEventListener('touchstop', swipeStop);

    var startPoint = {};
    var nowPoint;
    var ldelay;
    document.addEventListener('touchstart', function (event) {
        //event.preventDefault();
        //event.stopPropagation();
        startPoint.x = event.changedTouches[0].pageX;
        ldelay = new Date();
    }, false);
    /*Ловим движение пальцем*/
    document.addEventListener('touchmove', function (event) {
        //event.preventDefault();
        //event.stopPropagation();
        var otk = {};
        nowPoint = event.changedTouches[0];
        otk.x = nowPoint.pageX - startPoint.x;
        var pdelay = new Date();
        nowPoint = event.changedTouches[0];

        /*Обработайте данные*/
        /*Для примера*/
    }, false);
    /*Ловим отпускание пальца*/
    document.addEventListener('touchend', function (event) {
        var xAbs = startPoint.x - nowPoint.pageX;

        if (xAbs < 50 && __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPage > 1) {
            __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].component.forEach(comp => {
                comp.classList.remove('withTransformAppearOutRight');
                comp.classList.remove('withTransformAppearRight');
                comp.classList.remove('withTransformAppearLeft');
                comp.classList.remove('withTransformAppearOutLeft');
            });
            __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].component.forEach(comp => {
                if (comp.style.display === 'inline-block') {
                    comp.classList.add('withTransformAppearOutRight');
                } else {
                    comp.classList.add("withTransformAppearLeft");
                }
            });
            __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPage = String(Number(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPage) - 1);
            if ((__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPage % 5 === 0 || __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPage % 5 === 1) && Number(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPage) > 4) {
                __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPageId = '3';
            } else {
                __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPageId = __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPage % 5;
            }
        } else {
            if (xAbs > 50 && __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPage < __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].videos.length) {
                __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].component.forEach(comp => {
                    comp.classList.remove('withTransformAppearOutRight');
                    comp.classList.remove('withTransformAppearRight');
                    comp.classList.remove('withTransformAppearLeft');
                    comp.classList.remove('withTransformAppearOutLeft');
                });
                __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].component.forEach(comp => {
                    if (comp.style.display === 'inline-block') {
                        comp.classList.add('withTransformAppearOutLeft');
                    } else {
                        comp.classList.add('withTransformAppearRight');
                    }
                });
                __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPage = String(Number(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPage) + 1);
                if ((__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPage % 5 === 0 || __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPage % 5 === 1) && Number(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPage) > 4) {
                    __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPageId = '3';
                } else {
                    __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPageId = __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPage % 5;
                }
            }
        }
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__paging__["c" /* setPage */])(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPage, __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].currentPageId);
    }, false);
}
window.onresize = function (e) {
    __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].component.forEach(comp => {
        comp.classList.remove('withTransformAppearRight');
        comp.classList.remove('withTransformAppearOutRight');
        comp.classList.remove('withTransformAppearLeft');
        comp.classList.remove('withTransformAppearOutLeft');
    });
    setPagesAfterResizing();
};

function clearSearchSection() {
    __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].videos = [];
    __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].component = [];
    let resultSec = document.getElementById('search-results');
    let fot = document.getElementById('footer');
    document.body.removeChild(resultSec);
    document.body.removeChild(fot);

    let resultSection = document.createElement("section");
    resultSection.id = "search-results";
    document.body.appendChild(resultSection);

    let footer = document.createElement("footer");
    footer.id = 'footer';
    document.body.appendChild(footer);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__paging__["d" /* paging */])();
}

function renderResultsOfPage(currentPage) {
    numberVideosOnPage = Math.floor(document.documentElement.clientWidth / __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].widthDivForResult);
    let endVideo = currentPage * numberVideosOnPage;
    console.log(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].component);
    __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* variables */].component.forEach((comp, index) => {
        if (index + 1 <= endVideo && index >= endVideo - numberVideosOnPage) {
            comp.style.display = "inline-block";
            comp.style.transform = 'translateX(' - document.documentElement.clientWidth + 'px)';
        } else {
            comp.style.display = "none";
            comp.style.transform = 'translateX(' - document.documentElement.clientWidth + 'px)';
        }
    });
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__paging__["e" /* newRequest */])();
}

/***/ }
/******/ ]);
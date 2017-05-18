import { variables } from './utils';
import { getRequest } from './request';
import { showResults, renderResultsOfPage } from './render';

const numberVideos = Math.floor(document.documentElement.clientWidth / variables.widthDivForResult);

let changePageByClick = function (e) {
    const pageForComparing = variables.currentPage;
    variables.currentPageId = e.target.id;
    variables.currentPage = e.target.innerHTML;
    const variable = variables.currentPage;
    if ((variable % 5 === 0 || variable % 5 === 1) && Number(variable) > 4) {
        variables.currentPageId = '3';
    }
    else {
        variables.currentPageId = variables.currentPage % 5;
    }
    let idPage;
    const pages = document.querySelectorAll('footer>a');
    pages.forEach((item) => {      
        if (item.classList.contains('activePage')) {
            idPage = item.id;
        }     
    });
    setTimeout(() => {
        if (idPage !== e.target.id) {
            if (pageForComparing < e.target.innerHTML) {
                variables.component.forEach((comp) => {
                    comp.classList.remove('withTransformAppearOutRight');
                    comp.classList.remove('withTransformAppearRight');
                    comp.classList.remove('withTransformAppearLeft');
                    comp.classList.remove('withTransformAppearOutLeft');
                });
                variables.component.forEach((comp) => {
                    if (comp.style.display === 'inline-block') {
                        comp.classList.add('withTransformAppearOutLeft');        
                    }
                    else {
                        comp.classList.add('withTransformAppearRight'); 
                    }
                });
            }
            else {
                variables.component.forEach((comp) => {
                    comp.classList.remove('withTransformAppearOutRight');
                    comp.classList.remove('withTransformAppearRight');
                    comp.classList.remove('withTransformAppearLeft');
                    comp.classList.remove('withTransformAppearOutLeft');
                });
                variables.component.forEach((comp) => {
                    if (comp.style.display === 'inline-block') {
                        comp.classList.add('withTransformAppearOutRight');     
                }
                else {
                    comp.classList.add('withTransformAppearLeft'); 
                }
                });
            }
        }
        setPage(variables.currentPage, variables.currentPageId);
    }, 50);  
};

export function setPage(newPage, newPageId) {
    let pageForCount = newPage;
    const pages = document.querySelectorAll('footer>a');
    pages.forEach((number) => {
        number.innerHTML = '';
        number.innerHTML += Number(pageForCount) - Number(newPageId) +1;
        pageForCount = Number(pageForCount) + 1;         
    });
    pages.forEach(item => {
        if (Number(item.innerHTML) !== Number(newPage)) {
            item.classList.remove('activePage');
        }
        else {
             item.classList.add('activePage');
        }
    });
    renderResultsOfPage(newPage);
}

export function newRequest() {
    for (let i = 0; i < variables.component.length; i ++) {
        if (variables.component[i].style.display === 'inline-block') {
            if (i + 2 >= variables.component.length - 2*numberVideos) {
                getRequest(query.value, variables.nextPage)
                .then(response => {
                    let result = JSON.parse(response);
                    showResults(result);
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
}

let startX = 0;
let stopX = 0;
export function swipeStart(e) {
    startX = e.x;
};

export function swipeStop(e) {   
    stopX = e.x;
    if (stopX - startX > 50 && variables.currentPage > 1) {
        variables.component.forEach(comp => {
            comp.classList.remove('withTransformAppearOutRight');
            comp.classList.remove('withTransformAppearRight');
            comp.classList.remove('withTransformAppearLeft');
            comp.classList.remove('withTransformAppearOutLeft'); 
        });
        variables.component.forEach((comp) => {
            if (comp.style.display === 'inline-block') {
                comp.classList.add('withTransformAppearOutRight');        
            }
            else {
                comp.classList.add("withTransformAppearLeft"); 
            }
        });
        variables.currentPage = String(Number(variables.currentPage) - 1);           
        if ((variables.currentPage % 5 === 0 || variables.currentPage % 5 === 1) && Number(variables.currentPage) > 4) {
            variables.currentPageId = '3';
        }
        else {
            variables.currentPageId = variables.currentPage % 5;
        }
    }
    else {
        if (startX - stopX > 50 && variables.currentPage < variables.videos.length) {
            variables.component.forEach((comp) => {
                comp.classList.remove('withTransformAppearOutRight');
                comp.classList.remove('withTransformAppearRight');
                comp.classList.remove('withTransformAppearLeft');
                comp.classList.remove('withTransformAppearOutLeft');
            });
            variables.component.forEach((comp) => {
                if (comp.style.display === 'inline-block') {
                    comp.classList.add('withTransformAppearOutLeft');        
                }
                else {
                    comp.classList.add('withTransformAppearRight'); 
                }
            })
            variables.currentPage = String(Number(variables.currentPage) + 1);            
            if ((variables.currentPage % 5 === 0 || variables.currentPage % 5 === 1) && Number(variables.currentPage) > 4) {
                variables.currentPageId = '3';
            }
            else {
                variables.currentPageId = variables.currentPage % 5;
            }
        }
    }
    setPage(variables.currentPage, variables.currentPageId);
};

window.onresize = function (e) {
    variables.component.forEach(comp => {
        comp.classList.remove('withTransformAppearRight');
        comp.classList.remove('withTransformAppearOutRight');
        comp.classList.remove('withTransformAppearLeft');
        comp.classList.remove('withTransformAppearOutLeft');  
    });
    setPagesAfterResizing();  
}

export function setPagesAfterResizing () {
    let numberVideosOnPageNew = Math.floor(document.documentElement.clientWidth/variables.widthDivForResult);
    for (let i = 0; i < variables.component.length; i ++) {
        if (variables.component[i].style.display === 'inline-block') {
            variables.countVideo = i + 1;
            break;
        }
    };
    let newCurrentPage = Math.ceil(variables.countVideo/numberVideosOnPageNew);
    if (newCurrentPage % 5 === 0) {
        variables.currentPageId = '3';
    }
    else {
        variables.currentPageId = String(newCurrentPage % 5);
    }  
    setPage(newCurrentPage, variables.currentPageId);
}

export function paging() {
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



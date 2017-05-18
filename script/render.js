import * as app from './app';
import { getRequest, searchStatistics } from './request';
import { paging, swipeStart, swipeMove, swipeStop, numberVideos, currentPage, newRequest, setPage } from './paging';
import { variables } from './utils';
import { main } from './app';
//export let videos = [];
//export let component = [];
//export let widthDivForResult = 440;
export let numberVideosOnPage = Math.floor(document.documentElement.clientWidth/variables.widthDivForResult);


export function showResults(results) {
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
        variables.videos.push(item);     
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

        searchStatistics(item.id.videoId)
        .then(response => {
            let result = JSON.parse(response);
            showStatistics (result);
        });

        function showStatistics (result) {
            let viewCount = "Number views: ";
            viewCount += result.items[0].statistics.viewCount;
            let count = document.createElement('p');
            count.innerHTML = viewCount;
            divInfo.appendChild(count); 
            viewCount = "Number views: ";
        }

        let dateOfPublications = new Date(Date.parse(item.snippet.publishedAt));
        sectionDateOfPublication += (dateOfPublications.getDay() + 1) + '.' + (dateOfPublications.getMonth() + 1) + '.' + dateOfPublications.getFullYear();
        let dateOfPublication = document.createElement('p');
        dateOfPublication.innerHTML = sectionDateOfPublication;
        divInfo.appendChild(dateOfPublication);

        let descriptions = item.snippet.description;
        sectionDescription += descriptions;
        let description = document.createElement('p');
        description.innerHTML = sectionDescription;
        divInfo.appendChild(description);

        variables.nextPage = results.nextPageToken;

        sectionName = "";
        linkToImg = "";
        sectionPreview = "";
        sectionDescription = "";
        sectionAuthor = "Video by ";
        sectionDateOfPublication = "Published: ";
        link = "http://www.youtube.com/watch?v=";

        variables.component.push(divForResult);
    });
    if (variables.component.length === 0) {
        alert(`No results for your request.`);
    }
    elem.addEventListener('mousedown', swipeStart);
    elem.addEventListener('mouseup', swipeStop);
    //elem.addEventListener('touchstart', swipeStart);
    //elem.addEventListener('touchstop', swipeStop);

var startPoint={};
var nowPoint;
var ldelay;
document.addEventListener('touchstart', function(event) {
//event.preventDefault();
//event.stopPropagation();
startPoint.x=event.changedTouches[0].pageX;
ldelay=new Date(); 
}, false);
/*Ловим движение пальцем*/
document.addEventListener('touchmove', function(event) {
//event.preventDefault();
//event.stopPropagation();
var otk={};
nowPoint=event.changedTouches[0];
otk.x=nowPoint.pageX-startPoint.x;
var pdelay=new Date(); 
nowPoint=event.changedTouches[0];

/*Обработайте данные*/
/*Для примера*/

}, false);
/*Ловим отпускание пальца*/
document.addEventListener('touchend', function(event) {
var xAbs = startPoint.x - nowPoint.pageX;

if (xAbs < 50 && variables.currentPage > 1){
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
        if (xAbs > 50 && variables.currentPage < variables.videos.length) {
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
}, false);

}
window.onresize = function (e) {
    variables.component.forEach(comp => {
        comp.classList.remove('withTransformAppearRight');
        comp.classList.remove('withTransformAppearOutRight');
        comp.classList.remove('withTransformAppearLeft');
        comp.classList.remove('withTransformAppearOutLeft');  
    });
    setPagesAfterResizing();  
};



export function clearSearchSection() {
    variables.videos = [];
    variables.component = [];
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
    paging();
}

export function renderResultsOfPage(currentPage) {
    numberVideosOnPage = Math.floor(document.documentElement.clientWidth/variables.widthDivForResult);
        let endVideo = currentPage*numberVideosOnPage;
        console.log(variables.component);
        variables.component.forEach((comp, index) => {
            if((index+1) <= endVideo && index >= endVideo - numberVideosOnPage) {
                comp.style.display = "inline-block";
                comp.style.transform = 'translateX('-(document.documentElement.clientWidth)+'px)';            
            }
            else {
                comp.style.display = "none";
                comp.style.transform = 'translateX('-(document.documentElement.clientWidth)+'px)';               
            }      
        });
        newRequest();        
}










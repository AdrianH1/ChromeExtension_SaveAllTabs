Tabs();

document.addEventListener('DOMContentLoaded', function () {
    
    let params = {
        windowType: 'normal'
    }
    
    var tabURL;
    
    
    chrome.tabs.query(params, getTabInfo);
    
    function getTabInfo(tabs){
        tabURL = tabs[0].url.toString();
        console.log(tabURL);
        console.log(tabs[0]);
        
        document.getElementById("test").innerHTML=tabURL;
   }
});

function Tabs(){
    
    let params = {
        windowType: 'normal'
    }
    
    var tabURL;
    
    
    chrome.tabs.query(params, getTabInfo);
    
    function getTabInfo(tabs){
        tabURL = tabs[0].url.toString();
        console.log(tabURL);
        console.log(tabs[0]);
   }


}
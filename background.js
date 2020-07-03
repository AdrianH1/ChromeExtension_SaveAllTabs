Tabs();
BookmarkTree();

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
    
        var value = tabURL;
        var value2 = "asdf";
        chrome.storage.local.set({key: value, key2: value2}, function() {
          console.log('Value is set to ' + value);
          console.log('Value2 is set to ' + value2);
        });
   }
}

function BookmarkTree(){
    chrome.bookmarks.getTree(getTree);
    
    function getTree(tree){
        console.log("test log tree");
        console.log(tree);
        
        chrome.storage.local.get(['key', 'key2'], function(result) {
          console.log('Value currently is ' + result.key);
          console.log('Value2 currently is ' + result.key2);
        });
    }
}

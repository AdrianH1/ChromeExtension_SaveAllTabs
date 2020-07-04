WindowIDs();
getFolders();

function WindowIDs(){
    
    let params = {
        windowType: 'normal'
    }
    
    chrome.tabs.query(params, getWindowIDs);
    
    function getWindowIDs(tabs){
        
        let WindowID= [];
        
        for (i=0; i < tabs.length; i++){
            if(!WindowID.includes(tabs[i].windowId)){
                WindowID[WindowID.length] = tabs[i].windowId;
            }
        }
        console.log(WindowID);
    
        let ValueWindowID = WindowID;
        chrome.storage.local.set({keyWindowID: ValueWindowID}, function() {
          console.log('Value is set to ' + ValueWindowID);
        });
   }
}

function getFolders(){
    chrome.bookmarks.getTree(getTree);
    
    function getTree(tree){
        console.log(tree);
        
        chrome.storage.local.get(['keyWindowID'], function(result) {
          console.log(result.keyWindowID);
        });
    }
}

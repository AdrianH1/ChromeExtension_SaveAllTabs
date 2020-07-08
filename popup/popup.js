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

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('asdf');
    // onClick's logic below:
    link.addEventListener('click', function() {
        getFolders();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('aaa');
    // onClick's logic below:
    link.addEventListener('click', function() {
        createFolders();
    });
});

function getFolders(){
    
    let parentId = '2';
    
    
    chrome.bookmarks.getChildren(parentId, folders);
    function folders(tree){
    console.log("---getFolders-Anfang");
        
        let FolderID = [];
        
        for(i=0; i < tree.length; i++){
            if(!FolderID.includes(tree[i].id)){
                FolderID[FolderID.length] = tree[i].id;
            }
        }

        chrome.storage.local.set({keyFolderID: FolderID, keyFolderIDLength: FolderID.length}, function() {});
        console.log("FolderID: " + FolderID);
        console.log("FolderID Length: " + FolderID.length);
        console.log("---getFolders-Ende");

    }
}

function createFolders(){
    
        chrome.storage.local.get(['keyWindowID', 'keyFolderID'], function(result) {
        console.log("---createFolders-Anfang");
            
            let FolderID = [];
            FolderID = result.keyFolderID;
            
            
            let params = {
                parentId: "2",
                title: "test1",
            }
 
            //chrome.bookmarks.create(params);

            console.log("Got Value WindowID: " + result.keyWindowID);
            console.log("Got Value FolderID: " + FolderID);
            
            console.log("---createFolders-Ende");
        });
}



createFolders();

function createFolders(){
    
    //Get Folders-----------------------------------------------------------
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

        chrome.storage.local.set({keyFolderID: FolderID,}, function() {});
        console.log("FolderID: " + FolderID);
        console.log("FolderID Length: " + FolderID.length);
        console.log("---getFolders-Ende");
        //----------------------------------------------------------------------


        //Get Windows-----------------------------------------------------------       
            let params = {
                windowType: 'normal'
            }

            chrome.tabs.query(params, getWindowIDs);
            function getWindowIDs(tabs){
                console.log("---getWindowID-Anfang");

                let WindowID = [];
                let TabsArray = new Array(tabs.length);
                let InnerTabsArray = new Array(4);
                let countFolderID = 0;
                
                for (i=0; i < tabs.length; i++){
                    if(!WindowID.includes(tabs[i].windowId)){
                        WindowID[WindowID.length] = tabs[i].windowId;   
                    }

                }

                chrome.storage.local.set({keyWindowID: WindowID, keyTabsArray: TabsArray}, function() {});
                console.log("WindowsID: " + WindowID);
                console.log("WindowsID Length: " + WindowID.length);
                console.log("---getWindowID-Ende");
        //---------------------------------------------------------------------


        //Create Folders/Bookmarks---------------------------------------------
                    chrome.storage.local.get(['keyWindowID', 'keyFolderID', 'keyTabsArray'], function(result) {
                    console.log("---createFolders-Anfang");

                        console.log("WindowID Length: " + result.KeyWindowIDLength);
                                        
                        for (i = 0; i < result.keyFolderID.length; i++){
                            let removeID = result.keyFolderID[i];
                            chrome.bookmarks.removeTree(removeID);
                        }
                        
                        for (i = 1; i <= result.keyWindowID.length; i++){
                            let paramsCreate = {
                            parentId: "2",
                            title: "Chrome Window " + i,
                            }
                            chrome.bookmarks.create(paramsCreate);
                        }
                        
                        console.log(result.keyTabsArray);

                        console.log("Got Value WindowID: " + result.keyWindowID);
                        console.log("Got Value FolderID: " + result.keyFolderID);

                        console.log("---createFolders-Ende");
                    });
        //---------------------------------------------------------------------

        }    
    }
}





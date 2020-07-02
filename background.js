chrome.browserAction.onClicked.addListener(buttonClicked)

function buttonClicked(){
    console.log("button clicked");
    MainFunction('2');
    MainFunction2('2');
}



function MainFunction(id) {
    //---Read all Folder Names&IDs---//
    chrome.bookmarks.getChildren(id, function(children) {
        
    var folderTitles = ["foldertitle"];
    var folderIDs = ["folderid"];
    console.log(folderTitles);
    console.log(folderIDs);
        
        children.forEach(function(bookmark) { 
            //console.log("Read folderid: " + bookmark.id);
            //console.log("Read folderTitle: " + bookmark.title);
            var FolderTitle = bookmark.title.toString();
            var FolderID = bookmark.id.toString();
            folderTitles[folderTitles.length] = FolderTitle;
            folderIDs[folderIDs.length] = FolderID;
            
        });
        //--------------------------------//   
    
            
        //---Go through each Tab---//
        chrome.tabs.query({windowType:'normal'}, function(tabs) {
            for (i = 1; i < tabs.length; i++) {

                var j = i - 1;
                var windowId = tabs[i].windowId.toString();
                var tabURL = tabs[i].url.toString();
                var tabTitle = tabs[i].title.toString();

                //---Add a Folder for each Window---//
                if(tabs[i].windowId != tabs[j].windowId){
                    if(folderTitles.includes(tabs[i].windowId.toString())){
                        console.log('already exists');
                    } else {
                        //Create Bookmark folderTitles
                        chrome.bookmarks.create({'title': windowId},
                            function (newFolder) {
                                console.log("Created Folder title: " + newFolder.title);
                                console.log("Created Folder ID: " + newFolder.id);
                            }
                        );
                    }
                }
                //--------------------------------------//


            }
        });
    });
    //--------------------------------------//
} 

function MainFunction2(id) {
    
        //---Read all Folder Names&IDs---//
    chrome.bookmarks.getChildren(id, function(children) {
        
    var folderTitles = ["foldertitle"];
    var folderIDs = ["folderid"];
    console.log(folderTitles);
    console.log(folderIDs);
        
        children.forEach(function(bookmark) { 
            //console.log("Read folderid: " + bookmark.id);
            //console.log("Read folderTitle: " + bookmark.title);
            var FolderTitle = bookmark.title.toString();
            var FolderID = bookmark.id.toString();
            folderTitles[folderTitles.length] = FolderTitle;
            folderIDs[folderIDs.length] = FolderID;
            
        });
        //--------------------------------//   
    
            
        //---Go through each Tab---//
        chrome.tabs.query({windowType:'normal'}, function(tabs) {
            for (i = 1; i < tabs.length; i++) {

                var j = i - 1;
                var windowId = tabs[i].windowId.toString();
                var tabURL = tabs[i].url.toString();
                var tabTitle = tabs[i].title.toString();

        //---Add Bookmark to Folder---// 
                
                for (k = 0; k < folderIDs.length; k++) {
                    var checkFolderId = folderIDs[k];
                    var checkFolderTitle = folderTitles[k];
                    
                    if (checkFolderTitle === windowId){
                        chrome.bookmarks.create({'parentId': checkFolderId,
                            'title': tabTitle,
                            'url': tabURL});
                    }
                    
                }
        //--------------------------------------//  


            }
        });
    });
    //--------------------------------------//
}


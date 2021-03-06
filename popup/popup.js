/*document.addEventListener('DOMContentLoaded', function () {
    
    let params = {
        windowType: 'normal'
    }
    let tabURL;
    
    chrome.tabs.query(params, getTabInfo);
    
    function getTabInfo(tabs){
        tabURL = tabs[0].url.toString();
        console.log(tabURL);
        console.log(tabs[0]);
        
        document.getElementById("test").innerHTML=tabURL;
   }
});*/

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('deleteFolders');
    // onClick's logic below:
    link.addEventListener('click', function() {
        deleteFolders();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('createFolders');
    // onClick's logic below:
    link.addEventListener('click', function() {
        createFolders();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('createBookmarks');
    // onClick's logic below:
    link.addEventListener('click', function() {
        createBookmarks();
    });
});

//-------------------------------------------    
//--------Function Delete Folders------------
//-------------------------------------------
function deleteFolders(){
    let parentId = '2';

    chrome.bookmarks.getChildren(parentId, foldersOld);
    function foldersOld(treeOld){

        let FolderIDOld = [];

        for(i=0; i < treeOld.length; i++){
            if(!FolderIDOld.includes(treeOld[i].id)){
                FolderIDOld[FolderIDOld.length] = treeOld[i].id;
            }
        }

            //Create Folders------------------------------------------------------
        for (i = 0; i < FolderIDOld.length; i++){
            let removeID = FolderIDOld[i];
            chrome.bookmarks.removeTree(removeID);
        }
            //---------------------------------------------------------------------
    }    
}
//-------------------------------------------    
//-------------------END---------------------
//-------------------------------------------


//-------------------------------------------    
//-----Function delete and create Folder-----
//-------------------------------------------
function createFolders(){
    let parentId = '2';

    chrome.bookmarks.getChildren(parentId, foldersOld);
    function foldersOld(treeOld){
        console.log("---getFolders-Anfang old");

        let FolderIDOld = [];

        for(i=0; i < treeOld.length; i++){
            if(!FolderIDOld.includes(treeOld[i].id)){
                FolderIDOld[FolderIDOld.length] = treeOld[i].id;
            }
        }
        console.log("folderid old: " + FolderIDOld);

        console.log("---getFolders-Ende old");
  
        let params = {
            windowType: 'normal'
        }

        chrome.tabs.query(params, getWindowIDs);
        function getWindowIDs(tabsOld){

            let WindowIDOld = [];
            let TabsArray = new Array(tabsOld.length);
            let countFolderID = 0;
            
            for (i=0; i < tabsOld.length; i++){
                if(!WindowIDOld.includes(tabsOld[i].windowId)){
                    WindowIDOld[WindowIDOld.length] = tabsOld[i].windowId;   
                }
            }

            //Create Folders------------------------------------------------------
            for (i = 0; i < FolderIDOld.length; i++){
                let removeID = FolderIDOld[i];
                chrome.bookmarks.removeTree(removeID);
            }

            for (i = 1; i <= WindowIDOld.length; i++){
                let paramsCreate = {
                parentId: "2",
                title: "Chrome Window " + i,
                }
                chrome.bookmarks.create(paramsCreate);
            }
            for(i=0; i < treeOld.length; i++){
                if(!FolderIDOld.includes(treeOld[i].id)){
                    FolderIDOld[FolderIDOld.length] = treeOld[i].id;
                }
            }
            //---------------------------------------------------------------------
        }    
    }
}
//-------------------------------------------    
//-------------------END---------------------
//-------------------------------------------

//-------------------------------------------    
//-----Tree for create Bookmarks-------------
//-------------------------------------------   
function createBookmarks(){
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
        console.log("folderid new: " + FolderID);
  
        let params = {
            windowType: 'normal'
        }

        chrome.tabs.query(params, getWindowIDs);
        function getWindowIDs(tabs){
            console.log("---getWindowID-Anfang");

            let WindowID = [];
            let TabsArray = new Array(tabs.length);
            let countFolderID = 0;
            
            for (i=0; i < tabs.length; i++){
                if(!WindowID.includes(tabs[i].windowId)){
                    WindowID[WindowID.length] = tabs[i].windowId;   
                }
            }
            
            for (i=0; i < tabs.length; i++){

            //---
            if(i!=0){
                    //Tab is in the same window as the one before
                    if (tabs[i].windowId === tabs[i-1].windowId){
                        let InnerTabsArray = new Array(3);
                        InnerTabsArray[0] = FolderID[countFolderID];
                        InnerTabsArray[1] = tabs[i].title;
                        InnerTabsArray[2] = tabs[i].url;
                        TabsArray[i] = InnerTabsArray;
                    //Tab is in a different window as the one before
                    } else {
                        countFolderID++;
                        let InnerTabsArray = new Array(3);
                        InnerTabsArray[0] = FolderID[countFolderID];
                        InnerTabsArray[1] = tabs[i].title;
                        InnerTabsArray[2] = tabs[i].url;
                        TabsArray[i] = InnerTabsArray;
                    }
                //First Tab [0] in Array
                } else {
                    let InnerTabsArray = new Array(3);
                    InnerTabsArray[0] = FolderID[countFolderID];
                    InnerTabsArray[1] = tabs[i].title;
                    InnerTabsArray[2] = tabs[i].url;
                    TabsArray[i] = InnerTabsArray;
                }

            }
    
            //Create Bookmarks in specific Folder----------------------------------        
                console.log("folderid test: " + FolderID);

                console.log(TabsArray);

                for (i = 0; i < TabsArray.length; i++){
                        chrome.bookmarks.create({'parentId': TabsArray[i][0],
                           'title': TabsArray[i][1],
                           'url': TabsArray[i][2]});

                }
            //---------------------------------------------------------------------
        }
    }
}
//-------------------------------------------    
//-------------------END---------------------
//-------------------------------------------
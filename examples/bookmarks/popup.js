function begin(query) {
  debugger;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    if (tab) {
        execScript(tab);
    } else {
        alert("There are no active tabs")
    }
  });

}
/**
 * Function executes a grabImages() function on a web page,
 * opened on specified tab
 * @param tab - A tab to execute script on
 */
 function execScript(tab) {
  // Execute a function on a page of the current browser tab
  // and process the result of execution
  chrome.scripting.executeScript(
      {
          target:{tabId: tab.id, allFrames: true},
          func:grabImages
      },
      onResult
  )
}

function grabImages() {
  const images = document.getElementById("Imgs").querySelectorAll("img");
  return Array.from(images).map(image=>image.src.replace("-650-570.jpeg", "-full.jpeg"));  
}

function onResult(frames) {
  // If script execution failed on the remote end 
    // and could not return results
    if (!frames || !frames.length) { 
      alert("Could not retrieve images from specified page");
      return;
  }
  // Combine arrays of the image URLs from 
  // each frame to a single array
  const imageUrls = frames.map(frame=>frame.result)
                          .reduce((r1,r2)=>r1.concat(r2));
                          debugger;
  openImagesPage(imageUrls);
}

function openImagesPage(urls) {
  console.log(urls);
  chrome.tabs.create(
      {"url": "page.html",selected:false},(tab) => {        
          // * Send `urls` array to this page
          setTimeout(()=>{
              chrome.tabs.sendMessage(tab.id,urls,(resp) => {
                  chrome.tabs.update(tab.id,{active: true});
              });                            
          },100);
      }
  );
}

document.addEventListener('DOMContentLoaded', function () {
  begin();
});

chrome.runtime.onMessage
    .addListener((message,sender,sendResponse) => { 
        addImagesToContainer(message)
        sendResponse("OK");
    });

/**
 * Function that used to display an UI to display a list 
 * of images
 * @param {} urls - Array of image URLs
 */
function addImagesToContainer(urls) {
    if (!urls || !urls.length) {
        return;
    }
    const listContainer = document.querySelector(".image-gallery");
    urls.forEach(url => addImageNode(listContainer, url))
}

/**
 * Function dynamically add a DIV with image and checkbox to 
 * select it to the container DIV
 * @param {*} container - DOM node of a container div 
 * @param {*} url - URL of image 
 */
function addImageNode(container, url) {
    const imageListItem = document.createElement("li");
    imageListItem.className = "imageDiv";
    const img = document.createElement("img");
    img.src = url;
    imageListItem.appendChild(img);
    container.appendChild(imageListItem)
}
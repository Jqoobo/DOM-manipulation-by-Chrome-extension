document.addEventListener("DOMContentLoaded", function() {
  var injectCheckbox = document.getElementById("injectCheckbox");

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tabId = tabs[0].id;

    loadCheckboxState(tabId);

    injectCheckbox.addEventListener("change", function() {
      var isChecked = injectCheckbox.checked;
      saveCheckboxState(tabId, isChecked);

      if (isChecked) {
        injectCSS(tabId);
      } else {
        removeCSS(tabId);
      }
    });
  });

  function saveCheckboxState(tabId, isChecked) {
    var data = {};
    data[tabId] = isChecked;
    chrome.storage.local.set(data, function() {
      console.log("Checkbox state saved");
    });
  }

  function loadCheckboxState(tabId) {
    chrome.storage.local.get(null, function(result) {
      if (result.hasOwnProperty(tabId)) {
        injectCheckbox.checked = result[tabId];
      }
    });
  }

  function injectCSS(tabId) {
    var cssFile = chrome.runtime.getURL('/css/styles.css');

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: injectCSSCode,
      args: [cssFile]
    }, function() {
      console.log("CSS injected successfully");
    });
  }

  function removeCSS(tabId) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: removeCSSCode
    }, function() {
      console.log("CSS removed successfully");
    });
  }

  function injectCSSCode(cssFile) {
    var linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.type = 'text/css';
    linkElement.href = cssFile;

    function injectCSSIntoFrames(doc) {
      var frames = doc.getElementsByTagName('iframe');
      for (var i = 0; i < frames.length; i++) {
        try {
          injectCSSIntoFrames(frames[i].contentDocument);
          frames[i].contentDocument.head.appendChild(linkElement.cloneNode(true));
        } catch (e) {
          console.error('Error injecting CSS:', e);
        }
      }
    }

    injectCSSIntoFrames(document);
    document.head.appendChild(linkElement);
  }

  function removeCSSCode() {
    var linkElements = document.querySelectorAll('link[rel="stylesheet"]');
    linkElements.forEach(function(element) {
      element.remove();
    });
  }
});

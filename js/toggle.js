document.addEventListener("DOMContentLoaded", function() {
  var injectCheckbox = document.getElementById("injectCheckbox");
  var injectCheckbox2 = document.getElementById("injectCheckbox2");
  var injectCheckbox3 = document.getElementById("injectCheckbox3");
  var injectCheckbox4 = document.getElementById("injectCheckbox4");
  var injectCheckbox5 = document.getElementById("injectCheckbox5");

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tabId = tabs[0].id;

    loadCheckboxState(tabId, injectCheckbox);
    loadCheckboxState(tabId, injectCheckbox2);
    loadCheckboxState(tabId, injectCheckbox3);
    loadCheckboxState(tabId, injectCheckbox4);
    loadCheckboxState(tabId, injectCheckbox5);

    injectCheckbox.addEventListener("change", function() {
      var isChecked = injectCheckbox.checked;
      saveCheckboxState(tabId, isChecked, "injectCheckbox");

      if (isChecked) {
        injectCSS(tabId);
      } else {
        removeCSS(tabId);
      }
    });

    injectCheckbox2.addEventListener("change", function() {
      var isChecked = injectCheckbox2.checked;
      saveCheckboxState(tabId, isChecked, "injectCheckbox2");

      if (isChecked) {
        injectCSS2(tabId);
      } else {
        removeCSS2(tabId);
      }
    });

    injectCheckbox3.addEventListener("change", function() {
      var isChecked = injectCheckbox3.checked;
      saveCheckboxState(tabId, isChecked, "injectCheckbox3");

      if (isChecked) {
        injectCSS3(tabId);
      } else {
        removeCSS3(tabId);
      }
    });

    injectCheckbox4.addEventListener("change", function() {
      var isChecked = injectCheckbox4.checked;
      saveCheckboxState(tabId, isChecked, "injectCheckbox4");

      if (isChecked) {
        injectCSS4(tabId);
      } else {
        removeCSS4(tabId);
      }
    });
    injectCheckbox5.addEventListener("change", function() {
      var isChecked = injectCheckbox5.checked;
      saveCheckboxState(tabId, isChecked, "injectCheckbox5");

      if (isChecked) {
        injectCSS5(tabId);
      } else {
        removeCSS5(tabId);
      }
    });
  });

  function saveCheckboxState(tabId, isChecked, checkboxId) {
    var data = {};
    data[tabId + "-" + checkboxId] = isChecked;
    chrome.storage.local.set(data, function() {
      console.log("Zapisan stan przycisku");
    });
  }

  function loadCheckboxState(tabId, checkboxElement) {
    var checkboxId = checkboxElement.id;
    chrome.storage.local.get(tabId + "-" + checkboxId, function(result) {
      if (result.hasOwnProperty(tabId + "-" + checkboxId)) {
        checkboxElement.checked = result[tabId + "-" + checkboxId];
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
      console.log("Dodano kod CSS");
    });
  }

  function removeCSS(tabId) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: removeCSSCode
    }, function() {
      console.log("Kod CSS usunięty");
    });
  }

  function injectCSS2(tabId) {
    var cssFile2 = chrome.runtime.getURL('/css/styles2.css');

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: injectCSSCode2,
      args: [cssFile2]
    }, function() {
      console.log("Dodano kod CSS2");
    });
  }

  function removeCSS2(tabId) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: removeCSSCode2
    }, function() {
      console.log("Kod CSS2 usunięty");
    });
  }

  function injectCSS3(tabId) {
    var cssFile3 = chrome.runtime.getURL('/css/styles3.css');

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: injectCSSCode3,
      args: [cssFile3]
    }, function() {
      console.log("Dodano kod CSS3");
    });
  }

  function removeCSS3(tabId) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: removeCSSCode3
    }, function() {
      console.log("Kod CSS3 usunięty");
    });
  }

  function injectCSS4(tabId) {
    var cssFile4 = chrome.runtime.getURL('/css/styles4.css');

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: injectCSSCode4,
      args: [cssFile4]
    }, function() {
      console.log("Dodano kod CSS4");
    });
  }

  function removeCSS4(tabId) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: removeCSSCode4
    }, function() {
      console.log("Kod CSS4 usunięty");
    });
  }

  function injectCSS5(tabId) {
    var cssFile5 = chrome.runtime.getURL('/css/styles5.css');

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: injectCSSCode5,
      args: [cssFile5]
    }, function() {
      console.log("Dodano kod CSS5");
    });
  }

  function removeCSS5(tabId) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: removeCSSCode5
    }, function() {
      console.log("Kod CSS5 usunięty");
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
          console.error('Wystąpił błąd:', e);
        }
      }
    }
    injectCSSIntoFrames(document);
    document.head.appendChild(linkElement);
  }

  function removeCSSCode() {
    var linkElements = document.querySelectorAll('link[rel="stylesheet"]');
    linkElements.forEach(function(element) {
      if (element.href.includes("/css/styles.css")) {
        element.remove();
      }
    });
  }

  function injectCSSCode2(cssFile2) {
    var linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.type = 'text/css';
    linkElement.href = cssFile2;

    function injectCSSIntoFrames(doc) {
      var frames = doc.getElementsByTagName('iframe');
      for (var i = 0; i < frames.length; i++) {
        try {
          injectCSSIntoFrames(frames[i].contentDocument);
          frames[i].contentDocument.head.appendChild(linkElement.cloneNode(true));
        } catch (e) {
          console.error('Wystąpił błąd:', e);
        }
      }
    }
    injectCSSIntoFrames(document);
    document.head.appendChild(linkElement);
  }

  function removeCSSCode2() {
    var linkElements = document.querySelectorAll('link[rel="stylesheet"]');
    linkElements.forEach(function(element) {
      if (element.href.includes("/css/styles2.css")) {
        element.remove();
      }
    });
  }

  function injectCSSCode3(cssFile3) {
    var linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.type = 'text/css';
    linkElement.href = cssFile3;

    function injectCSSIntoFrames(doc) {
      var frames = doc.getElementsByTagName('iframe');
      for (var i = 0; i < frames.length; i++) {
        try {
          injectCSSIntoFrames(frames[i].contentDocument);
          frames[i].contentDocument.head.appendChild(linkElement.cloneNode(true));
        } catch (e) {
          console.error('Wystąpił błąd:', e);
        }
      }
    }
    injectCSSIntoFrames(document);
    document.head.appendChild(linkElement);
  }

  function removeCSSCode3() {
    var linkElements = document.querySelectorAll('link[rel="stylesheet"]');
    linkElements.forEach(function(element) {
      if (element.href.includes("/css/styles3.css")) {
        element.remove();
      }
    });
  }

  function injectCSSCode4(cssFile4) {
    var linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.type = 'text/css';
    linkElement.href = cssFile4;

    function injectCSSIntoFrames(doc) {
      var frames = doc.getElementsByTagName('iframe');
      for (var i = 0; i < frames.length; i++) {
        try {
          injectCSSIntoFrames(frames[i].contentDocument);
          frames[i].contentDocument.head.appendChild(linkElement.cloneNode(true));
        } catch (e) {
          console.error('Wystąpił błąd:', e);
        }
      }
    }
    injectCSSIntoFrames(document);
    document.head.appendChild(linkElement);
  }

  function removeCSSCode4() {
    var linkElements = document.querySelectorAll('link[rel="stylesheet"]');
    linkElements.forEach(function(element) {
      if (element.href.includes("/css/styles4.css")) {
        element.remove();
      }
    });
  }

  function injectCSSCode5(cssFile5) {
    var linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.type = 'text/css';
    linkElement.href = cssFile5;

    function injectCSSIntoFrames(doc) {
      var frames = doc.getElementsByTagName('iframe');
      for (var i = 0; i < frames.length; i++) {
        try {
          injectCSSIntoFrames(frames[i].contentDocument);
          frames[i].contentDocument.head.appendChild(linkElement.cloneNode(true));
        } catch (e) {
          console.error('Wystąpił błąd:', e);
        }
      }
    }
    injectCSSIntoFrames(document);
    document.head.appendChild(linkElement);
  }

  function removeCSSCode5() {
    var linkElements = document.querySelectorAll('link[rel="stylesheet"]');
    linkElements.forEach(function(element) {
      if (element.href.includes("/css/styles5.css")) {
        element.remove();
      }
    });
  }

});

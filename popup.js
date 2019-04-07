document.getElementById("myBtn1").addEventListener("click",listen);
document.getElementById("myBtn2").addEventListener("click",help);

var startAudio = new Audio();
var endAudio = new Audio();
var result = "none";

startAudio.src = "sounds/start_speech.ogg";
endAudio.src = "sounds/end_speech.ogg";

chrome.commands.onCommand.addListener(function (command) { listen(); });

function selection(value) {
	var m;
  m = value.toLowerCase();

	start(m);

	if (m.indexOf('search') == 0) {
      update(m.replace('search', ''));
    }
  else if (m.indexOf('forward') == 0) {
      forward();
    }
  else if (m.indexOf('backward') == 0) {
      backward();
    }
  else if (m.indexOf('open new tab') == 0) {
      opennewtab();
    }
  else if (m.indexOf('reload') == 0) {
      reload();
    }
  else if (m.indexOf('wikipedia') == 0) {
      wikisearch(m.replace('wikipedia', ''));
    }
  else if (m.indexOf('song') == 0) {
      playsong(m.replace('song', ''));
    }
  else if (m.indexOf('maps') == 0){
      maps(m.replace('maps', ''));
    }
  else if (m.indexOf('photos of') == 0) {
      images(m.replace('photos of', ''));
    }
	else if (m.indexOf('images of') == 0) {
      images(m.replace('images of', ''));
    }
  else if (m.indexOf('scroll up') == 0) {
      scrollup();
    }
	else if (m.indexOf('scroll down') == 0) {
      scrolldown();
     }
  else if (m.indexOf('close') == 0) {
      close();
    }
	else if (m.indexOf('youtube') == 0){
       youtube(m.replace('youtube', ''));
    }
  else {
    document.getElementById("demo").innerHTML = "Wrong Command You Said: " + value;
	}
}

function start(m) {
	if ((m.indexOf('search') == 0)|| (m.indexOf('forward') == 0) || (m.indexOf('backward') == 0) || (m.indexOf('open new tab') == 0) || (m.indexOf('reload') == 0)) {
		m = "You Said: " + m;
	}
	else if((m.indexOf('wikipedia') == 0) || (m.indexOf('song') == 0) || (m.indexOf('maps') == 0) || (m.indexOf('photos of') == 0) || (m.indexOf('images of') == 0)){
		m = "You Said: " + m;
	}
	else if((m.indexOf('scroll up') == 0) || (m.indexOf('scroll down') == 0) || (m.indexOf('close') == 0) || (m.indexOf('youtube') == 0) ){
		m = "You Said: " + m;
	}
	else {
		m = "Wrong Command You Said: " + m;
	}
	document.getElementById("demo").innerHTML = m;
	speech(m);
}

function help(){
	chrome.tabs.create({url: chrome.extension.getURL("help.html")});
}
function youtube(u) {
	chrome.tabs.create({ url: "https://www.youtube.com/results?search_query="+u+"" });
}
function scrollup(){
		chrome.tabs.executeScript(null, {'code': "var myVar = setInterval(myTimer, 100);\
		var m = 1;\
		function myTimer() {\
		    window.scrollBy(0, -10);\
		    if (m > 20) {\
		        clearInterval(myVar);\
		    }\
		    m++; \
		}\
"});
}
function scrolldown(){
		chrome.tabs.executeScript(null, {'code': "var myVar = setInterval(myTimer, 100);\
		var m = 1;\
		function myTimer() {\
		    window.scrollBy(0, 10);\
		    if (m > 20) {\
		        clearInterval(myVar);\
		    }\
		    m++; \
		}\
"});
}
function close() {
    chrome.tabs.executeScript(null, { "code": "window.close()" });
}
function backward() {
    chrome.tabs.executeScript(null, { "code": "window.history.back()" });
}
function forward() {
    chrome.tabs.executeScript(null, { "code": "window.history.go(1)" });
}
function opennewtab() {
    chrome.tabs.create({ url: "https://google.com" });
}
function reload() {
    chrome.tabs.reload();
}
function wikisearch(u) {
    chrome.tabs.create({ url: "https://en.wikipedia.org/wiki/"+u+"" });
}
function update(u) {
    chrome.tabs.create({ url: "https://www.google.co.in/search?q="+u+"" });
}
function playsong(u) {
    chrome.tabs.create({ url: "https://www.saavn.com/search/"+u+"" });
}
function maps(u) {
    chrome.tabs.create({ url: "https://www.google.co.in/maps/place/"+u+"" });
}
function images(u) {
    chrome.tabs.create({ url: "https://www.google.co.in/search?hl=en&tbm=isch&source=hp&biw=1366&bih=662&ei=Jfq4Wt74HcbwvATh2aLwBg&q="+u+"" });
}

function listen() {
  startAudio.play();

  const SpeechRecognition = webkitSpeechRecognition;
  const SpeechGrammarList = webkitSpeechGrammarList;
  const SpeechRecognitionEvent = webkitSpeechRecognitionEvent;
  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();
  /**
   * other settings
   */
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  /**
   * event handlers
   */
  recognition.onresult = (e) => {
      const result = e.results[e.results.length - 1][0].transcript;
      endAudio.play();
      selection(result);

  }
  recognition.onerror = (e) => {
      console.error(e);
  }
  recognition.onend = () => {
      console.log('recognition end.');
  }
/**`
   * other functions
   */
   function start() {
      recognition.start();
  }
   start();
}

function speech(value) {
  const synthesis = window.speechSynthesis;
  const synthesisText = document.querySelector('#synthesisText');

  function speak() {
      const utter = new SpeechSynthesisUtterance(value);
      // the list of all available voices
      const voices = synthesis.getVoices();

      for (i = 0; i < voices.length; ++i) {
          if (voices[i].name === "Google ??(??)") {
              utter.voice = voices[i];
          }
      }

      utter.rate = 1;
      utter.pitch = 1;
      synthesis.speak(utter);
  }
  speak();
}

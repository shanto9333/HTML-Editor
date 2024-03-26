 // Initialize CodeMirror instances
 var themes = ['dracula', 'monokai']; // List of available themes
 var currentThemeIndex = 0; // Index of the currently selected theme
 var htmlEditor = CodeMirror.fromTextArea(document.getElementById("html-code"), {
     lineNumbers: true,
     mode: "xml",
     theme: themes[currentThemeIndex] // Set initial theme
 });

 var cssEditor = CodeMirror.fromTextArea(document.getElementById("css-code"), {
     lineNumbers: true,
     mode: "css",
     theme: themes[currentThemeIndex] // Set initial theme
 });

 var jsEditor = CodeMirror.fromTextArea(document.getElementById("js-code"), {
     lineNumbers: true,
     mode: "javascript",
     theme: themes[currentThemeIndex] // Set initial theme
 });

 function run() {
     var htmlCode = htmlEditor.getValue();
     var cssCode = cssEditor.getValue();
     var jsCode = jsEditor.getValue();
     var output = document.getElementById("output");

     var iframeDoc = output.contentWindow.document;
     iframeDoc.open();
     iframeDoc.write(htmlCode + "<style>" + cssCode + "</style>");
     iframeDoc.close();

     // Eval JavaScript code separately
     output.contentWindow.eval(jsCode);
 }

 // Attach run function to keyup event of editors
 htmlEditor.on("change", run);
 cssEditor.on("change", run);
 jsEditor.on("change", run);

 // Run initially
 run();

 function toggleTheme() {
     currentThemeIndex = (currentThemeIndex + 1) % themes.length; // Cycle through themes
     htmlEditor.setOption("theme", themes[currentThemeIndex]);
     cssEditor.setOption("theme", themes[currentThemeIndex]);
     jsEditor.setOption("theme", themes[currentThemeIndex]);
 }

 function toggleFullscreen() {
     var elem = document.documentElement;
     if (!document.fullscreenElement) {
         if (elem.requestFullscreen) {
             elem.requestFullscreen();
         } else if (elem.webkitRequestFullscreen) { /* Safari */
             elem.webkitRequestFullscreen();
         } else if (elem.msRequestFullscreen) { /* IE11 */
             elem.msRequestFullscreen();
         }
     } else {
         if (document.exitFullscreen) {
             document.exitFullscreen();
         } else if (document.webkitExitFullscreen) { /* Safari */
             document.webkitExitFullscreen();
         } else if (document.msExitFullscreen) { /* IE11 */
             document.msExitFullscreen();
         }
     }
 }
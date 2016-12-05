# SpeakUp App
>**Speakup** is a web-application that gives a voice to silent majority in McGill classrooms.

>Silent majority of students that don't ask questions during lectures
for various reasons. Either because of health issues or because they
don't want to interrupt teacher, or because they think that the question
is irrelevant. 

>**Speakup** supplements lectures by providing anonymous yet serious environment where students can easily ask questions and where teacher can get feedback on material in real time.

---

## Installation

>Speakup can be easily installed and tested on any machine with NodeJS and NPM installed. 
Follow the steps below to get started.

### 1. Install NodeJS

```bash
## Ubuntu
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

## MacOS
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"

```

### 2. Install Dependencies


```bash
npm install
```


### 3. All set

You can test the app, by opening `index.html` in the browser of you choice

```bash
open index.html
```



----

## Project Structure

The project structure outline key directories and files and provides a quick description of their purpose

```js
├── api/          // Contains all the backened API code
│
├── components/   // React components used in the application
|
├── dist/         // Contains generated files used only for production (e.g bundle.js)
│
├── styles/       // Contains SASS/CSS styles for the project
│
├── app.js        // Entry point of the application, renders React router and all child components
│  
├── dev-server.js // Simple webpack/express server to serve/debug the application locally (Bonus points for hot reload)
|
├── index.html    // Main page of the application that serves as a placeholder for all Javascript (React components)
│
├── package.json  // Lists libraries (dependencies) of the application and a few shortcut commands
│
```

---

## Development setup 

### 1. Launch dev webserver

```bash
npm run dev
```

Once the server is launched, go to `localhost:3000` to see the rendered page

>Note that first launch can take a while, but then everything should work smoothly 
and auto-refresh automatically on code change

### 2. Code

`...`

----

## Recommended software

I suggest [VSCode](https://code.visualstudio.com/) with the following extensions available directly in extensions tab of the app.

1. Babel ES6/ES7
2. React Standard Style Code Snippets
3. ESLint


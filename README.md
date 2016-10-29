# SpeakUp App
Project description 

---

## Setup

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


### 3. Run webpack dev server

```bash
npm start
```
Once the server is launched, go to `localhost:3000` to see the rendered page

>Note that first launch can take a while, but then everything should work smoothly 
and auto-refresh automatically on code change


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

## Dev setup recommendation

I suggest [VSCode](https://code.visualstudio.com/) with the following extensions available directly in extensions tab of the app.

1. Babel ES6/ES7
2. React Standard Style Code Snippets
3. ESLint






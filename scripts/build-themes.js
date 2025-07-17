const { execSync } = require("child_process");
const fs = require("fs");
const themesDir = "./Themes";

const themes = fs.readdirSync(themesDir).filter(name =>
    fs.statSync(`${themesDir}/${name}`).isDirectory()
);

themes.forEach(theme => {
    console.log(`Building theme: ${theme}`);
    execSync(`cross-env THEME=${theme} npm run build:theme`, { stdio: "inherit" });
});

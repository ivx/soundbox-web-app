README

## Deploy on the soundbox

cd into the soundbox-web-app directory
```
yarn && yarn build && scp -r build/* alarm@soundbox:~/compiled_react_app/
```

## Start server for dev

```
babel-node server.js
```

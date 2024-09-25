from node:20

WORKDIR /app

copy . .

run npm install
run npm run build

cmd ["npm","run","dev"]
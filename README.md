# Alyson-v9 Generic Frontend for Genny Project

[![Node.js CI](https://github.com/genny-project/alyson-v9/actions/workflows/nodeci.yml/badge.svg)](https://github.com/genny-project/alyson-v9/actions/workflows/nodeci.yml)
[![Linter](https://github.com/genny-project/alyson-v9/actions/workflows/linter.yml/badge.svg)](https://github.com/genny-project/alyson-v9/actions/workflows/linter.yml)

### Setup

#### To run locally with npm start

1. Clone in to local
2. Go to https://nodejs.org/en/ and download and install Node (You need v14.6.0 or later)
3. In your terminal run node -v to confirm install
4. CD to alyson-v9 directory
5. In root add .env
   - paste: REACT_APP_ENV_GENNY_BRIDGE_URL="https://your-server-url.com"
   - update URL for your server
6. If you are using UNITY:
   - Go to GitHub https://github.com/OutcomeLife/stt-unity (Or wherever your Unity files are)
   - Copy all files from `/Build` in to `alyson-v9/public/unity` (Create the unity directory)
7. Go to alyson-v9 in terminal and run `npm i`
8. After that is finished run `npm start`
9. If you change `.env` or anything in `/public` you will have to restart development server (`npm start`) otherwise it will hot reload

#### To run tests locally

1. Clone in to local
2. Go to https://nodejs.org/en/ and download and install Node (You need v14.6.0 or later)
3. In your terminal run node -v to confirm install
4. CD to alyson-v9 directory
5. Run npm test

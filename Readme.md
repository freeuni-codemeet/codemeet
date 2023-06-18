# codemeet

### Setup
- Create .env file in root folder with this variables
```
CORE_API_PORT=5000
HOST=0.0.0.0
OPENVIDU_PORT=4443
OPENVIDU_SECRET=YOUR_SECRET
OPENVIDU_USERNAME=OPENVIDUAPP
OPENVIDU_URL=http://openvidu:4443/
```
In rustpad directory run command(to install wasm-pack):
wasm-pack build --target web rustpad-wasm
```
- Run this command
```
docker compose up
```
Compile and run the backend web server:
cargo run
```

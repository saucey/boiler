TARGET_LOCATION="./node_modules/webpack-dev-server/ssl/server.pem"
SOURCE_LOCATION=$(pwd)/$(dirname "./local-certificate/server.pem")/server.pem

@echo off
SET SRC=${SOURCE_LOCATION}
SET DEST=${TARGET_LOCATION}
if not exist %DEST% copy /V %SRC% %DEST%
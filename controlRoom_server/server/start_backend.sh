
CONTROLROOM=$HOME/Workspace/controlRoom/server
CONFIG_SERVER=${CONTROLROOM}/config/admin/server

# export NODE_MODULE_PATH=${CONFIG_SERVER}/node_modules/lib/node_modules/ControlRoomAdminServer/node_modules/

# Variable NODE_PATH is needed to look for the node_modules
# export NODE_PATH=${NODE_MODULE_PATH}

# DEBUG=express* nodemon server_admin.js package.json
nodemon server_admin.js package.json

"use strict";


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tlctf');

require('./src/app-backend/app-backend').startServer();
require('./src/app-frontend/app-frontend').startServer();


var addresses = [];
eachLocalAddress(function(addr) {
    addresses.push(addr);
});
console.log("Server ip addresses: " + addresses);


function eachLocalAddress(func) {

    var os = require('os');
    var ifaces = os.networkInterfaces();

    Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            func(iface.address);
        });
    });
}
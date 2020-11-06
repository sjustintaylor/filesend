# Deployment guide

1. Install Caddy server
2. Install Node 14, yarn, and pm2
3. Add deployment keys to the repo
4. Clone the repo, and install dependancies
5. Generate a new secp256k1 private key for JWT signing ([instructions](https://www.scottbrady91.com/OpenSSL/Creating-Elliptical-Curve-Keys-using-OpenSSL))
6. Create a production `.env`
   1. Domain is `send.windsongwireless.duckdns.org`
   2. Make sure it's not using the dev keys
7. Build the app, and copy the `/build` directory to `/var/www/filesend`
8. Use DB Browser to create a new database with a clean files table and a new set of users (create one for yourself, and one for Iain)
9. Start pm2, set it to start up on reboot
10. Start caddy, set it to start up on reboot
11. Test the app at `send.windsongwireless.duckdns.org`
12. Upload the music file and send Iain the link, and his login details for the upload

## Resources

- [PM2 deployment](https://www.serverlab.ca/tutorials/linux/administration-linux/how-to-run-nodejs-applications-in-production-using-pm2/)

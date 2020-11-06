**`jwt-dev-key.pem` is for development use only, generate a new EC private key for production**

## Deployment

- Use [Caddyserver](https://caddyserver.com) for reverse proxy and app serving. Make sure it's set to start on boot as a systemctl service
- PM2, set to start on boot, for the node server
- **App url**: `https://send.windsongwireless.duckdns.org`
- **API Url**: `https://send.windsongwireless.duckdns.org/api`
- App and api are hosted on the pi.

## Autopurge

Files are purged when either the `GET /files` or `GET /files/:file_id` routes are called. Purging is done via a middleware function.

## DB schema

**Users**

```json
{
  "id": "number",
  "username": "string",
  "password": "string"
}
```

**Files**

Files are stored in a `./files` directory next to the server. Files are stored on disk under a uuid filename to prevent collisions.

```json
{
  "user_id": "Users.id",
  "filename": "string, the actual file name",
  "file_id": "string, uuid of on disk file",
  "created": "timestamp",
  "expires": "timestamp, used to delete old files"
}
```

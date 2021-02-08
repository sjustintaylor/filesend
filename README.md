# Filesend

Filesend is a simple way to share files with others.

## Files

## Sessions

Filesend doesn't hold any user information beyond a user's email address. Log in is handled with magic link authentication. The `/session` route handles the following:

1. Emailing a link using `node-mailer`
2. Convert the link token to an authentication and refresh token pair
3. Delete session, logging the user out.
4. Refresh session with refresh token

Tokens are signed with asymmetric keys.
After a session is deleted, the user's refresh token will no longer work. This is handled using a session record per email address.

### Token rules

1. Links can only be used once. A link expires after 15 minutes.
2. A link token can only be redeemed if the email address it was sent with is provided as well
3. A refresh token can only be used once. A new refresh token will be issued on refresh.
4. An auth token expires in 15 minutes
5. Deleting a session invalidates any current refresh and auth tokens.
6. The refresh token is stored in a `secure httpOnly` cookie
7. The auth token should be stored in browser memory (ie react state). Use localstorage events to trigger log out across multiple windows. It should never actually be stored in LocalStorage

## Installation

Clone the repo, install dependancies:

```bash
git clone git@github.com:sjustintaylor/magiclink.git
yarn install
```

## Usage

For development purposes:

```bash
yarn start
```

For production, deploy using PM2 or similar behind a reverse proxy such as Caddy Server. An ecosystem template will be available once the project reachs v1.0.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

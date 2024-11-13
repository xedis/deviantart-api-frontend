**DeviantArt API Frontend** 
----------------------------
*  Oauth Auth only thing working with refresh tokens
*  access_token, refresh_token, sessionId, state all store successfully in sqlite3 db for now.

**TODO**
------------------------
*   working on the accesstoken handling as it's required for calls against deviantart's gallery endpoint.

**Key Components**
----------------------------
*    Authentication: OAuth 2.0 with DeviantArt API
*    APIs: DeviantArt API (used by _api.js and auth.js) ======= This is a Next.js application that uses the DeviantArt API to fetch and display user galleries.

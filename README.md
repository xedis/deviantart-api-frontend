**STATE.md**
===============

**DeviantArt API Frontend**
---------------------------

*   Framework: Next.js
*   Pages:
    *   index.js: Handles login and fetches deviations
    *   _app.js: Authenticates user and fetches galleries
    *   Deviation.js: Defines Deviation model
*   APIs:
    *   _api.js: Handles authentication and fetches artworks
    *   auth.js: Handles authentication

**DeviantArt Auth Server**
-------------------------

*   Framework: Express.js
*   Endpoints:
    *   /login: Redirects to DeviantArt authorization page
    *   /callback: Handles authorization code and exchanges it for access token

**Nginx Configuration**
----------------------

*   Listens on port 80 and 443 (SSL)
*   Proxies requests to localhost:3000 (DeviantArt API Frontend) and localhost:5000 (DeviantArt Auth Server)
*   SSL certificates: /home/archie/.ssl/umami.xedis.net/umami_xedis_net-cert.pem and /home/archie/.ssl/umami.xedis.net/umami_xedis_net-key.pem

**Key Components**
-------------------

*   Authentication: OAuth 2.0 with DeviantArt API
*   Database: MongoDB (used by Deviation model)
*   APIs: DeviantArt API (used by _api.js and auth.js)
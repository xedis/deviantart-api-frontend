**STATE.md**
===============

**DeviantArt API Frontend**
---------------------------

*   Framework: Next.js
*   Pages:
    *   index.js: Handles initiating Auth Flow and fetches deviations
    *   _app.js: Authenticates user and fetches galleries
    *   Deviation.js: Defines Deviation db structure.
*   APIs:
    *   _api.js: Handles authentication and fetches
    *   auth.js: Handles authentication

**DeviantArt Auth Server**
-------------------------

*   Framework: Express.js
*   Endpoints:
    *   /login: Redirects to DeviantArt authorization page
    *   /callback: Handles authorization code and exchanges it for access token
    *   

**Key Components**
-------------------

*   Authentication: OAuth 2.0 with DeviantArt API
*   APIs: DeviantArt API (used by _api.js and auth.js)

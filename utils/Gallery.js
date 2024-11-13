const sqlite3 = require('sqlite3').verbose();

class Gallery {
    constructor(dbLocation) {
        this.db = new sqlite3.Database(dbLocation);
    }
    async getAccessToken() {
        return new Promise((resolve, reject) => {
            this.db.get('SELECT accessToken FROM tokens WHERE state = ? ORDER BY id DESC LIMIT 1', process.env.STATE, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row.accessToken);
                }
            });
        });
    }
    async fetchGallery(accessToken) {
        const response = await axios.get('https://www.deviantart.com/api/v1/oauth2/gallery/all', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                username: 'x-the-void-x',
                limit: 10,
                format: 'json',
            },
        });
        return JSON.parse(response.data);
    }
}

module.exports = Gallery;

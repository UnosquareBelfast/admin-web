### Web-App

1. Download & Install [Node V8.11.1](https://nodejs.org/en/download/releases/) for NPM.
2. Clone repo with `git clone https://github.com/UnosquareBelfast/admin-web.git`
3. Navigate to `/admin-web/` with `cd admin-web`.
4. Run `npm install` to get the dependencies for the project.
5. Create a file `.env` inside `/web-app/` with the following line: `DOMAIN='http://localhost:80'`. This points to the back-end. If you are using Docker Toolbox the domain may differ.
6. Run `npm start` to start the web-server.

### Code Styling
We use https://prettier.io/ to keep our code style consistent. It is recommended that after you install this into your IDE, to also have it format on save. This way you will never commit code out of style and you never need to worry about it.

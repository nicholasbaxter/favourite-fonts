# Favourite Fonts

A recreation of a well-known font repository with a modified feature set. The Express back-end serves fonts pulled from Google Fonts' API to the client for rendering. Complete with authentication, users can log in and save their favourite fonts to the database to retrieve later.

App live here: [Heroku](https://hidden-temple-29940.herokuapp.com/)

### Features

- Font catalog displaying the most popular fonts from the [Google Fonts Developer API](https://developers.google.com/fonts/docs/developer_api)
- Fonts can be filtered through search functionality
- Fonts can be viewed with user input preview text, in different font sizes
- Various other user options (light/dark mode, grid/list view, reset filters)
- User can add their favourite fonts to a list
- Registered users can have this list persisted to database, to keep until the end of time
- Responsive design
- Lazy loading to decrease load times, stopping unnecessary calls
- Back to top button

### Local installation

To run, clone the github repo, locate your terminal into the folder, install dependencies in both backend and client and run:

```
git clone git@github.com:eyecandycode/favourite-fonts.git
cd ./favourite-fonts
npm install
npm client-install
npm run dev
```

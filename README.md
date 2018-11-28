# website-lcai

Website development for a research group from the Autonomous University of Madrid.

This website dynamically renders the views fetching data from a google drive spreadsheet storing this data in session-storage.
There are some templates that render the content based on rules and specific events.

The google drive spreadsheet is implemented in order to work as a database from which website content can be modified. (My backend side knowledge at the time I developed the site were very constrained).

One of the specifications required access to main.css file without having to log in to the server or set-up an FTP. To achieve that the plain main.css file is placed into a Dropbox folder and is being loaded from there.

All logic is programmed in JavaScript.

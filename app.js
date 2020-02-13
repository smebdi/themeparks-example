const express = require('express')
const app = express()
const port = 3000

// include the Themeparks library
const Themeparks = require("themeparks");

app.get('/', (req, res) => {

  // configure where SQLite DB sits
  // optional - will be created in node working directory if not configured
  // Themeparks.Settings.Cache = __dirname + "/themeparks.db";

  // access a specific park
  // Create this *ONCE* and re-use this object for the lifetime of your application
  // re-creating this every time you require access is very slow, and will fetch data repeatedly for no purpose
  const DisneyWorldMagicKingdom = new Themeparks.Parks.WaltDisneyWorldMagicKingdom();

  // Access wait times by Promise
  (() => {
      DisneyWorldMagicKingdom.GetWaitTimes().then((rideTimes) => {
        let rides = '<div>'
        rideTimes.map((ride) => {
            rides += `<p>${ride.name}: ${ride.waitTime} minutes wait (${ride.status})</p>`;
        });
        rides += '</div>'

        res.send(rides);
      }).catch((error) => {
          console.error(error);
      })
  })();
})

app.listen(port, () => console.log(`App is now listening on http://localhost:${port}!`))
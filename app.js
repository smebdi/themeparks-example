const express = require('express')
const app = express()
const port = 3000

// include the Themeparks library
const Themeparks = require("themeparks");

// Create this *ONCE* and re-use this object for the lifetime of your application
let DisneyWorldMagicKingdom = new Themeparks.Parks.WaltDisneyWorldMagicKingdom();

app.get('/', (req, res) => {

  // Access wait times
  (() => {
      DisneyWorldMagicKingdom.GetWaitTimes().then((rideTimes) => {

        // create html container 
        let rides = '<div>'

        // iterate through the wait times results provided from GetWaitTimes
        rideTimes.map((ride) => {

            // we're making simple html here so the browser knows how to render it
            rides += `<h2>${ride.name}</h2>`;
            rides += `<p>${ride.waitTime} minutes wait.</p>`;
            rides += `<p style="font-weight: bold">(${ride.status})</p>`;
            rides += `</br>`

        });
        rides += '</div>'

        // ship the string off to the front end
        res.send(rides);
        
      }).catch((error) => {
          console.error(error);
      })
  })();
})

app.listen(port, () => console.log(`App is now listening on http://localhost:${port}!`))
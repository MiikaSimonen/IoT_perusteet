const url = "https://api.thingspeak.com/channels/3091624/feeds.json?api_key=M9IVOXTXRENLZI9L";

fetch(url)
  .then(response => response.json())
  .then(data => {
    const feeds = data.feeds || [];
    const temperatures = feeds.map(feed => ({
      created_at: feed.created_at,
      temp: Number.parseFloat(feed.field1)
    })).filter(row => Number.isFinite(row.temp));

    document.getElementById("output").textContent = JSON.stringify(temperatures, null, 2);

    if (typeof drawGoogleChart === "function") {
      drawGoogleChart(temperatures);
    }
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    document.getElementById("output").textContent = "Error loading data";
  });
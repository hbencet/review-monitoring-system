const axios = require("axios");

module.exports = {
  async generateSentimentPieChart(stats) {
    const chartConfig = {
      type: "pie",
      data: {
        labels: ["Pozitív", "Semleges", "Negatív"],
        datasets: [
          {
            data: [
              stats.sentiments.positive,
              stats.sentiments.neutral,
              stats.sentiments.negative
            ],
            backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"]
          }
        ]
      }
    };

    const url = "https://quickchart.io/chart";

    const response = await axios.post(url, {
      chart: chartConfig,
      format: "png",
      width: 600,
      height: 400,
      backgroundColor: "white"
    }, {
      responseType: "arraybuffer"
    });

    return Buffer.from(response.data, "binary");
  }
};


const parsedData = (data) => {
  const parsedData = {
    stamp: [],
    moisture: [],
    light: [],
    temperature: [],
    humidity: [],
  }
  data.slice(data.length - 100, data.length).forEach(row => {
    const d  = new Date(row.stamp);
    parsedData.stamp.push(d.toLocaleString());
    parsedData.moisture.push(row.moisture);
    parsedData.light.push(row.light);
    parsedData.temperature.push(row.temperature);
    parsedData.humidity.push(row.humidity);
  })
  return parsedData;
}

module.exports = parsedData;
import promptSync from 'prompt-sync';

const prompt = promptSync();

const API_KEY = prompt("Please give me the API key for the MecsetTemps GET API: ",undefined, {sigint: true});
console.log(`API_KEY=${API_KEY}`);

const URL = 'https://u2x3hurv1e.execute-api.eu-central-1.amazonaws.com/default/temperature/get-data';

async function getData() {
    const response = await fetch(URL,
        {
            method: "GET",
            headers: {
                "Content-Type": "application-json",
                "x-api-key": API_KEY
            }
        });

    return response.json();
}

const rawData = await getData();
const body = JSON.parse(rawData.body);
const items = body.Items;
items.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp));
items.forEach(i => console.log(`${i.timestamp}, ${i.temp}`));
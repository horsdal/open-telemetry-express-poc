const { MyConsoleSpanExporter } = require('./myConsoleSpanExporter');
const { NodeTracerProvider } = require('@opentelemetry/node');
const { ConsoleSpanExporter, InMemorySpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing');

const provider = new NodeTracerProvider();
const consoleExporter = new ConsoleSpanExporter();
const inMemoryExporter = new InMemorySpanExporter();
const spanProcessor = new SimpleSpanProcessor(new MyConsoleSpanExporter());
provider.addSpanProcessor(spanProcessor);
provider.register();

const express = require('express');
const Axios = require("axios");
const app = express();
const port = 3000;

app.get('/yo', async (req, res) => {
    const tracer = provider.getTracer('basic');
    console.log(tracer.getCurrentSpan().context());
    await Axios.get('https://en13qhxh7xwudw2.m.pipedream.net');
    res.type('application/json');
    res.send(JSON.stringify({ yo: 'back at ya'}));
});

app.listen(port, () => console.log(`started listening on port ${port}`));

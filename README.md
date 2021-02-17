# express-faulty

<a href="https://github.com/lunae/express-faulty">express-faulty</a> is an NPM module to simulate faults in your <a href="https://expressjs.com" target="_blank">Express.js</a> web applications.

## Why?

Applications will fail. An overloaded service due to high traffic spike or a degraded system that your service depends on. This module aims to simulate these faults to help create demo applications showing the issues and techniques for handling these issues.

## Installation

```shell
npm install express-faulty
```

## Features

* Service going down
* Service degradation

## Quickstart

### Service Down

```javascript
const express = require('express')
const faulty = require('express-faulty')
const app = express()

const faultyMiddleware = faulty({
    enabled: true,
    faultType: 'DOWN',
    afterRequestCount: 5
})

app.get('/', faultyMiddleware, (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, () => {
    console.log('Starting faulty application...')
})
```

| Property          | Description                                     | Default |
|-------------------|-------------------------------------------------|---------|
| enabled           | Enables or disables the fault                   | true    |
| faultType         | The fault type. Supported: DOWN and DEGRADATION | DOWN    |
| afterRequestCount | Apply the fault after N requests                | 0       |

### Service Degradation

```javascript
const express = require('express')
const faulty = require('express-faulty')
const app = express()

const faultyMiddleware = faulty({
    enabled: true,
    faultType: 'DEGRADATION',
    initialLatencyInMs: 300,
    increaseLatencyPerRequestInMs: 100,
    afterRequestCount: 3
})

app.get('/', faultyMiddleware, (req, res) => {
    res.send('Hello Faulty!')
})

app.listen(3000, () => {
    console.log('Starting faulty application...')
})
```

| Property                      | Description                                            | Default |
|-------------------------------|--------------------------------------------------------|---------|
| enabled                       | Enables or disables the fault                          | true    |
| faultType                     | The fault type. Supported: DOWN and DEGRADATION        | DOWN    |
| initialLatencyInMs            | The initial latency in milliseconds                    | 0       |
| increaseLatencyPerRequestInMs | Increase of latency after each request in milliseconds | DOWN    |
| afterRequestCount             | Apply the fault after N requests                       | 0       |

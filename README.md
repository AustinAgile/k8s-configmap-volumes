# k8s-configmap-volumes

Abstracts Kubernetes configmap data from mounted volumes.

# Usage

```javascript 1.6
const config = require('./lib/k8s-configmap-volumes.js')();

config.onChange = function(name) {console.log("config changed "+name);};

config.add("rabbit-amqp", '/etc/config/mock-ti-nodejs/rabbit-amqp');

config.add("inExchangeName", '/etc/config/mock-ti-nodejs/inExchangeName');

config.add("outExchangeName", '/etc/config/mock-ti-nodejs/outExchangeName');

```

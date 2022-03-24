# Krateo Service Socket

It receives nats message and pushes it to the clients.

# Nats Subject key

`io.krateo.socket`

# Sample message received

```
{
  specversion: '1.0',
  type: 'io.krateo.socket',
  source: 'krateo-service-logger',
  datacontenttype: 'application/json',
  id: '560943a5-c094-4bcb-b528-89fed5cf50cc',
  time: '2022-03-18T14:46:03.238Z',
  data: {
    channel: 'notifications',
    message: 'Hello from logger',
    severity: 'info'
  }
}
```

# Sample message sent

```
{
  'id': '6a2794a1-9513-49bb-b156-ae0e56e4433e',
  severity: 'info',
  message: 'hello world from krateo service socket'
  time: 1647614557,
}
```

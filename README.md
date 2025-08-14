# My Project

A TypeScript-based notification service with Express.js.

## Installation

```bash
# Install dependencies
npm install
```

## Running the Project

```bash
# Development mode with hot reload
npm run dev
```

## API Documentation

### Notification Endpoints

#### 1. Get All Notifications
```bash
# Get all notifications
curl -X GET http://localhost:3000/api/v1/notifications


# Filter by status
curl -X GET "http://localhost:3000/api/v1/notifications?status=PENDING"
```


#### 2. Create Notification
```bash
curl -X POST http://localhost:3000/api/v1/notifications \
  -H "Content-Type: application/json" \
  -d '{"price": 100}'
```

#### 3. Delete Notification
```bash
curl -X DELETE http://localhost:3000/api/v1/notifications/{id}
```
Replace `{id}` with the actual notification ID.

#### 4. Send Notification
```bash
curl -X POST http://localhost:3000/api/v1/notifications/{id}/send \
  -H "Content-Type: application/json" \
  -d '{"to": ["example@email.com"]}'
```

## Update a Hotel

Updates an existing hotel's information in the hotals array using its unique ID. This endpoint allows for partial updates (you only need to send the fields you want to change).

**URL:** `/api/v1/hotels/:id`  
**Method:** `PATCH` (or `PUT`)  
**Data Type:** `JSON`

### Request Parameters

| Parameter | Type    | Description                              |
| :-------- | :------ | :--------------------------------------- |
| `id`      | integer | **Required.** The unique ID of the hotel |

### Request Body

Provide a JSON object containing the properties you want to update. Note: Attempting to update the `id` field will be ignored by the server for security reasons.

```json
{
  "price": 180,
  "hasPool": true
}
```

🛠 How it Works (Under the Hood)
Validation: The server first checks if a request body was provided.

Lookup: It converts the URL id parameter into an integer and uses findIndex() to locate the hotel in the array.

Data Merging: Using ES6 Object Destructuring and the Spread Operator (...), the server strips out any id from the incoming request to prevent ID manipulation, and merges the new data over the old data.

Persistence: The updated array is converted back to a string and written to the hotels.json file using Node's fs.writeFile().

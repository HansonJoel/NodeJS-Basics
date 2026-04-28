## Delete a Hotel

Removes a specific hotel from the database permanently using its unique ID.

**URL:** `/api/v1/hotels/:id`  
**Method:** `DELETE`

### Request Parameters

| Parameter | Type    | Description                                            |
| :-------- | :------ | :----------------------------------------------------- |
| `id`      | integer | **Required.** The unique ID of the hotel to be deleted |

### Success Response

**Code:** `200 OK`  
_Note: Some APIs prefer to send a `204 No Content` status for deletions, meaning the action succeeded but there is no data to return. In this API, we return a `200 OK` with a confirmation message._

**Content:**

```json
{
  "status": "success",
  "message": "Hotel with ID 2 has been deleted"
}
```

## ❌ Error Responses

**Condition:**  
If no hotel exists with the provided ID.

**Status Code:**  
`404 Not Found`

**Response Body:**

```json
{
  "status": "error",
  "message": "Hotel with the specified ID 99 is not found"
}


🛠 How it Works (Under the Hood)
Lookup: The server extracts the id from the URL, converts it to an integer, and searches the array using findIndex(). If it returns -1, the server aborts and sends a 404 error.

Array Splice: The core of this operation is hotels.splice(hotelIndex, 1);. The splice() method is a built-in JavaScript function that modifies arrays.

The first argument (hotelIndex) tells it where to start making changes.

The second argument (1) tells it how many items to remove from that starting point.

Persistence: The newly shortened array is converted back into a JSON string and completely overwrites the old ./data/hotels.json file, finalizing the deletion.
```

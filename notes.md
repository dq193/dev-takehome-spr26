# Checklist

<!-- Make sure you fill out this checklist with what you've done before submitting! -->

- [x] Read the README [please please please]
- [ ] Something cool!
- [x] Back-end
  - [x] Minimum Requirements
    - [x] Setup MongoDB database
    - [x] Setup item requests collection
    - [x] `PUT /api/request`
    - [x] `GET /api/request?page=_`
  - [x] Main Requirements
    - [x] `GET /api/request?status=pending`
    - [x] `PATCH /api/request`
  - [x] Above and Beyond
    - [x] Batch edits
    - [x] Batch deletes
- [ ] Front-end
  - [ ] Minimum Requirements
    - [ ] Dropdown component
    - [ ] Table component
    - [ ] Base page [table with data]
    - [ ] Table dropdown interactivity
  - [ ] Main Requirements
    - [ ] Pagination
    - [ ] Tabs
  - [ ] Above and Beyond
    - [ ] Batch edits
    - [ ] Batch deletes

# Notes

<!-- Notes go here -->
The two `GET` requirements are merged into one request, where `status` and `page` are both optional arguments.

`PUT` supports two request bodies. One is from the requirements:
```
{
  requestorName: "Jane Doe",
  itemRequested: "Flashlights"
}
```
The other contains one array field, `newRequests`, to support insertion of many:
```
{
  newRequests: [
    {
      requestorName: "...",
      itemRequested: "..."
    },
    ...
  ]
}
```

`PATCH` supports both a single ID and array of IDs to modify multiple documents at once. The same is true for `DELETE`.

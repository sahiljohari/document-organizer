## Document Organizer 2.0

A reboot on the initial version, this is a simple dashboard-like single page web application that assists the user with organizing important documents, such as Passport, Visa, Drivers License, and many more, and keep track for timely renewals. With Document Organizer, you can have all your documents in one place and get an overview of their status at any given point of time.

#### Technical Specifications

- Front end: Next.js, TailwindCSS
- Back end: Google Firebase

#### Data Specifications

- User

```json
{
  "id": string,
  "email": string,
  "displayName": string,
  "photoURL": string,
  "createdAt": Date,
  "documents": {
    "count": number,
    "list": [
      {
        "id": string,
        "documentName": string,
        "documentType": string,
        "documentStartDate": Date,
        "documentEndDate": Date,
        "createdOn": Date
      }
    ]
  }
}
```

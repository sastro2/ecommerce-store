export default function handler(request, response) {
  response.json(
    { Data: 'http://localhost:3000/api/Data' },
    { Methods: 'http://localhost:3000/api/Methods' },
  );
}

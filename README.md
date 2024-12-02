# MiPlanta - Capstone Project

## Description
miPlanta is a mobile-first marketplace designed to connect plant enthusiasts and sellers. Users can browse and post listings for plants, view detailed information about plants for sale, and manage their profiles, including their own listings.

## Setup

### Server Side
1. Clone the repository: `git clone https://github.com/ZuriGomez/zuri-gomez-miplanta-api.git`
2. Navigate to the server directory: `cd zuri-gomez-miplanta-api`
3. Install dependencies: `npm install`
4. Create a `.env` file in the root of the server directory and add the following:
BACKEND_URL=http://localhost 
CORS_ORIGIN=http://localhost:5173 
DB_HOST=127.0.0.1 
DB_NAME=miplanta 
DB_USER=root 
DB_PASSWORD=rootroot JWT_SECRET=5uper_5ec7et_5tr1ng
5. Start the server: `npm start`
6. The server will run at: `http://localhost:8080`

## Testing the App
You can test the app by signing up or logging in with your own information, as long as it meets the validation requirements for the inputs.

For a full interactive experience, you can log in using the following credentials:
- **Email:** `lily.goodwill@example.com`
- **Password:** `password2024`

## Notes
- Ensure that both the client (zuri-gomez-miplanta) and server are running simultaneously for the app to function.
- You need MySQL installed and a database named `miplanta` configured with the credentials provided in the `.env` file.

## Future Enhancements
This project is the first iteration of MiPlanta. Future updates will include features like messaging, advanced filters, and geolocation-based suggestions.

Happy planting! 🌱
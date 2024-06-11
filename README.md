# Kaffestugan i Arvika RESTful API

## Beskrivning
Slå i in "node app.js" i konsollen och slå enter för att testa. Som gäst kan du se menyn och alla kampanjerbjudanden, önskar du lägga till, ta bort eller ändra produkt eller kampanj, logga då in som admin, se nedan.

## Endpoints

GET http://localhost:1337/menu (Hämta menyn)
GET http://localhost:1337/campagins (Hämta kampanjer om det finns, annars visas felmeddelande)


## Admin Endpoints (Alla post eller put skall vara i JSON-format i insomnia)

POST http://localhost:3000/login (Logga in som admin) te.x ``{
  "username": "admin",
  "password": "admin123"
}``


POST http://localhost:3000/menu (Lägga till produkt i meny) te.x {
  ``"title": "Denna",
  "desc": "Beskrivning av den nya produkten",
  "price": 99	
}``

DELETE http://localhost:3000/menu/:id (Ta bort produkt från meny)
PUT http://localhost:3000/menu/:id (Ändra produkt) te.x ``{
  "title": "Ändrad produkt",
  "desc": "Beskrivning av den nya produkten",
  "price": 99	
}``

POST http://localhost:3000/campaigns (Skapa ny kampanj) te.x ``
{
    "products": ["Bryggkaffe", "Caffè Doppio"],
    "campaignPrice": 40
}``
DELETE http://localhost:3000/campaigns/:id (Ta bort kampanj, använd id som skapas)




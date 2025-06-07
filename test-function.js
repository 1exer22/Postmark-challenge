// Script de test pour Firebase Function
// Exécuter avec : node test-function.js

const testPayload = {
  FromFull: {
    Email: "gnimwefaure.bleza@ecoles-epsi.net",
  },
  Subject: "Test EmailBeats",
  TextBody: "kick snare kick kick snare",
};

console.log("🧪 Test de la Firebase Function...");
console.log(
  "URL:",
  "https://us-central1-webrtisan-b012d.cloudfunctions.net/processEmail"
);
console.log("Payload:", JSON.stringify(testPayload, null, 2));

fetch("https://us-central1-webrtisan-b012d.cloudfunctions.net/processEmail", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(testPayload),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("✅ Réponse de la fonction:");
    console.log(data);
  })
  .catch((error) => {
    console.log("❌ Erreur:");
    console.log(error);
  });

// Test avec email autorisé comme expéditeur ET destinataire
const testPayload = {
  FromFull: {
    Email: "gnimwefaure.bleza@ecoles-epsi.net", // Expéditeur autorisé
  },
  Subject: "Test Beat EmailBeats",
  TextBody:
    "bass kick hat snare bass hat kick bass snare hat bass kick hat snare",
};

console.log(
  "🧪 Test EmailBeats avec email autorisé (expéditeur et destinataire)..."
);

fetch("https://us-central1-webrtisan-b012d.cloudfunctions.net/processEmail", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(testPayload),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("✅ Réponse complète:");
    console.log(data);

    if (data.success) {
      console.log("🎵 Beat créé ! URL:", data.beatUrl);
      console.log("📧 Email envoyé vers:", "gnimwefaure.bleza@ecoles-epsi.net");
    } else {
      console.log("❌ Erreur:", data.error);
    }
  })
  .catch((error) => {
    console.log("❌ Erreur réseau:", error);
  });

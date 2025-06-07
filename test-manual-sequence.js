// Test avec la séquence exactement reçue
const testPayload = {
  FromFull: {
    Email: "faurebleza33@gmail.com",
  },
  Subject: "uuuu",
  TextBody: "bass bass", // Exactement ce qui a été reçu dans les logs
};

console.log("🧪 Test avec la séquence reçue dans les logs...");

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
    } else {
      console.log("❌ Erreur:", data.error);
    }
  })
  .catch((error) => {
    console.log("❌ Erreur réseau:", error);
  });

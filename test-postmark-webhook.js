// Test du format webhook Postmark (simulation d'un email reçu)
const postmarkWebhookPayload = {
  FromFull: {
    Email: "faurebleza33@gmail.com", // Email qui envoie le beat
    Name: "Test User",
  },
  ToFull: [
    {
      Email: "beats@latechnova.com",
      Name: "",
    },
  ],
  Subject: "Mon super beat",
  TextBody: "kick snare hat kick bass snare hat kick",
  StrippedTextReply: "kick snare hat kick bass snare hat kick",
  MessageID: "test-123",
};

console.log("🧪 Test webhook Postmark format...");

fetch("https://us-central1-webrtisan-b012d.cloudfunctions.net/processEmail", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(postmarkWebhookPayload),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("✅ Réponse webhook:");
    console.log(data);

    if (data.success) {
      console.log("🎵 Beat créé via webhook ! URL:", data.beatUrl);
    } else {
      console.log("❌ Erreur webhook:", data.error);
    }
  })
  .catch((error) => {
    console.log("❌ Erreur réseau:", error);
  });

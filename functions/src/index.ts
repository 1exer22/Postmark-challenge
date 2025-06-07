/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { ServerClient } from "postmark";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

interface EmailPayload {
  FromFull: {
    Email: string;
  };
  Subject: string;
  TextBody: string;
  StrippedTextReply?: string;
}

export const processEmail = functions.https.onRequest(
  async (req: any, res: any) => {
    // Set CORS headers
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      res.status(200).send();
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      // Initialize Postmark client with environment variables
      const postmarkApiKey =
        process.env.POSTMARK_API_KEY || functions.config().postmark?.api_key;
      if (!postmarkApiKey) {
        throw new Error("Postmark API key not configured");
      }
      const postmark = new ServerClient(postmarkApiKey);

      const payload: EmailPayload = req.body;
      const from = payload.FromFull.Email;
      const subject = payload.Subject;
      const text = payload.StrippedTextReply || payload.TextBody;

      console.log("Received email from:", from);
      console.log("Email text:", text);

      // Validate email content
      const sequence = text.toLowerCase().trim();
      const validInstruments = ["kick", "snare", "hat", "clap", "tom", "bass"];
      const parts = sequence
        .split(" ")
        .filter((part) => validInstruments.includes(part));

      if (parts.length === 0) {
        throw new Error("No valid instruments found in sequence");
      }

      // Create new beat in Firestore
      const beatRef = await db.collection("beats").add({
        sequence: parts.join(" "),
        email: from,
        title: subject || "Untitled Beat",
        created: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log("Beat created with ID:", beatRef.id);

      // Send confirmation email
      const publicUrl =
        process.env.PUBLIC_SITE_URL ||
        functions.config().app?.public_url ||
        "https://webrtisan-b012d.web.app";
      const beatUrl = `${publicUrl}/beat/${beatRef.id}`;

      // Utiliser email autorisé comme expéditeur mais envoyer vers l'utilisateur
      const authorizedEmail = "gnimwefaure.bleza@ecoles-epsi.net";

      await postmark.sendEmail({
        From: authorizedEmail, // Expéditeur autorisé
        To: from, // Destinataire = l'utilisateur qui a envoyé l'email
        Subject: "🎵 Your EmailBeats track is ready!",
        TextBody: `
Hello! A new EmailBeats track has been created!

Original email from: ${from}
Sequence: ${parts.join(" ")}

Listen to it here: ${beatUrl}

To create a new beat, send an email to 5b362d94f366b6267f54839d24ceabb3@inbound.postmarkapp.com with a sequence.
Example: kick snare kick kick snare

Available instruments:
- kick (bass drum)
- snare (snare drum)  
- hat (hi-hat)
- clap (handclap)
- tom (tom drum)
- bass (bass synth)

Share your beat with friends!
      `,
        HtmlBody: `
<h1>🎵 New EmailBeats track created!</h1>

<p><strong>Original email from:</strong> ${from}</p>
<p><strong>Sequence:</strong> <code>${parts.join(" ")}</code></p>

<p><a href="${beatUrl}" style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">🎧 Listen to the beat</a></p>

<h3>How to create a beat:</h3>
<p>Send an email to <strong>5b362d94f366b6267f54839d24ceabb3@inbound.postmarkapp.com</strong> with an instrument sequence.<br>
Example: <code style="background: #f3f4f6; padding: 4px 8px; border-radius: 4px;">kick snare kick kick snare</code></p>

<h3 style="color: #3B82F6;">Available instruments:</h3>
<ul>
  <li><strong>kick</strong> - Bass drum</li>
  <li><strong>snare</strong> - Snare drum</li>
  <li><strong>hat</strong> - Hi-hat</li>
  <li><strong>clap</strong> - Handclap</li>
  <li><strong>tom</strong> - Tom drum</li>
  <li><strong>bass</strong> - Bass synth</li>
</ul>

<p><strong>Share your beat with friends!</strong></p>

<hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
<p style="color: #6b7280; font-size: 14px;">EmailBeats - Email Music Studio</p>
      `,
      });

      console.log("Confirmation email sent to:", authorizedEmail);

      res.status(200).json({
        success: true,
        beatUrl,
        message: `Beat created successfully! Notification sent to ${authorizedEmail}`,
        originalSender: from,
      });
    } catch (error) {
      console.error("Error processing email:", error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

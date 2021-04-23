const express = require("express");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(formidableMiddleware());
app.use(cors());
require("dotenv").config();

const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

app.post("/form", (req, res) => {
  const data = {
    from: `${req.fields.firstName} ${req.fields.lastName} <${req.fields.email}> `,
    to: process.env.MAIL,
    subject: `Formulaire de ${req.fields.email} - Netlify`,
    text: `${req.fields.message}\n\n----------\n\nMessage envoyé depuis le site : Tripadvisor Copie - Netlify\nhttps://awesome-goldberg-1da884.netlify.app/`,
  };

  let result = false,
    errorMessage = "Unknow error";

  try {
    mailgun.messages().send(data, (error, response) => {
      if (!error) {
        result = true;
      } else {
        errorMessage = {
          error: error,
          response: response,
        };
      }
    });
  } catch (error) {
    errorMessage = error.message;
  }

  res.json(result ? { result: false, error: errorMessage } : { result: true });
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});

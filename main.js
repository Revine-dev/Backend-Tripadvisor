const $ = document;

$.addEventListener("DOMContentLoaded", () => {
  console.log("Page chargée");

  //   $.addEventListener("click", () => {
  //     console.log("Click !!!");
  //   });

  //   Bouton "Afficher le text"
  $.querySelector("#btn-text-display").addEventListener("click", () => {
    $.querySelector(".hidden").classList.add("display");
    // $.querySelector("p").classList.remove("hidden");
  });

  //   Bouton "Cacher le text"
  $.querySelector("#btn-text-hidden").addEventListener("click", () => {
    $.querySelector(".hidden").classList.remove("display");
  });

  //   Bouton "Afficher OU cacher le text"
  $.querySelector("#btn-text").addEventListener("click", () => {
    $.querySelector(".hidden").classList.toggle("display");
  });

  //   Envoyer les données du formulaire
  $.querySelector("#contact-form").addEventListener("submit", async (event) => {
    // la fonction preventDefault() annule le comportement par défaut du formulaire (le rafraîchissement de la page)
    event.preventDefault();

    const data = {
      firstName: $.querySelector("#firstname").value,
      lastName: $.querySelector("#lastname").value,
      email: $.querySelector("#email").value,
      message: $.querySelector("#message").value,
    };

    console.log(data);

    const response = await axios.post("http://localhost:3000/form", data);
    console.log(response);
    alert("Merci pour votre formulaire");
  });
});

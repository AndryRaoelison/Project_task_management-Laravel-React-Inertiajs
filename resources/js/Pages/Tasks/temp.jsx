import React from "react";

const temp = () => {
  const searchfield = (name, value) => {
    const newQueryParams = { ...(queryParams || {}) };

    // Met à jour ou supprime le paramètre de requête
    if (value) {
      newQueryParams[name] = value;
    } else {
      delete newQueryParams[name];
    }

    console.log("Query Params à envoyer :", newQueryParams);

    // Génère l'URL avec les query parameters
    const url = route("project.show", {
      project: project.id,
      ...newQueryParams, // Spread les query parameters dans l'URL
    });

    console.log("URL générée :", url);

    // Envoie la requête avec les options séparées
    router.get(
      url,
      {},
      {
        // Le deuxième argument est un objet vide (pas de données POST)
        preserveState: true, // Options Inertia
        replace: true,
      }
    );
  };
  return <></>;
};

export default temp;

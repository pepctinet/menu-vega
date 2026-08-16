/* El registre és compartit pels tres HTML per evitar que divergeixin. */
if("serviceWorker" in navigator && location.protocol !== "file:"){
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js")
      .catch(error => console.warn("No s'ha pogut activar el mode fora de línia.", error));
  });
}

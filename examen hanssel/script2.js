document.getElementById("btnEntrar").addEventListener("click", async () => {

    const nombre = document.getElementById("nombre").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    const mensaje = document.getElementById("mensaje");

    if (!nombre || !usuario || !password) {
        mensaje.innerHTML = "Completa todos los campos";
        mensaje.style.color = "red";
        return;
    }

    try {

        const respuesta = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nombre, usuario, password })
        });

        const data = await respuesta.json();

        mensaje.innerHTML = data.mensaje;
        mensaje.style.color = data.ok ? "lime" : "red";

        if (data.ok) {
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        }

    } catch (error) {
        mensaje.innerHTML = "Error de conexión con el servidor";
        mensaje.style.color = "red";
        console.error(error);
    }
});
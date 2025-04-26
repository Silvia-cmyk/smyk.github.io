function copyEmail() {
    const email = "seaforest01225@gmail.com";
    const btn = document.getElementById("copy-btn");
    
    navigator.clipboard.writeText(email).then(() => {
        btn.innerHTML = "✅ Email copied to clipboard!";
        btn.classList.add("copied");

        // restore
        setTimeout(() => {
            btn.innerHTML = "Copy Email";
            btn.classList.remove("copied");
        }, 3500);
    });
}
// listen for login attempts
document.querySelector("#loginSubmit").addEventListener("click", function(event) {

    event.preventDefault();

    // construct body with user data
    const userObject = {
        username: document.querySelector("#loginUsername").value,
        password: document.querySelector("#loginPassword").value
    };

    // post login request
    fetch("/users/login",{

        method: "POST",
        body: JSON.stringify(userObject),
        headers: {
            "Content-Type": "application/json"
        }

    }).then( res => {

        if(res.ok){
            location.href = "/dashboard";
        } else {
            alert("Login error, please try again.");
        };

    });

});
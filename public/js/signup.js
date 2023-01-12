// listen for signup attempts
document.querySelector("#signupSubmit").addEventListener("click", function(event) {

    event.preventDefault();

    // construct body with user data
    const userObject = {
        username: document.querySelector("#signupUsername").value,
        password: document.querySelector("#signupPassword").value
    };

    // post signup request
    fetch("/users",{

        method: "POST",
        body: JSON.stringify(userObject),
        headers: {
            "Content-Type": "application/json"
        }

    }).then( res => {

        if(res.ok){
            location.href = "/dashboard";
        } else {
            alert("Signup error, please try again.");
        };

    });

});
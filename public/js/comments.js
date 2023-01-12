// import all comment forms
const commentButton = document.getElementsByClassName("commentButton");
const commentSections = document.getElementsByClassName("newComment");
const commentInputs = document.getElementsByClassName("commentInput");
const commentSubmits = document.getElementsByClassName("commentSubmit");

// iterate over every comment section
for (let i = 0; i < commentButton.length; i++) {

    // listen for comment submits
    commentSubmits[i].addEventListener("click", function (event) {

        event.preventDefault();

        const loggedIn = document.getElementById('navUsername');

        if (loggedIn == null) {
            window.location.replace("/login");
        } else {

            // construct body with comment
            const commentObject = {
                body: commentInputs[i].value,
                blog_id: event.target.value
            };

            // post comment request
            fetch("/comments", {

                method: "POST",
                body: JSON.stringify(commentObject),
                headers: {
                    "Content-Type": "application/json"
                }

                })
                .then(res => {

                    if (res.ok) {
                        location.reload();
                    } else {
                        alert("Post error, please try again.");
                    };

                });

        }

    });

    // listen for comment button clicks
    commentButton[i].addEventListener("click", function (event) {

        event.preventDefault();

        // show and hide the comments section
        commentSections[i].classList.toggle('visible');

    });

};
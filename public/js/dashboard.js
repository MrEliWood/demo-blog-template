// listen for new blog submits
document.querySelector("#blogSubmit").addEventListener("click", function(event) {

    event.preventDefault();

    // construct body with user blogs
    const blogObject = {
        title: document.querySelector("#newTitle").value,
        body: document.querySelector("#newBody").value,
    };

    // post blog request
    fetch("/blogs",{

        method: "POST",
        body: JSON.stringify(blogObject),
        headers: {
            "Content-Type": "application/json"
        }

    }).then( res => {

        if (res.ok) {
            location.reload();
        } else {
            alert("Post error, please try again.");
        };

    });

});

// import all delete buttons
const deleteButtons = document.getElementsByClassName("delete");

// listen for blog deletes
for (let i = 0; i < deleteButtons.length; i++) {

    deleteButtons[i].addEventListener("click", function (event) {

        event.preventDefault();

        // construct body with comment
        const blogId = event.target.value;

        // post comment request
        fetch(`/blogs/${blogId}`, {

            method: "DELETE",
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

        });

};
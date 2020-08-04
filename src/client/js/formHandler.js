async function handleSubmit(event) {

    event.preventDefault()

    // retrieve the url that was set by the user in the UI form field
    const inputUrl = document.getElementById('url').value

    console.log("::: Form Submitted :::")

    // call the internal server API, the latter will fetch the data from the external API
    const response = await fetch('http://localhost:8081/analyseURL', {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({url: inputUrl}),
    })
        // get data from internal server
        .then(data => {
            let result = data.json();
            return result
        })
        // handle API error - promise error
        .catch((error) => {
            console.log("error with API call response: ", error);
        });

    if (response.status.code !== '0') {
        alert("Please enter a valid url")
    } else {
        alert("Analysis complete");
        updateUI(response);
    }
}

function updateUI(data){
    document.getElementById('polarity').innerHTML = data.score_tag.toLowerCase()
    document.getElementById('agreement').innerHTML = data.agreement.toLowerCase();
    document.getElementById('subjectivity').innerHTML = data.subjectivity.toLowerCase();
    document.getElementById('irony').innerHTML = data.irony.toLowerCase();
    document.getElementById('confidence').innerHTML = data.confidence+"%";
}

export { handleSubmit }

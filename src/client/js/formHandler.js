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

    console.log("response: " + response);

    if (response.status.code !== '0') {
        alert("Please enter a valid url")
    } else {
        alert("Analysis complete");
        // updateUI(response);
    }

    // fetch('http://localhost:8081/analyseURL', {
    //     method: 'POST',
    //     credentials: 'same-origin',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({url})
    // })
    //     .then(res => res.json())
    //     .then(function (res) {
    //         document.getElementById('nlp-text').innerHTML = res.text;
    //         document.getElementById('polarity').innerHTML = res.polarity;
    //         document.getElementById('polarity_confidence').innerHTML = res.polarity_confidence;
    //         document.getElementById('subjectivity').innerHTML = res.subjectivity;
    //         document.getElementById('subjectivity_confidence').innerHTML = res.subjectivity_confidence;
    //     })
}

export { handleSubmit }

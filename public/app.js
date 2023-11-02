const form = document.getElementById("upload-form");
form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const files = document.getElementById("file").files;
    const formData = new FormData();
    formData.append("file", files[0]);
    try {
        const response = await fetch("/api/data-processing", {
            method: "POST",
            body: formData,
        });
        const time = response.headers.get("X-Response-Time");
        document.getElementById("time").innerHTML = `Response time: ${time}`;
        const result = await response.json();
        const resultElement = document.getElementById("result");
        resultElement.innerHTML = "";
        if (result.error !== undefined) {
            const errorNode = document.createElement("p");
            const messageNode = document.createElement("p");
            errorNode.innerHTML = result.error;
            resultElement.appendChild(errorNode);
            messageNode.innerHTML = result.message;
            resultElement.appendChild(messageNode);
            return;
        }
        const resultList = document.createElement("ul");
        resultElement.appendChild(resultList);
        const base_li = document.createElement("li");
        result.requests.forEach((item) => {
            const li = base_li.cloneNode(true);
            li.innerHTML = `<p>${item.type}</p><p>${item.count}</p>`
            resultList.appendChild(li);
        });
    } catch (error) {
        console.error("Error:", error);
    }
});

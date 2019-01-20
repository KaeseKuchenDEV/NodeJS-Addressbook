function getForm(addresses, id){
    let address = {
        id: "",
        firstname: "",
        lastname: "",
        street: "",
        city: "",
        country: "",
    };

    if(id){
        address = addresses.find(adr => adr.id === parseInt(id, 10));
    }
    const form = `<!DOYTYPE html>
        <html>
            <head>
                <title>Adressbuch</title>
                <meta charset="utf-8">
            </head>
            <body>
                <form action="/save" method="POST" enctype="multipart/form-data">
                    <input type="hidden" id="id" name="id" value="${address.id}" />
                    <div>
                        <label for="firstname">Vorname</label>
                        <input type="text" id="firstname" name="firstname" value="${address.firstname}"/>
                    </div>
                    <div>
                        <label for="lastname">Nachname</label>
                        <input type="text" id="lastname" name="lastname" value="${address.lastname}"/>
                    </div>
                    <div>
                        <label for="street">Straße</label>
                        <input type="text" id="street" name="street" value="${address.street}"/>
                    </div>
                    <div>
                        <label for="city">Stadt</label>
                        <input type="text" id="city" name="city" value="${address.city}"/>
                    </div>
                    <div>
                        <label for="country">Land</label>
                        <input type="text" id="country" name="country" value="${address.country}"/>
                    </div>
                    <div>
                        <label for="upload">File</label>
                        <input type="file" id="upload" name="upload" />
                    </div>
                    <div>
                        <button type="submit">Speichern</button>
                    </div>
                </form>
            </body>
        </html>`
        return form;
}

module.exports = getForm;
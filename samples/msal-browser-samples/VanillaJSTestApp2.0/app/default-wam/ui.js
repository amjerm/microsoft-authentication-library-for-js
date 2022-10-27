// Select DOM elements to work with
const welcomeDiv = document.getElementById("WelcomeMessage");
const signInButton = document.getElementById("SignIn");
const popupButton = document.getElementById("popup");
const redirectButton = document.getElementById("redirect");
const userprofileDiv = document.getElementById("userprofile");
const mailButton = document.getElementById("readMail");
const profileButton = document.getElementById("seeProfile");
const buttonRow = document.getElementsByClassName("button_row")[0];
const responseRow = document.getElementsByClassName("response_row")[0];

function enableSigninButton() {
    signInButton.disabled = false;
}

function showWelcomeMessage(account) {
    // Reconfiguring DOM elements
    buttonRow.style.display = "flex";
    responseRow.style.display = "flex";
    welcomeDiv.innerHTML = `Welcome ${account.username}`;
    signInButton.setAttribute('class', "btn btn-success dropdown-toggle");
    signInButton.innerHTML = "Sign Out";
    popupButton.setAttribute('onClick', "signOut(this.id)");
    popupButton.innerHTML = "Sign Out with Popup";
    redirectButton.setAttribute('onClick', "signOut(this.id)");
    redirectButton.innerHTML = "Sign Out with Redirect";
}

function updateUI(data, endpoint) {
    console.log('Graph API responded at: ' + new Date().toString());

    if (endpoint === graphConfig.graphMeEndpoint) {
        const title = document.createElement('p');
        title.innerHTML = "<strong>Title: </strong>" + data.jobTitle;
        const email = document.createElement('p');
        email.innerHTML = "<strong>Mail: </strong>" + data.mail;
        const phone = document.createElement('p');
        phone.innerHTML = "<strong>Phone: </strong>" + data.businessPhones[0];
        const address = document.createElement('p');
        address.innerHTML = "<strong>Location: </strong>" + data.officeLocation;
        profileDiv.appendChild(title);
        profileDiv.appendChild(email);
        profileDiv.appendChild(phone);
        profileDiv.appendChild(address);
    } else if (endpoint === graphConfig.graphMailEndpoint) {
        if (data.value.length < 1) {
            alert("Your mailbox is empty!")
        } else {
            const tabList = document.getElementById("list-tab");
            const tabContent = document.getElementById("nav-tabContent");

            data.value.map((d, i) => {
                // Keeping it simple
                if (i < 10) {
                    const listItem = document.createElement("a");
                    listItem.setAttribute("class", "list-group-item list-group-item-action")
                    listItem.setAttribute("id", "list" + i + "list")
                    listItem.setAttribute("data-toggle", "list")
                    listItem.setAttribute("href", "#list" + i)
                    listItem.setAttribute("role", "tab")
                    listItem.setAttribute("aria-controls", i)
                    listItem.innerHTML = d.subject;
                    tabList.appendChild(listItem)

                    const contentItem = document.createElement("div");
                    contentItem.setAttribute("class", "tab-pane fade")
                    contentItem.setAttribute("id", "list" + i)
                    contentItem.setAttribute("role", "tabpanel")
                    contentItem.setAttribute("aria-labelledby", "list" + i + "list")
                    contentItem.innerHTML = "<strong> from: " + d.from.emailAddress.address + "</strong><br><br>" + d.bodyPreview + "...";
                    tabContent.appendChild(contentItem);
                }
            });
        }
    }
}

function updateResponseProperties(response) {
    const fromNativeBroker = document.getElementById("response-fromNativeBroker");
    fromNativeBroker.innerHTML = response.fromNativeBroker;

    const account = document.getElementById("response-account");
    account.innerHTML = "";
    const accountTable = document.createElement("table");
    accountTable.setAttribute("class", "table");
    const accountTableBody = document.createElement("tbody");
    accountTable.appendChild(accountTableBody);

    for (const [key, value] of Object.entries(response.account)) {
        if (key === "idTokenClaims") {
            continue;
        }
        const accountTableRow = document.createElement("tr");
        const accountTableParamName = document.createElement("td");
        const accountTableParamVal = document.createElement("td");
        accountTableParamName.innerHTML = key;
        accountTableParamVal.innerHTML = value;
        accountTableRow.appendChild(accountTableParamName);
        accountTableRow.appendChild(accountTableParamVal);
        accountTableBody.appendChild(accountTableRow);
    }
    account.appendChild(accountTable);

    const idTokenClaims = document.getElementById("response-idTokenClaims");
    const scopes = document.getElementById("response-scopes");

    idTokenClaims.innerHTML = "";
    const idTokenClaimsTable = document.createElement("table");
    idTokenClaimsTable.setAttribute("class", "table");
    const idTokenClaimsTableBody = document.createElement("tbody");
    idTokenClaimsTable.appendChild(idTokenClaimsTableBody);

    for (const [key, value] of Object.entries(response.idTokenClaims)) {
        const idTokenClaimsTableRow = document.createElement("tr");
        const idTokenClaimsTableParamName = document.createElement("td");
        const idTokenClaimsTableParamVal = document.createElement("td");
        idTokenClaimsTableParamName.innerHTML = key;
        idTokenClaimsTableParamVal.innerHTML = value;
        idTokenClaimsTableRow.appendChild(idTokenClaimsTableParamName);
        idTokenClaimsTableRow.appendChild(idTokenClaimsTableParamVal);
        idTokenClaimsTableBody.appendChild(idTokenClaimsTableRow);
    }
    idTokenClaims.appendChild(idTokenClaimsTable);
    scopes.innerHTML = response.scopes.join(" ");
}

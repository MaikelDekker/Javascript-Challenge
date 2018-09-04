var partiesCreated = false;
var question;
var result = [];
var proParties = document.getElementById("proParties");
var ambivalentParties = document.getElementById("ambivalentParties");
var contraParties = document.getElementById("contraParties");

document.getElementById("startButton").onclick = function () {
    document.getElementById("question").style.display = "block";
    document.getElementById("startButton").style.display = "none";
    question = 0;
    LoadQuestion();
}
document.getElementById("partiesButton").onclick = function () { LoadParties() };
document.getElementById("agree").onclick = function () { NextQuestion("agree") };
document.getElementById("neither").onclick = function () { NextQuestion("neither") };
document.getElementById("disagree").onclick = function () { NextQuestion("disagree") };

function NextQuestion(string) {
    partiesCreated = false;
    if (string == "agree") {
        result.push("pro");
    } else if (string == "neither") {
        result.push("ambivalent");
    } else if (string == "disagree") {
        result.push("contra");
    }
    question++;
    if (question < subjects.length) {
        document.getElementById("partiesList").style.display = "none";
        ClearParties();
        LoadQuestion();
    } else {
        GetResults();
    }
}
function LoadQuestion() {
    document.getElementById("title").innerHTML = subjects[question].title;
    document.getElementById("description").innerHTML = subjects[question].statement;
}
function LoadParties() {
    if (document.getElementById("partiesList").style.display == "none" && partiesCreated == false) {
        var parties = subjects[question].parties;
        var counter = 0;
        for (i in parties) {
            document.getElementById("partiesList").style.display = "flex";
            var partyId = (parties[counter].name);
            partyId = partyId.replace(/ /g, "");
            partyId = partyId.replace("\"\"", "/");
            var party = document.createElement('div');
            party.innerHTML = "<label id=" + partyId + ">" + parties[counter].name + "</label>";

            if (parties[counter].position == "pro") {
                proParties.appendChild(party);
            } else if (parties[counter].position == "ambivalent") {
                ambivalentParties.appendChild(party);
            } else if (parties[counter].position == "contra") {
                contraParties.appendChild(party);
            }
            var partyDescription = document.createElement('label');
            partyDescription.id = partyId + "Description";
            partyDescription.innerHTML = parties[counter].explanation;
            document.getElementById(partyId).appendChild(partyDescription);
            counter++;
        }
        partiesCreated = true;
    } else if (document.getElementById("partiesList").style.display == "none" && partiesCreated == true) {
        document.getElementById("partiesList").style.display = "flex";
    } else if (document.getElementById("partiesList").style.display == "flex") {
        document.getElementById("partiesList").style.display = "none";
    }
}
function ClearParties() {
    while (proParties.lastChild) {
        proParties.removeChild(proParties.lastChild)
    }
    while (ambivalentParties.lastChild) {
        ambivalentParties.removeChild(ambivalentParties.lastChild)
    }
    while (contraParties.lastChild) {
        contraParties.removeChild(contraParties.lastChild)
    }
}
function GetResults() {
    document.getElementById("question").style.display = "none";
    var results = document.getElementById("results");
    results.style.display = "block";
    results.innerHTML = result;
    var subjectsCounter = 0;
    var partiesResults = [];
    var partyObject = new Object();
    var counter = 0
    for (i in subjects[subjectsCounter].parties) {
        var matchName = subjects[subjectsCounter].parties[counter].name + "Matched";
        matchName = matchName.replace(/ /g, "");
        matchName = matchName.replace("\"\"", "/");
        partyObject[matchName] = 0;
        counter++;
    }
    for (i in subjects) {
        var partiesCounter = 0;
        for (i in subjects[subjectsCounter].parties) {
            var parties = subjects[subjectsCounter].parties;
            var position = parties[partiesCounter].position;
            var matchName = subjects[subjectsCounter].parties[partiesCounter].name + "Matched";
            matchName = matchName.replace(/ /g, "");
            matchName = matchName.replace("\"\"", "/");

            if (position == result[subjectsCounter]) {
                partyObject[matchName] = partyObject[matchName] + 1;                
                alert(partyObject[matchName]);
            } else {

            }
            partiesCounter++;
        }
        subjectsCounter++;
    }
    SortResults();
    function SortResults() {
        
    }
}
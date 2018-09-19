var partiesCreated = false;
var question;
var result = [];
var proParties = document.getElementById("proParties");
var ambivalentParties = document.getElementById("ambivalentParties");
var contraParties = document.getElementById("contraParties");
var results = document.getElementById("results");
var top3 = document.getElementById("top3");
var otherParties = document.getElementById("otherParties");

document.getElementById("startButton").onclick = function () { StartQuiz() };``
document.getElementById("partiesButton").onclick = function () { LoadParties() };
document.getElementById("agree").onclick = function () { NextQuestion("pro") };
document.getElementById("neither").onclick = function () { NextQuestion("ambivalent") };
document.getElementById("disagree").onclick = function () { NextQuestion("contra") };
document.getElementById("skip").onclick = function () { NextQuestion("skip") };
document.getElementById("backButton").onclick = function () { PreviousQuestion() };

function StartQuiz() {
    document.getElementById("question").style.display = "block";
    document.getElementById("backButton").style.display = "block";
    document.getElementById("startButton").style.display = "none";
    document.getElementById("logo").style.display = "none";
    question = 0;
    NextQuestion();
}
function ResetQuiz() {
    ClearParties();
    results.style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("backButton").style.display = "none";
    document.getElementById("startButton").style.display = "block";
    document.getElementById("logo").style.display = "block";
    question = 0;
    result = [];
    otherParties.innerHTML = "";
    top3.innerHTML = "";
}
function NextQuestion(string) {
    result.push(string);
    question++;
    ClearParties();
    if (question < subjects.length) {
        LoadQuestion();
    } else {
        GetResults();
    }
}
function PreviousQuestion() {
    if (question < 1) {
        ResetQuiz();
    } else if (question >= subjects.length) {
        ResetQuiz();
    } else {
        result.pop();
        question = question - 1;
        ClearParties();
        LoadQuestion();
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
        document.getElementById("partiesList").style.display = "flex";
        for (i in parties) {
            var partyId = (parties[counter].name);
            partyId = partyId.replace(/ /g, "");
            partyId = partyId.replace("\"\"", "/");
            var party = document.createElement('div');
            party.id = partyId;
            party.style.borderBottom = "thin solid #000000";
            var partyTitle = document.createElement('h3');
            partyTitle.innerHTML = parties[counter].name;
            party.appendChild(partyTitle);

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
    partiesCreated = false;
    document.getElementById("partiesList").style.display = "none";
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
    results.style.display = "flex";

    var subjectsCounter = 0;
    var counter = 0;
    var partyObject = new Object();

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
            var party = subjects[subjectsCounter].parties[partiesCounter];
            var position = party.position;
            var matchName = party.name + "Matched";
            matchName = matchName.replace(/ /g, "");
            matchName = matchName.replace("\"\"", "/");

            //if party opinion equals user opinion
            if (position == result[subjectsCounter]) {
                partyObject[matchName]++;
            } else {
            }
            partiesCounter++;
        }
        subjectsCounter++;
    }

    var array = [];
    for (i in partyObject) {
        array.push([partyObject[i], i]);
    }
    array.sort();
    array.reverse();
    arrayCounter = 0;
    for (i in array) {
        var partyName = array[i][1];
        partyName = partyName.replace("Matched", "");
        var value = array[i];
        var percentage = Math.round(array[i][0] / subjects.length * 100) + "%";
        value = value.toString();
        value = value.replace(array[i][0] + "," + array[i][1], "<h3>" + partyName + ": </h3><br>" + percentage);
        var partyMatches = document.createElement("label");
        partyMatches.id = [i][0] + "Element";
        partyMatches.innerHTML = value;
        if(arrayCounter >= 3)
        {
            otherParties.appendChild(partyMatches);
        }else
        {
            top3.appendChild(partyMatches);
        }
        arrayCounter++;
    }
}
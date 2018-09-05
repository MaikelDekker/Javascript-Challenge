var partiesCreated = false;
var question;
var result = [];
var proParties = document.getElementById("proParties");
var ambivalentParties = document.getElementById("ambivalentParties");
var contraParties = document.getElementById("contraParties");

document.getElementById("startButton").onclick = function () { StartQuiz() };
document.getElementById("partiesButton").onclick = function () { LoadParties() };
document.getElementById("agree").onclick = function () { NextQuestion("agree") };
document.getElementById("neither").onclick = function () { NextQuestion("neither") };
document.getElementById("disagree").onclick = function () { NextQuestion("disagree") };
document.getElementById("skip").onclick = function () { NextQuestion("skip") };
document.getElementById("backButton").onclick = function () { PreviousQuestion() };

function StartQuiz()
{
    document.getElementById("question").style.display = "block";
    document.getElementById("backButton").style.display = "block";
    document.getElementById("startButton").style.display = "none";
    document.getElementById("logo").style.display = "none";
    question = 0;
    LoadQuestion();
}
function ResetQuiz()
{
    document.getElementById("results").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("backButton").style.display = "none";
    document.getElementById("startButton").style.display = "block";
    document.getElementById("logo").style.display = "block";
    question = 0;
    result = [];
}
function NextQuestion(string) {
    partiesCreated = false;
    if (string == "agree") {
        result.push("pro");
    } else if (string == "neither") {
        result.push("ambivalent");
    } else if (string == "disagree") {
        result.push("contra");
    } else if (string == "skip") {
        result.push("skip");
    }
    question++;
    if (question < subjects.length) {
        ClearParties();
        LoadQuestion();
    } else {
        GetResults();
    }
}
function PreviousQuestion()
{
    partiesCreated = false;
    if(question < 1)
    {
        ResetQuiz();
    }else if(question >= subjects.length)
    {
        ResetQuiz();
    }else
    {
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
        for (i in parties) {
            document.getElementById("partiesList").style.display = "flex";
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
    var results = document.getElementById("results");
    results.style.display = "flex";
    var subjectsCounter = 0;
    var partyObject = new Object();
    var counter = 0
    for (i in subjects[subjectsCounter].parties) {
        var matchName = subjects[subjectsCounter].parties[counter].name + "Matched";
        matchName = matchName.replace(/ /g, "");
        matchName = matchName.replace("\"\"", "/");
        partyObject[matchName] = 0;
        var partyMatches = document.createElement("label");
        var varName = [matchName] + "Element";
        partyMatches.id = [varName]
        results.appendChild(partyMatches);
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

            if (position == result[subjectsCounter]) {
                partyObject[matchName] = partyObject[matchName] + 1;
                var partyElement = document.getElementById([matchName] + "Element");
                partyElement.innerHTML = party.name + " = " + partyObject[matchName];
            } else {

            }
            partiesCounter++;
        }
        subjectsCounter++;
    }
}
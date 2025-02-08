// Liste des mots proposés
const mots = [
    "palestine",
    "canada",
    "informatique",
    "programme",
    "communication",
    "international",
    "Senegal"
];

// Liste des phrases proposées
const phrases = [
    "La paix est essentielle",
    "L'apprentissage est une aventure",
    "La technologie change le monde",
    "Chaque jour est une opportunité",
    "Le savoir est une force",
    "Maman va au marché",
    "Le Sénégal est Beau",
    "C'est du made in Senegal"
];

// Initialisation des variables
let indexMot = 0;
let indexPhrase = 0;
let score = 0;
let bonneReponse = 0;
let currentTimeout;
let timerInterval;
let globalTimeLeft;
let totalQuestions; // Variable pour stocker le nombre total de mots ou de phrases selon le mode choisi

// Sélection des éléments HTML
const propositionDiv = document.querySelector(".proposition");
const saisieInput = document.querySelector(".saisi");
const scoreSpan = document.querySelector(".score span");
const timerDisplay = document.getElementById("timerDisplay");
const choix = document.querySelectorAll(".typedesaisie input");

// Fonction pour démarrer un test de saisie
function commencerTest() {
    if (document.querySelector('input[name="1et2"]:checked') === null) {
        alert("Veuillez choisir 'Mot' ou 'Phrase' avant de commencer !");
        return;
    }

    clearTimeout(currentTimeout); // Si un précédent test est en cours, l'annuler
    clearInterval(timerInterval); // Stopper tout intervalle de timer en cours
    score = 0;
    bonneReponse = 0;
    updateScore();

    if (choix[0].checked) {
        // Mode mot
        globalTimeLeft = 30; // 30 secondes pour les mots
        totalQuestions = mots.length; // Total des mots
        lancerMot();
    } else {
        // Mode phrase
        globalTimeLeft = 60; // 60 secondes pour les phrases
        totalQuestions = phrases.length; // Total des phrases
        lancerPhrase();
    }

    // Lancer le décompte du timer global
    timerInterval = setInterval(updateGlobalTimer, 1000);
}

// Fonction pour démarrer le chronomètre et afficher le mot
function lancerMot() {
    if (indexMot >= mots.length || globalTimeLeft <= 0) {
        finTest();
        return;
    }
    propositionDiv.textContent = mots[indexMot];
    saisieInput.value = "";
    saisieInput.focus();

    // Vérifie si l'utilisateur a écrit le bon mot ou si le temps est écoulé
    currentTimeout = setTimeout(() => verifierMot(), globalTimeLeft * 1000); // Délai pour passer au mot suivant
}

// Fonction pour démarrer le chronomètre et afficher la phrase
function lancerPhrase() {
    if (indexPhrase >= phrases.length || globalTimeLeft <= 0) {
        finTest();
        return;
    }
    propositionDiv.textContent = phrases[indexPhrase];
    saisieInput.value = "";
    saisieInput.focus();

    // Vérifie si l'utilisateur a écrit la bonne phrase ou si le temps est écoulé
    currentTimeout = setTimeout(() => verifierPhrase(), globalTimeLeft * 1000); // Délai pour passer à la phrase suivante
}

// Fonction pour mettre à jour le timer global
function updateGlobalTimer() {
    if (globalTimeLeft > 0) {
        globalTimeLeft--;
        timerDisplay.textContent = globalTimeLeft < 10 ? `0${globalTimeLeft}` : globalTimeLeft; // Afficher le temps sur la div timer
    } else {
        clearInterval(timerInterval); // Arrêter le timer global lorsque le temps est écoulé
        finTest(); // Terminer le test
    }
}

// Fonction pour vérifier la saisie du mot
function verifierMot() {
    if (saisieInput.value.trim().toLowerCase() === mots[indexMot].toLowerCase()) {
        score++;
        bonneReponse++;
        updateScore();
    }
    indexMot++;
    lancerMot(); // Passer au mot suivant et réinitialiser le timer
}

// Fonction pour vérifier la saisie de la phrase
function verifierPhrase() {
    if (saisieInput.value.trim().toLowerCase() === phrases[indexPhrase].toLowerCase()) {
        score++;
        bonneReponse++;
        updateScore();
    }
    indexPhrase++;
    lancerPhrase(); // Passer à la phrase suivante et réinitialiser le timer
}

// Fonction pour mettre à jour le score affiché
function updateScore() {
    scoreSpan.textContent = `Score: ${bonneReponse} / ${mots.length}`;
}

// Fonction pour afficher un timer formaté
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

// Fonction pour terminer le test et afficher le résultat
function finTest() {
    propositionDiv.textContent = "Test terminé!";
    alert(`Test terminé! Vous avez répondu correctement à ${bonneReponse} question(s).`);
}

// Lancer le test lorsque l'utilisateur choisit une option
choix.forEach((input) => {
    input.addEventListener('change', commencerTest);
});

// Quand l'utilisateur commence à taper, vérifiez si le mot ou la phrase est correct
saisieInput.addEventListener('input', () => {
    if (choix[0].checked) {
        // Mode mot
        if (saisieInput.value.trim().toLowerCase() === mots[indexMot].toLowerCase()) {
            verifierMot();
        }
    } else {
        // Mode phrase
        if (saisieInput.value.trim().toLowerCase() === phrases[indexPhrase].toLowerCase()) {
            verifierPhrase();
        }
    }
});

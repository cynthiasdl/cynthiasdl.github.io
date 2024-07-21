function checkAnswer(answer) {
    var correctAnswer = "blue and white"; // Die richtige Antwort
    var resultDiv = document.getElementById('result');
    var flagDiv = document.getElementById('flag');

    if (answer === correctAnswer) {
        resultDiv.innerHTML = "Correct!";
        flagDiv.innerHTML = '<img src="./images/flag-antarctica.png" alt="Antarctic Flag">';
    } else {
        resultDiv.innerHTML = "Wrong! It's blue and white";
        flagDiv.innerHTML = '<img src="./images/flag-antarctica.png" alt="Antarctic Flag">';
    }

    // Zeige die Flagge an, unabhängig von der Antwort
    flagDiv.style.display = 'block';
}
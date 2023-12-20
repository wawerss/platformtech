document.addEventListener('DOMContentLoaded', function () {
    loadPeriods();
    updatePredictions();
    updateFertileDays();
    updateNonFertileDays()
});

function loadPeriods() {
    const periodHistory = document.getElementById('period-history');
    periodHistory.innerHTML = '';

    const periods = getPeriods();

    periods.forEach((period, index) => {
        const periodElement = createPeriodElement(period, index);
        periodHistory.appendChild(periodElement);
    });
}

function createPeriodElement(period, index) {
    const periodElement = document.createElement('li');
    periodElement.textContent = formatDate(new Date(period.date));

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.className = 'reset-button';
    resetButton.addEventListener('click', function () {
        removePeriod(index);
        loadPeriods();
        updatePredictions();
    });

    periodElement.appendChild(resetButton);
    return periodElement;
}

function addPeriod(event) {
    event.preventDefault();

    const dateInput = document.getElementById('period-date');
    const date = dateInput.value;

    if (date) {
        const period = { date };
        savePeriod(period);
        loadPeriods();
        updatePredictions();
        dateInput.value = '';
    }
}

function removePeriod(index) {
    const periods = getPeriods();
    periods.splice(index, 1);
    localStorage.setItem('periods', JSON.stringify(periods));
}

function getPeriods() {
    return JSON.parse(localStorage.getItem('periods')) || [];
}

function savePeriod(period) {
    const periods = getPeriods();
    periods.push(period);
    localStorage.setItem('periods', JSON.stringify(periods));
}

function updatePredictions() {
    const periods = getPeriods();
    const predictionsContainer = document.getElementById('cycle-predictions');
    const predictionDateElement = document.getElementById('prediction-date');

    if (periods.length >= 1) {
        const lastPeriod = new Date(periods[periods.length - 1].date);

        // Add 28 days to the last recorded period's date
        const nextPredictionDate = new Date(lastPeriod.getTime() + 28 * (1000 * 60 * 60 * 24));
        const formattedPredictionDate = formatDate(nextPredictionDate);

        predictionDateElement.textContent = `Next Period Prediction: ${formattedPredictionDate}`;

        predictionsContainer.style.display = 'block';
    } else {
        predictionDateElement.textContent = ''; 
        predictionsContainer.style.display = 'none';
    }
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}
function updateFertileDays() {
    const periods = getPeriods();
    const fertileDaysContainer = document.getElementById('fertile-days');

    if (fertileDaysContainer) {
        fertileDaysContainer.innerHTML = '';

        if (periods.length >= 1) {
            const lastPeriod = new Date(periods[periods.length - 1].date);

            // Calculate fertile days
            const fertileStart = new Date(lastPeriod.getTime() + 9 * (1000 * 60 * 60 * 24));
            const fertileEnd = new Date(lastPeriod.getTime() + 14 * (1000 * 60 * 60 * 24));
            const formattedFertileStart = formatDate(fertileStart);
            const formattedFertileEnd = formatDate(fertileEnd);

            // Add fertile days to the container
            fertileDaysContainer.innerHTML = `
                <div>Fertile days: ${formattedFertileStart} to ${formattedFertileEnd}</div>
            `;
        } else {
            fertileDaysContainer.innerHTML = '';
        }
    } else {
        console.error("Element with id 'fertile-days' not found.");
    }
}

function updateNonFertileDays() {
    const periods = getPeriods();
    const nonFertileDaysContainer = document.getElementById('non-fertile-days');

    if (nonFertileDaysContainer) {
        nonFertileDaysContainer.innerHTML = '';

        if (periods.length >= 1) {
            const lastPeriod = new Date(periods[periods.length - 1].date);

            // Calculate non-fertile days
            const nonFertileStart = new Date(lastPeriod.getTime() + 15 * (1000 * 60 * 60 * 24));
            const nonFertileEnd = new Date(lastPeriod.getTime() + 28 * (1000 * 60 * 60 * 24));
            const formattedNonFertileStart = formatDate(nonFertileStart);
            const formattedNonFertileEnd = formatDate(nonFertileEnd);

            // Add non-fertile days to the container
            nonFertileDaysContainer.innerHTML = `
                <div>Non-fertile days: ${formattedNonFertileStart} to ${formattedNonFertileEnd}</div>
            `;
        } else {
            nonFertileDaysContainer.innerHTML = 'Non-fertile days require at least one recorded period.';
        }
    } else {
        console.error("Element with id 'non-fertile-days' not found.");
    }
}

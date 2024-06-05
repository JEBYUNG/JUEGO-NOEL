let userId = '';

const trueFalseQuestions = [
    { question: 'Noel fue fundada en el año 1916', answer: true },
    { question: 'Noel es una marca propiedad de Grupo Nutresa.', answer: true },
    { question: 'Noel solo produce galletas para el mercado colombiano.', answer: false },
    { question: 'Noel tiene más de 100 años de historia en la industria alimentaria.', answer: true },
    { question: 'Noel no tiene certificaciones de calidad internacionales.', answer: false },
];

const wordAssociations = [
    { word: 'NOEL', definition: 'Empresa colombiana famosa por sus galletas y productos de panadería..' },
    { word: 'FESTIVAL', definition: 'Galleta de chocolate popular producida por Noel.' },
    { word: 'NUTRESA', definition: 'Grupo empresarial al que pertenece Noel.' },
    { word: 'CERTIFICACIÓN', definition: 'Reconocimiento que asegura la calidad y seguridad de los productos.' },
    { word: 'RESPONSABILIDAD SOCIAL', definition: 'Compromiso de Noel con el bienestar de la comunidad y el medio ambiente.' },
    { word: 'EXPORTACIÓN', definition: 'Actividad de vender productos de Noel a otros países.' },
    { word: 'HIGIENE', definition: 'Prácticas necesarias para mantener los alimentos seguros y limpios.' },
    { word: 'CONSERVACIÓN', definition: 'Métodos para mantener los alimentos frescos y seguros para el consumo.' },
    { word: 'SEGURIDAD ALIMENTARIA', definition: 'Prácticas y medidas para asegurar que los alimentos sean seguros para el consumo.' },
    { word: 'PRODUCCIÓN', definition: 'Proceso de fabricación de las galletas y otros productos en la planta de Noel.' },
];

const multipleChoiceQuestions = [
    {
        question: '¿Cuál es un componente clave de un programa de seguridad y salud en el trabajo?',
        options: ['Evitar el uso de equipo de protección personal', 'Ignorar los informes de accidentes laborales', 'Realizar inspecciones de seguridad regulares', 'Descartar la capacitación de los empleados'],
        answer: 2
    },
    {
        question: '¿Cuál es una práctica esencial para el manejo seguro de alimentos?',
        options: ['Almacenar alimentos a temperatura ambiente', 'Lavar las manos antes de manipular alimentos', 'Dejar alimentos perecederos fuera del refrigerador por varias horas', 'Utilizar los mismos utensilios para alimentos crudos y cocidos'],
        answer: 1
    },
    {
        question: '¿Cuál es la temperatura adecuada para almacenar alimentos perecederos en un refrigerador?',
        options: ['10°', '0°', '4°', '15°'],
        answer: 2
    },
    {
        question: '¿Qué es lo primero que se debe hacer antes de operar una nueva maquinaria en una planta de producción?',
        options: ['Leer el manual de instrucciones', 'Encender la máquina inmediatamente', 'Preguntar a un compañero cómo usarla', 'Saltar el proceso de prueba'],
        answer: 0
    },
    {
        question: '¿Qué acción es parte fundamental de un programa de seguridad y salud en el trabajo?',
        options: ['Ignorar reportes de condiciones inseguras', 'Minimizar el uso de equipos de protección personal', 'Omitir las reuniones de seguridad', 'Capacitar a los empleados en procedimientos de emergencia'],
        answer: 3
    },
];

function startGame() {
    userId = document.getElementById('userId').value;
    if (userId === '') {
        alert('Por favor, ingresa tu ID');
        return;
    }
    document.getElementById('register').classList.add('hidden');
    document.getElementById('level1').classList.remove('hidden');
    loadLevel1();
}

function loadLevel1() {
    const container = document.getElementById('questions');
    container.innerHTML = '';
    trueFalseQuestions.forEach((q, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>${q.question}</p>
            <div class="true-false-options">
                <div class="option" id="option-true-${index}" onclick="selectOption(${index}, true)">Verdadero</div>
                <div class="option" id="option-false-${index}" onclick="selectOption(${index}, false)">Falso</div>
            </div>
        `;
        container.appendChild(div);
    });
}

function selectOption(questionIndex, isTrue) {
    const trueOption = document.getElementById(`option-true-${questionIndex}`);
    const falseOption = document.getElementById(`option-false-${questionIndex}`);
    
    trueOption.classList.remove('selected-true', 'selected-false');
    falseOption.classList.remove('selected-true', 'selected-false');
    
    if (isTrue) {
        trueOption.classList.add('selected-true');
    } else {
        falseOption.classList.add('selected-false');
    }
}

function checkLevel1() {
    let allCorrect = true;
    trueFalseQuestions.forEach((q, index) => {
        const selectedTrue = document.getElementById(`option-true-${index}`).classList.contains('selected-true');
        const selectedFalse = document.getElementById(`option-false-${index}`).classList.contains('selected-false');
        if ((q.answer && !selectedTrue) || (!q.answer && !selectedFalse)) {
            allCorrect = false;
        }
    });
    if (!allCorrect) {
        showError('Error en las respuestas');
    } else {
        document.getElementById('level1').classList.add('hidden');
        document.getElementById('level2').classList.remove('hidden');
        loadLevel2();
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function loadLevel2() {
    const container = document.getElementById('associations');
    container.innerHTML = '';
    const wordsContainer = document.createElement('div');
    const definitionsContainer = document.createElement('div');

    wordAssociations.forEach((item, index) => {
        const wordDiv = document.createElement('div');
        wordDiv.id = `word${index}`;
        wordDiv.className = 'word';
        wordDiv.draggable = true;
        wordDiv.ondragstart = drag;
        wordDiv.innerText = item.word;
        wordsContainer.appendChild(wordDiv);

        const defDiv = document.createElement('div');
        defDiv.id = `def${index}`;
        defDiv.className = 'definition';
        defDiv.ondrop = drop;
        defDiv.ondragover = allowDrop;
        defDiv.innerText = item.definition;
        definitionsContainer.appendChild(defDiv);
    });

    container.appendChild(wordsContainer);
    container.appendChild(definitionsContainer);
}

function checkLevel2() {
    let allCorrect = true;
    wordAssociations.forEach((item, index) => {
        const wordDiv = document.getElementById(`word${index}`);
        const parentDiv = wordDiv.parentElement;
        if (parentDiv.id !== `def${index}`) {
            allCorrect = false;
        }
    });

    if (!allCorrect) {
        showError('Error en las asociaciones de palabras');
    } else {
        document.getElementById('level2').classList.add('hidden');
        document.getElementById('level3').classList.remove('hidden');
        loadLevel3();
    }
}

function loadLevel3() {
    const container = document.getElementById('multipleChoice');
    container.innerHTML = '';
    multipleChoiceQuestions.forEach((q, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p>${q.question}</p>
            <div class="multiple-choice-options">
                ${q.options.map((option, i) => `
                    <div class="mc-option" id="mc-option-${index}-${i}" onclick="selectMcOption(${index}, ${i})">${option}</div>
                `).join('')}
            </div>
        `;
        container.appendChild(div);
    });
}

function selectMcOption(questionIndex, optionIndex) {
    multipleChoiceQuestions[questionIndex].options.forEach((option, i) => {
        const optionDiv = document.getElementById(`mc-option-${questionIndex}-${i}`);
        optionDiv.classList.remove('selected');
    });
    const selectedOptionDiv = document.getElementById(`mc-option-${questionIndex}-${optionIndex}`);
    selectedOptionDiv.classList.add('selected');
}

function checkLevel3() {
    let allCorrect = true;
    multipleChoiceQuestions.forEach((q, index) => {
        const selectedOption = Array.from(document.querySelectorAll(`#mc-option-${index}-${q.answer}`)).find(option => option.classList.contains('selected'));
        if (!selectedOption) {
            allCorrect = false;
        }
    });
    if (!allCorrect) {
        showError('Error en las respuestas de selección múltiple');
    } else {
        document.getElementById('level3').classList.add('hidden');
        document.getElementById('result').classList.remove('hidden');
        document.getElementById('resultMessage').innerText = `¡Felicidades, ${userId}! Has completado el juego.`;
    }
}

function showError(message) {
    alert(message);
}

function resetGame() {
    userId = '';
    document.getElementById('register').classList.remove('hidden');
    document.getElementById('level1').classList.add('hidden');
    document.getElementById('level2').classList.add('hidden');
    document.getElementById('level3').classList.add('hidden');
    document.getElementById('result').classList.add('hidden');
    document.getElementById('questions').innerHTML = '';
    document.getElementById('associations').innerHTML = '';
    document.getElementById('multipleChoice').innerHTML = '';
}

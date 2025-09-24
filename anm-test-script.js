const questions = [
    {
        question: "विश्व स्वास्थ्य दिवस (World Health Day) कब मनाया जाता है?",
        options: ["1 मई", "7 अप्रैल", "15 अगस्त", "26 जनवरी"],
        answer: "7 अप्रैल"
    },
    {
        question: "पोलियो किस प्रकार का रोग है?",
        options: ["बैक्टीरिया से होने वाला रोग", "वायरस से होने वाला रोग", "फंगस से होने वाला रोग", "पोषक तत्व की कमी से होने वाला रोग"],
        answer: "वायरस से होने वाला रोग"
    },
    {
        question: "बीसीजी (BCG) का टीका किस बीमारी से बचाव के लिए लगाया जाता है?",
        options: ["खसरा", "हेपेटाइटिस बी", "टीबी (तपेदिक)", "पोलियो"],
        answer: "टीबी (तपेदिक)"
    },
    {
        question: "एनीमिया (Anaemia) किस पोषक तत्व की कमी से होता है?",
        options: ["कैल्शियम", "आयरन", "विटामिन सी", "प्रोटीन"],
        answer: "आयरन"
    },
    {
        question: "ओआरएस (ORS) का पूरा नाम क्या है?",
        options: ["Oral Relief Solution", "Oral Rehydration Solution", "Organic Rehydration System", "Oral Respiration Solution"],
        answer: "Oral Rehydration Solution"
    },
    {
        question: "एक वर्ष से कम उम्र के शिशु की मृत्यु को क्या कहते हैं?",
        options: ["शिशु मृत्यु", "नवजात मृत्यु", "मातृ मृत्यु", "बाल मृत्यु"],
        answer: "शिशु मृत्यु"
    },
    {
        question: "राष्ट्रीय परिवार स्वास्थ्य सर्वेक्षण (NFHS) का उद्देश्य क्या है?",
        options: ["आर्थिक डेटा एकत्र करना", "जनसंख्या, स्वास्थ्य और पोषण डेटा एकत्र करना", "कृषि उत्पादन की निगरानी करना", "शहरीकरण का अध्ययन करना"],
        answer: "जनसंख्या, स्वास्थ्य और पोषण डेटा एकत्र करना"
    },
    {
        question: "किस आयु वर्ग के बच्चों को 'अंगवाड़ी' केंद्रों में पूरक पोषण मिलता है?",
        options: ["0-2 वर्ष", "0-6 वर्ष", "6-12 वर्ष", "12-18 वर्ष"],
        answer: "0-6 वर्ष"
    },
    {
        question: "सामुदायिक स्वास्थ्य नर्सिंग का मुख्य फोकस किस पर है?",
        options: ["केवल अस्पताल में रोगी का इलाज", "केवल व्यक्तियों के स्वास्थ्य पर", "समुदाय के स्वास्थ्य और कल्याण पर", "रोग का निदान"],
        answer: "समुदाय के स्वास्थ्य और कल्याण पर"
    },
    {
        question: "विटामिन ए की कमी से कौन-सा रोग होता है?",
        options: ["रिकेट्स", "स्कर्वी", "रतौंधी", "एनीमिया"],
        answer: "रतौंधी"
    },
    {
        question: "डीपीटी (DPT) का टीका किन बीमारियों से बचाता है?",
        options: ["डिप्थीरिया, पोलियो, टेटनस", "डिप्थीरिया, काली खांसी, टेटनस", "डेंगू, पोलियो, टाइफाइड", "डिप्थीरिया, पीलिया, टाइफाइड"],
        answer: "डिप्थीरिया, काली खांसी, टेटनस"
    },
    {
        question: "प्रसव के बाद एक ANM को महिला को क्या सलाह देनी चाहिए?",
        options: ["तुरंत काम शुरू करने की", "जल्दी से जल्दी गर्भवती होने की", "पर्याप्त आराम और पोषण लेने की", "केवल बच्चे की देखभाल करने की"],
        answer: "पर्याप्त आराम और पोषण लेने की"
    },
    {
        question: "खसरा (Measles) का टीका शिशु को किस उम्र में लगाया जाता है?",
        options: ["जन्म पर", "6 सप्ताह", "9 महीने", "18 महीने"],
        answer: "9 महीने"
    },
    {
        question: "निम्नलिखित में से कौन-सा एक जल-जनित रोग है?",
        options: ["मलेरिया", "डेंगू", "हैजा", "टीबी"],
        answer: "हैजा"
    },
    {
        question: "एड्स (AIDS) का पूरा नाम क्या है?",
        options: ["Acquired Immune Deficiency Syndrome", "Acute Immune Deficiency Syndrome", "Allied Immunization Delivery System", "Acquired Infectious Disease Syndrome"],
        answer: "Acquired Immune Deficiency Syndrome"
    },
    {
        question: "क्षय रोग (Tuberculosis) के निदान के लिए कौन-सा परीक्षण किया जाता है?",
        options: ["रक्त परीक्षण", "यूरिन परीक्षण", "टीबी त्वचा परीक्षण (Mantoux)", "विटामिन परीक्षण"],
        answer: "टीबी त्वचा परीक्षण (Mantoux)"
    },
    {
        question: "मातृ एवं शिशु स्वास्थ्य (MCH) सेवाओं का एक हिस्सा क्या है?",
        options: ["केवल शिशु का टीकाकरण", "केवल गर्भवती महिला की जांच", "गर्भावस्था से लेकर शिशु के शुरुआती वर्षों तक देखभाल", "केवल महिलाओं को दवाएं देना"],
        answer: "गर्भावस्था से लेकर शिशु के शुरुआती वर्षों तक देखभाल"
    },
    {
        question: "परिवार नियोजन का मुख्य उद्देश्य क्या है?",
        options: ["बच्चों की संख्या को सीमित करना", "परिवार के स्वास्थ्य और कल्याण में सुधार करना", "केवल महिलाओं की जिम्मेदारी", "केवल गर्भनिरोधक का उपयोग करना"],
        answer: "परिवार के स्वास्थ्य और कल्याण में सुधार करना"
    },
    {
        question: "राष्ट्रीय ग्रामीण स्वास्थ्य मिशन (NRHM) की शुरुआत किस वर्ष हुई थी?",
        options: ["2002", "2005", "2010", "2015"],
        answer: "2005"
    },
    {
        question: "डेंगू किस मच्छर के काटने से फैलता है?",
        options: ["एडीज एजिप्टी", "एनाफिलीज", "क्यूलेक्स", "मलेरिया"],
        answer: "एडीज एजिप्टी"
    },
    {
        question: "स्तनपान कराने वाली माँ को क्या सलाह देनी चाहिए?",
        options: ["केवल तरल पदार्थ पीने की", "संतुलित और पौष्टिक भोजन खाने की", "केवल बच्चे को दूध पिलाने की", "अधिक नमक खाने की"],
        answer: "संतुलित और पौष्टिक भोजन खाने की"
    },
    {
        question: "पल्स पोलियो कार्यक्रम का उद्देश्य क्या है?",
        options: ["बच्चों को पोलियो का टीका लगाना", "पोलियो का पूरी तरह से उन्मूलन करना", "केवल वयस्कों को पोलियो का टीका लगाना", "केवल पोलियो के मरीजों का इलाज"],
        answer: "पोलियो का पूरी तरह से उन्मूलन करना"
    },
    {
        question: "किस टीका को 'जीवन रक्षक' (Life Saving) टीका माना जाता है?",
        options: ["डीपीटी", "बीसीजी", "खसरा", "उपरोक्त सभी"],
        answer: "उपरोक्त सभी"
    },
    {
        question: "एक समुदाय में स्वास्थ्य शिक्षा का सबसे प्रभावी तरीका क्या है?",
        options: ["केवल लिखित जानकारी देना", "जनभागीदारी और सरल भाषा का उपयोग", "जटिल चिकित्सा शब्दों का उपयोग", "केवल टीवी पर विज्ञापन दिखाना"],
        answer: "जनभागीदारी और सरल भाषा का उपयोग"
    },
    {
        question: "हाथ धोने के लिए सबसे अच्छा समय क्या है?",
        options: ["केवल खाना खाने से पहले", "केवल शौचालय जाने के बाद", "खाना खाने से पहले और बाद में, और शौचालय जाने के बाद", "केवल सुबह"],
        answer: "खाना खाने से पहले और बाद में, और शौचालय जाने के बाद"
    },
    {
        question: "सामुदायिक स्वास्थ्य में 'स्क्रीनिंग' का उद्देश्य क्या है?",
        options: ["रोग का इलाज करना", "अस्पताल में भर्ती करना", "किसी बीमारी के लक्षणों के बिना लोगों की पहचान करना", "पुनर्वास"],
        answer: "किसी बीमारी के लक्षणों के बिना लोगों की पहचान करना"
    },
    {
        question: "गर्भवती महिला को टेटनस (Tetanus) से बचाव के लिए कौन-सा टीका दिया जाता है?",
        options: ["डीपीटी", "टीटी (TT)", "ओपीवी", "खसरा"],
        answer: "टीटी (TT)"
    },
    {
        question: "नवजात शिशु के लिए सबसे महत्वपूर्ण पोषण क्या है?",
        options: ["गाय का दूध", "माँ का पहला दूध (कोलोस्ट्रम)", "फॉर्मूला दूध", "पानी"],
        answer: "माँ का पहला दूध (कोलोस्ट्रम)"
    },
    {
        question: "गर्भवती महिला को किस विटामिन की कमी को दूर करने के लिए आयरन और फोलिक एसिड की गोली दी जाती है?",
        options: ["विटामिन सी", "विटामिन डी", "एनीमिया को रोकने के लिए", "विटामिन ए"],
        answer: "एनीमिया को रोकने के लिए"
    },
    {
        question: "राष्ट्रीय बाल स्वास्थ्य कार्यक्रम (RBSK) का उद्देश्य क्या है?",
        options: ["बच्चों को केवल टीका लगाना", "जन्म से 18 साल तक के बच्चों के स्वास्थ्य की जांच करना", "केवल कुपोषित बच्चों का इलाज करना", "बच्चों को स्कूल भेजना"],
        answer: "जन्म से 18 साल तक के बच्चों के स्वास्थ्य की जांच करना"
    }
];

const quizContainer = document.getElementById('questions-container');
const resultsContainer = document.getElementById('results');
const scoreMessage = document.getElementById('score-message');
const feedbackMessage = document.getElementById('feedback');

function generateQuiz() {
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        
        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionText);
        
        const optionsList = document.createElement('ul');
        optionsList.classList.add('options-list');
        
        q.options.forEach(option => {
            const li = document.createElement('li');
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${index}`;
            input.value = option;
            
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            li.appendChild(label);
            optionsList.appendChild(li);
        });
        
        questionDiv.appendChild(optionsList);
        quizContainer.appendChild(questionDiv);
    });
}

function submitQuiz() {
    let score = 0;
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });
    
    document.getElementById('quiz-form').classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    
    scoreMessage.textContent = `आपका स्कोर: ${score} / 30`;
    
    let feedbackText;
    if (score >= 25) {
        feedbackText = "उत्कृष्ट! आपकी तैयारी बहुत अच्छी है।";
    } else if (score >= 15) {
        feedbackText = "अच्छा प्रयास। आपको और मेहनत करने की जरूरत है।";
    } else {
        feedbackText = "चिंता न करें, आप फिर से प्रयास कर सकते हैं। अपनी तैयारी पर और ध्यान दें।";
    }
    feedbackMessage.textContent = feedbackText;
}

// Generate the quiz when the page loads
document.addEventListener('DOMContentLoaded', generateQuiz);
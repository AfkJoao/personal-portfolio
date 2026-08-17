// variaveis do hover dos trampos
const previewBox = document.getElementById('hover-preview');
const previewImg = document.getElementById('preview-img');
const projectItems = document.querySelectorAll('.project-item');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let isHovering = false;
const speed = 0.15; // velocidade q a img segue o mouse

// só roda se tiver mouse mesmo (pula celular pra n bugar touch)
if (window.matchMedia("(hover: hover)").matches) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // lerp bolado pra interpolar o movimento e ficar suave
    function animate() {
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;

        if (isHovering) {
            previewBox.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%) scale(1)`;
            previewBox.style.opacity = '1';
        } else {
            previewBox.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%) scale(0.5)`;
            previewBox.style.opacity = '0';
        }
        requestAnimationFrame(animate);
    }
    animate();

    // handlers dos links pros projetos
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            isHovering = true;
            const url = item.getAttribute('data-image');
            if (url) {
                previewImg.src = url;
                previewImg.alt = "Preview do projeto " + item.querySelector('h3').innerText;
                previewBox.style.display = 'flex';
            }
        });
        item.addEventListener('mouseleave', () => {
            isHovering = false;
            // timeoutzin só pra nao piscar se tirar rapido
            setTimeout(() => { if (!isHovering) previewBox.style.display = 'none'; }, 200);
        });
    });
}

// intro rapida passando as linguas
const intro = document.getElementById('intro');
const words = [
    "HELLO", "OLÁ", "HOLA", "BONJOUR", "こんにちは", "你好", "नमस्ते", "PRIVET"
];
let i = 0;

const introInterval = setInterval(() => {
    intro.innerText = words[i]; 
    i++;
    if(i >= words.length) {
        clearInterval(introInterval);
        setTimeout(() => { 
            intro.style.opacity = '0'; 
            setTimeout(() => { intro.style.display = 'none'; }, 600); 
        }, 200);
    }
}, 180);

// setup de tema (dark e light)
const themeBtn = document.getElementById('theme-btn');
let isDark = true;

themeBtn.addEventListener('click', () => {
    isDark = !isDark;
    if (isDark) { 
        document.body.removeAttribute('data-theme'); 
        themeBtn.innerText = '☀';
        themeBtn.setAttribute('aria-label', 'Alternar para tema claro');
    } else { 
        document.body.setAttribute('data-theme', 'light'); 
        themeBtn.innerText = '☾';
        themeBtn.setAttribute('aria-label', 'Alternar para tema escuro');
    }
});

// dicionario pra trocar a lingua na hr q clicar no botao
const translations = {
    pt: {
        nav_about: "Sobre", nav_work: "Projetos", nav_tech: "Tech", nav_contact: "Contato",
        hero_title: "DATA & SYSTEMS<br>ANALYST.",
        hero_desc: "Sou João Perdigão. Transformo dados complexos em soluções simples e otimizo sistemas para gerar valor real.",
        about_title: "Mais do que código,<br>construo soluções.",
        about_text: "Minha jornada começou com a curiosidade de entender como as coisas funcionam. Hoje, uno a lógica da <strong>Análise de Dados</strong> com a visão estratégica da <strong>Análise de Sistemas</strong>.<br><br>Foco em performance, automação de processos repetitivos (Python/VBA) e dashboards que contam histórias (Power BI).",
        work_header: "Projetos Selecionados",
        p1_title: "Sales Intelligence", p2_title: "Automação de Custos", p3_title: "Data Warehouse",
        tech_header: "Tecnologias", contact_title: "Vamos trabalhar<br>juntos?",
        rain_label: "Previsão", rain_yes: "Leve guarda-chuva", rain_no: "Sem chuva",
        view_btn: "VISUALIZAR"
    },
    en: {
        nav_about: "About", nav_work: "Work", nav_tech: "Tech", nav_contact: "Contact",
        hero_title: "DATA & SYSTEMS<br>ANALYST.",
        hero_desc: "I am João Perdigão. I transform complex data into simple solutions and optimize systems to generate real value.",
        about_title: "More than code,<br>I build solutions.",
        about_text: "My journey began with a curiosity to understand how things work. Today, I combine the logic of <strong>Data Analytics</strong> with the strategic vision of <strong>Systems Analysis</strong>.<br><br>Focused on performance, automation of repetitive processes (Python/VBA), and dashboards that tell stories (Power BI).",
        work_header: "Selected Projects",
        p1_title: "Sales Intelligence", p2_title: "Cost Automation", p3_title: "Data Warehouse",
        tech_header: "Technologies", contact_title: "Let's work<br>together?",
        rain_label: "Forecast", rain_yes: "Take an umbrella", rain_no: "No rain",
        view_btn: "VIEW"
    }
};

let currentLang = 'pt'; 
const langBtn = document.getElementById('lang-btn');

langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    langBtn.innerText = currentLang === 'pt' ? 'EN' : 'PT';
    langBtn.setAttribute('aria-label', currentLang === 'pt' ? 'Mudar idioma para Inglês' : 'Change language to Portuguese');
    updateText(); 
    updateWeather();
});

// roda no html injetando o q ta la no dicionario em cima
function updateText() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(translations[currentLang][key]) el.innerHTML = translations[currentLang][key];
    });
}

// parallax levinho no background do nome
const bgName = document.getElementById('bg-name');
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
    window.addEventListener('scroll', () => { 
        bgName.style.transform = `translateY(-50%) translateX(-${window.scrollY * 0.15}px)`; 
    });
}

// intersection observer pra dar akela animada qdo scrolar pra div
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { 
        if(entry.isIntersecting) entry.target.classList.add('visible'); 
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// api do relogio rodando td hr no footer
setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
}, 1000);

// pega loc do cara e bate na api de tempo
async function updateWeather() {
    const rainText = document.getElementById('rain-text'); 
    const rainDot = document.getElementById('rain-dot');
    const detail = document.getElementById('weather-detail'); 
    const cityElement = document.getElementById('loc-city');
    
    try {
        let lat, lon, cityName;
        
        // mandando fetch pra pegar latitude e longitude (as vezes ublock mata isso, dai tem o fallback em baixo)
        try {
            const ipRes = await fetch('https://ipapi.co/json/');
            const ipData = await ipRes.json();
            cityName = ipData.city;
            lat = ipData.latitude;
            lon = ipData.longitude;
        } catch (e1) {
            // se de pau cai no geojs
            const ipRes = await fetch('https://get.geojs.io/v1/ip/geo.json'); 
            const ipData = await ipRes.json(); 
            cityName = ipData.city;
            lat = ipData.latitude;
            lon = ipData.longitude;
        }

        if (cityName) cityElement.innerText = cityName;

        // agora puxa se vai chover kk
        const wRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=precipitation_probability_max,weathercode&timezone=auto`); 
        const wData = await wRes.json(); 
        const prob = wData.daily.precipitation_probability_max[0]; 
        const code = wData.daily.weathercode[0]; 
        
        // condicao: se chover mais de 40% ele acende azul e muda texto
        if (prob > 40 || (code >= 51 && code <= 99)) { 
            rainText.innerText = `${prob}%`; 
            detail.innerText = translations[currentLang].rain_yes; 
            rainDot.classList.add('raining'); 
        } else { 
            rainText.innerText = "0%"; 
            detail.innerText = translations[currentLang].rain_no; 
            rainDot.style.background = "#4caf50"; 
            rainDot.classList.remove('raining');
        } 
    } catch (error) { 
        // falhou foda as 2 apis provavel adblock brabo
        console.warn("Localização bloqueada pelo navegador:", error);
        rainText.innerText = "--"; 
        cityElement.innerText = "Offline";
    }
}

// kickstart inicial do weather
updateWeather();

// funçao de rolar bonitinho pra sessoes
function scrollToID(id) { 
    document.getElementById(id).scrollIntoView({behavior:'smooth'}); 
}
//== user ===============================================================================

let userData = {
    login: { user: '', senha: '' },
    signIn: { name: '', user: '', senha: '', image: '' } // Adicionando a propriedade image
};
function renderForm(mode) {
    const formFields = document.getElementById('formFields');
    formFields.innerHTML = ''; // Limpar campos existentes

    if (mode === 'login') {
        formFields.innerHTML = `
            <label for="username">Usuário:</label>
            <input type="text" id="username" required>
            <br>
            <label for="password">Senha:</label>
            <input type="password" id="password" required>
        `;
    } else if (mode === 'signin') {
        formFields.innerHTML = `
            <label for="name">Nome:</label>
            <input type="text" id="name" required>
            <br>
            <label for="username">Usuário:</label>
            <input type="text" id="username" required>
            <br>
            <label for="password">Senha:</label>
            <input type="password" id="password" required>
            <br>
            <label for="imageUpload">Foto de Perfil:</label>
            <input type="file" id="imageUpload" accept="image/*" onchange="previewImage(event)">
            <br>
            <img id="preview" class="img__user" src="/" alt="Imagem do Usuário" style="display:none;">
        `;
      } else if (mode === 'user') {
        formFields.innerHTML = `
            <label for="name">Nome:</label>
            <input type="text" id="name" value="${userData.signIn.name}" required>
            <br>
            <label for="username">Usuário:</label>
            <input type="text" id="username" value="${userData.signIn.user}" required>
            <br>
            <label for="password">Senha:</label>
            <input type="password" id="password" value="${userData.signIn.senha}" required>
            <br>
            <label for="imageUpload">Foto de Perfil:</label>
            <input type="file" id="imageUpload" accept="image/*" onchange="previewImage(event)">
            <br>
            <img id="preview" class="img__user" src="${userData.signIn.image}" alt="Imagem do Usuário" style="display:${userData.signIn.image ? 'block' : 'none'};">
        `;
    }
}
function previewImage(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = document.getElementById('preview');
        img.src = e.target.result; // Define a fonte da imagem como o resultado do FileReader
        img.style.display = "block"; // Exibe a imagem

        // Atualiza a imagem do botão de acesso do usuário
        const userImage = document.getElementById('userImage');
        userImage.src = e.target.result; // Atualiza a imagem do botão
        userData.signIn.image = e.target.result; // Armazena a imagem no objeto userData
    }

    if (file) {
        reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
    }
}    
function openModal(mode) {
    const modal = document.getElementById('modal');
    const title = document.getElementById('modalTitle');
    const submitButton = document.getElementById('submitButton');
    const toggleText = document.getElementById('toggleText');

    // Configurações do modal com base no modo
    if (mode === 'login') {
        title.innerText = "Log In";
        submitButton.innerText = "Entrar";
        toggleText.innerHTML = 'Não tem uma conta? <button type="button" onclick="openModal(\'signin\')">Sign In</button>';
    } else if (mode === 'signin') {
        title.innerText = "Sign In";
        submitButton.innerText = "Criar Conta";
        toggleText.innerHTML = 'Já tem uma conta? <button type="button" onclick="openModal(\'login\')">Log In</button>';
    } else if (mode === 'user') {
        title.innerText = "Alterar Dados do Usuário";
        submitButton.innerText = "Atualizar";
        toggleText.innerHTML = '';
    }

    renderForm(mode); // Renderiza o formulário
    modal.style.display = "block";
}
function closeModal(event) {
    if (event.target === event.currentTarget) { // Verifica se o clique foi fora do conteúdo do modal
        document.getElementById('modal').style.display = "none";
    }
}
function handleFormSubmit(event) {
    event.preventDefault();
    const title = document.getElementById('modalTitle').innerText;

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (title === "Log In") {
        // Verifica se o usuário está registrado
        if (userData.signIn.user === username && userData.signIn.senha === password) {
            alert("Log In efetuado com sucesso!");
            updateUserDisplay(username);
            localStorage.setItem('loggedIn', 'true'); // Armazenar que o usuário está logado
            closeModal(event);
        } else {
            alert("Usuário inválido! Deseja fazer Sign In?");
            openModal('signin');
        }
    } else if (title === "Sign In") {
        const name = document.getElementById('name').value;
        userData.signIn.name = name;
        userData.signIn.user = username;
        userData.signIn.senha = password;
        alert("Conta criada com sucesso!");
        updateUserDisplay(username);
        localStorage.setItem('loggedIn', 'true'); // Armazenar que o usuário está logado
        closeModal(event);
    } else if (title === "Alterar Dados do Usuário") {
        const name = document.getElementById('name').value;
        userData.signIn.name = name;
        userData.signIn.user = username;
        userData.signIn.senha = password;
        alert(`Dados atualizados para ${username}`);
        closeModal(event);
    }
}
function updateUserDisplay(username) {
    document.querySelector('.logout').style.display = "block";
    document.querySelector('.user-access').style.display = "block"; // Exibir botão de acesso ao modal do usuário
    document.querySelector('.login').style.display = "none";
    document.querySelector('.signin').style.display = "none";
}
function logout() {
    // Apenas ocultar os elementos, mantendo os dados
    document.querySelector('.logout').style.display = "none";
    document.querySelector('.user-access').style.display = "none";
    document.querySelector('.login').style.display = "inline-block";
    document.querySelector('.signin').style.display = "inline-block";
    alert("Você saiu. Seus dados ainda estão salvos.");
    localStorage.removeItem('loggedIn'); // Remover a informação de login
}
// Abrir o modal de login após 5 segundos, se o usuário não estiver logado
window.onload = function() {
    if (localStorage.getItem('loggedIn') !== 'true') {
        setTimeout(() => {
            openModal('login');
        }, 5000);
    }
    changeLanguage('en'); // ou 'pt-BR' para Português
};
//== end user ==========================================================================

//======================================= NAVBAR ========================================

function toggleDropdownList(event) {
    const dropdown = event.currentTarget.nextElementSibling; // Seleciona o dropdown
    dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex'; // Alterna a exibição
    event.stopPropagation(); // Impede a propagação do evento
}

// Fecha o dropdown ao clicar fora dele
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.nav__dropdown-content');
    const servicesHeader = document.querySelector('.nav__dropdown--services h6');

    // Verifica se o clique foi fora do dropdown e do cabeçalho
    if (dropdown.style.display === 'flex' && !servicesHeader.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none'; // Oculta o dropdown
    }
});

function toggleSidebar() {
    const sidebar = document.getElementById('nav__sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.style.display = sidebar.classList.contains('active') ? 'flex' : 'none';
}
//===================================== END NAVBAR ====================================

//=================================== CHANGE LANGUAGE ===================================
// Inicializa o conteúdo com o idioma padrão
const content = {            

    "pt-BR": {                
        description: "Descrição em Português.",
        title: "Furfect - Cuidado e Saúde para Animais",

        header: {            
            NavListAbout: "Sobre",
            NavListContacts: "Contactos",
            NavListBlog: "Blogue",

            //=================ASIDE=================
            navTitle:"Serviços",
            serviceBriefText:"Na nossa clínica veterinária, oferecemos uma variedade de serviços para cuidar do seu animal de estimação.",
            btnTextTransl:"Lista de Serviços",
            btnAppointment:"Agendar Consulta",
            
            // Atualiza os serviços
            CheckUp:"consultas de Check-Up ",
            CheckUpResume:"Essenciais para garantir a saúde do seu animal. Incluem exames completos, vacinação atualizada, testes laboratoriais, orientação nutricional e deteção precoce de doenças.",
            
            Vaccination:"Vacinação",
            VaccinationResume:"Mantenha os seus animais de estimação saudáveis com os nossos serviços de vacinação, que oferecem uma variedade de vacinas para proteger contra doenças comuns.",
            
            UrgencyHour:"Urgências",
            UrgencyHourResume:"A nossa clínica veterinária 24 horas oferece cuidados de emergência abrangentes, com veterinários experientes disponíveis 24 horas para o seu pet.",
            
            PetSterilization:"Esterilização de Animais",
            PetSterilizationResume:"A esterilização é um procedimento cirúrgico que controla a população de animais e promove a saúde, prevenindo doenças e comportamentos indesejados.",
            
            PetGrooming:"Estética e cuidados",
            PetGroomingResume:"Oferecemos serviços de estética na clínica e em casa, incluindo banhos, cortes de cabelo e corte de unhas. A estética regular é fundamental para a higiene do seu animal.",
            
            HomeVeterinaryCare:"Veterinários Domiciliares",
            HomeVeterinaryCareResume:"Oferecemos atendimento de emergência completo para pets, com veterinários experientes disponíveis a qualquer hora para garantir o melhor tratamento.",
            
            ChipPlacement:"Colocação de Chip",
            ChipPlacementResume:"A colocação de um chip de identificação é vital para a segurança dos animais, permitindo a sua recuperação em caso de perda e ajudando a prevenir o abandono.",
            //---recente

            serviceDescription: "Serviços de saúde e bem-estar animal",
            mainTitle: "Pet feliz, veterinário feliz",
        },

        main: {
            ourMission:"A nossa missão é proporcionar o melhor cuidado para os animais, sempre com um enfoque naturalista e comunitário.",
            teamBriefText:"A nossa equipa é composta por profissionais dedicados e apaixonados pelo bem-estar animal. Cada membro traz uma vasta experiência e um profundo amor pelos animais, garantindo que o seu pet receba o melhor cuidado possível.",
            blogBriefText:"Aqui está um resumo do nosso blog, com dicas e histórias inspiradoras."
        }
    },
  
  
    "en": {
        description: "Description in English.",
        title: "Furfect-Health & Care",

        header: {
            NavListAbout: "About",
            NavListContacts: "Contacts",
            NavListBlog: "Blog",


            //=================ASIDE=================
            navTitle:"Services",
            serviceBriefText:"At our veterinary clinic, we offer a variety of services to care for your pet.",
            btnTextTransl:"Check our services",
            btnAppointment:"make an appointment",
            
            // Atualiza os serviços
            CheckUp:"Check Up",
            CheckUpResume:"Crucial for your pet's health, which include thorough exams, current vaccinations, lab tests, nutritional advice, and early disease detection.",
            
            Vaccination:"Vaccination",
            VaccinationResume:"Keep your pets healthy with our vaccination services. We offer a range of vaccines to protect against common diseases.",
            
            UrgencyHour:"24-Hour Vet",
            UrgencyHourResume:"Our 24-hour veterinary clinic provides comprehensive emergency care, with experienced veterinarians available at all times to ensure the best treatment for your pet.",
            
            PetSterilization:"Sterilization",
            PetSterilizationResume:"Sterilization is a surgical procedure that controls pet population and promotes health by preventing diseases and undesirable behaviors.",
            
            PetGrooming:"Grooming",
            PetGroomingResume:"We offer grooming services both in-clinic and at home, including bathing, haircuts, and nail trimming. Regular grooming is essential for your pet's hygiene.",
            
            HomeVeterinaryCare:"Home Vet",
            HomeVeterinaryCareResume:"Our 24-hour veterinary clinic provides comprehensive emergency care for pets. Our experienced veterinarians are available around the clock at any time of day or night..",
            
            ChipPlacement:"Chip Placement",
            ChipPlacementResume:"The placement of an identification chip is vital for the safety of animals, allowing for their recovery if lost and helping to prevent abandonment.",

            serviceDescription: "Animal health and welfare services",
            mainTitle: "Happy pet, happy vet",
        },

        main: {
            ourMission:"Our mission is to provide the best care for animals, always with a natural and community-focused approach.",
            teamBriefText:"Our team is made up of dedicated professionals who are passionate about animal well-being. Each member brings extensive experience and a deep love for animals, ensuring your pet receives the best possible care.",
            blogBriefText:"Here is a summary of our blog, with tips and inspiring stories."
        }
    }
};
function changeLanguage(lang) {            
    // Atualiza o título da página
    document.title = content[lang].title;
  
    // Atualiza a descrição
    const metaDescription = document.querySelector('meta[name="description"]');
    metaDescription.setAttribute('content', content[lang].description);

    document.querySelector('.NavListAbout').innerText = content[lang].NavListAbout;
    document.querySelector('.NavListContacts').innerText = content[lang].NavListContacts;
    document.querySelector('.NavListBlog').innerText = content[lang].NavListBlog;

    document.querySelector('.serviceDescription').innerText = content[lang].header.serviceDescription;
    document.querySelector('.mainTitle').innerText = content[lang].header.mainTitle;
    document.querySelector('.ourMission').innerText = content[lang].ourMission;
    document.querySelector('.teamBriefText').innerText = content[lang].teamBriefText;
    document.querySelector('.blogBriefText').innerText = content[lang].blogBriefText;


    document.querySelector('.CheckUp').innerText = content[lang].CheckUp;
    document.querySelector('.CheckUpResume').innerText = content[lang].CheckUpResume;
  
    document.querySelector('.Vaccination').innerText = content[lang].Vaccination;
    document.querySelector('.VaccinationResume').innerText = content[lang].VaccinationResume;
  
    document.querySelector('.UrgencyHour').innerText = content[lang].UrgencyHour;
    document.querySelector('.UrgencyHourResume').innerText = content[lang].UrgencyHourResume;
  
    document.querySelector('.PetSterilization').innerText = content[lang].PetSterilization;
    document.querySelector('.PetSterilizationResume').innerText = content[lang].PetSterilizationResume;
  
    document.querySelector('.PetGrooming').innerText = content[lang].PetGrooming;
    document.querySelector('.PetGroomingResume').innerText = content[lang].PetGroomingResume;
  
    document.querySelector('.HomeVeterinaryCare').innerText = content[lang].HomeVeterinaryCare;
    document.querySelector('.HomeVeterinaryCareResume').innerText = content[lang].HomeVeterinaryCareResume;
  
    document.querySelector('.ChipPlacement').innerText = content[lang].ChipPlacement;
    document.querySelector('.ChipPlacementResume').innerText = content[lang].ChipPlacementResume;

    
    document.querySelector('.navTitle').innerText = content[lang].navTitle;
    document.querySelector('.serviceBriefText').innerText = content[lang].serviceBriefText;
    document.querySelector('.btnTextTransl').innerText = content[lang].btnTextTransl;
    document.querySelector('.btnAppointment').innerText = content[lang].btnAppointment;
  
    // Salva o idioma no localStorage
    localStorage.setItem('selectedLanguage', lang);

    // Atualiza o estilo dos botões
    updateLanguageButtons(lang); 
}

// Função para atualizar os botões de idioma
function updateLanguageButtons(lang) {
    const btnPT = document.getElementById('btnPT');
    const btnEN = document.getElementById('btnEN');

    if (lang === 'pt-BR') {
        btnPT.classList.add('active');
        btnEN.classList.remove('active');
    } else {
        btnEN.classList.add('active');
        btnPT.classList.remove('active');
    }
}

// Função para carregar o idioma ao iniciar a página
function loadLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'pt-BR'; // Define o idioma padrão como português
    changeLanguage(savedLanguage);
}

// Chama a função para carregar o idioma ao carregar a página
window.onload = loadLanguage;
//================================= END CHANGE LANGUAGE =================================
//=======================================================================================
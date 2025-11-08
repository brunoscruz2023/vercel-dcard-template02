fetch('./data.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('card-content');
    const logoContainer = document.getElementById('floating-logo-container');

    // Logo
    const logo = document.createElement('img');
    logo.src = data.profile.logo;
    logo.alt = 'Logo';
    logo.style.width = '100%';
    logo.style.height = '100%';
    logoContainer.appendChild(logo);

    // Título e descrição
    container.innerHTML += `
      <h1 class="text-3xl font-bold text-primary mb-2">${data.profile.title}</h1>
      <p class="text-lg text-gray-700 mb-4">${data.profile.description}</p>
    `;

    // Botões de contato
    container.innerHTML += `
      <div class="flex gap-4 mb-6">
        <a href="https://wa.me/${data.profile.whatsapp}" class="bg-green-500 text-white px-4 py-2 rounded">WhatsApp</a>
        <a href="tel:${data.profile.phone}" class="bg-blue-500 text-white px-4 py-2 rounded">Ligar</a>
      </div>
    `;

    // Serviços
    container.innerHTML += `<h2 class="text-xl font-semibold mb-2">Serviços</h2>`;
    data.services.forEach(service => {
      container.innerHTML += `
        <div class="service-card">
          <h3 class="text-lg font-bold">${service.name}</h3>
          <p class="text-sm text-gray-600">${service.description}</p>
        </div>
      `;
    });

    // Horários
    container.innerHTML += `<h2 class="text-xl font-semibold mt-6 mb-2">Horários</h2>`;
    data.schedule.days.forEach(day => {
      container.innerHTML += `
        <div class="flex justify-between text-sm text-gray-700">
          <span>${day.day}</span>
          <span>${day.hours}</span>
        </div>
      `;
    });

    // Redes sociais
    container.innerHTML += `<div class="flex gap-4 mt-6">`;
    data.social_media.forEach(social => {
      container.innerHTML += `
        <a href="${social.url}" target="_blank">
          <span class="material-icons text-primary text-2xl">${social.icon}</span>
        </a>
      `;
    });
    container.innerHTML += `</div>`;
  });

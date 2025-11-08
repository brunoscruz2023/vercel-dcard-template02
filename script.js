document.addEventListener('DOMContentLoaded', function () {
  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao carregar o arquivo data.json");
      }
      return response.json();
    })
    .then(data => {
      // Apply Theme
      const root = document.documentElement;
      if (data.theme) {
        root.style.setProperty('--primary-color', data.theme.colors.primary);
        root.style.setProperty('--bg-light-color', data.theme.colors.background_light);
        root.style.setProperty('--bg-dark-color', data.theme.colors.background_dark);
        root.style.setProperty('--whatsapp-color', data.theme.colors.whatsapp);
        root.style.setProperty('--font-family', data.theme.font_family);
        root.style.setProperty('--border-radius-button', data.theme.border_radius.button);
        root.style.setProperty('--border-radius-card', data.theme.border_radius.card);
        root.style.setProperty('--border-radius-icon', data.theme.border_radius.icon);
      }
      if(data.layout) {
        root.style.setProperty('--hero-height', `${data.layout.hero_height}px`);
      }

      // Profile Data
      if (data.profile) {
        document.getElementById('profile-title').textContent = data.profile.title;
        document.getElementById('profile-description').textContent = data.profile.description;
        if(data.profile.background_image_url) {
          document.querySelector('#hero-bg-inner').style.backgroundImage = `url('${data.profile.background_image_url}')`;
        }
        if (data.profile.phone) {
          document.getElementById('call-button').href = `tel:${data.profile.phone}`;
        }
        if (data.profile.whatsapp) {
          document.getElementById('whatsapp-button').href = `https://wa.me/${data.profile.whatsapp}`;
          document.getElementById('whatsapp-button').target = '_blank';
        }
      }
      
      // Logo
      const logoContainer = document.getElementById('floating-logo-container');
      const logoImage = document.getElementById('floating-logo');
      const logoPlaceholder = document.getElementById('logo-placeholder');
      if (logoContainer && logoImage && data.logo) {
        if (data.logo.visible) {
          logoImage.src = data.logo.url;
          logoContainer.className = `logo-${data.logo.shape}`;
          logoContainer.style.display = 'block';
          if(logoPlaceholder) {
            logoPlaceholder.style.backgroundImage = `url('${data.logo.url}')`;
          }
        } else {
          logoContainer.style.display = 'none';
        }
      }

      // Services List
      const servicesContainer = document.getElementById('services-list-container');
      if (servicesContainer && data.services) {
        servicesContainer.innerHTML = ''; // Clear placeholder
        data.services.forEach((item, index) => {
          if (item.visible) {
            const serviceHtml = `
              <div class="flex items-center gap-4 p-4 min-h-[72px] justify-between">
                <div class="flex items-center gap-4">
                  <div class="text-primary dark:text-white flex items-center justify-center rounded-lg bg-primary/10 dark:bg-white/10 shrink-0 size-12">
                    <span class="material-symbols-outlined">${item.icon}</span>
                  </div>
                  <div class="flex flex-col justify-center">
                    <p class="text-base font-medium text-gray-800 dark:text-gray-100 line-clamp-1">${item.title}</p>
                    <p class="text-sm font-normal text-gray-500 dark:text-gray-400 line-clamp-2">${item.description}</p>
                  </div>
                </div>
              </div>
              ${index < data.services.length - 1 ? '<hr class="border-gray-200 dark:border-gray-700 mx-4"/>' : ''}
            `;
            servicesContainer.innerHTML += serviceHtml;
          }
        });
      }

      // Schedule List
      const scheduleContainer = document.getElementById('schedule-list-container');
      const scheduleTitle = document.getElementById('schedule-title');
      if (scheduleContainer && data.schedule) {
        scheduleTitle.textContent = data.schedule.title;
        scheduleContainer.innerHTML = ''; // Clear placeholder
        data.schedule.days.forEach((item, index) => {
          const scheduleHtml = `
            <div class="flex justify-between py-2 ${index < data.schedule.days.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''}">
              <span class="font-medium text-gray-800 dark:text-gray-100">${item.day}</span>
              <span>${item.hours}</span>
            </div>
          `;
          scheduleContainer.innerHTML += scheduleHtml;
        });
      }

      // Social Media Links
      const socialContainer = document.getElementById('social-links-container');
      if (socialContainer && data.social_media) {
        socialContainer.innerHTML = ''; // Clear placeholder
        data.social_media.forEach(item => {
          if (item.visible) {
            // Assuming icons are named after the platform in lowercase
            const iconUrl = `https://lh3.googleusercontent.com/aida-public/AB6AXuCsphykBfCW4zKE8om-iFEUsArj1WvxEN-lZIos34wN4DpumMj54WcZOJZYYXiGGF0EwjTOFKj53tv2WNFiYdyMFHJEas_KE-wqeotW4_IxXbL_UUcjJJ-6OADCufdAo_LmWhNZ3B9YpPegVV-a3o7dWqzvLc6eiBHbsFMCTp7IW6fHCzkrlKY4HFwegECEPM4Igoiq-w572GcbkSwmnpD92uFSGvoHscQv5vLzOUV8qmTbQ9Ixs3lLxXIDxpO9Vzivxe7RU1xFGp5B`;
            const socialHtml = `
              <a class="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 dark:bg-white/10 text-primary dark:text-white transition-colors hover:bg-primary/20 dark:hover:bg-white/20" href="${item.url}" target="_blank">
                <img alt="${item.platform} logo" class="dark:invert" src="${iconUrl}">
              </a>
            `;
            socialContainer.innerHTML += socialHtml;
          }
        });
      }
    })
    .catch(error => console.error('Falha na execução:', error));
});
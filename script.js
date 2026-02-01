// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      
      // Update aria-expanded
      const isExpanded = mobileMenu.classList.contains('active');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when clicking a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Header background on scroll
  const header = document.querySelector('.header');
  
  function updateHeader() {
    if (window.scrollY > 50) {
      header.style.backgroundColor = 'rgba(250, 250, 250, 0.95)';
      header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
    } else {
      header.style.backgroundColor = 'rgba(250, 250, 250, 0.7)';
      header.style.boxShadow = 'none';
    }
  }

  window.addEventListener('scroll', updateHeader);
  updateHeader();

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe service and product cards
  document.querySelectorAll('.service-card, .product-card, .client-card').forEach(function(card) {
    observer.observe(card);
  });

  // Client Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const clientCards = document.querySelectorAll('.client-card');

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(function(b) {
        b.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // Filter cards with animation
      clientCards.forEach(function(card) {
        const category = card.getAttribute('data-category');
        
        if (filter === 'todos' || category === filter) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          setTimeout(function() {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.transition = 'all 0.3s ease';
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          
          setTimeout(function() {
            card.classList.add('hidden');
          }, 300);
        }
      });
    });
  });
});

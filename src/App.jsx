import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Box, Button, Stack } from '@mui/material';
import Joi from 'joi';

const dropdownItems = {
  features: [
    { label: 'Todo List', icon: './assets/images/icon-todo.svg', ariaLabel: 'todo-list' },
    { label: 'Calendar', icon: './assets/images/icon-calendar.svg', ariaLabel: 'calendar' },
    { label: 'Reminders', icon: './assets/images/icon-reminders.svg', ariaLabel: 'reminders' },
    { label: 'Planning', icon: './assets/images/icon-planning.svg', ariaLabel: 'planning' },
  ],
  company: [
    { label: 'History', href: '#', ariaLabel: 'history' },
    { label: 'Our Team', href: '#', ariaLabel: 'our-team' },
    { label: 'Blog', href: '#', ariaLabel: 'blog' },
  ],
};

const clientLogos = [
  './assets/images/client-databiz.svg',
  './assets/images/client-audiophile.svg',
  './assets/images/client-meet.svg',
  './assets/images/client-maker.svg',
];

const authSchema = Joi.object({
  type: Joi.string().valid('login', 'register').required(),
});

function App() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!event.target.closest('.nav-link')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  const navLinks = useMemo(
    () => [
      { label: 'Features', key: 'features', items: dropdownItems.features },
      { label: 'Company', key: 'company', items: dropdownItems.company },
      { label: 'Careers', key: 'careers' },
      { label: 'About', key: 'about' },
    ],
    []
  );

  const handleDropdownToggle = (key) => {
    setOpenDropdown((current) => (current === key ? null : key));
  };

  const handleAuthAction = (type) => {
    const { error } = authSchema.validate({ type });
    if (error) {
      setStatusMessage('Please choose a valid action.');
      return;
    }

    setStatusMessage(`${type === 'login' ? 'Login' : 'Register'} action validated successfully.`);
  };

  return (
    <div className="page-shell">
      <header className="header">
        <div className="logo-wrap">
          <img className="logo" src="./assets/images/logo.svg" alt="snap's logo" />
        </div>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          {navLinks.map((item) => {
            const isDropdown = item.key === 'features' || item.key === 'company';
            const isOpen = openDropdown === item.key;

            return (
              <div className="nav-group" key={item.key}>
                {isDropdown ? (
                  <>
                    <button
                      type="button"
                      className="nav-link"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDropdownToggle(item.key);
                      }}
                    >
                      <span>{item.label}</span>
                      <span className="nav-icon-wrap">
                        <img src="./assets/images/icon-arrow-down.svg" alt="" className="nav-icon" />
                      </span>
                    </button>

                    <ul className={`dropdown-list ${isOpen ? 'show' : ''}`}>
                      {item.items.map((entry, index) => (
                        <li key={`${item.key}-${entry.label}`} className="dropdown-link">
                          <a
                            href={entry.href || '#'}
                            aria-label={entry.ariaLabel || undefined}
                            className={index === 0 ? 'first-dropdown-link' : ''}
                          >
                            {entry.icon && (
                              <span className="dropdown-icon-wrap">
                                <img src={entry.icon} alt="" className="dropdown-icon" />
                              </span>
                            )}
                            <span>{entry.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a href="#" className="nav-link static-link">
                    {item.label}
                  </a>
                )}
              </div>
            );
          })}
        </nav>

        <div className="registration-group desktop-auth">
          <div className="registration">
            <button type="button" onClick={() => handleAuthAction('login')}>Login</button>
          </div>
          <div className="registration">
            <button type="button" onClick={() => handleAuthAction('register')}>Register</button>
          </div>
        </div>

        <button
          type="button"
          className={`open-menu ${menuOpen ? '' : 'visible'}`}
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <img src="./assets/images/icon-menu.svg" alt="Open menu" />
        </button>

        <button
          type="button"
          className={`close-menu ${menuOpen ? 'visible' : ''}`}
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          <img src="./assets/images/icon-close-menu.svg" alt="Close menu" />
        </button>
      </header>

      <div className={`overlay ${menuOpen ? 'show' : ''}`} onClick={() => setMenuOpen(false)} />

      <main className="hero">
        <div className="text-content">
          <h1>Make remote work</h1>
          <p>
            Get your team in sync, no matter your location. Streamline processes, create team rituals,
            and watch productivity soar.
          </p>

          <Stack direction="row" spacing={2} sx={{ marginTop: 4 }}>
            <Button
              variant="contained"
              className="primary-button"
              onClick={() => handleAuthAction('register')}
            >
              Learn more
            </Button>
          </Stack>
        </div>

        <div className="hero-art">
          <picture>
            <source srcSet="./assets/images/image-hero-desktop.png" />
            <img src="./assets/images/image-hero-mobile.png" alt="Remote team on a laptop" />
          </picture>
        </div>
      </main>

      <section className="clients" aria-label="Client logos">
        {clientLogos.map((src, index) => (
          <img key={src} src={src} alt={`Client ${index + 1}`} />
        ))}
      </section>

      <footer className="attribution">
        <a href="https://crio.do" target="_blank" rel="noreferrer">
          Crio
        </a>
      </footer>

      {statusMessage && (
        <Box sx={{ position: 'relative', zIndex: 20, maxWidth: 420, mx: 'auto', mt: 2 }}>
          <Alert severity="success">{statusMessage}</Alert>
        </Box>
      )}
    </div>
  );
}

export default App;

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP = "919214793646";

const projects = [
  {
    number: "01",
    title: "Aurelle",
    category: "Luxury Bakery",
    description:
      "A refined digital experience designed to turn a local bakery into a memorable premium brand.",
    url: "https://aurellebakery.vercel.app/",
    visual: "AURELLE",
    className: "project-aurelle",
  },
  {
    number: "02",
    title: "Lumina",
    category: "Dental Experience",
    description:
      "A modern healthcare interface built around clarity, trust and effortless appointment discovery.",
    url: "https://lumina-hazel-alpha.vercel.app/",
    visual: "LUMINA",
    className: "project-lumina",
  },
  {
    number: "03",
    title: "Apex",
    category: "Automotive",
    description:
      "A high-energy digital identity created for an automotive brand that wants to look as fast as it performs.",
    url: "https://apexmotorsport.vercel.app/",
    visual: "APEX",
    className: "project-apex",
  },
];

const services = [
  {
    number: "01",
    title: "Web Design",
    text: "Websites designed around your customers, your positioning and the action you want visitors to take.",
  },
  {
    number: "02",
    title: "UI / UX",
    text: "Interfaces that remove friction, create hierarchy and make your business feel easier to trust.",
  },
  {
    number: "03",
    title: "Development",
    text: "Fast, responsive and production-ready websites built to perform beyond the design screen.",
  },
  {
    number: "04",
    title: "Digital Branding",
    text: "A coherent visual language that makes your business recognizable before anyone reads the name.",
  },
];

function App() {
  const appRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.72,
      touchMultiplier: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    // Keep Lenis and ScrollTrigger on the same animation clock.
    // This prevents the pinned sections from jumping or becoming desynchronized.
    lenis.on("scroll", ScrollTrigger.update);
    const lenisTicker = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(lenisTicker);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      /* =====================================================
         INTRO / PRELOADER
      ===================================================== */

      const intro = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      intro
        .to(".loader-logo", {
          opacity: 1,
          y: 0,
          duration: 0.9,
        })
        .to(
          ".loader-line",
          {
            scaleX: 1,
            duration: 0.8,
          },
          "-=0.45"
        )
        .to(".loader-counter", {
          opacity: 1,
          duration: 0.4,
        })
        .to(".loader", {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.15,
          delay: 0.35,
          ease: "power4.inOut",
        })
        .from(
          ".hero-word",
          {
            yPercent: 120,
            rotateX: -70,
            opacity: 0,
            stagger: 0.06,
            duration: 1.15,
            ease: "power4.out",
          },
          "-=0.65"
        )
        .from(
          ".hero-copy",
          {
            y: 35,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.65"
        )
;

      /* =====================================================
         NAV
      ===================================================== */

      gsap.to(".site-nav", {
        backgroundColor: "rgba(10, 10, 12, 0.78)",
        backdropFilter: "blur(18px)",
        scrollTrigger: {
          trigger: ".problem-section",
          start: "top 85%",
          end: "bottom top",
          toggleClass: {
            targets: ".site-nav",
            className: "nav-scrolled",
          },
        },
      });

      /* =====================================================
         HERO SCROLL
      ===================================================== */

      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "+=180%",
          scrub: 1.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // The hero stays pinned long enough for the whole message to be read.
      heroTimeline
        .to(".hero-glow", { scale: 1.7, opacity: 0.35, ease: "none" }, 0.2)
        .to(".hero-word", { yPercent: -38, scale: 0.86, ease: "none", stagger: 0.06 }, 0.25)
        .to(".hero-copy", { y: -55, opacity: 0.35, ease: "none" }, 0.35)
        .to(".hero-grid", { scale: 1.15, opacity: 0.45, ease: "none" }, 0.3)
        .to(".hero-orbit", { rotation: 70, scale: 1.25, opacity: 0.45, ease: "none" }, 0.25);

      /* =====================================================
         PROBLEM SECTION
      ===================================================== */

      gsap.from(".problem-label", {
        y: 40,
        opacity: 0,
        scrollTrigger: {
          trigger: ".problem-section",
          start: "top 75%",
        },
        duration: 0.9,
        ease: "power3.out",
      });

      const problemWords = gsap.utils.toArray(".problem-word");

      problemWords.forEach((word, index) => {
        gsap.fromTo(
          word,
          {
            opacity: 0.14,
            y: 70,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: word,
              start: "top 82%",
              end: "top 45%",
              scrub: 1,
            },
          }
        );
      });

      /* =====================================================
         "WHAT A BAD WEBSITE COSTS" VISUAL
      ===================================================== */

      const ecosystem = gsap.timeline({
        scrollTrigger: {
          trigger: ".ecosystem-section",
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: 1.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      ecosystem
        .fromTo(
          ".ecosystem-core",
          {
            scale: 0.3,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
          }
        )
        .fromTo(
          ".orbit-item",
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.18,
            duration: 0.8,
          },
          "-=0.4"
        )
        .to(
          ".orbit-ring",
          {
            rotation: 180,
            scale: 1.15,
            duration: 2,
            ease: "none",
          },
          0
        )
        .to(
          ".ecosystem-core",
          {
            scale: 1.35,
            borderRadius: "12%",
            duration: 1,
          },
          "+=0.4"
        )
        .to(
          ".orbit-item",
          {
            x: (i) => (i % 2 === 0 ? -180 : 180),
            y: (i) => (i % 3 === 0 ? -120 : 120),
            opacity: 0,
            duration: 1,
          },
          "-=0.8"
        )
        .to(
          ".ecosystem-message",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.3"
        );

      /* =====================================================
         SOLUTION STATEMENT
      ===================================================== */

      gsap.from(".solution-line", {
        yPercent: 100,
        opacity: 0,
        stagger: 0.08,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".solution-section",
          start: "top 70%",
        },
      });

      /* =====================================================
         SERVICES — PINNED STACK
      ===================================================== */

      const serviceCards = gsap.utils.toArray(".service-card");

      serviceCards.forEach((card, index) => {
        const number = card.querySelector(".service-number");
        const content = card.querySelector(".service-content");

        gsap.fromTo(
          card,
          {
            yPercent: 100,
            rotateX: 12,
            opacity: 0,
          },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "top 25%",
              scrub: 1.8,
            },
          }
        );

        gsap.to(content, {
          x: index % 2 === 0 ? 30 : -30,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 15%",
            scrub: 2,
          },
        });

        gsap.to(number, {
          rotation: index % 2 === 0 ? -8 : 8,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 15%",
            scrub: 2,
          },
        });
      });

      /* =====================================================
         SERVICES BACKGROUND
      ===================================================== */

      gsap.to(".services-glow", {
        y: -180,
        x: 100,
        scrollTrigger: {
          trigger: ".services-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      /* =====================================================
         PROJECTS — CINEMATIC STACK
      ===================================================== */

      const projectCards = gsap.utils.toArray(".project-card");

      projectCards.forEach((card, index) => {
        if (index === 0) return;

        gsap.fromTo(
          card,
          {
            yPercent: 100,
            scale: 0.92,
            rotate: index % 2 === 0 ? 2 : -2,
          },
          {
            yPercent: 0,
            scale: 1,
            rotate: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".projects-section",
              start: `top+=${index * 25}% top`,
              end: `top+=${index * 25 + 75}% top`,
              scrub: 1.8,
            },
          }
        );
      });

      /* Project image parallax */

      gsap.utils.toArray(".project-visual").forEach((visual) => {
        gsap.to(visual, {
          yPercent: -14,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: visual,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      /* =====================================================
         PROJECT MARQUEE
      ===================================================== */

      gsap.to(".marquee-track", {
        xPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: ".marquee-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* =====================================================
         PROCESS
      ===================================================== */

      const processTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".process-section",
          start: "top top",
          end: "+=280%",
          pin: true,
          scrub: 1.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      processTimeline
        .from(".process-heading", {
          opacity: 0,
          y: 60,
          duration: 0.8,
        })
        .from(
          ".process-line",
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1,
          },
          "-=0.2"
        )
        .from(
          ".process-step",
          {
            opacity: 0,
            y: 80,
            stagger: 0.4,
            duration: 0.8,
          },
          "-=0.3"
        )
        .to(
          ".process-line",
          {
            scaleX: 1,
            duration: 1,
          },
          "+=0.2"
        );

      /* =====================================================
         FINAL CTA
      ===================================================== */

      const cta = gsap.timeline({
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        },
      });

      cta
        .from(".cta-kicker", {
          opacity: 0,
          y: 40,
        })
        .from(
          ".cta-title",
          {
            opacity: 0,
            yPercent: 80,
            rotateX: -35,
          },
          "-=0.25"
        )
        .from(
          ".cta-button",
          {
            opacity: 0,
            scale: 0.8,
          },
          "-=0.2"
        );

      /* =====================================================
         MAGNETIC BUTTONS
      ===================================================== */

      const magneticButtons = gsap.utils.toArray(".magnetic");

      magneticButtons.forEach((button) => {
        const strength = 0.35;

        const move = (e) => {
          const rect = button.getBoundingClientRect();

          const x =
            (e.clientX - (rect.left + rect.width / 2)) * strength;

          const y =
            (e.clientY - (rect.top + rect.height / 2)) * strength;

          gsap.to(button, {
            x,
            y,
            duration: 0.45,
            ease: "power3.out",
          });
        };

        const leave = () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.4)",
          });
        };

        button.addEventListener("mousemove", move);
        button.addEventListener("mouseleave", leave);

        return () => {
          button.removeEventListener("mousemove", move);
          button.removeEventListener("mouseleave", leave);
        };
      });

      /* =====================================================
         CURSOR
      ===================================================== */

      const cursor = document.querySelector(".cursor");

      if (cursor && window.matchMedia("(pointer:fine)").matches) {
        window.addEventListener("mousemove", (e) => {
          gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.18,
            ease: "power3.out",
          });
        });

        document.querySelectorAll("a, button").forEach((element) => {
          element.addEventListener("mouseenter", () => {
            cursor.classList.add("cursor-active");
          });

          element.addEventListener("mouseleave", () => {
            cursor.classList.remove("cursor-active");
          });
        });
      }

      /* =====================================================
         REFRESH
      ===================================================== */

      window.addEventListener("load", () => {
        ScrollTrigger.refresh();
      });

      setTimeout(() => ScrollTrigger.refresh(), 700);
    }, appRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(lenisTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={appRef} className="site">
      <div className="cursor">
        <span>VIEW</span>
      </div>

      {/* ===================================================
          LOADER
      =================================================== */}

      <div className="loader">
        <div className="loader-inner">
          <img
            src="/logo.png"
            alt="Web Craft Studio"
            className="loader-logo"
          />

          <div className="loader-meta">
            <span>WEB CRAFT STUDIO</span>
            <span className="loader-counter">00 — 100</span>
          </div>

          <div className="loader-line-wrap">
            <div className="loader-line" />
          </div>
        </div>
      </div>

      {/* ===================================================
          NAV
      =================================================== */}

      <nav className="site-nav">
        <a href="#top" className="brand">
          <img src="/logo.png" alt="Web Craft Studio" />
        </a>

        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
        </div>

        <a
          className="nav-contact magnetic"
          href={`https://wa.me/${WHATSAPP}?text=Hi%20Web%20Craft%20Studio%2C%20I%27d%20like%20to%20discuss%20a%20website%20project.`}
          target="_blank"
          rel="noreferrer"
        >
          <span>Let's talk</span>
          <span className="arrow">↗</span>
        </a>
      </nav>

      <main id="top">
        {/* =================================================
            HERO
        ================================================= */}

        <section className="hero">
          <div className="hero-grid" />

          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />

          <div className="hero-orbit">
            <div />
            <div />
            <div />
          </div>

          <div className="hero-inner">
            <p className="eyebrow hero-copy">
              DIGITAL EXPERIENCES / WEB CRAFT STUDIO
            </p>

            <h1 className="hero-title">
              <span className="hero-line">
                <span className="hero-word">Your</span>
                <span className="hero-word">website</span>
              </span>

              <span className="hero-line hero-indent">
                <span className="hero-word">should</span>
                <span className="hero-word gradient-text">work.</span>
              </span>
            </h1>

            <div className="hero-bottom hero-copy">
              <p>
                We design and build premium digital experiences that help
                businesses look credible, communicate clearly and turn
                attention into action.
              </p>

              <a
                href="#problem"
                className="scroll-cue"
              >
                <span>Scroll to explore</span>
                <span className="scroll-arrow">↓</span>
              </a>
            </div>
          </div>
        </section>

        {/* =================================================
            PROBLEM
        ================================================= */}

        <section
          id="problem"
          className="problem-section section-light"
        >
          <div className="section-container">
            <div className="problem-label">
              <span>01</span>
              <span>THE PROBLEM</span>
            </div>

            <div className="problem-copy">
              <p className="problem-small">
                Your customers are already judging your business online.
              </p>

              <h2>
                <span className="problem-word">
                  They search.
                </span>
                <span className="problem-word">
                  They compare.
                </span>
                <span className="problem-word accent">
                  They decide.
                </span>
              </h2>

              <p className="problem-ending">
                And your website has seconds to make the right impression.
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            ECOSYSTEM
        ================================================= */}

        <section className="ecosystem-section">
          <div className="ecosystem-grid" />

          <div className="ecosystem-content">
            <p className="eyebrow">THE DIGITAL FIRST IMPRESSION</p>

            <div className="ecosystem-stage">
              <div className="orbit-ring ring-one" />
              <div className="orbit-ring ring-two" />

              <div className="orbit-item orbit-one">
                <span>TRUST</span>
              </div>

              <div className="orbit-item orbit-two">
                <span>CLARITY</span>
              </div>

              <div className="orbit-item orbit-three">
                <span>DESIGN</span>
              </div>

              <div className="orbit-item orbit-four">
                <span>SPEED</span>
              </div>

              <div className="ecosystem-core">
                <span>YOUR<br />BUSINESS</span>
              </div>
            </div>

            <div className="ecosystem-message">
              <span className="accent-line" />
              <p>
                A website is not decoration.
                <strong> It is part of your sales experience.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            SOLUTION
        ================================================= */}

        <section className="solution-section section-light">
          <div className="solution-wrap">
            <p className="eyebrow">02 / OUR APPROACH</p>

            <h2 className="solution-title">
              <span className="solution-line">We don't just</span>
              <span className="solution-line gradient-text">
                make websites.
              </span>
              <span className="solution-line">
                We build presence.
              </span>
            </h2>

            <div className="solution-description">
              <p>
                Strategy, interface, motion and development are designed as
                one system—so your website feels like your business, not a
                template someone could replace tomorrow.
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            SERVICES
        ================================================= */}

        <section
          id="services"
          className="services-section"
        >
          <div className="services-glow" />

          <div className="services-header">
            <div>
              <p className="eyebrow">03 / WHAT WE BUILD</p>
              <h2>
                One studio.
                <br />
                <span>Every digital layer.</span>
              </h2>
            </div>

            <p className="services-intro">
              From the first visual direction to the final interaction,
              every layer exists for a reason.
            </p>
          </div>

          <div className="services-stack">
            {services.map((service, index) => (
              <article
                className="service-card"
                key={service.number}
              >
                <div className="service-number">
                  {service.number}
                </div>

                <div className="service-content">
                  <p className="service-tag">
                    SERVICE / {service.number}
                  </p>

                  <h3>{service.title}</h3>

                  <p>{service.text}</p>

                  <div className="service-footer">
                    <span>
                      0{index + 1} — 04
                    </span>

                    <span className="service-arrow">
                      ↗
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =================================================
            WORK
        ================================================= */}

        <section
          id="work"
          className="projects-section"
        >
          <div className="projects-heading">
            <p className="eyebrow">04 / SELECTED WORK</p>

            <h2>
              Digital work
              <br />
              <span>with a purpose.</span>
            </h2>
          </div>

          <div className="projects-stack">
            {projects.map((project) => (
              <article
                className={`project-card ${project.className}`}
                key={project.number}
              >
                <div className="project-top">
                  <span>{project.number}</span>
                  <span>{project.category}</span>
                </div>

                <div className="project-visual">
                  <div className="project-noise" />

                  <div className="project-browser">
                    <div className="browser-bar">
                      <span />
                      <span />
                      <span />
                    </div>

                    <div className="browser-content">
                      <span className="browser-label">
                        {project.visual}
                      </span>

                      <div className="browser-line line-long" />
                      <div className="browser-line line-short" />

                      <div className="browser-orb" />
                    </div>
                  </div>
                </div>

                <div className="project-bottom">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link magnetic"
                  >
                    <span>View project</span>
                    <span>↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =================================================
            MARQUEE
        ================================================= */}

        <section className="marquee-section">
          <div className="marquee-track">
            <span>DESIGN</span>
            <i>✦</i>
            <span>DEVELOP</span>
            <i>✦</i>
            <span>DIFFERENTIATE</span>
            <i>✦</i>
            <span>DESIGN</span>
            <i>✦</i>
            <span>DEVELOP</span>
            <i>✦</i>
          </div>
        </section>

        {/* =================================================
            PROCESS
        ================================================= */}

        <section
          id="process"
          className="process-section section-light"
        >
          <div className="process-wrap">
            <p className="eyebrow">05 / THE PROCESS</p>

            <h2 className="process-heading">
              From idea
              <br />
              <span>to experience.</span>
            </h2>

            <div className="process-line" />

            <div className="process-steps">
              <article className="process-step">
                <span>01</span>
                <h3>Discover</h3>
                <p>
                  We understand your business, audience and the actual
                  problem the website needs to solve.
                </p>
              </article>

              <article className="process-step">
                <span>02</span>
                <h3>Design</h3>
                <p>
                  We establish the visual language, hierarchy and interaction
                  system before development begins.
                </p>
              </article>

              <article className="process-step">
                <span>03</span>
                <h3>Develop</h3>
                <p>
                  The design becomes a responsive, functional and performant
                  digital experience.
                </p>
              </article>

              <article className="process-step">
                <span>04</span>
                <h3>Launch</h3>
                <p>
                  Your finished website goes live, ready to represent your
                  business at its highest standard.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* =================================================
            CTA
        ================================================= */}

        <section className="cta-section">
          <div className="cta-glow" />

          <div className="cta-inner">
            <p className="eyebrow cta-kicker">
              READY WHEN YOU ARE
            </p>

            <h2 className="cta-title">
              <span>Let's build</span>
              <span className="gradient-text">something memorable.</span>
            </h2>

            <p className="cta-copy">
              Tell us what you're building, what isn't working, or simply
              where you want your business to go.
            </p>

            <a
              href={`https://wa.me/${WHATSAPP}?text=Hi%20Web%20Craft%20Studio%2C%20I%27d%20like%20to%20start%20a%20project.`}
              target="_blank"
              rel="noreferrer"
              className="cta-button magnetic"
            >
              <span>Start a conversation</span>
              <span>↗</span>
            </a>

            <p className="cta-number">
              WhatsApp · +91 92147 93646
            </p>
          </div>
        </section>

        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="footer">
          <div className="footer-top">
            <img
              src="/logo.png"
              alt="Web Craft Studio"
              className="footer-logo"
            />

            <p>
              A premium digital studio
              <br />
              for businesses ready to look the part.
            </p>

            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp ↗
            </a>
          </div>

          <div className="footer-bottom">
            <span>© 2026 WEB CRAFT STUDIO</span>

            <span>DESIGN · DEVELOP · DOMINATE</span>

            <span>INDIA / WORLDWIDE</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
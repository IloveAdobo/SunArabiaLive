import { useState } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        if (isLogin) {
          console.log("Logging in with:", { email, password });
          window.location.href = "/dashboard";
        } else {
          console.log("Registering with:", { name, email, password });
          window.location.href = "/dashboard";
        }
      } else {
        setError("Please fill in all fields");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 30% 20%, rgba(197,160,89,.08) 0%, #0D0D0E 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "'Inter', sans-serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Montserrat:wght@300;400;500;600&family=Inter:wght@300;400;500&display=swap');
        :root {
          --gold: #C5A059;
          --gold-light: #E8CA8A;
          --gold-dim: #7A6030;
        }
        @keyframes shimmer {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #C5A059, #E8CA8A, #C5A059);
          background-size: 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s ease infinite;
        }
      `}</style>

      {/* Animated particles background */}
      <ParticlesBackground />

      {/* Main card */}
      <div style={{
        position: "relative",
        zIndex: 10,
        width: "100%",
        maxWidth: 480,
        animation: "fadeInUp 0.8s ease-out"
      }}>
        {/* Logo area */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: 64,
            height: 64,
            margin: "0 auto 1rem",
            background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            boxShadow: "0 8px 32px rgba(197,160,89,0.2)"
          }}>
            ◆
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "2rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "0.25rem"
          }}>
            Sun <span className="shimmer-text">Arabia</span>
          </h1>
          <p style={{ color: "rgba(247,247,247,0.5)", fontSize: "0.85rem", fontWeight: 300 }}>
            {isLogin ? "Welcome back" : "Create your account"}
          </p>
        </div>

        {/* Form card */}
        <div style={{
          background: "rgba(26,26,27,0.9)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(197,160,89,0.15)",
          borderRadius: "24px",
          padding: "2.5rem",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
        }}>
          {/* Toggle buttons */}
          <div style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem",
            background: "rgba(255,255,255,0.03)",
            borderRadius: "60px",
            padding: "0.25rem"
          }}>
            <button
              onClick={() => { setIsLogin(true); setError(""); }}
              style={{
                flex: 1,
                padding: "0.75rem",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "2px",
                textTransform: "uppercase",
                background: isLogin ? "linear-gradient(135deg, var(--gold), var(--gold-light))" : "transparent",
                color: isLogin ? "#1A1A1B" : "rgba(247,247,247,0.6)",
                border: "none",
                borderRadius: "60px",
                cursor: "pointer",
                transition: "all 0.25s ease"
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(""); }}
              style={{
                flex: 1,
                padding: "0.75rem",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "2px",
                textTransform: "uppercase",
                background: !isLogin ? "linear-gradient(135deg, var(--gold), var(--gold-light))" : "transparent",
                color: !isLogin ? "#1A1A1B" : "rgba(247,247,247,0.6)",
                border: "none",
                borderRadius: "60px",
                cursor: "pointer",
                transition: "all 0.25s ease"
              }}
            >
              Sign Up
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div style={{
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.3)",
              borderRadius: "12px",
              padding: "0.75rem",
              marginBottom: "1.5rem",
              color: "#EF4444",
              fontSize: "0.8rem",
              textAlign: "center"
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name field - only for sign up */}
            {!isLogin && (
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "0.5rem"
                }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Khalid Al Mansouri"
                  style={{
                    width: "100%",
                    background: "rgba(247,247,247,0.05)",
                    border: "1px solid rgba(197,160,89,0.2)",
                    borderRadius: "12px",
                    padding: "0.9rem 1rem",
                    color: "#F7F7F7",
                    fontSize: "0.9rem",
                    fontFamily: "'Inter', sans-serif",
                    transition: "all 0.25s ease",
                    outline: "none"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "var(--gold)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(197,160,89,0.2)"}
                />
              </div>
            )}

            {/* Email field */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "0.5rem"
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                style={{
                  width: "100%",
                  background: "rgba(247,247,247,0.05)",
                  border: "1px solid rgba(197,160,89,0.2)",
                  borderRadius: "12px",
                  padding: "0.9rem 1rem",
                  color: "#F7F7F7",
                  fontSize: "0.9rem",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.25s ease",
                  outline: "none"
                }}
                onFocus={(e) => e.target.style.borderColor = "var(--gold)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(197,160,89,0.2)"}
              />
            </div>

            {/* Password field */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "0.5rem"
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  background: "rgba(247,247,247,0.05)",
                  border: "1px solid rgba(197,160,89,0.2)",
                  borderRadius: "12px",
                  padding: "0.9rem 1rem",
                  color: "#F7F7F7",
                  fontSize: "0.9rem",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.25s ease",
                  outline: "none"
                }}
                onFocus={(e) => e.target.style.borderColor = "var(--gold)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(197,160,89,0.2)"}
              />
            </div>

            {/* Forgot password link - only for login */}
            {isLogin && (
              <div style={{ textAlign: "right", marginBottom: "1.5rem" }}>
                <a href="#" style={{
                  color: "rgba(197,160,89,0.7)",
                  fontSize: "0.75rem",
                  textDecoration: "none",
                  transition: "color 0.25s ease"
                }}
                onMouseEnter={(e) => e.target.style.color = "var(--gold)"}
                onMouseLeave={(e) => e.target.style.color = "rgba(197,160,89,0.7)"}>
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
                color: "#1A1A1B",
                border: "none",
                borderRadius: "12px",
                padding: "1rem",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "3px",
                textTransform: "uppercase",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.25s ease",
                opacity: loading ? 0.7 : 1,
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(197,160,89,0.3)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <span style={{
                    display: "inline-block",
                    width: "14px",
                    height: "14px",
                    border: "2px solid #1A1A1B",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite"
                  }} />
                  Processing...
                </span>
              ) : (
                isLogin ? "Sign In ◆" : "Create Account ◆"
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            margin: "2rem 0 1.5rem"
          }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(197,160,89,0.1)" }} />
            <span style={{ color: "rgba(247,247,247,0.3)", fontSize: "0.7rem", fontFamily: "'Montserrat', sans-serif" }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(197,160,89,0.1)" }} />
          </div>

          {/* Demo credentials hint */}
          <div style={{
            textAlign: "center",
            padding: "1rem",
            background: "rgba(197,160,89,0.05)",
            borderRadius: "12px",
            border: "1px solid rgba(197,160,89,0.1)"
          }}>
            <p style={{ color: "rgba(247,247,247,0.4)", fontSize: "0.7rem", marginBottom: "0.5rem" }}>
              Demo Credentials
            </p>
            <p style={{ color: "rgba(197,160,89,0.6)", fontSize: "0.7rem", fontFamily: "'Montserrat', sans-serif" }}>
              demo@sunarabia.com / any password
            </p>
          </div>
        </div>

        {/* Back to home link */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a href="/" style={{
            color: "rgba(247,247,247,0.5)",
            fontSize: "0.75rem",
            textDecoration: "none",
            transition: "color 0.25s ease",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
          onMouseEnter={(e) => e.target.style.color = "var(--gold)"}
          onMouseLeave={(e) => e.target.style.color = "rgba(247,247,247,0.5)"}>
            ← Back to Home
          </a>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height, particles = [];
    let animationId;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.3 + 0.1,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.2
        });
      }
    };

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197, 160, 89, ${p.alpha})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.4
      }}
    />
  );
}
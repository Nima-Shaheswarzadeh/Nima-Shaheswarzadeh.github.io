export function NeonParticles() {
  const particles = Array.from({ length: 14 }, (_, i) => ({
    left: `${(i + 1) * 7}%`,
    delay: `${i * 0.7}s`,
  }));

  return (
    <div className="neon-particles fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden" aria-hidden="true">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="neon-particle"
          style={{ left: particle.left, animationDelay: particle.delay }}
        />
      ))}
    </div>
  );
}

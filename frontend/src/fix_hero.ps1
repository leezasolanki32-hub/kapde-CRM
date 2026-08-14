$file = "c:\Users\leeza\Downloads\my project 2\my project\frontend\src\App.jsx"
$content = Get-Content $file -Raw

# Replace import line
$content = $content -replace "import HeroParticles from './components/HeroParticles';", "// Hero particles removed - royal gradient background"

# Replace the entire Hero component (lines 30-105)
$oldHero = @"
const Hero = ({ setView, handleNavClick }) => {
  const [particles] = useState(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    top: `\$\{Math.random() * 100\}%`,
    left: `\$\{Math.random() * 100\}%`,
    delay: `\$\{Math.random() * 5\}s`,
    duration: `\$\{3 + Math.random() * 4\}s`
  })));

  return (
    <section id="home" className="relative px-[28px] overflow-hidden text-center bg-[#050505] min-h-[calc(100vh-60px)] flex flex-col justify-center items-center">
"@

$newHeroStart = @"
const Hero = ({ setView, handleNavClick }) => {
  return (
    <section id="home" className="relative px-[28px] overflow-hidden text-center min-h-[calc(100vh-60px)] flex flex-col justify-center items-center"
      style={{
        background: 'linear-gradient(160deg, #0f0520 0%, #1a0a2e 25%, #120828 50%, #1e0f3d 75%, #0d0418 100%)'
      }}
    >
"@

$content = $content -replace [regex]::Escape($oldHero), $newHeroStart

# Remove the old background div and HeroParticles, replace with clean royal bg
$content = $content -replace [regex]::Escape('      {/* Cinematic Dark Neon Bubble Background */}'), '      {/* Royal Gradient Background */}'

# Write back
Set-Content $file $content -NoNewline -Encoding UTF8
Write-Host "Done - Hero section updated"
